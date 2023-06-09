import React, { useEffect, useState } from 'react';

//assets
import findImg from '../../assets/images/find-institute.png';
import { Search } from '@mui/icons-material';
import DropdownButton from '../../components/shared/DropdownButton/DropdownButton';
import InstituteItem from '../../components/FindInstitute/InstituteItem';
import instituteApi from '../../api/institute';

const FindInstitute = () => {

    const [institutes, setInstitutes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await instituteApi.getInstitutes();
                setInstitutes(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div>
            <div className='flex justify-between items-center px-3 rounded-xl shadow-xl'>
                <div className='w-full md:w-fit py-3'>
                    <h2 className='text-2xl font-semibold text-[#001E43]'>Find Institute</h2>
                    <div className="mt-3 flex items-center flex-row max-md:w-full md:w-[500px] bg-[#0C3C821A] rounded-md py-2 px-2">
                        <div className="flex-1 relative z-0">
                            <input
                                className="h-full peer z-20 bg-transparent w-full border-0 focus:outline-none"
                                type="text"
                                name="search"
                                required
                                id="search"
                            />
                            <label
                                htmlFor="search"
                                className="peer-valid:opacity-0 absolute opacity-50 duration-200 -z-10 top-1/2 left-0 w-full h-auto -translate-y-1/2 flex gap-x-2 items-center"
                            >
                                <div className=" flex-1 flex gap-x-2 items-center border-r-2 border-[#00000066] ">
                                    <svg
                                        className="w-4 xs:w-5 h-4 xs:h-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16.4997 4.49991C16.4997 2.01465 14.485 0 11.9998 0C9.5145 0 7.49985 2.01465 7.49985 4.49991C7.49985 6.98518 9.5145 8.99982 11.9998 8.99982C14.485 8.99982 16.4997 6.98518 16.4997 4.49991ZM10.9493 11.3013C8.16828 9.59888 3.66368 9.13107 1.39685 9.00217C0.635144 8.95904 0 9.53934 0 10.272V20.7155C0 21.3872 0.543271 21.9474 1.24169 21.9835C3.28822 22.0908 7.4286 22.4841 10.2903 23.9255C10.7295 24.1467 11.2502 23.8453 11.2502 23.3691V11.8385C11.2498 11.6196 11.1415 11.419 10.9493 11.3013ZM22.6027 9.00217C20.3363 9.1306 15.8313 9.59888 13.0507 11.3013C12.8585 11.419 12.7502 11.6276 12.7502 11.8465V23.3677C12.7502 23.8453 13.2724 24.1472 13.713 23.9255C16.5742 22.4855 20.7123 22.0922 22.7583 21.9849C23.4567 21.9483 24 21.3882 24 20.7165V10.272C23.9995 9.53934 23.3644 8.95904 22.6027 9.00217Z"
                                            fill="black"
                                            fillOpacity="0.6"
                                        />
                                    </svg>
                                    <span className="text-xs xs:text-sm">
                                        IELTS Institute
                                    </span>
                                </div>
                                <div className="peer-valid:group:hidden flex-1 flex gap-x-2 items-center">
                                    <svg
                                        className="w-4 xs:w-5 h-4 xs:h-5"
                                        viewBox="0 0 22 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11 13.75C11.7563 13.75 12.4039 13.4805 12.9429 12.9415C13.481 12.4034 13.75 11.7563 13.75 11C13.75 10.2437 13.481 9.59612 12.9429 9.05712C12.4039 8.51904 11.7563 8.25 11 8.25C10.2437 8.25 9.59658 8.51904 9.0585 9.05712C8.5195 9.59612 8.25 10.2437 8.25 11C8.25 11.7563 8.5195 12.4034 9.0585 12.9415C9.59658 13.4805 10.2437 13.75 11 13.75ZM11 27.5C7.31042 24.3604 4.55492 21.444 2.7335 18.7509C0.911167 16.0586 0 13.5667 0 11.275C0 7.8375 1.10596 5.09896 3.31788 3.05937C5.52888 1.01979 8.08958 0 11 0C13.9104 0 16.4711 1.01979 18.6821 3.05937C20.894 5.09896 22 7.8375 22 11.275C22 13.5667 21.0893 16.0586 19.2679 18.7509C17.4455 21.444 14.6896 24.3604 11 27.5Z"
                                            fill="black"
                                            fillOpacity="0.6"
                                        />
                                    </svg>
                                    <span className="text-xs xs:text-sm">
                                        Institute Location
                                    </span>
                                </div>
                            </label>
                        </div>
                        <button className="flex items-center px-2 sm:px-6 sm:gap-x-2 bg-[#0C3C82] text-white text-sm sm:text-base font-medium py-2 rounded-lg">
                            <Search fontSize="small" />
                            Search
                        </button>
                    </div>
                    <div className='w-full justify-between flex items-start mt-3'>
                        <div className='flex flex-col gap-y-2 items-start'>
                            <h5 className='text-xl text-[#00285A] font-medium'>Location</h5>
                            <DropdownButton
                                data={['Delhi', 'Kolkata']}
                            />
                            <label htmlFor='nearMe' className='flex items-center w-fit gap-x-2 cursor-pointer'>
                                <input type='checkbox' id='nearMe' name='classMode' className='accent-[#0C3C82]' />
                                Near Me
                            </label>
                        </div>
                        <div className='flex flex-col gap-y-2 items-start'>
                            <h5 className='text-xl text-[#00285A] font-medium'>Mode Available</h5>
                            <label htmlFor='online' className='flex items-center w-fit gap-x-2 cursor-pointer'>
                                <input type='checkbox' id='online' name='classMode' className='accent-[#0C3C82]' />
                                Online
                            </label>
                            <label htmlFor='offline' className='flex items-center w-fit gap-x-2 cursor-pointer'>
                                <input type='checkbox' id='offline' name='classMode' className='accent-[#0C3C82]' />
                                Offline
                            </label>
                            <label htmlFor='hybrid' className='flex items-center w-fit gap-x-2 cursor-pointer'>
                                <input type='checkbox' id='hybrid' name='classMode' className='accent-[#0C3C82]' />
                                Hybrid
                            </label>
                        </div>
                    </div>
                </div>
                <div className='max-md:hidden min-w-[220px] max-h-full'>
                    <img src={findImg} alt='find Institute' className='w-full h-auto' />
                </div>
            </div>
            <div className='mt-10 flex gap-x-6'>
                <div className="w-full lg:w-1/2 flex flex-col gap-y-5">
                    {Array.isArray(institutes) &&
                        institutes.map((institute, index) => (
                            <InstituteItem
                                key={index}
                                // applyHandler={applyHandler}
                                institute={institute}
                            />
                        ))}
                </div>
                <div className="max-lg:hidden w-1/2">
                    <div className="h-[90vh] rounded-lg overflow-hidden">
                        <iframe
                            title='Google Maps'
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448193.9510394728!2d76.76356531486537!3d28.64428735134563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi%2C%20India!5e0!3m2!1sen!2sbd!4v1684835021997!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: "0" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindInstitute;
