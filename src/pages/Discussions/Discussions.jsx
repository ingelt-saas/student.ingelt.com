import { useContext, useEffect, useState } from "react";
import discussionApi from "../../api/discussion";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useInfiniteQuery } from "@tanstack/react-query";
// Components
import MessageBox, { CountryFlag } from "../../components/Discussions/MessageBox";
import { FiSend } from "react-icons/fi";
import { useRef } from "react";
import {
  AttachFile,
  Close,
  Photo,
  PhotoCamera,
  Remove,
  Send,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import Compressor from "compressorjs";
import { SocketContext, StudentContext } from "../../contexts";
import moment from "moment";

// assets 
import landingImg from '../../assets/images/landing-pages/community.png';
import headerImg from '../../assets/images/discussion-header.png';
import settings from "../../api/settings";
import ProfileImage from "../../components/shared/ProfileImage/ProfileImage";

const LandingPage = ({ studentName }) => {

  // enter click handler
  const unlockCommunity = async (e) => {
    e.target.disabled = true;
    try {
      await settings.update({ communityUnlock: true });
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      e.target.disabled = false;
    }
  }

  return <div className="w-full min-h-full max-md:px-3 py-10 bg-[#001E43] grid place-items-center">
    <div className="flex flex-col items-center gap-y-8">
      <div className="w-[80vw] sm:max-w-[400px] mx-auto">
        <img src={landingImg} alt='' className="w-full h-auto" />
      </div>
      <div className="w-full max-sm:px-3 sm:max-w-[600px] mx-auto">
        <h1 className="text-3xl max-sm:text-xl text-center text-white font-semibold">Hi {studentName}</h1>
        <h1 className="text-3xl max-sm:text-xl text-center text-white font-semibold">Welcome to the  Centralized Community of International  Students</h1>
        <p className="text-center text-base text-[#FFFFFF99] mt-5"># ask your doubt</p>
      </div>

      <div className=' flex flex-col items-center gap-y-2'>
        <Button
          onClick={unlockCommunity}
          variant="contained"
          sx={{
            color: '#001E43',
            textTransform: 'capitalize',
            fontWeight: '600',
            backgroundColor: '#fff',
            padding: '0.5rem 2rem',
            '&:hover': {
              backgroundColor: '#f2f2f2',
            }
          }}
        >
          Chat
        </Button>
        <p className='text-center text-white'>Start to chat with international student</p>
      </div>
    </div>
  </div>;
}

const Discussions = () => {

  // context
  const socket = useContext(SocketContext);
  const { student } = useContext(StudentContext);

  const [message, setMessage] = useState("");
  const [onlineMembers, setOnlineMembers] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyDiscussion, setReplyDiscussion] = useState(null);
  const messageBoxRef = useRef();
  const limit = 20;

  const formatNumber = (number) => {
    const abbreviations = {
      1e3: "k",
      1e5: "L",
    };

    for (const key in abbreviations) {
      if (Math.abs(number) >= key) {
        return `${(number / key).toFixed(1)}${abbreviations[key]}`;
      }
    }

    return number.toString();
  };

  const scrollToBottom = () => {
    const messageBox = document.getElementById("journal-scroll");
    if (messageBox) {
      messageBox.scroll(0, messageBox.scrollHeight);
    }
    // console.log(messageBox.scrollHeight)
    // messageBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // infinite scroll 
  const { data: discussions = [], isLoading, refetch, hasNextPage, fetchNextPage, isSuccess } = useInfiniteQuery({
    queryKey: ['messages'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await discussionApi.getDiscussions(pageParam, limit);
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      let maxPages = lastPage.count / limit;
      maxPages = Math.ceil(maxPages);
      let nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    }
  });

  // useEffect(() => {
  //   const messageBox = document.getElementById("scroll-div");
  //   messageBox.scroll(0, messageBox.scrollHeight);
  // }, [discussions]);

  useEffect(() => {
    const getAll = async () => {
      const { data } = await discussionApi.count();
      setOnlineMembers(data.online);
      setTotalMembers(data.totalMembers);
    };
    getAll();
  }, []);

  const createDiscussion = async (e) => {
    e.preventDefault();
    try {

      const __fileToDataURL = (file) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result;
          resolve(dataUrl);
        };
        reader.readAsDataURL(file);
      });

      // //save message to db
      // if (!message || !message.trim()) throw Error('Please enter a valid message');
      // const formData = new FormData()
      // formData.append('message', message)
      // formData.append('parentDiscussionId', replyDiscussion?.id || null)
      // for (let i = 0; i < selectedImages.length; i++) {
      //   formData.append('images', selectedImages[i])
      // }
      // formData.append('student_auth_token', Cookies.get("student_auth_token"))
      // const response = await discussionApi.postDiscussion(formData);
      // if (response.status !== 200) throw Error('Something went wrong');
      // else {
      //   setMessage('');
      //   setSelectedImages([]);
      //   setLoading(false);
      //   setReplyDiscussion(null);
      //   refetch();
      //   scrollToBottom();
      // }


      const imagesArr = [];

      for (const image of selectedImages) {
        const imageDataURL = await __fileToDataURL(image);
        imagesArr.push(imageDataURL);
      }

      setLoading(true);
      // Send Message to Socket
      socket.emit("message", {
        message,
        parentDiscussionId: replyDiscussion?.id || null,
        images: selectedImages,
        student_auth_token: Cookies.get("student_auth_token"),
      });
      setMessage("");
      setSelectedImages([]);
      setLoading(false);
      setReplyDiscussion(null);
      refetch();

    } catch (err) {
      console.log(err);
    }
  };

  // Check For new messages and update the state
  useEffect(() => {
    socket.on("message-ack", (data) => {
      // console.log(data.senderId, student.id)
      // if (data.senderId === student.id) {
      //   console.log('match')
      //   setMessage("");
      //   setSelectedImages([]);
      //   setLoading(false);
      // }
      refetch();
      scrollToBottom();
      // getDiscussions();
    });
  }, [socket, refetch]);

  const handleImageInputChange = async (e) => {
    const files = e.target.files;
    let compressedImages = [];

    const __compressed = (file) =>
      new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.6,
          convertSize: 1,
          maxHeight: '1080',
          maxWidth: '1080',
          convertTypes: ["image/webp"],
          success: (result) => {
            resolve(result);
          },
          error: (err) => reject(err),
        });
      });

    for (let file of files) {
      const compressedImage = await __compressed(file);
      compressedImages.push(compressedImage);
    }
    setSelectedImages([...selectedImages, ...compressedImages]);
  };

  const removeSelectedImages = (index) => {
    let newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };

  // discussion report handler
  const discussionReport = async (id) => {
    try {
      await discussionApi.reportDiscussion({ discussionId: id });
      refetch();
    } catch (err) {
      console.error(err);
    }
  }

  // discussion date beautifyer
  const formatDate = (date) => {
    // date = moment(date);
    const inputDate = moment(date, 'YYYY-MM-DD')
    const currentDate = moment();

    if (inputDate.isSame(currentDate, 'day')) {
      return 'Today';
    }

    if (currentDate.diff(inputDate, 'days') < 7) {
      return inputDate.format('dddd'); // Return day name
    } else {
      return inputDate.format('ll'); // Return full date
    }

  }

  useEffect(() => {
    scrollToBottom();
  }, [discussions]);


  return (
    <>
      {!student?.communityUnlock && <LandingPage studentName={student?.name} />}
      {student?.communityUnlock && <div className="w-full h-full flex flex-col">
        <div className="p-5 max-sm:p-2">
          <div className="py-2 max-md:py-4 bg-white w-full shadow-lg flex max-sm:flex-col max-sm:gap-5 items-center justify-between px-5 rounded-[1.2rem]">
            <div className="flex items-center gap-5">
              <div className="flex items-start justify-center flex-col w-full flex-[0.7] md:flex-[0.8]">
                <p className="text-xl md:text-3xl font-medium text-[#1B3B7D] whitespace-nowrap">
                  InGelt Centralized Community
                </p>
                <p className="pt-1 text-[#555454] text-sm md:text-base">
                  "Explore The World Through Us InGelt"
                </p>
              </div>
              <div className="w-[200px] max-xl:hidden">
                <img draggable={false} src={headerImg} alt='' className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="max-sm:w-full flex flex-col max-sm:flex-row max-sm:items-center max-sm:justify-between items-end gap-2">
              <div className="flex gap-3 max-sm:flex-row-reverse items-center">
                <div className="flex flex-col max-sm:items-start items-end">
                  <h3 className="text-[#001E43] font-semibold text-xl">{student?.name}</h3>
                  <p className="flex items-center text-sm gap-2 font-medium">
                    Active
                    <CountryFlag country={student?.country} />
                  </p>
                </div>
                <ProfileImage gender={student?.gender} src={student?.image} alt={student?.name} className={'max-sm:w-14 w-16 aspect-square object-cover rounded-full'} />
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-start justify-center flex-col">
                  <div className="flex items-center justify-center">
                    <p className="text-[#828282] md:text-base text-xs pr-2">
                      {onlineMembers}
                      &nbsp;Online
                    </p>
                    <div className="w-2 h-2 rounded-full bg-[#00FF19]"></div>
                  </div>
                  <p className="text-[#828282] md:text-base text-xs">
                    {formatNumber(totalMembers)}
                    &nbsp;Members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="scroll-div" className="w-full flex-1 relative">
          <div
            id="journal-scroll"
            className="absolute top-0 left-0 w-full h-full overflow-y-auto"
          >
            <div className="w-full min-h-full flex flex-col gap-y-5 justify-end pt-10 pb-5">

              {/* loading animation */}
              {isLoading && <div className="py-5 flex justify-center w-full">
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

              {/* fetch next page button */}
              {hasNextPage && <div className="pb-5 pt-10 w-full flex justify-center h-full">
                <div className="b relative mx-auto h-16 w-44 flex justify-center items-center" onClick={fetchNextPage}>
                  <div className="i h-12 w-44 bg-[#1B3B7D] items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
                  </div>
                  <p className="text-center text-white font-semibold z-10 pointer-events-none">Load More</p>
                </div>
              </div>}

              {/* <MessageBox key={discussion.id} data={discussion} discussionReport={discussionReport} setReplyDiscussion={setReplyDiscussion} /> */}

              {/* show discussions */}
              {isSuccess &&
                [...discussions.pages].reverse().map(item =>
                  [...Object.keys(item.rows)].reverse().map(key => <>
                    <div className="w-full py-4 flex justify-center" index={key} >
                      <span className="px-5 py-1 shadow-sm rounded-2xl bg-[#1b3b7d] text-base font-light text-white">{formatDate(key)}</span>
                    </div>
                    {[...item.rows[key]].reverse().map(discussion => <MessageBox key={discussion.id} data={discussion} discussionReport={discussionReport} setReplyDiscussion={setReplyDiscussion} />)}
                  </>)
                )
              }
            </div>
          </div>
        </div>

        <div className="w-full bg-white">

          {selectedImages.length > 0 && (
            <div className="flex items-center gap-x-3 pt-3 px-2 overflow-x-hidden">
              {selectedImages.map((selectedImage, index) => (
                <div
                  key={index}
                  className="border rounded-md overflow-hidden relative"
                >
                  <span
                    onClick={() => removeSelectedImages(index)}
                    className="absolute top-0 right-0 cursor-pointer bg-black rounded-full text-white w-5 h-5 grid place-items-center"
                  >
                    <Remove className="!w-4 -mt-0.5" />
                  </span>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt=""
                    className="w-12 h-12 object-cover"
                  />
                </div>
              ))}{" "}
            </div>
          )}

          {replyDiscussion && <p className="px-3 pt-2 text-sm font-semibold text-[#1B3B7d] flex justify-between items-center">
            Reply Message
            <button onClick={() => setReplyDiscussion(null)}>
              <Close fontSize="small" />
            </button>
          </p>}

          <form
            onSubmit={createDiscussion}
            className="py-5 px-4 flex items-center justify-between w-full"
          >
            <label htmlFor="imageInput" className="text-[#2D2D2D] cursor-pointer">
              <input
                type="file"
                id="imageInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageInputChange}
                multiple
              />
              <AttachFile fontSize="medium" />
            </label>
            <div className="flex-1 px-4">
              <input
                className="bg-white px-4 w-full py-3 border-2 border-[#1B3B7D] rounded-xl"
                type="text"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    scrollToBottom(); // Prevent the default behavior of the Enter key
                    if (
                      message.trim() !== "" &&
                      message.split(" ").length <= 200
                    ) {
                      createDiscussion(e);
                    }
                  }
                }}
              />
            </div>
            <button
              disabled={
                (!(message.trim() !== "" && message.split(" ").length <= 200) &&
                  !selectedImages.length > 0) || loading
              }
              className="flex items-center justify-center rounded-xl px-4 py-3 transition duration-500 ease-in-out text-white bg-[#1B3B7D] focus:outline-none disabled:bg-gray"
            >
              <p className="pr-2 hidden md:flex">Send</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </form>
        </div>
        <div ref={messageBoxRef} />
      </div>}
    </>
  );
};

export default Discussions;
