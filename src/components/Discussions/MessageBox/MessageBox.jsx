const MessageBox = ({ sender_name, sender_img, designation, text, date }) => {
  return (
    <div className="w-full px-2 md:px-6 py-8 bg-white rounded-lg m-2 shadow-xl shadow-slate-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex ">
          <img
            className="h-14 w-14 rounded-full object-cover mr-2"
            src={sender_img}
            alt=""
          />

          <div className="font-semibold text-md flex flex-col justify-center my-2">
            <h4>{sender_name}</h4>
            <p className="font-semibold text-xs text-zinc-600">{designation}</p>
          </div>
        </div>

        <p className="font-semibold text-sm text-zinc-600">{date}</p>
      </div>
      <div className="">{text}</div>
    </div>
  );
};

export default MessageBox;
