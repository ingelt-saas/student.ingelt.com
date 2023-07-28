import { Box, FormControl, IconButton, MenuItem, Popover, Select, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';

// assets
import headerImg from '../../assets/images/speaking-practice-header.png';
import { ArrowDropDown, CalendarMonth, Close } from '@mui/icons-material';
import { useEffect } from 'react';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import sessionApi from '../../api/session';
import moment from 'moment/moment';
import { StudentContext } from '../../contexts';
import ProfileImage from '../../components/shared/ProfileImage/ProfileImage';

const months = [
    { id: 0, value: 'January' },
    { id: 1, value: 'February' },
    { id: 2, value: 'March' },
    { id: 3, value: 'April' },
    { id: 4, value: 'May' },
    { id: 5, value: 'June' },
    { id: 6, value: 'July' },
    { id: 7, value: 'August' },
    { id: 8, value: 'September' },
    { id: 9, value: 'October' },
    { id: 10, value: 'November' },
    { id: 11, value: 'December' },
];

const CheckSessions = () => {

    // states
    const [tab, setTab] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [sessions, setSessions] = useState([]);

    // context
    const { student } = useContext(StudentContext);

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        if (selectedMonth) {
            const month = selectedMonth?.id;
            setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), month));
        }
    }, [selectedMonth]);


    // fetch sessions
    useEffect(() => {
        (async () => {
            try {
                const res = await sessionApi.getSessions();
                let sessions = res.data;
                // if (tab) {
                //     sessions = sessions.filter(i => i.speaker === 'american');
                // } else {
                //     sessions = sessions.filter(i => i.speaker === 'indian');
                // }
                setSessions(sessions);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [tab]);

    // console.log(sessions)

    return (
        <div className='mt-5'>
            <Box sx={
                {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: { md: "65%", xs: "100%" },
                    height: "20vh",
                    padding: "2rem",
                    backgroundColor: "white",
                    border: "1px solid white",
                    borderRadius: "2rem",
                    boxShadow: "0px 10px 36px rgba(0, 0, 0, 0.16), 0px 0px 0px 1px rgba(0, 0, 0, 0.06);"
                }
            }>
                <Box sx={
                    {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        // padding: '2rem 1rem 2rem 1rem',
                        width: { md: "50%", xs: "90%" }
                    }
                }>
                    <Typography sx={
                        {
                            color: "rgba(0, 0, 0, 0.6);",
                        }

                    }>Start your</Typography>
                    <Typography sx={
                        {
                            fontWeight: "bold",
                            fontSize: "1.5rem"
                        }
                    }>Speaking Practice</Typography>

                </Box>
                <Box
                    sx={{
                        width: { md: "60%", xs: "100%" },
                        display: { xs: 'none', md: 'block' }
                        // padding: '0.3rem'
                    }}
                >
                    <img
                        src={headerImg}
                        alt="library"
                        className={`relative md:bottom-5 ml-auto`}
                    />
                </Box>

            </Box>

            <div className='mt-10'>
                <div className='flex justify-between gap-5 items-center'>
                    <div></div>
                    {/* <div className='sm:w-[500px] max-sm:w-11/12 flex justify-between rounded-xl border-2 border-[#0C3C82] relative overflow-hidden z-10'>
                        <span className={`absolute w-1/2 h-full bg-[#0C3C82] top-0 ${tab ? 'left-1/2 rounded-l-lg' : 'left-0 rounded-r-lg'} -z-10 duration-200`}></span>
                        <button onClick={() => setTab(0)} className={`w-1/2 ${!tab ? 'text-white' : 'text-[#0C3C82]'} text-center z-20 font-medium py-2 duration-200`}>Indian Speaker</button>
                        <button onClick={() => setTab(1)} className={`w-1/2 ${tab ? 'text-white' : 'text-[#0C3C82]'} text-center z-20 font-medium py-2 duration-200`}>American Speaker</button>
                    </div> */}
                    <FormControl size='small' variant="outlined" sx={{ width: '130px', textAlign: 'center', '& fieldset': { borderColor: '#0C3C82 !important' } }}>
                        <Select
                            sx={{ borderRadius: '0.8rem', color: '#0C3C82', }}
                            labelId="select-label"
                            value={selectedMonth?.id || new Date().getMonth()}
                            onChange={(e) => setSelectedMonth(months.find(i => i.id === e.target.value))}
                            IconComponent={ArrowDropDown}
                            MenuProps={{ sx: { maxHeight: '50vh' } }}
                        >
                            {months.map(({ id, value }) => <MenuItem key={id} value={id}>{value}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>

                <div className="container mx-auto p-4 mt-5">
                    <div className="rounded p-4">
                        {/* <div className="flex justify-between mb-4">
                            <button onClick={handlePrevMonth}>Prev</button>
                            <span>
                                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                            </span>
                            <button onClick={handleNextMonth}>Next</button>
                        </div> */}
                        <div className="grid grid-cols-7 bg-white shadow-lg rounded-2xl overflow-hidden table-collapse border">

                            {weekdays.map((day) => (
                                <div key={day} className="text-center font-medium text-sm px-2 py-3 border">
                                    {day}
                                </div>
                            ))}

                            {[...Array(firstDayOfMonth)].map((_, index) => (
                                <div className='px-2 py-3 border' key={`empty-${index}`} />
                            ))}

                            {[...Array(daysInMonth)].map((_, index) => {
                                const day = index + 1;
                                const date = `${currentDate.getMonth() + 1}-${day}-${currentDate.getFullYear()}`;
                                const session = sessions.find(i => moment(i?.schedule).format('DD-MM-YYYY') === moment(new Date(date)).format('DD-MM-YYYY'))

                                return (
                                    session ? <PopupState key={`day-${day}`} variant='popover' popupId="demo-popup-popover">
                                        {(popupState) => <>
                                            <div
                                                key={`day-${day}`}
                                                className="text-center px-2 py-3 cursor-pointer border font-medium hover:bg-[#0C3C82] hover:bg-opacity-30 duration-200 grid place-items-center"
                                                {...bindTrigger(popupState)}
                                            >
                                                <ProfileImage src={student?.image} alt={student?.name} gender={student?.gender} className={'w-10 h-10 overflow-hidden rounded-full'} />
                                            </div>
                                            <Popover
                                                PaperProps={{ className: '!rounded-2xl shadow-2xl bg-white' }}
                                                {...bindPopover(popupState)}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}>
                                                <div className='p-4 z-50 bg-white w-[300px] relative'>
                                                    <IconButton className='!absolute !top-2 !right-2' onClick={popupState.close}>
                                                        <Close />
                                                    </IconButton>
                                                    <h4 className='text-xl font-semibold'>Topic of session</h4>
                                                    <p className='flex gap-x-1 items-center text-sm mt-2 text-[rgba(0,_0,_0,_0.40)]'><CalendarMonth fontSize='small' /> {moment(session.schedule).format('lll')}</p>
                                                    <div className='mt-4 flex items-start gap-x-3'>
                                                        <img src='https://images.unsplash.com/photo-1582610285985-a42d9193f2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80' alt='' className='w-14 aspect-square object-cover rounded-full' />
                                                        <p className='text-sm flex-1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim </p>
                                                    </div>
                                                </div>
                                            </Popover>
                                        </>}
                                    </PopupState>
                                        :
                                        <div
                                            key={`day-${day}`}
                                            className="text-center px-2 py-3 cursor-pointer border font-medium hover:bg-[#0C3C82] hover:bg-opacity-30 duration-200 grid place-items-center"
                                        // onClick={() =>
                                        //     alert(`You clicked on ${day}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`)
                                        // }
                                        >
                                            {day}
                                        </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckSessions;
