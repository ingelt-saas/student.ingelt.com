import { useState } from 'react';
import { MenuItem, Button, Menu, FormControl, InputLabel, Select, OutlinedInput, Box, Chip, } from '@mui/material';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
//Styled
import { styled } from "@mui/material/styles";
import countries from '../../data/shortlistCountries.js';

// shortlist assets
import Business from "../../assets/NewDesign/university_shortlisting/project-management.svg";
import social from "../../assets/NewDesign/university_shortlisting/social-science.svg";
import computer from "../../assets/NewDesign/university_shortlisting/computer & it.svg";
import maths from "../../assets/NewDesign/university_shortlisting/mathematic.svg";
import engineer from "../../assets/NewDesign/university_shortlisting/engineering.svg";
import fineArts from "../../assets/NewDesign/university_shortlisting/Fine arts.svg";
import medicine from "../../assets/NewDesign/university_shortlisting/medicine.svg";
import architecture from "../../assets/NewDesign/university_shortlisting/architecture.svg";
import agriculture from "../../assets/NewDesign/university_shortlisting/agriculture.svg";
import professional from "../../assets/NewDesign/university_shortlisting/professional studies.svg";
import journalism from "../../assets/NewDesign/university_shortlisting/media journalism.svg";
import education from "../../assets/NewDesign/university_shortlisting/education.svg";
import law from "../../assets/NewDesign/university_shortlisting/Law.svg";
import science from "../../assets/NewDesign/university_shortlisting/science.svg";
import sports from "../../assets/NewDesign/university_shortlisting/sports.svg";
import hospitality from "../../assets/NewDesign/university_shortlisting/hospitality.svg";
import greenCap from "../../assets/NewDesign/GroupgreenCap.svg";
import ShortlistSVG from "../../assets/images/shortlist.svg";
import Airplane from '../../assets/images/airplane.svg';
import { toast } from 'react-toastify';
import universityApi from '../../api/university.js';
import { useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const MultiSelectMenu = ({ label, onChange, name, values, options }) => {
    return <>
        <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                name={name}
                value={values}
                onChange={onChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none !important',
                        borderRadius: 'none !important',
                        borderBottom: '2px solid #F7EFFF !important',
                    }
                }}
            >
                {options.map((item) => (
                    <MenuItem
                        key={item}
                        value={item}
                    // style={getStyles(name, personName, theme)}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </>
}

const MultiAreaMenu = ({ label, onChange, values, options }) => {
    return <>
        <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={values}
                onChange={onChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none !important',
                        borderRadius: 'none !important',
                        borderBottom: '2px solid #F7EFFF !important',
                    }
                }}
            >
                {options.map((item) => (
                    <MenuItem
                        key={item.name}
                        value={item.name}
                        // style={getStyles(name, personName, theme)}
                        className='flex gap-x-2'
                    >
                        <img src={item.img} alt={item.name} className='' />
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </>
}


const RightArrowSVG = ({ className, backgroundColor }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="0 0 30 30"
            fill="none"
        >
            <rect
                x="0.785645"
                y="0.998047"
                width="28.5714"
                height="28.5714"
                rx="14.2857"
                className={backgroundColor}
                fill='currentColor'
                // fill={backgroundColor}
                fillOpacity="0.1"
            />
            <g clipPath="url(#clip0_1460_1759)">
                <path
                    d="M11.6882 19.838L16.2319 15.2844L11.6882 10.7308L13.087 9.33203L19.0394 15.2844L13.087 21.2368L11.6882 19.838Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_1460_1759">
                    <rect
                        width="23.8095"
                        height="23.8095"
                        fill="white"
                        transform="translate(3.1665 3.37891)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

const FilterMenu = ({ filterHandler, selectedData }) => {

    // const [selectedData, setSelectedData] = useState({
    //     country: '',
    //     courseLevel: '',
    //     areaOfStudy: '',
    // });

    // areas data
    const data = [
        {
            name: "All",
            img: '',
        },
        {
            name: "Commerce, Business & Administration",
            img: Business,
        },
        {
            name: "Social and Behavioural Science",
            img: social,
        },
        {
            name: "Computer Science & IT",
            img: computer,
        },
        {
            name: "Mathematics and Statistics",
            img: maths,
        },
        {
            name: "Engineering and Engineering Trades",
            img: engineer,
        },
        {
            name: "Fine Arts",
            img: fineArts,
        },
        {
            name: "Medicine",
            img: medicine,
        },
        {
            name: "Architecture and Building",
            img: architecture,
        },
        {
            name: "Agriculture",
            img: agriculture,
        },
        {
            name: "Media & Journalism",
            img: journalism,
        },
        {
            name: "Education",
            img: education,
        },
        {
            name: "Law",
            img: law,
        },
        {
            name: "Physical and Life Sciences",
            img: hospitality,
        },
        {
            name: "Other",
            img: greenCap,
        },
    ];

    // send query handler
    const sendQuery = async (e) => {
        e.target.disabled = true;
        try {
            await universityApi.sendQuery();
            toast.success('Your query has been sent successfully, our team will contact you shortly');
        } catch (err) {
            console.error(err);
        } finally {
            e.target.disabled = false;
        }
    }

    return (
        <div className="bg-white rounded-3xl rounded-bl-2xl max-md:w-[250px] w-[350px]">
            <div className="relative w-full">
                {/* <img src={ShortlistSVG} alt="Shortlist" className="" /> */}
                <div className='h-52 2xl:h-72 w-full bg-[#0C3C82] rounded-tl-2xl'></div>
                <img src={Airplane} alt='' className='w-28 xl:w-32 2xl:w-40 absolute top-1/2 -translate-y-1/2 right-5' />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between py-5 px-5">
                    <p className="text-white 2xl:text-xl">
                        need more help in finding your dream course?
                    </p>
                    <button onClick={sendQuery} className="bg-[#E7ECF3] 2xl:text-lg disabled:opacity-75 disabled:pointer-events-auto group border-2 border-[#E7ECF3] hover:bg-transparent hover:text-[#E7ECF3] duration-300 w-fit text-[#0C3C82] font-semibold py-2 px-4 rounded-full flex items-center gap-x-2">
                        Talk to expert
                        <RightArrowSVG
                            className={'w-6 h-6 2xl:w-8 2xl:h-8'}
                            backgroundColor={'text-[#0C3C82] group-hover:text-[#E7ECF3]'}
                        />
                    </button>
                </div>
            </div>
            <div className="h-4/7 flex flex-col gap-y-3 mt-3">
                <MultiSelectMenu
                    label={'Country'}
                    name={'country'}
                    onChange={(e) => filterHandler('country', e.target.value)}
                    values={selectedData.country}
                    options={countries}
                />
                <MultiSelectMenu
                    label={'Course Level'}
                    name={'course'}
                    onChange={(e) => filterHandler('course', e.target.value)}
                    values={selectedData.course}
                    options={['High School (11th -12th)', 'UG Diploma/ Certificate', 'UG', 'PG Diploma/ Certificate', 'PG', 'PhD']}
                />

                <MultiAreaMenu
                    label={'Area of Interest'}
                    onChange={(e) => filterHandler('areaOfInterest', e.target.value)}
                    values={selectedData.areaOfInterest}
                    options={data}
                />

                {/* <SelectMenu
                    placeholder={'Area of study'}
                    options={[]}
                    value={selectedData.areaOfStudy}
                    handleChange={selectHandler}
                    name='areaOfStudy'
                /> */}

                {/* <SelectMenu
          placeholder={'Higher education'}
          options={[]}
          value={selectedData.higherEducation}
          handleChange={selectHandler}
          name='higherEducation'
        /> */}

            </div>
        </div>
    );
};

export default FilterMenu;