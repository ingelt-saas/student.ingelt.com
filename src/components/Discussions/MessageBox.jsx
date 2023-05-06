import moment from "moment/moment";
import { useContext } from "react";
import { StudentContext } from "../../contexts";
import Image from "../shared/Image/Image";

const MessageBox = ({ data }) => {

  // context 
  const { student: { id } } = useContext(StudentContext);

  const { message, senderName, senderImage, senderId, createdAt, designation } = data;

  return (
    <div className="w-full px-6 py-8 bg-white rounded-lg m-2 shadow-xl shadow-slate-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex ">
          <Image src={senderImage} alt={senderName} className='h-14 w-14 rounded-full object-cover mr-2' />
          <div className="font-semibold text-md flex flex-col justify-center my-2">
            <h4>{id === senderId ? 'Me' : senderName}</h4>
            <p className="font-semibold text-xs text-zinc-600 capitalize">{designation}</p>
          </div>
        </div>

        <p className="font-semibold text-sm text-zinc-600">{moment(createdAt).format('ll')} <small>{moment(createdAt).format('LT')}</small></p>
      </div>
      <div className="">{message}</div>
    </div>
  );
};

export default MessageBox;