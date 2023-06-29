import { Box, Typography } from '@mui/material'
import React from 'react'

const Header = ({title,subTitle,Img,scale}) => {
  return (
     <Box sx={
        {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { md: "65%", xs: "100%" },
            height: "20vh",
            padding: "2rem",
            backgroundColor: "white",
            border: "1px solid white",
            borderRadius: "2rem",
            boxShadow: "0px 10px 36px rgba(0, 0, 0, 0.16), 0px 0px 0px 1px rgba(0, 0, 0, 0.06);"
        }
    }>
        <Box sx={
            {
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                width: { md: "50%", xs: "90%" }
            }
        }>
            <Typography sx={
                {
                    fontWeight: "bold",
                    fontSize: "1.5rem"
                }
            }>{title}</Typography>
            <Typography sx={
                {
                    color: "rgba(0, 0, 0, 0.6);",
                }

            }>{subTitle}</Typography>
        </Box>
        <Box sx={
            { width: { md: "60%", xs: "100%" } }
        }>
            <img src={Img}
                alt="library"
                className={`relative md:bottom-5 ml-auto ${scale ? scale : 'scale-125'} `} />
        </Box>

    </Box>
  )
}

export default Header