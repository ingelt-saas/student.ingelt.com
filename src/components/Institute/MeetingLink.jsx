import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { StudentContext } from '../../contexts';
import { Button, Tooltip } from '@mui/material';
import { CalendarMonth, ContentCopy } from '@mui/icons-material';

// assets
import ProfileImage from '../shared/ProfileImage/ProfileImage';
import moment from 'moment/moment';

const MeetingLink = () => {

    const [isCopied, setIsCopied] = useState(false);

    // context 
    const { student } = useContext(StudentContext);

    const handleCopy = async (text) => {
        text = student?.batch?.classroomLink || "";

        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
        } catch (error) {
            console.error("Failed to copy text: ", error);
        }
    };

    const takeToClass = () => {
        if (student?.batch?.classroomLink) {
            window.open(student?.batch?.classroomLink, "_blank");
        }
    };

    return (
        <div>
            <div className="rounded-2xl border border-[#78787840] flex px-2 py-4 max-sm:gap-2 gap-x-5 items-center  shadow-lg bg-white">
                <ProfileImage src={student.image} alt={student.name} gender={student.gender} className='max-sm:w-16 w-24 aspect-square object-cover rounded-full' />
                <div className="flex-1 flex flex-col justify-around py-2">
                    <div>
                        <h1 className="text-2xl font-semibold">Your Classroom Link</h1>
                        <p className="truncate relative pr-6 py-1">
                            {student?.batch?.classroomLink ||
                                "Your teacher hasn't set the link"}
                            {student?.batch?.classroomLink && (
                                <Tooltip title={isCopied ? "Copied!" : "Copy to Clipboard"}>
                                    <button
                                        className="text-black absolute top-1/2 right-2 -translate-y-1/2"
                                        onClick={handleCopy}
                                    >
                                        <ContentCopy />
                                    </button>
                                </Tooltip>
                            )}
                        </p>
                        {student?.batch?.classTime && <span className='text-sm text-[#000000] font-medium opacity-40 flex gap-x-2 items-center'>
                            <CalendarMonth /> {moment(student?.batch.classTime).format('lll')}
                        </span>}
                    </div>

                    <Button
                        onClick={takeToClass}
                        variant="contained"
                        sx={{
                            fontWeight: 600,
                            textTransform: "capitalize",
                            borderRadius: 2,
                            width: "100%",
                            backgroundColor: "#1B3B7D",
                        }}
                        disabled={student?.batch?.classroomLink ? false : true}
                    >
                        Join Class
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MeetingLink;
