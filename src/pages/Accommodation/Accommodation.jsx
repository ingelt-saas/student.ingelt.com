import React, { useEffect, useState } from 'react';
import { Button, Tooltip, Popover, CircularProgress, Alert } from '@mui/material';
import { Search, ArrowDropDown } from '@mui/icons-material';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import { useSearchParams } from 'react-router-dom';
import headerImg from '../../assets/images/accommodation-header.png';

// dropdown button
const DropdownButton = ({ children, options, value, changeHandler }) => {

    // states
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const matchItem = Array.isArray(options) && options.find(i => i?.value === value);
        if (matchItem) {
            setSelected(matchItem);
        }
    }, [value, options]);

    return <PopupState variant='popover' >
        {(popupState) => <>
            <Button
                {...bindTrigger(popupState)}
                variant='outlined'
                className='!rounded-full !overflow-hidden !px-5 max-sm:!px-3 !bg-transparent !border-2 !border-[#0C3C82] !capitalize !text-[#0C3C82] max-sm:!text-xs !text-sm !font-medium'
                endIcon={<ArrowDropDown fontSize='small' />}
            >
                {!selected ? children : selected?.label}
            </Button>
            <Popover
                PaperProps={{ className: '!rounded-xl shadow-2xl bg-white mt-3 max-h-[70vh] overflow-y-auto' }}
                {...bindPopover(popupState)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <div className='z-[100] bg-white min-w-fit'>
                    <ul className="flex flex-col p-3">
                        {Array.isArray(options) && options?.length > 0 ? options.map((item, index) => <li key={index}
                            className={`font-medium py-2 px-3 duration-200 cursor-pointer hover:bg-[#0C3C82] hover:bg-opacity-10 ${selected?.value === item?.value && 'bg-[#0C3C82] bg-opacity-10'} text-[#0C3C82] text-left rounded-md text-sm`}
                            onClick={() => {
                                setSelected(item);
                                typeof changeHandler === 'function' && changeHandler(item);
                                popupState.close();
                            }}
                        >
                            {item?.label}
                        </li>) : <li className='font-medium py-2 px-3 duration-200 cursor-pointer hover:bg-[#0C3C82] hover:bg-opacity-10 text-[#0C3C82] text-left rounded-md text-sm'>No Options</li>
                        }
                    </ul>
                </div>
            </Popover>
        </>}
    </PopupState>
}

const AccommodationItem = ({ item }) => {

    const { name, location, features, pricing: { min_price }, partner_link, image_featured_link } = item;

    return <div className='flex max-sm:flex-col bg-white rounded-lg p-3 gap-3 shadow-md'>
        <div className='aspect-[16/12] overflow-hidden rounded-md w-full md:w-1/3'>
            <img src={image_featured_link} alt={name} className='w-full h-full object-cover' draggable={false} />
        </div>
        <div className='flex-1 flex flex-col gap-2'>
            <h2 className='text-xl font-semibold text-[#0C3C82]'>{name}</h2>
            <p className='text-sm opacity-80'>{location.name}</p>
            <div className='flex gap-2 justify-between'>
                <div className='flex flex-col justify-between'>
                    <div className='flex flex-wrap gap-1'>
                        {Array.isArray(features) && features.map((feature, index) => <span className='text-xs text-[#0C3C82] bg-[#0C3C82] bg-opacity-10 px-2 py-1 rounded-md font-medium' key={index}>{feature.name}</span>)}
                    </div>

                </div>
                <div className='flex flex-col'>
                    <span className='text-xs'>From</span>
                    <p className='text-lg font-bold text-[#0C3C82]'>${min_price}/week</p>
                    <a href={partner_link} rel="noreferrer" target='_blank' className='text-sm bg-[#0C3C82] bg-opacity-30 px-4 py-2 rounded-md text-[#0C3C82] font-medium w-fit' >View</a>
                </div>
            </div>
        </div>
    </div>
}


