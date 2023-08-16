import moment from "moment/moment";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StudentContext } from "../../contexts";
import ProfileImage from "../shared/ProfileImage/ProfileImage";
import { Tooltip, Modal, Button } from "@mui/material";
import { Gallery, Item } from "react-photoswipe-gallery";
import 'photoswipe/dist/photoswipe.css'
import getFile from "../../api/getFile";
import ReplyIcon from '@mui/icons-material/Reply';
import ReportIcon from '@mui/icons-material/Report';
// import { Country } from "country-state-city";
import Flag from "react-world-flags";
import { Verified } from '@mui/icons-material';
import query from "../../api/query";


const CountryFlag = ({ country }) => {

  const [countries, setCountries]= useState([]);
  useLayoutEffect(() => {
    query.getAllCountry().then(result=>{
      setCountries(result.data)
    })
  }, [])
  
  // let countries = Country.getAllCountries();
  let countryCode = countries.find(i => i.name === country);

  if (countryCode) {
    return <>
      <Flag code={countryCode.isoCode} width={20} />
      {country}
    </>
  }

  return <>{country}</>;
}

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
    ParentDiscussion,
    senderVerified
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
              <button onClick={() => setReplyDiscussion(data)} className="absolute top-1/2 -translate-y-1/2 right-full text-[#1b3b7d]">
                <ReplyIcon />
              </button>
            </Tooltip>
            <div className="flex flex-col gap-y-1 justify-end">
              {ParentDiscussion && <p className="text-xs rounded-lg p-1 bg-[#f2f2f2] bg-opacity-50 text-white">{ParentDiscussion?.message}</p>}
              <p className="text-sm lg:text-base text-white flex gap-x-1 items-start">
                <span className="flex-1">{message}</span>
              </p>
              <p className="text-right text-xs text-white pl-3 min-w-max opacity-75">
                {moment(createdAt).format("LT")}
              </p>
            </div>
          </div>
          }

          {Array.isArray(discussionImages) && discussionImages.length > 0 &&
            <div className="rounded-md rounded-br-none bg-[#1b3b7d] flex-1 py-2 px-2 flex-col flex gap-1 items-end">
              {
                <Gallery>
                  <div className="flex flex-col md:w-[400px] gap-2">
                    {discussionImages.map(item => item.image && <GalleryItem key={item.image} image={item.image} />)}
                  </div>
                </Gallery>
              }
              <p className="text-right text-xs text-white pl-3 min-w-max opacity-75">
                {moment(createdAt).format("LT")}
              </p>
            </div>
          }

          {discussionReports.length > 0 && <span className="!text-xs text-[#1b3b7d] font-medium">{discussionReports.length} more people reported this message</span>}
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

        {/* sender image show */}
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
          {message && <div className="rounded-md rounded-bl-none bg-[#F2F2F2] flex-1 py-2 px-2 shadow-md relative">
            <span className="absolute flex items-center gap-x-1 top-1/2 -translate-y-1/2 left-full pl-1">
              <Tooltip title='Reply'>
                <button onClick={() => setReplyDiscussion(data)} className="text-[#1b3b7d] outline-none" style={{ transform: 'rotateY(180deg)' }}>
                  <ReplyIcon />
                </button>
              </Tooltip>

            </span>

            <div className="flex flex-col gap-y-1 justify-start">
              <p className="flex text-xs font-semibold justify-between gap-x-4 text-[#1b3b7d] w-full">
                <span>
                  {senderName}
                  {senderVerified ? <Verified className="!ml-1 !w-4 !h-4" /> : ''}
                </span>
                <span className="flex gap-x-2 items-center">{<CountryFlag country={senderCountry} />}</span>
              </p>
              {ParentDiscussion && <p className="text-xs rounded-lg p-1 bg-[#fff] text-[#1b3b7d]">{ParentDiscussion?.message}</p>}
              <p className="text-sm lg:text-base text-[#1b3b7d] flex gap-x-1 items-start">
                <span className="flex-1">{message}</span>
              </p>
              <div className='flex items-end justify-between'>
                <span>
                  {!reporterFind &&
                    <Tooltip title='Report'>
                      <button onClick={() => setReportConfirm(true)} className="text-[#1b3b7d]">
                        <ReportIcon fontSize="small" />
                      </button>
                    </Tooltip>
                  }
                </span>
                <p className="text-left text-xs text-[#1b3b7d] min-w-max opacity-75">
                  {moment(createdAt).format("LT")}
                </p>
              </div>
            </div>
          </div>}

          {Array.isArray(discussionImages) && discussionImages.length > 0 &&
            <>
              <div className="rounded-md rounded-br-none bg-[#F2F2F2] flex-1 shadow-md py-2 px-2 flex-col flex gap-1 items-start">
                <p className="flex text-xs font-semibold justify-between gap-x-2 text-[#1b3b7d] w-full">
                  <span>{senderName}</span>
                  <span className="flex gap-x-2 items-center">{<CountryFlag country={senderCountry} />}</span>
                </p>
                {
                  <Gallery>
                    <div className="flex flex-col md:w-[400px] gap-2">
                      {discussionImages.map(item => item.image && <GalleryItem key={item.image} image={item.image} />)}
                    </div>
                  </Gallery>
                }
                <p className="text-left text-xs text-[#1b3b7d] min-w-max opacity-75">
                  {moment(createdAt).format("lll")}
                </p>
              </div>
            </>
          }
          {discussionReports.length > 0 && <span className="!text-xs text-[#1b3b7d] font-medium">{reporterFind ? (discussionReports.length <= 1 ? 'You reported this message' : `You & ${discussionReports.length - 1} more people reported this message`) : `${discussionReports.length} more people reported this message`}</span>}
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
            >Report</Button>
          </div>
        </div>
      </Modal>

      {/*       
          discussionImages.map((item) => (
      <div
        className="rounded-md mb-4 last:mb-0 w-96 max-w-[90%] overflow-hidden cursor-pointer ml-auto bg-white"
        key={item.id}
      >
        <Image
          src={item.image}
          alt=""
          className="w-full rounded-md h-auto"
          gender={gender}
        />
        <p className="text-right text-xs text-[#00285A] mt-1 pl-3 min-w-max">
          {moment(createdAt).format("LT")}
        </p>

      </div> */}



      {/* <div className={`chat-message`}>
        {isStudentMessage ? (
          <>

            {Array.isArray(discussionImages) &&
              discussionImages.length > 0 &&
              discussionImages.map((item) => (
                <div
                  className="rounded-md mb-4 last:mb-0 w-96 max-w-[90%] overflow-hidden cursor-pointer ml-auto bg-white"
                  key={item.id}
                >
                  <Image
                    src={item.image}
                    alt=""
                    className="w-full rounded-md h-auto"
                    gender={gender}
                  />
                  <p className="text-right text-xs text-[#00285A] mt-1 pl-3 min-w-max">
                    {moment(createdAt).format("LT")}
                  </p>
                  {discussionReports.length > 0 && <span className="text-xs font-medium">{discussionReports.length} people report this message</span>}
                </div>
              ))}
          </>
        ) : (
          <>
            {message && (
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-lg max-w-xl mx-2 order-2 items-center justify-center">
                  <Tooltip
                    arrow
                    title={reporterFind ? 'You report this message' : <button onClick={(e) => discussionReport(e, data.id)}>Report</button>}
                    PopperProps={{
                      popperOptions: {
                        modifiers: [
                          {
                            name: 'offset',
                            options: {
                              offset: [0, -4], // Adjust the offset as per your requirement
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <div className="flex flex-col gap-y-1">
                      <div
                        className="rounded-lg rounded-bl-none py-2 px-3"
                        style={{ backgroundColor: "#F2F2F2" }}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-[#1B3B7D]">{senderName}</p>
                          <p className="text-sm text-[#1B3B7D] ml-3">
                            {senderCountry}
                          </p>
                        </div>
                        <div className="flex items-end justify-between">
                          <p className="text-lg text-left">{message}</p>
                          <div className="min-w-max text-right text-xs pl-3">
                            {moment(createdAt).format("LT")}
                          </div>
                        </div>
                      </div>
                      {discussionReports.length > 0 && <span className="text-xs font-medium text-[#1B3B7D]">{discussionReports.length} people report this message</span>}
                    </div>
                  </Tooltip>
                </div>
                <ProfileImage
                  alt={'Sender Image'}
                  src={senderImage}
                  className="w-10 h-10 rounded-full order-1 object-cover"
                  gender={senderGender}
                />
              </div>
            )}

            {Array.isArray(discussionImages) && discussionImages.length > 0 && (
              <div className="flex flex-row-reverse items-end justify-end">
                <div className="flex flex-col">
                  {discussionImages.map((item) => (
                    <div
                      className="rounded-md mb-4 last:mb-0 w-96 max-w-[90%] overflow-hidden cursor-pointer ml-2 mr-auto bg-white"
                      key={item.id}
                    >
                      <Image
                        src={item.image}
                        alt=""
                        className="w-full h-auto rounded-md"
                      />
                      <p className="text-left text-xs text-[#00285A] mt-1 pl-3 min-w-max">
                        {moment(createdAt).format("LT")}
                      </p>
                      {discussionReports.length > 0 && <span className="text-xs font-medium text-[#1B3B7D]">{discussionReports.length} people report this message</span>}
                    </div>
                  ))}
                </div>
                <ProfileImage
                  alt={'Sender Image'}
                  src={senderImage}
                  className="w-10 h-10 rounded-full order-1 object-cover"
                  gender={senderGender}
                />
              </div>
            )}
          </>
        )}
      </div> */}

    </div >
  );
};

export default MessageBox;
