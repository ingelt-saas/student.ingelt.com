import { useEffect, useState } from "react";
import discussion from "../../api/discussion";
import CryptoJS from 'crypto-js';
// Components
import MessageBox from "../../components/Discussions/MessageBox";
import { FiSend } from "react-icons/fi";
import { useRef } from "react";
import { AttachFile, Photo, PhotoCamera, Remove, Send } from "@mui/icons-material";
import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import Compressor from "compressorjs";



const Discussions = () => {

  const [message, setMessage] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [onlineMembers, setOnlineMembers] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const messageBoxRef = useRef();

  const formatNumber = (number) => {
    const abbreviations = {
      1e3: 'k',
      1e5: 'L',
    };

    for (const key in abbreviations) {
      if (Math.abs(number) >= key) {
        return `${(number / key).toFixed(1)}${abbreviations[key]}`;
      }
    }

    return number.toString();
  };

  useEffect(() => {
    const key = process.env.REACT_APP_YOUR_RANDOM_KEY; // Replace with your own random key
    const initialTotalMembers = 99; // Initial value for total members

    const updateMembers = () => {
      // Generate random number of new members between 2 and 6
      const newMembers = Math.floor(Math.random() * 5) + 2;
      const newTotalMembers = Math.max(totalMembers + newMembers, totalMembers);

      // Calculate random number of online members between 5% and 15% of total members
      const minOnlineMembers = Math.ceil(newTotalMembers * 0.05);
      const maxOnlineMembers = Math.floor(newTotalMembers * 0.15);
      const newOnlineMembers = Math.floor(Math.random() * (maxOnlineMembers - minOnlineMembers + 1)) + minOnlineMembers;

      // Encrypt the values before storing in localStorage
      const encryptedTotalMembers = CryptoJS.AES.encrypt(newTotalMembers.toString(), key).toString();
      const encryptedOnlineMembers = CryptoJS.AES.encrypt(newOnlineMembers.toString(), key).toString();

      localStorage.setItem('totalMembers', encryptedTotalMembers);
      localStorage.setItem('onlineMembers', encryptedOnlineMembers);

      setTotalMembers(newTotalMembers);
      setOnlineMembers(newOnlineMembers);
    };

    // Retrieve encrypted values from localStorage and decrypt them
    const encryptedTotalMembers = localStorage.getItem('totalMembers');
    const encryptedOnlineMembers = localStorage.getItem('onlineMembers');

    if (encryptedTotalMembers && encryptedOnlineMembers) {
      const decryptedTotalMembers = CryptoJS.AES.decrypt(encryptedTotalMembers, key).toString(CryptoJS.enc.Utf8);
      const decryptedOnlineMembers = CryptoJS.AES.decrypt(encryptedOnlineMembers, key).toString(CryptoJS.enc.Utf8);

      if (decryptedTotalMembers && decryptedOnlineMembers) {
        setTotalMembers(parseInt(decryptedTotalMembers));
        setOnlineMembers(parseInt(decryptedOnlineMembers));
      }
    } else {
      // Initial values if no data is found in localStorage
      setTotalMembers(initialTotalMembers);
      setOnlineMembers(0);
    }

    // Update members regularly
    const timer = setInterval(updateMembers, Math.random() * (6000 - 2000) + 2000); // Random interval between 2 and 6 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);


  const getDiscussions = async () => {
    try {
      const _discussions = await discussion.getDiscussions(1, 1000);
      setDiscussions(_discussions?.data?.rows);
      scrollToBottom();
      const childEle = messageBoxRef.current?.children;
      if (childEle && childEle.length > 0) {
        messageBoxRef.current.scrollTo(0, childEle[0].clientHeight);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDiscussions();
    scrollToBottom();
  }, []);

  const createDiscussion = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('message', message);
      for (let image of selectedImages) {
        formData.append('images', image);
      }
      await discussion.postDiscussion(formData);
      setMessage('');
      getDiscussions();
      scrollToBottom();
      setSelectedImages([]);
    } catch (err) { }
  };

  const handleImageInputChange = async (e) => {
    const files = e.target.files;
    let compressedImages = [];

    const __compressed = (file) => new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        convertSize: 1,
        convertTypes: ["image/webp"],
        success: (result) => {
          resolve(result);
        },
        error: (err) => reject(err)
      });
    });

    for (let file of files) {
      const compressedImage = await __compressed(file);
      compressedImages.push(compressedImage);
    }
    setSelectedImages([...selectedImages, ...compressedImages]);
  }

  const scrollToBottom = () => {
    messageBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const removeSelectedImages = (index) => {
    let newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  }

  return (
    <div className="w-full h-full">
      <div className="h-28 bg-white w-full lg:w-[88%] shadow-lg flex items-center justify-center px-5 sticky md:fixed top-0">
        <div className="flex items-start justify-center flex-col w-full flex-[0.7] md:flex-[0.8]">
          <p className="text-xl md:text-3xl font-medium text-[#1B3B7D]">InGelt Centralized Community</p>
          <p className="pt-1 text-[#555454] text-sm md:text-base">"Explore The World Through Us"</p>
        </div>
        <div className="w-full flex items-center justify-center flex-[0.3] md:flex-[0.2]">
          <div className="flex items-start justify-center flex-col">
            <div className="flex items-center justify-center">
              <p className="text-[#828282] md:text-base text-xs pr-2">{onlineMembers} Online</p>
              <div className="w-2 h-2 rounded-full bg-[#00FF19]"></div>
            </div>
            <p className="text-[#828282] md:text-base text-xs">{formatNumber(totalMembers)} Members</p>
          </div>
        </div>
      </div>
      <div id="journal-scroll" className="flex flex-col items-center justify-center w-full px-5">
        {Array.isArray(discussions) && discussions?.map((item) => (
          <MessageBox
            key={item?.id}
            data={item}
          />
        ))}
      </div>
      <div className="fixed bottom-0 w-full bg-white">
        {selectedImages.length > 0 && <div className="flex items-center gap-x-3 pt-3 px-2 overflow-x-hidden">
          {selectedImages.map((selectedImage, index) => (
            <div key={index} className="border rounded-md overflow-hidden relative">
              <span onClick={() => removeSelectedImages(index)} className="absolute top-0 right-0 cursor-pointer bg-black rounded-full text-white w-5 h-5 grid place-items-center">
                <Remove className='!w-4 -mt-0.5' />
              </span>
              <img src={URL.createObjectURL(selectedImage)} alt='' className="w-12 h-12 object-cover" />
            </div>
          ))}
        </div>}
        <form onSubmit={createDiscussion} className="py-5 px-4 flex items-center justify-start">
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
          <input
            className="bg-white sm:w-screen px-4 mx-4 py-3 border-2 border-[#1B3B7D] rounded-xl"
            type="text"
            placeholder="Enter your message"
            value={message}
            required
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                scrollToBottom(); // Prevent the default behavior of the Enter key
                if (message.trim() !== '' && message.split(' ').length <= 200) {
                  createDiscussion(e);
                }
              }
            }}
          />
          <button disabled={!(message.trim() !== '' && message.split(' ').length <= 200)} className="flex items-center justify-center rounded-xl px-4 py-3 transition duration-500 ease-in-out text-white bg-[#1B3B7D] focus:outline-none mr-2 lg:mr-[13rem] xl:mr-[15rem] 2xl:mr-[15rem] disabled:bg-gray">
            <p className="pr-2 hidden md:flex">Send</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 transform rotate-90">
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
