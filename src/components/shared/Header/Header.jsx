import React from 'react'

const Header = ({ title, subTitle, Img }) => {
    return (
        <div className="rounded-[1.2rem] flex justify-between relative items-center max-md:w-full md:w-[65%] bg-white shadow-xl aspect-[16/4]">
            <div className="px-7 flex flex-col max-md:items-center max-md:text-center gap-y-1 max-md:py-7 max-sm:px-5 max-md:w-full">
                <h1 className="text-2xl font-bold text-[#0C3C82]">{title}</h1>
                <p className="font-normal text-black opacity-75">{subTitle}</p>
            </div>
            <div className="overflow-hidden pr-3 max-w-[30%] max-md:hidden">
                <img
                    draggable={false}
                    src={Img}
                    alt="library"
                    className={`max-h-full max-w-full mix-blend-darken`}
                />
            </div>
        </div>
    )
}

export default Header