const Accommodation = () => {

    // states
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();

    // search handler
    const searchHandler = (data) => {

        const search = searchParams.get('search');
        const sort = searchParams.get('sort');
        const price = searchParams.get('price');
        const duration = searchParams.get('duration');

        let searchData = { search, sort, price, duration };
        searchData = { ...searchData, ...data };

        for (let key of Object.keys(searchData)) {
            if (!searchData[key]) {
                delete searchData[key];
            }
        }

        setSearchParams(searchData);
    }

    // search input submit  
    const formHandler = (e) => {
        e.preventDefault();
        searchHandler({ search: value });
    }

    // set default search value
    useEffect(() => {
        if (searchParams.get('search')) {
            setValue(searchParams.get('search'));
        }
    }, [searchParams]);

    // fetch accommodation
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {

                const search = new URLSearchParams();
                search.append('limit', 50);
                search.append('p', 1);
                search.append('currency', 'usd');

                if (searchParams.get('search')) {
                    search.append('location_place_name', searchParams.get('search'));
                }
                if (searchParams.get('sort')) {
                    search.append('sort_key', searchParams.get('sort'));
                }
                if (searchParams.get('price')) {
                    search.append('range_available_price', searchParams.get('price'));
                }
                if (searchParams.get('duration')) {
                    let duration = searchParams.get('duration');
                    duration = duration.split(',');
                    if (duration.length >= 2) {
                        search.append('meta_min_lease_duration', `${duration[0]} months`);
                        search.append('meta_max_lease_duration', `${duration[1]} months`);
                    } else if (duration.length === 1) {
                        search.append('meta_min_lease_duration', `${duration[0]} months`);
                    }
                }

                const res = await fetch(`https://base.amberstudent.com/api/v0/leads/partners/ingelt-1687166443/inventories?${search.toString()}`);
                const data = await res.json();
                if (data?.message === 'success') {
                    const result = data.data;
                    setData(result.result);
                }
            } catch (err) {
                // location_place_name = chicago
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [searchParams]);

    return (
        <div>
            {/* header start */}
            <div className='shadow-xl rounded-xl max-sm:px-3 px-5 py-5 bg-white'>
                <div className='flex justify-between'>
                    <div className='flex-1 flex flex-col gap-3'>
                        <h1 className="text-2xl font-bold text-[#0C3C82]">Accommodation</h1>
                        <p className="font-normal text-black opacity-75 sm:max-w-[350px]">
                            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.
                        </p>
                        <div className='flex flex-wrap max-sm:gap-x-1 gap-3 max-md:justify-center mt-2'>
                            <form onSubmit={formHandler} className='flex rounded-full overflow-hidden  max-sm:text-xs text-sm border-2 border-[#0C3C82] max-sm:w-full w-[260px] px-1 py-0.5 items-center'>
                                <input type='text' placeholder='Search by Collage, City and Country' className='focus:outline-none border-none bg-transparent pl-2 pr-1 flex-1' value={value} onChange={(e) => setValue(e.target.value)} />
                                <Tooltip title='Search by Collage, City and Country'>
                                    <button type='submit' className='rounded-full grid place-items-center bg-[#0C3C82] text-white w-8 h-8'>
                                        <Search fontSize='small' />
                                    </button>
                                </Tooltip>
                            </form>
                            <DropdownButton
                                options={[
                                    { value: 'relevance', label: 'Recommended' },
                                    { value: 'distance', label: 'Nearest' },
                                    { value: 'available_price', label: 'Price' },
                                    { value: 'created', label: 'Newly Added' },
                                ]}
                                value={searchParams.get('sort')}
                                changeHandler={(data) => searchHandler({ sort: data?.value })}
                            >Sort</DropdownButton>
                            <DropdownButton
                                options={[
                                    { value: '0,500', label: '$0 - $500' },
                                    { value: '500,1000', label: '$500 - $1000' },
                                    { value: '1000,2000', label: '$1000 - $2000' },
                                    { value: '2000,3000', label: '$2000 - $3000' },
                                    { value: '3000,4000', label: '$3000 - $4000' },
                                    { value: '4000,5000', label: '$4000 - $5000' },
                                ]}
                                value={searchParams.get('price')}
                                changeHandler={(data) => searchHandler({ price: data?.value })}
                            >Price</DropdownButton>
                            <DropdownButton
                                options={[
                                    { value: '0,4', label: '0 - 4 Months' },
                                    { value: '5,8', label: '5 - 8 Months' },
                                    { value: '8', label: '8+ Months' },
                                ]}
                                value={searchParams.get('duration')}
                                changeHandler={(data) => searchHandler({ duration: data?.value })}
                            >Stay Duration</DropdownButton>
                        </div>
                    </div>
                    <div className='w-fit max-md:hidden'>
                        <img src={headerImg} alt="" className='w-auto h-auto' />
                    </div>
                </div>
            </div>
            {/* header end */}

            {/* loader */}
            {loading && <div className='py-10 flex justify-center text-[#0C3C82]'>
                <CircularProgress color='inherit' />
            </div>}

            {!loading && (Array.isArray(data) && data.length > 0 ? <div className='grid grid-cols-2 max-md:grid-cols-1 gap-5 mt-10'>
                {data.map((item, index) => <AccommodationItem key={index} item={item} />)}
            </div>
                : <div className='mt-10'>
                    <Alert icon={false} className='!mx-auto !w-fit ' severity='warning'>No Result Found</Alert>
                </div>
            )}

        </div>
    );
}

export default Accommodation;
