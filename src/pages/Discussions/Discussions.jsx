import { useEffect, useState } from "react";
import discussion from "../../api/discussion";

// Components
import MessageBox from "../../components/Discussions/MessageBox";
import { FiSend } from "react-icons/fi";
import { useRef } from "react";

const Discussions = () => {

  const [message, setMessage] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const messageBoxRef = useRef();

  const getDiscussions = async () => {
    const _discussions = await discussion.getDiscussions(1, 1000);
    setDiscussions(_discussions?.data?.rows);
    const childEle = messageBoxRef.current.children;
    messageBoxRef.current.scrollTo(0, childEle[0].clientHeight);
  };

  useEffect(() => {
    getDiscussions();
  }, []);

  const createDiscussion = async (e) => {
    e.preventDefault();
    try {
      await discussion.postDiscussion({
        message: message,
      });
      setMessage('');
      getDiscussions();
    } catch (err) { }

  };

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="border-b-1 border-zinc-400 w-full text-4xl font-semibold pb-4 mb-5 hidden md:block">
        IELTS Centralized Community
      </h1>

      <div
        className="flex-1 overflow-y-auto no-scrollbar rounded-xl border-slate-400 px-2 md:px-4"
        style={{ boxShadow: "0px 2px 50px 0px rgba(0,0,0,0.05) inset" }}
        ref={messageBoxRef}
      >
        <div className="flex flex-col items-center justify-center w-full">
          {Array.isArray(discussions) && discussions?.map((item) => (
            <MessageBox
              key={item?.id}
              data={item}
            />
          ))}
        </div>
      </div>

      <form className="w-full mt-2" onSubmit={createDiscussion}>
        <p className="my-2 font-medium text-md">Send a Message</p>
        <div className="flex justify-center items-center w-full border border-slate-400 rounded-md bg-white">
          <input
            className="bg-transparent w-full px-4 outline-none"
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="submit"
            className="bg-white rounded-md m-2 p-1 text-slate-400 text-3xl duration-200 hover:text-[gray] cursor-pointer flex items-center justify-center"
          >
            <FiSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Discussions;
