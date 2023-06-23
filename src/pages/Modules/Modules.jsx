import React, { useState } from 'react';
import SearchBar from '../../components/shared/SearchBar/SearchBar';
import { Alert, Box, CircularProgress, TablePagination, Typography } from '@mui/material';

// assets 
import moduleImg from '../../assets/NewDesign/IELT Pre.svg';
import { useEffect } from 'react';
import moduleApi from '../../api/modules';
import Image from '../../components/shared/Image/Image';
import AudioModal from '../../components/shared/AudioModal/AudioModal';
import VideoModal from '../../components/shared/VideoModal/VideoModal';
import getFile from '../../api/getFile';

const DateTimeDisplay = ({ value, type }) => {
    return (
        <div className='flex items-center w-fit'>
            <p>{value}</p>
            <span>{type}</span>
        </div>
    );
};

const ModuleOverly = ({ releaseDate }) => {
    const countDownDate = new Date(releaseDate).getTime();
    const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return <div className='absolute top-0 left-0 bg-white w-full h-full rounded-xl bg-opacity-80 grid place-items-center'>
        <div className='relative text-center'>
            <div className='absolute -bottom-10 w-max left-1/2 font-medium duration-200 -translate-x-1/2 flex justify-center items-center gap-x-3 text-2xl'>
                <DateTimeDisplay type={'d'} value={days > 0 ? days : 0} />
                <p>:</p>
                <DateTimeDisplay type={'h'} value={hours > 0 ? hours : 0} />
                <p>:</p>
                <DateTimeDisplay type={'m'} value={minutes > 0 ? minutes : 0} />
                <p>:</p>
                <DateTimeDisplay type={'s'} value={seconds > 0 ? seconds : 0} />
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className='w-10 h-10'
            >
                <path d="M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm4 11.723v2.277h-2v-2.277c-.596-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723z" fill='#1B3B7D' />
            </svg>
        </div>
    </div>
}

