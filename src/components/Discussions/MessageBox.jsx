import moment from "moment/moment";
import { useContext } from "react";
import { StudentContext } from "../../contexts";
import Image from "../shared/Image/Image";

const MessageBox = ({ data }) => {
  // context
  const { student: { id } } = useContext(StudentContext);

  const { message, senderName, senderImage, senderId, createdAt, designation,senderCountry } = data;

  // Check if the message is from the student
  const isStudentMessage = senderId === id;

  return (
    <div className={`w-full mt-4 md:first:mt-32 last:mb-28 overflow-y-auto`}>
      <div className={`chat-message`}>
        {isStudentMessage ? (
         <div className="flex items-end justify-end">
         <div className="flex flex-col space-y-2 text-lg max-w-xl mx-2 order-1 items-end">
         <div className="flex">
                                    <div className="rounded-lg  rounded-br-none py-2 px-3" style={{backgroundColor: "#4D93EA"}}>
                                      <div className="flex items-end justify-center">
                                        <p className="text-lg text-white">
                                            {message}
                                        </p>
                                        <p className=" text-right text-xs text-white pl-3 min-w-max">
                                            {moment(createdAt).format('LT')}
                                        </p>
                                        </div>
                                    </div>
                                </div>
         </div>
      </div>
        )
      :
      (
        <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-lg max-w-xl mx-2 order-2 items-center justify-center">
            <div className="flex">
                                    <div className="rounded-lg rounded-bl-none py-2 px-3" style={{backgroundColor: "#F2F2F2"}}>
                                      <div className="flex items-center justify-between">
                                        <p className="text-sm text-[#1B3B7D]">
                                            {senderName}
                                        </p>
                                        <p className="text-sm text-[#1B3B7D] ml-3">
                                            {senderCountry}
                                        </p>
                                        </div>
                                        <div className="flex items-end justify-between">
                                        <p className="text-lg text-left">
                                            {message}
                                        </p>
                                        <div className="min-w-max text-right text-xs pl-3">
                                        {moment(createdAt).format('LT')}
                                        </div>
                                        </div>
                                    </div>
                                </div>
            </div>
            <Image src={senderImage} alt="My profile" className="w-10 h-10 rounded-full order-1 object-cover"/>
         </div>
      )
      }
    </div>
    </div>
  );
};

export default MessageBox;
