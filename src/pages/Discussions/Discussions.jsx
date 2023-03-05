// Components
import MessageBox from "../../components/Discussions/MessageBox/MessageBox";
import { FiSend } from "react-icons/fi";

// Data
import data from "../../data/message_box";

const Discussions = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <h1 className="border-b-1 border-zinc-400 w-full text-4xl font-semibold py-4 mb-10">
        Discussions
      </h1>

      <div className="flex flex-col items-center justify-center w-full h-[55vh] overflow-y-scroll no-scrollbar pt-80">
        {data.map((item, index) => (
          <MessageBox
            key={index}
            sender_name={item.sender_name}
            sender_img={item.sender_img}
            designation={item.designation}
            text={item.text}
            date={item.date}
          />
        ))}
      </div>

      <form className="w-full my-4">
        <p className="my-2 font-medium text-md">Send a Message</p>
        <div className="flex justify-center items-center w-full border border-slate-400 rounded-md bg-white">
          <input
            className="bg-transparent w-full px-4 outline-none"
            type="text"
            placeholder="Enter your message"
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
