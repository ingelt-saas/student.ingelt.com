import { useContext, useEffect, useState } from "react";
import discussionApi from "../../api/discussion";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useInfiniteQuery } from "@tanstack/react-query";
// Components
import MessageBox from "../../components/Discussions/MessageBox";
import { FiSend } from "react-icons/fi";
import { useRef } from "react";
import {
  AttachFile,
  Photo,
  PhotoCamera,
  Remove,
  Send,
} from "@mui/icons-material";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import Compressor from "compressorjs";
import { SocketContext } from "../../contexts";

const Discussions = () => {

  const socket = useContext(SocketContext);

  const [message, setMessage] = useState("");
  const [onlineMembers, setOnlineMembers] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
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
    const messageBox = document.getElementById("scroll-div");
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

  useEffect(() => {
    const messageBox = document.getElementById("scroll-div");
    messageBox.scroll(0, messageBox.scrollHeight);
  }, [discussions]);

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

      const imagesArr = [];

      for (const image of selectedImages) {
        const imageDataURL = await __fileToDataURL(image);
        imagesArr.push(imageDataURL);
      }

      setLoading(true);
      // Send Message to Socket
      socket.emit("message", {
        message,
        images: selectedImages,
        student_auth_token: Cookies.get("student_auth_token"),
      });

    } catch (err) {
      console.log(err);
    }
  };

  // Check For new messages and update the state
  useEffect(() => {
    socket.on("message-ack", (data) => {
      if (data?.senderId) {
        setMessage("");
        setSelectedImages([]);
        setLoading(false);
      }
      refetch();
      scrollToBottom();
      // getDiscussions();
    });
  }, [socket]);

  const handleImageInputChange = async (e) => {
    const files = e.target.files;
    let compressedImages = [];

    const __compressed = (file) =>
      new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.6,
          convertSize: 1,
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

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="py-8 bg-white w-full shadow-lg flex items-center justify-center px-5">
        <div className="flex items-start justify-center flex-col w-full flex-[0.7] md:flex-[0.8]">
          <p className="text-xl md:text-3xl font-medium text-[#1B3B7D]">
            InGelt Centralized Community
          </p>
          <p className="pt-1 text-[#555454] text-sm md:text-base">
            "Explore The World Through Us InGelt"
          </p>
        </div>
        <div className="w-full flex items-center justify-center flex-[0.3] md:flex-[0.2]">
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
      <div id="scroll-div" className="w-full overflow-y-auto flex-1">
        <div
          id="journal-scroll"
          className="flex-1 flex flex-col items-center justify-center w-full px-5"
        >
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

          {hasNextPage && <div className="pb-5 pt-10 w-full flex justify-center">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isLoading}
              variant="contained"
              sx={{
                textTransform: 'capitalize',
                color: '#f2f2f2',
                padding: '0.6rem 2rem',
                backgroundColor: '#1B3B7D',
                '&:hover': {
                  backgroundColor: '#1B3B7D',
                }
              }}
            >Load More</Button>
          </div>}

          {/* show discussions */}
          {isSuccess &&
            [...discussions.pages].reverse().map(item =>
              Array.isArray(item?.rows) && [...item?.rows].reverse().map(discussion =>
                <MessageBox key={discussion.id} data={discussion} />
              )
            )}
          {/* {Array.isArray(discussions) &&
            discussions?.map((item) => (
              
            ))}{" "} */}
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
    </div>
  );
};

export default Discussions;
