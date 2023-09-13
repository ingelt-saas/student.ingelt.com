import { ArrowDropDown } from '@mui/icons-material';
import { Button, Popover, Slider } from '@mui/material';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import React, { useEffect, useState } from 'react';

const PriceRange = ({ value, searchHandler }) => {

    // states
    const [range, setRange] = useState([0, 5000]);

    const handleChange = (event, newValue) => {
        setRange(newValue);
    };


    // set default value
    useEffect(() => {
        if (value) {
            let price = value.split(',');
            price = price.map(i => parseInt(i));
            setRange(price);
        }
    }, [value]);

    useEffect(() => {
        searchHandler({ price: range.join(',') });
    }, [range]);

    return (
        <PopupState variant='popover'>
            {(popupState) => <>
                <Button
                    {...bindTrigger(popupState)}
                    variant='outlined'
                    className='!rounded-full !overflow-hidden !px-5 max-sm:!px-3 !bg-transparent !border-2 !border-[#0C3C82] !capitalize !text-[#0C3C82] max-sm:!text-xs !text-sm !font-medium'
                    endIcon={<ArrowDropDown fontSize='small' />}
                >
                    Price
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
                    <div className='z-[100] bg-white min-w-fit flex flex-col gap-2 p-4'>
                        <h2 className='text-lg font-semibold text-[#001E43]'>Price Range (per week)</h2>
                        <div className="w-full">
                            <div className='h-28 w-72 flex items-end gap-1'>
                                {[...Array(20)].map((_, i) => {
                                    const index = i + 1;
                                    const amount = (5000 / 20) * index;
                                    return <div key={i} className={`${(range[0] <= amount && amount <= range[1]) ? 'bg-[#001E43]' : 'bg-[rgba(0,_30,_67,_0.10)]'}`} style={{ height: `${(i + 1) * 5}%`, width: `calc(100% / 20 - 4px)` }}>
                                    </div>
                                })}
                            </div>
                            <Slider
                                value={range}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                step={10}
                                marks
                                min={0}
                                max={5000}
                            />
                            <p className='flex justify-between items-center w-full'>
                                <span className="text-[#001E43] text-base font-semibold">${range[0]}</span>
                                <span className="text-[#001E43] text-base font-semibold">${range[1]}</span>
                            </p>
                        </div>
                    </div>
                </Popover>
            </>}
        </PopupState>
    );
}

export default PriceRange;
