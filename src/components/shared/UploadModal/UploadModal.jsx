import { Box, Button, Modal, Typography } from "@mui/material";

import { Close } from "@mui/icons-material";

const UploadModal = ({ uploadModal, uploadModalHandle }) => {
  return (
    <Modal open={uploadModal} onClose={() => uploadModalHandle(false)} className='grid place-items-center'>
      {/* Upload modal start */}
      <Box
        className='py-4 px-3 bg-white w-[90vw] sm:w-[600px]'
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Assignment 1</Typography>
          <Button
            onClick={() => uploadModalHandle(false)}
            sx={{ color: "black" }}
            disableRipple={true}
          >
            <Close />
          </Button>
        </Box>
        <Box
          sx={{
            border: 2,
            borderStyle: "dashed",
            py: 2,
            textAlign: "center",
            mt: 3,
          }}
        >
          <svg
            className="w-8 h-8 mx-auto"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.5 4C32.5 6.33141 32.5 18.4547 32.5 48.2967V4ZM32.5 4L48.8198 20.3198M32.5 4L16.1802 20.3198M3 61.2784V56.6156V40.2958V61.2784ZM3 61.2784H61.2852V40.2958"
              stroke="black"
              stroke-width="5"
              stroke-linecap="round"
            />
            <path
              d="M3 47.2911V40.2969"
              stroke="black"
              stroke-width="5"
              stroke-linecap="round"
            />
          </svg>
          <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
            Drag & Drop or Choose file to upload
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
            PDF or DOCS
          </Typography>
        </Box>
        <Box
          sx={{
            border: 2,
            borderStyle: "solid",
            py: 2,
            px: 2,
            textAlign: "center",
            mt: 3,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap="0.5rem">
              <svg
                className="w-9 h-9"
                viewBox="0 0 50 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44.4444 5.55556H32.8333C31.6667 2.33333 28.6111 0 25 0C21.3889 0 18.3333 2.33333 17.1667 5.55556H5.55556C2.5 5.55556 0 8.05556 0 11.1111V50C0 53.0556 2.5 55.5556 5.55556 55.5556H44.4444C47.5 55.5556 50 53.0556 50 50V11.1111C50 8.05556 47.5 5.55556 44.4444 5.55556ZM25 5.55556C26.5278 5.55556 27.7778 6.80556 27.7778 8.33333C27.7778 9.86111 26.5278 11.1111 25 11.1111C23.4722 11.1111 22.2222 9.86111 22.2222 8.33333C22.2222 6.80556 23.4722 5.55556 25 5.55556ZM27.7778 44.4444H13.8889C12.3611 44.4444 11.1111 43.1944 11.1111 41.6667C11.1111 40.1389 12.3611 38.8889 13.8889 38.8889H27.7778C29.3056 38.8889 30.5556 40.1389 30.5556 41.6667C30.5556 43.1944 29.3056 44.4444 27.7778 44.4444ZM36.1111 33.3333H13.8889C12.3611 33.3333 11.1111 32.0833 11.1111 30.5556C11.1111 29.0278 12.3611 27.7778 13.8889 27.7778H36.1111C37.6389 27.7778 38.8889 29.0278 38.8889 30.5556C38.8889 32.0833 37.6389 33.3333 36.1111 33.3333ZM36.1111 22.2222H13.8889C12.3611 22.2222 11.1111 20.9722 11.1111 19.4444C11.1111 17.9167 12.3611 16.6667 13.8889 16.6667H36.1111C37.6389 16.6667 38.8889 17.9167 38.8889 19.4444C38.8889 20.9722 37.6389 22.2222 36.1111 22.2222Z"
                  fill="black"
                />
              </svg>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Harshita_01_2023.pdf
                </Typography>
                <Typography
                  align="left"
                  variant="body2"
                  sx={{ fontWeight: 500, color: "#7D8288" }}
                >
                  445KB . 15 seconds left
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="space-between"
            >
              <Close fontSize="small" />
              <Typography variant="body2">50%</Typography>
            </Box>
          </Box>
          <Box
            height="6px"
            width="100%"
            backgroundColor="#CCCCCC"
            sx={{ mt: 2, borderRadius: 7 }}
          >
            <Box
              height="100%"
              width="50%"
              backgroundColor="#3F66BF"
              sx={{ borderRadius: 7 }}
            ></Box>
          </Box>
        </Box>
        {/* <Box sx={{ border: 2, borderStyle: 'solid', py: 2, textAlign: 'center', mt: 3 }}>
        <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>You haven’t uploaded any file yet.</Typography>
        <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>Submit the assignment on time</Typography>
      </Box> */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={{ textTransform: "capitalize", fontWeight: "600", mr: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={{ textTransform: "capitalize", fontWeight: "600" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      {/* Upload modal end */}
    </Modal>
  );
};

export default UploadModal;
