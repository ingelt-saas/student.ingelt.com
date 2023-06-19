import { useState } from 'react';
import { MenuItem, Button, Menu, } from '@mui/material';
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
import { toast } from 'react-toastify';
import universityApi from '../../api/university.js';
import { useEffect } from 'react';

const SelectMenu = ({ data, placeholder, onChange }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null); // Added state to keep track of selected item
    const open = Boolean(anchorEl);
    const [menuWidth, setMenuWidth] = useState(0);

    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            {...props}
        />
    ))(({ theme }) => ({
        maxHeight: '50vh',
        "&. MuiButton-root": {
            color:
                theme.palette.mode === "light"
                    ? "rgb(55, 65, 81)"
                    : theme.palette.grey[300],
        },
        "& .MuiPaper-root": {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: menuWidth,
            color:
                theme.palette.mode === "light"
                    ? "rgb(55, 65, 81)"
                    : theme.palette.grey[300],
            boxShadow:
                "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            "& .MuiMenu-list": {
                padding: "4px 0",
            },
            "& .MuiMenuItem-root": {
                "& .MuiSvgIcon-root": {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                "&:active": {
                    backgroundColor: "#ffffff",
                },
            },
        },
    }));

    const handleBatchSelect = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleItemSelect = (item) => {
        // Added function to handle item selection
        setSelectedItem(item);
        setAnchorEl(null);
        onChange(item);
    };

    useEffect(() => {
        const button = document.getElementById('demo-customized-button');
        const btnWidth = button.clientWidth;
        setMenuWidth(btnWidth);
    }, []);

    return (
        <>
            <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="outlined"
                disableElevation
                onClick={handleBatchSelect}
                sx={{
                    bgcolor: "transparent",
                    color: "#1B3B7B",
                    border: '2px solid #F7EFFF !important',
                    textTransform: "capitalize",
                    fontWeight: 500,
                    padding: "0.8rem 0.8rem",
                    borderRadius: "7px",
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {selectedItem ? selectedItem : placeholder}{" "}
                {/* Display selected item name or default button name */}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                {data.map((item) => (
                    <MenuItem
                        key={item}
                        onClick={() => handleItemSelect(item)} // Call handleItemSelect when an item is clicked
                        className='flex gap-x-4'
                    >
                        {item}
                    </MenuItem>
                ))}
            </StyledMenu>
        </>
    );
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

const AreaSelectMenu = ({ data, onChange }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null); // Added state to keep track of selected item
    const open = Boolean(anchorEl);
    const [menuWidth, setMenuWidth] = useState(0);

    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            {...props}
        />
    ))(({ theme }) => ({
        maxHeight: '50vh',
        "&. MuiButton-root": {
            color:
                theme.palette.mode === "light"
                    ? "rgb(55, 65, 81)"
                    : theme.palette.grey[300],
        },
        "& .MuiPaper-root": {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: menuWidth,
            color:
                theme.palette.mode === "light"
                    ? "rgb(55, 65, 81)"
                    : theme.palette.grey[300],
            boxShadow:
                "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            "& .MuiMenu-list": {
                padding: "4px 0",
            },
            "& .MuiMenuItem-root": {
                "& .MuiSvgIcon-root": {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                "&:active": {
                    backgroundColor: "#ffffff",
                },
            },
        },
    }));

    const handleBatchSelect = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleItemSelect = (item) => {
        // Added function to handle item selection
        setSelectedItem(item);
        setAnchorEl(null);
        onChange(item.name);
    };

    useEffect(() => {
        const button = document.getElementById('demo-area-button');
        const btnWidth = button.clientWidth;
        setMenuWidth(btnWidth);
    }, []);

    return (
        <>
            <Button
                id="demo-area-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="outlined"
                disableElevation
                onClick={handleBatchSelect}
                sx={{
                    bgcolor: "transparent",
                    color: "#1B3B7B",
                    border: '2px solid #F7EFFF !important',
                    textTransform: "capitalize",
                    fontWeight: 500,
                    padding: "0.8rem 0.8rem",
                    borderRadius: "7px",
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {selectedItem ? <span className='flex gap-x-4'>
                    <img src={selectedItem.img} alt={selectedItem.name} className='' />
                    {selectedItem.name}
                </span> : 'Area of interest'}
                {/* {selectedItem ? selectedItem : }{" "} */}
                {/* Display selected item name or default button name */}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                {data.map((item) => (
                    <MenuItem
                        key={item.name}
                        onClick={() => handleItemSelect(item)} // Call handleItemSelect when an item is clicked
                        className='flex gap-x-4'
                    >
                        <img src={item.img} alt={item.name} className='' />
                        {item.name}
                    </MenuItem>
                ))}
            </StyledMenu>
        </>
    );
}

const FilterMenu = ({ filterHandler }) => {

    // const [selectedData, setSelectedData] = useState({
    //     country: '',
    //     courseLevel: '',
    //     areaOfStudy: '',
    // });

    // areas data
    const data = [
        {
            name: "Business & Management",
            img: Business,
        },
        {
            name: "Social Sciences",
            img: social,
        },
        {
            name: "Computer Science & IT",
            img: computer,
        },
        {
            name: "Mathematics",
            img: maths,
        },
        {
            name: "Engineering",
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
            name: "Architecture",
            img: architecture,
        },
        {
            name: "Agriculture",
            img: agriculture,
        },
        {
            name: "Professional Studies",
            img: professional,
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
            name: "Science",
            img: science,
        },
        {
            name: "Sports",
            img: sports,
        },
        {
            name: "Hospitality",
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
        <div className="bg-white rounded-t-2xl">
            <div className="relative">
                <img src={ShortlistSVG} alt="Shortlist" className="" />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between py-5 px-5">
                    <p className="text-white">
                        need more help in finding your dream course?
                    </p>
                    <button onClick={sendQuery} className="bg-[#E7ECF3] disabled:opacity-75 disabled:pointer-events-auto group border-2 border-[#E7ECF3] hover:bg-transparent hover:text-[#E7ECF3] duration-300 w-fit text-[#0C3C82] font-semibold py-3 px-6 rounded-full flex items-center gap-x-2">
                        Talk to expert
                        <RightArrowSVG
                            className={'w-6 h-6'}
                            backgroundColor={'text-[#0C3C82] group-hover:text-[#E7ECF3]'}
                        />
                    </button>
                </div>
            </div>
            <div className="h-4/7">
                <SelectMenu
                    placeholder={'Country'}
                    data={countries}
                    onChange={(value) => filterHandler('country', value)}
                />
                <SelectMenu
                    placeholder={'Course Level'}
                    data={['All', 'Bachelor’s', 'Master’s']}
                    onChange={(value) => filterHandler('course', value)}
                />

                <AreaSelectMenu
                    data={data}
                    onChange={(value) => filterHandler('areaOfInterest', value)}
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