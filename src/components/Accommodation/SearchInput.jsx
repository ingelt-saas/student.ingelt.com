import React, { useEffect, useState } from 'react';
import PopupState, { bindFocus, bindPopover, bindTrigger } from 'material-ui-popup-state';
import { Search } from '@mui/icons-material';
import { CircularProgress, Popover, Tooltip } from '@mui/material';

// assets
import londonImg from '../../assets/images/accommodation-places/london.webp';
import glasgowImg from '../../assets/images/accommodation-places/glasgow.webp';
import liverpoolImg from '../../assets/images/accommodation-places/liverpool.webp';
import edinburghImg from '../../assets/images/accommodation-places/edinburgh.webp';
import sheffieldImg from '../../assets/images/accommodation-places/sheffield.webp';
import melbourneImg from '../../assets/images/accommodation-places/melbourne.webp';
import dallasImg from '../../assets/images/accommodation-places/dallas.webp';
import chicagoImg from '../../assets/images/accommodation-places/chicago.webp';
import sydneyImg from '../../assets/images/accommodation-places/sydney.webp';
import newYorkImg from '../../assets/images/accommodation-places/new-york.webp';
import manchesterImg from '../../assets/images/accommodation-places/manchester.webp';
import nottinghamImg from '../../assets/images/accommodation-places/nottingham.webp';
import axios from 'axios';
import { debounce } from '../../utilities';
import { IoLocationOutline } from 'react-icons/io5';
import { FaGraduationCap } from 'react-icons/fa';
import { BiHomeHeart } from 'react-icons/bi';

const SearchInput = ({ searchValue, searchHandler }) => {

    // states
    const [value, setValue] = useState(searchValue || ''); // control input value
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);

    // locations data
    const data = [
        { name: 'London', image: londonImg },
        { name: 'Glasgow', image: glasgowImg },
        { name: 'Liverpool', image: liverpoolImg },
        { name: 'Edinburgh', image: edinburghImg },
        { name: 'Sheffield', image: sheffieldImg },
        { name: 'Melbourne', image: melbourneImg },
        { name: 'Dallas', image: dallasImg },
        { name: 'Chicago', image: chicagoImg },
        { name: 'Sydney', image: sydneyImg },
        { name: 'New York', image: newYorkImg },
        { name: 'Manchester', image: manchesterImg },
        { name: 'Nottingham', image: nottinghamImg },
    ];

    // search input submit  
    const formHandler = (e) => {
        e.preventDefault();
        // searchHandler({ search: value });
    }


    const search = async (e) => {
        const value = e.target.value;
        if (!value) {
            return;
        }
        setLoading(true);
        try {
            const res = await axios.get(`https://base.amberstudent.com/api/v0/homes/search?limit=10&sort_key=search_name&sort_order=desc&states=active&search_name=${value}`);
            if (res.data?.message === 'success') {
                setSearchData(res.data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <PopupState variant='popover'>
            {(popupState) => <>
                <form onSubmit={formHandler} className='flex rounded-full overflow-hidden  max-sm:text-xs text-sm border-2 border-[#0C3C82] max-sm:w-full w-[260px] px-1 py-0.5 items-center' >
                    <input onKeyUp={debounce(search, 1000)} {...bindFocus(popupState)} type='text' placeholder='Search by Collage, City and Country' className='focus:outline-none border-none bg-transparent pl-2 pr-1 flex-1' value={value} onChange={(e) => setValue(e.target.value)} />
                    <Tooltip title='Search by Collage, City and Country'>
                        <button type='submit' className='rounded-full grid place-items-center bg-[#0C3C82] text-white w-8 h-8'>
                            <Search fontSize='small' />
                        </button>
                    </Tooltip>
                </form>
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
                    <div className='z-[100] bg-white min-w-fit p-4 max-h-[70vh]'>

                        {/* loader */}
                        {loading && <div className='flex py-4 justify-center text-[#0C3C82] mx-auto min-w-[300px]'>
                            <CircularProgress color='inherit' />
                        </div>}

                        {!loading && searchData.length <= 0 && <div className='grid grid-cols-4 gap-2'>
                            <h2 className='col-span-4 text-xl font-semibold text-[#001E43]'>Popular Locations</h2>
                            {data.map(({ name, image }, index) => <div key={index} className='flex flex-col gap-1 items-center cursor-pointer'
                                onClick={() => {
                                    searchHandler({ search: name });
                                    setValue(name);
                                    popupState.close();
                                }}
                            >
                                <img src={image} alt={name} className='w-14 aspect-square object-cover rounded-md' />
                                <p className='text-xs font-semibold'>{name}</p>
                            </div>)}
                        </div>}

                        {!loading && searchData.length > 0 && <ul className='space-y-2'>
                            {searchData.map(item => <li className='w-fit flex gap-2 max-w-full cursor-pointer'>
                                <div className='w-10 h-10 rounded-md grid place-items-center bg-[#f2f2f2] shadow-sm'>
                                    {item.type === 'sublocality' && <IoLocationOutline className='w-5 h-5 text-[#0C3C82]' />}
                                    {item.type === 'establishment' && <FaGraduationCap className='w-5 h-5 text-[#0C3C82]' />}
                                    {item.type === 'inventory' && <BiHomeHeart className='w-5 h-5 text-[#0C3C82]' />}
                                </div>
                                <div className='flex flex-col gap-0'>
                                    <span className='font-medium text-sm'>{item.name}</span>
                                    <span className='font-normal text-sm'>{item.address}</span>
                                </div>
                            </li>)}
                        </ul>}

                    </div>
                </Popover>
            </>}
        </PopupState>
    );
}

export default SearchInput;
