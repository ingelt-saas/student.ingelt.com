import { Alert, Drawer } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import universityApi from '../../api/university';
import UniversityItem from './UniversityItem';
import { Close } from '@mui/icons-material';

const ShortlistedUniversities = ({ open, close, shortlistHandler, RightArrowSVG }) => {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['shortlistedUniversities', open],
        queryFn: async () => {
            const res = await universityApi.shortlistedUniversities();
            return res.data;
        }
    });

    const removeShortlist = async (e, university) => {
        await shortlistHandler(e, university);
        refetch();
    }


    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={close}
            classes={{
                paper: "!bg-transparent",
            }}
        >
            <div className="bg-white h-screen w-[98vw] sm:w-[360px] flex-col flex relative">
                <h2 className='text-center text-2xl font-medium pt-4 border-b pb-2'>Shortlisted Universities</h2>
                <button className='absolute top-2 right-2' onClick={close}>
                    <Close fontSize='small' />
                </button>
                <div className='flex-1 relative'>
                    {/* loading animation  */}
                    {isLoading && <div className="py-5 flex justify-center w-full h-full items-center absolute top-0 left-0">
                        <svg width="100" height="100" viewBox="0 0 200 200">
                            <circle
                                cx="100"
                                cy="100"
                                r="50"
                                fill="none"
                                stroke="#001E43"
                                strokeWidth="4"
                            >
                                <animate
                                    attributeName="r"
                                    values="50; 30; 50"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="stroke-width"
                                    values="4; 8; 4"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </svg>
                    </div>}

                    {/* show shortlisted universities */}
                    {!isLoading && (Array.isArray(data) && data.length > 0 ? <div className='overflow-y-auto flex flex-col gap-y-3 no-scrollbar h-full w-full absolute left-0 top-0 px-2 pb-8'>
                        {data.map(item =>
                            <UniversityItem
                                university={item}
                                key={item.id}
                                RightArrowSVG={RightArrowSVG}
                                shortlistHandler={removeShortlist}
                            />
                        )}
                    </div>
                        :
                        <div className='h-full grid place-items-center'>
                            <Alert severity='warning' icon={false} className='w-fit text-center'>Empty Shortlist</Alert>
                        </div>
                    )}
                </div>
            </div>
        </Drawer>
    );
}

export default ShortlistedUniversities;