const Modules = () => {

    const [activeTab, setActiveTab] = useState(1);
    const [modules, setModules] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 0, rows: 100 });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const subject = activeTab === 1 ? 'all' : (activeTab === 2 ? 'reading' : (activeTab === 3 ? 'writing' : (activeTab === 4 ? 'speaking' : 'listening')));
                const res = await moduleApi.getAll(subject, pagination.page + 1, pagination.rows, searchQuery);
                setTotalItems(res.data?.count);
                setModules(res.data?.rows);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [pagination, searchQuery, activeTab]);


    const viewsShorten = (num) => {
        if (typeof num !== 'number') {
            return '0';
        }
        num = num?.toString().replace(/[^0-9.]/g, "");
        if (num < 1000) {
            return num;
        }
        let si = [
            { v: 1e3, s: "K" },
            { v: 1e6, s: "M" },
            { v: 1e9, s: "B" },
            { v: 1e12, s: "T" },
            { v: 1e15, s: "P" },
            { v: 1e18, s: "E" },
        ];
        let index;
        for (index = si.length - 1; index > 0; index--) {
            if (num >= si[index].v) {
                break;
            }
        }
        return (
            (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
            si[index].s
        );
    };

    const secondsToHoursMinutes = (seconds) => {
        const hours = Math.floor(seconds / 3600); // Number of whole hours
        const remainingSeconds = seconds % 3600; // Remaining seconds after calculating hours
        const minutes = Math.floor(remainingSeconds / 60); // Number of whole minutes
        return `${hours.toString().padStart(2, 0)} h ${minutes.toString().padStart(2, 0)} min`;

    }

    const handleView = async (key, file) => {
        if (!key) {
            return;
        }
        const res = await getFile(key);
        setSelectedFile({ file: key, link: res.data });
        await moduleApi.countViews(file.id); // update views
    }

    const searchModules = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.search.value);
        // setPagination({ page: 0, rows: 5 });
    }

    return (
        <Box sx={
            {
                width: "100%",
                pr: { xl: 2, lg: 2 },
                pl: { xl: 0, lg: 2 }
            }
        }>

            <Box sx={
                {
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                    height: "20vh",
                    width: { md: "65%", xs: "100%" },
                    padding: "0rem 2rem",
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
                        padding: "2rem 0rem",
                        width: { md: "50%", xs: "90%" }
                    }
                }>
                    <div>
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                                lineHeight: '1.7rem',
                                marginBottom: '0.5rem'
                            }}>Premium IELTS Modules</Typography>
                        <Typography
                            // sx={{
                            //     color: "rgba(0, 0, 0, 0.6);",
                            //     display: { md: "flex", xs: "none" }
                            // }}
                        >British Council Verified Instructor
                        </Typography>
                    </div>
                </Box>
                <Box sx={
                    {
                        width: { md: "60%", xs: "100%" },
                        height: '100%',
                        paddingBottom: '0.5rem',
                        display: { xs: 'none', md: 'block' }
                    }
                }>
                    <img src={moduleImg}
                        alt="library"
                        className="md:relative md:bottom-2 scale-110 w-auto h-full ml-auto" />
                </Box>

            </Box>
            <Box sx={
                {
                    mt: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: "space-between", md: 'flex-start', lg: 'space-between' },
                    flexWrap: "wrap"
                }
            }>
                <div className="flex items-end justify-start">
                    <button onClick={() => setActiveTab(1)}
                        className={
                            `duration-200 transition-none ease-in ${activeTab === 1 ? 'border-1 py-3 px-5 md:px-8 font-semibold text-[#1B3B7D] border-[#ECECEC] bg-white border-b-0 rounded-t-xl' : 'bg-[#F3F3F3] py-2 px-2 md:px-5 text-sm'
                            }`
                        }>All</button>
                    <button onClick={() => setActiveTab(2)}
                        className={
                            `duration-200 transition-none ease-in ${activeTab === 2 ? 'border-1 py-3 px-5 md:px-8 font-semibold text-[#1B3B7D] border-[#ECECEC] bg-white border-b-0 rounded-t-xl' : 'bg-[#F3F3F3] py-2 px-2 md:px-5 text-sm'
                            }`
                        }>Reading</button>
                    <button onClick={() => setActiveTab(3)}
                        className={
                            `duration-200 transition-none ease-in ${activeTab === 3 ? 'border-1 py-3 px-5 md:px-8 font-semibold text-[#1B3B7D] border-[#ECECEC] bg-white border-b-0 rounded-t-xl' : 'bg-[#F3F3F3] py-2 px-2 md:px-5 text-sm'
                            }`
                        }>Writing</button>
                    <button onClick={() => setActiveTab(4)}
                        className={
                            `duration-200 transition-none ease-in ${activeTab === 4 ? 'border-1 py-3 px-5 md:px-8 font-semibold text-[#1B3B7D] border-[#ECECEC] bg-white border-b-0 rounded-t-xl' : 'bg-[#F3F3F3] py-2 px-2 md:px-5 text-sm'
                            }`
                        }>Speaking</button>
                    <button onClick={() => setActiveTab(5)}
                        className={
                            `duration-200 transition-none ease-in ${activeTab === 5 ? 'border-1 py-3 px-5 md:px-8 font-semibold text-[#1B3B7D] border-[#ECECEC] bg-white border-b-0 rounded-t-xl' : 'bg-[#F3F3F3] py-2 px-2 md:px-5 text-sm'
                            }`
                        }>Listening</button>
                </div>
                <div className="flex items-end justify-end pt-5 sm:pt-0 md:pl-16 xl:pl-0">
                    <SearchBar handleSubmit={searchModules} />
                </div>
            </Box>


            {loading && <div className="py-10 flex justify-center">
                <CircularProgress />
            </div>}

            {!loading && (Array.isArray(modules) && modules.length > 0 ? <Box className='mt-5'>
                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-y-5 pt-10">
                    {modules.map((item, index) => (
                        <div onClick={() => handleView(item.file, item)} className="p-3 relative bg-white rounded-xl h-full shadow-[0px_10px_36px_rgba(0,0,0,0.16),0px_0px_0px_1px_rgba(0,0,0,0.06)] scale-95 hover:scale-100 duration-200 transition-transform cursor-pointer" key={index}>
                            {!item.file && <ModuleOverly releaseDate={item.releaseDate} />}
                            <div className='rounded-2xl h-44 overflow-hidden'>
                                <Image src={item.thumbnail} alt={item.name} className='w-full h-full object-cover' />
                            </div>
                            <div className='mt-5'>
                                <h4 className='flex justify-between gap-x-3 items-center'>
                                    <span className='text-lg font-semibold text-[#00285A]'>{item.name}</span>
                                    {item.subject === 'Writing' && <span className='capitalize text-sm font-medium bg-[#85E1ED33] rounded-full text-[#355A5F] py-1 px-4 shadow-md'>{item.subject}</span>}
                                    {item.subject === 'Listening' && <span className='capitalize text-sm font-medium bg-[#FF898933] rounded-full text-[#663737] py-1 px-4 shadow-md'>{item.subject}</span>}
                                    {item.subject === 'Reading' && <span className='capitalize text-sm font-medium bg-[#0064E133] rounded-full text-[#0064E1] py-1 px-4 shadow-md'>{item.subject}</span>}
                                    {item.subject === 'Speaking' && <span className='capitalize text-sm font-medium bg-[#E19AF233] rounded-full text-[#5A3E61] py-1 px-4 shadow-md'>{item.subject}</span>}
                                </h4>
                                <p className='text-sm mt-3'>
                                    {item.description?.length > 90 ? item.description.split('').slice(0, 90).join('') + '...' : item.description}
                                </p>
                                <p className='flex items-center justify-between mt-3'>
                                    <span className='flex items-center text-[#00285A] gap-x-2 text-sm'>
                                        <svg
                                            width={16}
                                            height={16}
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8 0C12.4184 0 16 3.5816 16 8C16 12.4184 12.4184 16 8 16C3.5816 16 0 12.4184 0 8C0 3.5816 3.5816 0 8 0ZM7.256 4.4648C7.1079 4.4648 6.96587 4.52363 6.86115 4.62835C6.75643 4.73307 6.6976 4.8751 6.6976 5.0232V9.488C6.6976 9.7968 6.9472 10.0464 7.256 10.0464H11.7208C11.7959 10.0492 11.8707 10.0369 11.9409 10.0102C12.0111 9.98339 12.0751 9.94275 12.1292 9.89065C12.1833 9.83855 12.2264 9.77608 12.2558 9.70696C12.2852 9.63785 12.3003 9.56351 12.3003 9.4884C12.3003 9.41329 12.2852 9.33895 12.2558 9.26984C12.2264 9.20072 12.1833 9.13825 12.1292 9.08615C12.0751 9.03405 12.0111 8.99341 11.9409 8.96665C11.8707 8.93989 11.7959 8.92756 11.7208 8.9304H7.8136V5.0232C7.8136 4.87524 7.75488 4.73333 7.65033 4.62863C7.54578 4.52394 7.40396 4.46501 7.256 4.4648Z"
                                                fill="#00285A"
                                            />
                                        </svg>
                                        {secondsToHoursMinutes(item.duration)}
                                    </span>
                                    <span className='flex items-center text-[#00285A] gap-x-2 text-sm'>
                                        <svg
                                            width={16}
                                            height={16}
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10.5 8C10.5 8.66304 10.2366 9.29893 9.76777 9.76777C9.29893 10.2366 8.66304 10.5 8 10.5C7.33696 10.5 6.70107 10.2366 6.23223 9.76777C5.76339 9.29893 5.5 8.66304 5.5 8C5.5 7.33696 5.76339 6.70107 6.23223 6.23223C6.70107 5.76339 7.33696 5.5 8 5.5C8.66304 5.5 9.29893 5.76339 9.76777 6.23223C10.2366 6.70107 10.5 7.33696 10.5 8Z"
                                                fill="#00285A"
                                            />
                                            <path
                                                d="M0 8C0 8 3 2.5 8 2.5C13 2.5 16 8 16 8C16 8 13 13.5 8 13.5C3 13.5 0 8 0 8ZM8 11.5C8.92826 11.5 9.8185 11.1313 10.4749 10.4749C11.1313 9.8185 11.5 8.92826 11.5 8C11.5 7.07174 11.1313 6.1815 10.4749 5.52513C9.8185 4.86875 8.92826 4.5 8 4.5C7.07174 4.5 6.1815 4.86875 5.52513 5.52513C4.86875 6.1815 4.5 7.07174 4.5 8C4.5 8.92826 4.86875 9.8185 5.52513 10.4749C6.1815 11.1313 7.07174 11.5 8 11.5Z"
                                                fill="#00285A"
                                            />
                                        </svg>
                                        {viewsShorten(item?.views)}{" "}
                                        Views
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))
                    }
                </div>

                {/* <TablePagination component='div' color="primary"
                    count={totalItems}
                    rowsPerPageOptions={
                        [10, 25, 50, 100]
                    }
                    page={
                        pagination.page
                    }
                    rowsPerPage={
                        pagination.rows
                    }
                    onPageChange={
                        (_, newPage) => setPagination({
                            ...pagination,
                            page: newPage
                        })
                    }
                    onRowsPerPageChange={
                        (e) => setPagination({
                            ...pagination,
                            rows: e.target.value
                        })
                    }
                    className="mt-6" /> */}

            </Box> :
                <Alert icon={false} severity='warning' className='w-fit mx-auto mt-5'>No Modules Found</Alert>
            )}

            {selectedFile && selectedFile?.file?.toLowerCase().endsWith('.mp3') ? (
                <AudioModal file={selectedFile?.link} showPopup={Boolean(selectedFile)} closePopup={() => setSelectedFile(null)} />
            ) : (
                <VideoModal file={selectedFile?.link} showPopup={Boolean(selectedFile)} closePopup={() => setSelectedFile(null)} />
            )}

        </Box>
    );
}

export default Modules;
