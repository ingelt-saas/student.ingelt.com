import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../../contexts";
import ProfileImage from "../shared/ProfileImage/ProfileImage";
import { Tooltip, MenuItem, Menu, Modal, Button } from "@mui/material";
import { Gallery, Item } from "react-photoswipe-gallery";
import 'photoswipe/dist/photoswipe.css'
import getFile from "../../api/getFile";
import ReplyIcon from '@mui/icons-material/Reply';
import ReportIcon from '@mui/icons-material/Report';

const GalleryItem = ({ image }) => {

  const [url, setUrl] = useState('');

  useEffect(() => {
    getFile(image).then(res => setUrl(res.data));
  }, [image]);

  if (!url) {
    return;
  }

  return <Item
    thumbnail={url}
    original={url}
    width={'90vw'}
    height={'auto'}
  >
    {({ ref, open }) => (
      <img src={url} alt={image} ref={ref} onClick={open} className="w-full h-auto rounded-md" />
    )}
  </Item>
}

const MessageBox = ({ data, discussionReport, setReplyDiscussion }) => {

  // context
  const {
    student: { id, name, gender, image },
  } = useContext(StudentContext);

  // states 
  const [reportConfirm, setReportConfirm] = useState(false);

  const {
    message,
    senderName,
    senderImage,
    senderGender,
    senderId,
    createdAt,
    senderCountry,
    discussionImages,
    discussionReports,
    ParentDiscussion
  } = data;

  // Check if the message is from the student
  const isStudentMessage = senderId === id;

  const reporterFind = discussionReports.find(i => i.reporterId === id);

  // const sendDateAndTime = (time) => {
  //   const date1 = moment(time);
  //   const date2 = moment(new Date());
  //   const duration = moment.duration(date2.diff(date1));
  //   const hours = duration.hours();
  //   const minutes = duration.minutes();

  //   if (hours < 24) {
  //     return moment(time).startOf('hour').fromNow();
  //   } else if (minutes <= 0) {
  //     return moment(time).startOf('minute').fromNow();
  //   } else {
  //     return moment(time).format('lll');
  //   }
  // }

  return (
    <div className={`w-full flex flex-row ${isStudentMessage ? 'justify-end' : 'justify-start'}`}>

      {isStudentMessage && <div className="w-fit md:max-w-[70%] max-w-[90%] flex flex-row items-end">

        <div className="flex flex-col items-end gap-y-1 flex-1">

          {/* if message field is not empty or null */}
          {message && <div className="rounded-md rounded-br-none bg-[#1b3b7d] flex-1 py-2 px-2 relative">
            <Tooltip title='Reply'>
              <button onClick={() => setReplyDiscussion(data)} className="absolute top-0 right-full text-[#1b3b7d]">
                <ReplyIcon />
              </button>
            </Tooltip>
            <div className="flex flex-col gap-y-1 justify-end">
              {ParentDiscussion && <p className="text-xs rounded-lg p-1 bg-[#f2f2f2] bg-opacity-50 text-white">{ParentDiscussion?.message}</p>}
              <p className="text-sm lg:text-base text-white flex gap-x-1 items-start">
                <span className="flex-1">{message}</span>
              </p>
              <p className="text-right text-xs text-white pl-3 min-w-max opacity-75">
                {moment(createdAt).format("lll")}
              </p>
            </div>
          </div>
          }

          {Array.isArray(discussionImages) && discussionImages.length > 0 &&
            <div className="rounded-md rounded-br-none bg-[#1b3b7d] flex-1 py-2 px-2 flex-col flex gap-1 items-end">
              {
                <Gallery>
                  <div className="flex flex-col md:w-[400px] gap-2">
                    {discussionImages.map(item => item.image && <GalleryItem image={item.image} />)}
                  </div>
                </Gallery>
              }
              <p className="text-right text-xs text-white pl-3 min-w-max opacity-75">
                {moment(createdAt).format("LT")}
              </p>
            </div>
          }
          {discussionReports.length > 0 && <span className="!text-xs text-[#1b3b7d] font-medium">{discussionReports.length} people reported this message</span>}
        </div>

        {/* my self image show */}
        <div className="px-2">
          <ProfileImage
            alt={name}
            gender={gender}
            src={image}
            className={'h-10 w-10 rounded-full object-cover'}
          />
        </div>
      </div>}

      {!isStudentMessage && <div className="w-fit md:max-w-[70%] max-w-[82%] flex flex-row items-end">

        {/* my self image show */}
        <div className="px-2">
          <ProfileImage
            alt={senderName}
            gender={senderGender}
            src={senderImage}
            className={'h-10 w-10 rounded-full object-cover'}
          />
        </div>

        <div className="flex flex-col gap-y-1 flex-1">
          {/* if message field is not empty or null */}
          {message && <div className="rounded-md rounded-bl-none bg-[#FFF] flex-1 py-2 px-2 shadow-md relative">
            <span className="absolute flex items-center gap-x-1 top-0 left-full pl-1">
              <Tooltip title='Reply'>
                <button onClick={() => setReplyDiscussion(data)} className="text-[#1b3b7d]">
                  <ReplyIcon />
                </button>
              </Tooltip>
              <Tooltip title='Report'>
                <button onClick={() => setReportConfirm(true)} className="text-[#1b3b7d]">
                  <ReportIcon />
                </button>
              </Tooltip>
            </span>
            <div className="flex flex-col gap-y-1 justify-start">
              <p className="flex text-xs font-semibold justify-between gap-x-2 text-[#1b3b7d] w-full">
                <span>{senderName}</span>
                <span>{senderCountry}</span>
              </p>
              {ParentDiscussion && <p className="text-xs rounded-lg p-1 bg-[#f2f2f2] text-[#1b3b7d]">{ParentDiscussion?.message}</p>}
              <p className="text-sm lg:text-base text-[#1b3b7d] flex gap-x-1 items-start">
                <span className="flex-1">{message}</span>
              </p>
              <p className="text-left text-xs text-[#1b3b7d] min-w-max opacity-75">
                {moment(createdAt).format("lll")}
              </p>
            </div>
          </div>}

          {Array.isArray(discussionImages) && discussionImages.length > 0 &&
            <>
              <div className="rounded-md rounded-br-none bg-[#FFF] flex-1 shadow-md py-2 px-2 flex-col flex gap-1 items-start">
                <p className="flex text-xs font-semibold justify-between gap-x-2 text-[#1b3b7d] w-full">
                  <span>{senderName}</span>
                  <span>{senderCountry}</span>
                </p>
                {
                  <Gallery>
                    <div className="flex flex-col md:w-[400px] gap-2">
                      {discussionImages.map(item => item.image && <GalleryItem image={item.image} />)}
                    </div>
                  </Gallery>
                }
                <p className="text-left text-xs text-[#1b3b7d] min-w-max opacity-75">
                  {moment(createdAt).format("lll")}
                </p>
              </div>
            </>
          }
          {discussionReports.length > 0 && <span className="!text-xs text-[#1b3b7d] font-medium">{reporterFind ? (discussionReports.length <= 1 ? 'You report this message' : `You & ${discussionReports.length - 1} people report this message`) : `${discussionReports.length} people reported this message`}</span>}
        </div>

      </div>}

      {/* report confirm modal */}
      <Modal open={reportConfirm} onClose={() => setReportConfirm(false)} className='grid place-items-center'>
        <div className='bg-white pb-7 pt-4 px-7 rounded-md max-sm:w-11/12 max-w-[400px]'>
          <h4 className='text-xl font-medium text-center'>Are you sure you want to report this message?</h4>
          <div className='flex items-center flex-row gap-x-4 mt-4'>
            <Button
              onClick={() => setReportConfirm(false)}
              sx={{
                color: '#00000066',
                border: '1px solid #00000066',
                fontWeight: 600,
                padding: '0.7rem',
                borderRadius: '7px',
                textTransform: 'capitalize',
                flex: '1',
                boxShadow: 'none'
              }}
            >Cancel</Button>
            <Button
              onClick={() => {
                discussionReport(data.id);
                setReportConfirm(null);
              }}
              color='error' variant='contained'
              sx={{
                fontWeight: 600,
                padding: '0.7rem',
                borderRadius: '7px',
                textTransform: 'capitalize',
                flex: '1',
                boxShadow: 'none'
              }}
            >Delete</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default MessageBox;