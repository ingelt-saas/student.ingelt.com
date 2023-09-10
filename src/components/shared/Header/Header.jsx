import { Box, Typography } from '@mui/material'
import React from 'react'

const Header = ({ title, subTitle, Img, scale, width='65%' }) => {
    return (
        <div className={`rounded-[1.2rem] flex justify-between relative items-center max-md:w-full md:w-[${width}] bg-white shadow-xl h-full`}>
            <div className="px-7 flex flex-col max-md:items-center max-md:text-center gap-y-1 max-md:py-7 max-sm:px-5 max-md:w-full">
                <h1 className="text-2xl font-bold text-[#0C3C82]">{title}</h1>
                <p className="font-normal text-black opacity-75">{subTitle}</p>
            </div>
            <div className="overflow-hidden pr-3 max-w-[30%] max-md:hidden">
                <img
                    draggable={false}
                    src={Img}
                    alt="library"
                    className={`max-h-28 max-w-fit mix-blend-darken`}
                />
            </div>
        </div>
        // <Box sx={
        //     {
        //         display: "flex",
        //         justifyContent: "center",
        //         alignItems: "center",
        //         width: { md: "65%", xs: "100%" },
        //         height: "20vh",
        //         padding: "2rem",
        //         backgroundColor: "white",
        //         border: "1px solid white",
        //         borderRadius: "2rem",
        //         boxShadow: "0px 10px 36px rgba(0, 0, 0, 0.16), 0px 0px 0px 1px rgba(0, 0, 0, 0.06);"
        //     }
        // }>
        //     <Box sx={
        //         {
        //             display: "flex",
        //             justifyContent: "center",
        //             alignItems: "flex-start",
        //             flexDirection: "column",
        //             // padding: '2rem 1rem 2rem 1rem',
        //             width: { md: "50%", xs: "90%" }
        //         }
        //     }>
        //         <Typography sx={
        //             {
        //                 fontWeight: "bold",
        //                 fontSize: "1.5rem"
        //             }
        //         }>{title}</Typography>
        //         <Typography sx={
        //             {
        //                 color: "rgba(0, 0, 0, 0.6);",
        //             }

        //         }>{subTitle}</Typography>
        //     </Box>
        //     <Box
        //         sx={{
        //             width: { md: "60%", xs: "100%" },
        //             display: { xs: 'none', md: 'block' }
        //             // padding: '0.3rem'
        //         }}
        //     >
        //         <img
        //             src={Img}
        //             alt="library"
        //             className={`relative md:bottom-5 ml-auto ${scale ? scale : 'scale-100'}`}
        //         />
        //     </Box>

        // </Box>
    )
}

export default Header