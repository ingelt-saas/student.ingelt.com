import { CalendarMonth, WatchLater } from "@mui/icons-material";
import React, { useContext } from "react";
import homeApi from "../../api/home";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StudentContext } from "../../contexts";

const UpcomingEvent = () => {

  const { student } = useContext(StudentContext);
  const studentId = student?.id;

  // fetch event
  const {
    data: upcomingEvent,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["event"],
    queryFn: async () => {
      const res = await homeApi.getUpcomingEvent();
      return res.data;
    },
  });

  const isBooked = upcomingEvent
    ? upcomingEvent?.eventBookings?.find((i) => i.studentId === studentId)
    : null;

  // handle booking
  const handleBook = async (e) => {
    e.target.disabled = true;
    try {
      await homeApi.bookEvent({ eventId: upcomingEvent?.id });
      refetch();
      e.target.innerText = "Booked";
    } catch (err) {
      console.error(err);
      e.target.disabled = false;
    }
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <div className="flex-1 flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold text-[#1B3B7D]">Upcoming Event</h1>
        {upcomingEvent ? (
          <>
            <h1 className="text-xl font-medium text-[#1B3B7D]">
              {upcomingEvent?.name}
            </h1>
            <p className="text-[#00000099] font-medium">
              {upcomingEvent?.eventBookings.length > 0
                // ? `${upcomingEvent?.eventBookings.length}+ Already Booked`
                ? `100+ Already Booked`
                : "100+ Booked"}
            </p>
            <div className="flex w-full items-center">
              <span className="w-1/2 text-[#1B3B7D] text-base flex items-center gap-x-1">
                <CalendarMonth fontSize="small" />
                {upcomingEvent?.eventDate
                  ? moment(upcomingEvent?.eventDate).format("DD.MM.YYYY")
                  : ""}
              </span>
              <span className="w-1/2 text-[#1B3B7D] text-base flex items-center gap-x-1">
                <WatchLater fontSize="small" />
                {upcomingEvent?.duration}
              </span>
            </div>
          </>
        ) : (
          // <p className="w-full text-center flex-1 grid place-items-center font-semibold text-lg py-2 text-[#00000099]">
          //   No Upcoming Event
          // </p>

          <>
            <h1 className="text-xl font-medium text-[#1B3B7D]">
              Seminar on study and work opportunity abroad
            </h1>
            <p className="text-[#00000099] font-medium">
              100+ Already Booked
            </p>
            <div className="flex w-full items-center">
              <span className="w-1/2 text-[#1B3B7D] text-base flex items-center gap-x-1">
                <CalendarMonth fontSize="small" />
                25.10.2023
              </span>
              <span className="w-1/2 text-[#1B3B7D] text-base flex items-center gap-x-1">
                <WatchLater fontSize="small" />
                1hr:30min
              </span>
            </div>
          </>
        )}
      </div>

      {isBooked ? (
        <button
          onClick={handleBook}
          disabled={Boolean(isBooked) ? true : !Boolean(upcomingEvent)}
          className="w-full rounded-xl shadow-lg disabled:shadow-none disabled:opacity-100 border-2 text-[#2e7d32] border-[#2e7d32] py-2 font-semibold"
        >
          <div className="flex justify-center items-center">
            <CheckCircleIcon fontSize="small" />
            <span className="ml-1">Booked</span>
          </div>
        </button>
      ) : (
        <button
          onClick={handleBook}
          disabled={Boolean(isBooked) ? true : !Boolean(upcomingEvent)}
          className="w-full rounded-xl shadow-lg disabled:shadow-none  bg-[#1B3B7D] text-white py-2 font-semibold"
        >
          Book for Free
        </button>
      )}
    </>
  );
};

export default UpcomingEvent;
