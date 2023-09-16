import React, { useEffect, useState } from 'react';
import { Button, Popover, CircularProgress, Alert, Pagination } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import { Link, useSearchParams } from 'react-router-dom';
import headerImg from '../../assets/images/accommodation-header.png';
import SearchInput from '../../components/Accommodation/SearchInput';
import PriceRange from '../../components/Accommodation/PriceRange';
import AccommodationDetails from './AccommodationDetails';

// dropdown button
const DropdownPopover = ({ children, options, value, changeHandler, desc }) => {

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
                {children}
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
                    <h2 className='text-lg font-semibold text-[#001E43] px-2 pt-2'>{desc}</h2>
                    <ul className="flex flex-col pt-1 pb-3 px-1">
                        {Array.isArray(options) && options?.length > 0 ? options.map((item, index) => <li key={index}
                            className={`font-medium py-2 px-3 duration-200 cursor-pointer text-[#0C3C82] text-left rounded-md text-sm flex gap-2 items-center`}
                            onClick={() => {
                                setSelected(item);
                                typeof changeHandler === 'function' && changeHandler(item);
                                popupState.close();
                            }}
                        >
                            <span className='w-2 h-2 rounded-full bg-[#001E43] block relative'>
                                {selected?.value === item?.value && <span className='absolute w-full h-full top-0 left-0 rounded-full bg-[#001E4333]' style={{ transform: 'scale(2)' }}></span>}
                            </span>
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

    const { name, location, features, pricing: { min_price, duration, price }, id, image_featured_link } = item;

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
                    <p className='text-lg font-bold text-[#0C3C82]'>${min_price || price}/{duration}</p>
                    <Link className='text-sm bg-[#0C3C82] bg-opacity-30 px-4 py-2 rounded-md text-[#0C3C82] font-medium w-fit' to={`/accommodation?id=${id}`}>
                        View
                    </Link>
                </div>
            </div>
        </div>
    </div>
}

const Accommodation = () => {

    // states
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(1);

    const [searchParams, setSearchParams] = useSearchParams();

    // search handler
    const searchHandler = (data) => {

        const search = searchParams.get('search');
        const sort = searchParams.get('sort') || 'relevance';
        const price = searchParams.get('price');
        const duration = searchParams.get('duration');
        const page = searchParams.get('page');

        let searchData = { search, sort, price, duration, page };
        searchData = { ...searchData, ...data };

        for (let key of Object.keys(searchData)) {
            if (!searchData[key]) {
                delete searchData[key];
            }
        }

        setSearchParams(searchData);
    };

    // debounce function
    const debounce = (func, delay = 1000) => {
        let timerId;

        return function (...args) {
            if (timerId) {
                clearTimeout(timerId);
            }

            timerId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    // fetch accommodation
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {

                const search = new URLSearchParams();
                search.append('limit', 20);
                search.append('currency', 'usd');

                if (searchParams.get('page')) {
                    search.append('p', searchParams.get('page'));
                }

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
                    setCount(result?.meta?.count || 0);
                }
            } catch (err) {
                // location_place_name = chicago
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [searchParams]);

    // single accommodation showing
    if (searchParams.get('id')) {
        return <AccommodationDetails accommodations={data} id={searchParams.get('id')} />
    }

    return (
        <div>

            {/* header start */}
            <div className='shadow-xl rounded-xl max-sm:px-3 px-5 py-5 bg-white'>
                <div className='flex justify-between'>
                    <div className='flex-1 flex flex-col gap-3 sm:max-h-fit'>
                        <h1 className="text-2xl font-bold text-[#0C3C82]">Student Accommodation</h1>
                        <p className="font-normal text-black opacity-75 sm:max-w-[350px]">
                            Book student accommodations near top universities and cities across the globe.
                        </p>
                        <div className='flex flex-wrap max-sm:gap-x-1 gap-3 max-md:justify-center mt-2'>
                            <SearchInput
                                searchHandler={searchHandler}
                                searchValue={searchParams.get('search')}
                            />
                            <DropdownPopover
                                options={[
                                    { value: 'relevance', label: 'Recommended' },
                                    { value: 'distance', label: 'Nearest' },
                                    { value: 'available_price', label: 'Price' },
                                    { value: 'created', label: 'Newly Added' },
                                ]}
                                desc='Sort By'
                                value={searchParams.get('sort')}
                                changeHandler={(data) => searchHandler({ sort: data?.value })}
                            >Sort</DropdownPopover>
                            <PriceRange
                                searchHandler={debounce(searchHandler)}
                                value={searchParams.get('price')}
                            />
                            <DropdownPopover
                                options={[
                                    { value: '0,4', label: '0 - 4 Months' },
                                    { value: '5,8', label: '5 - 8 Months' },
                                    { value: '8', label: '8+ Months' },
                                ]}
                                desc='Stay Duration'
                                value={searchParams.get('duration')}
                                changeHandler={(data) => searchHandler({ duration: data?.value })}
                            >Stay Duration</DropdownPopover>
                        </div>
                    </div>
                    <div className='w-fit max-md:hidden'>
                        <img src={headerImg} alt="" className='w-auto h-[150px]' />
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

            {/* pagination */}
            {!loading && (count / 20) > 1 && <div className='mt-10 flex justify-center'>
                <Pagination
                    count={Math.ceil(count / 20)}
                    page={parseInt(searchParams.get('page')) || 1}
                    variant="outlined"
                    shape="rounded"
                    boundaryCount={1}
                    siblingCount={1}
                    onChange={(_, newPage) => searchHandler({ page: newPage })}
                />
            </div>}

        </div>
    );
}

export default Accommodation;
