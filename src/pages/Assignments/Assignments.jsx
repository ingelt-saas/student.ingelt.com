import React, { useState } from "react";
import { Box, Button, Input, Modal, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { Search, Sort, FileUpload, FileDownload, Close, KeyboardArrowDown } from '@mui/icons-material'

const Assignments = () => {

  const [uploadModal, setUploadModal] = useState(false);
  const [statsModal, setStatsModal] = useState(false);

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return <Box sx={{ width: '100%' }}>
    <Typography variant="h4" component='h1' sx={{ paddingBottom: '.8rem', borderBottomWidth: 2, borderBottomColor: '#DCDEE1' }}>Assignments</Typography>
    <Box sx={{ width: '100%', px: 2, py: 4 }}>
      <Box display='flex' justifyContent='space-between' >
        <Box sx={{ borderRadius: 5, boxShadow: 2, px: 2, py: 0.5 }}>
          <Search sx={{ fontSize: '1.2rem', mr: 1 }} />
          <Input sx={{ fontSize: '.9rem', border: 'none', py: 0 }} disableUnderline={true} placeholder="Search for" />
        </Box>
        <Button variant="contained" sx={{ fontWeight: 600, textTransform: 'capitalize', borderRadius: 2 }} onClick={() => setStatsModal(true)}>Show Stats</Button>
        <Button variant="text" sx={{ fontWeight: 600, textTransform: 'capitalize', borderRadius: 2, color: '#00000085', backgroundColor: '#F4F4F4' }} >
          Sort
          <Sort sx={{ ml: 0.4 }} />
        </Button>
      </Box>
    </Box>
    <Box sx={{ width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>File Name</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>Status</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>Assigned Date</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>Deadline</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>Marks</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}></TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => <TableRow key={item}>
            <TableCell align="center" sx={{ borderBottomWidth: '0', py: 1, fontWeight: 600 }}>Assignment 1.pdf</TableCell>
            <TableCell align="center" sx={{ borderBottomWidth: '0', py: 1, fontWeight: 500, color: '#6D6D6D' }}>Not Complete</TableCell>
            <TableCell align="center" sx={{ borderBottomWidth: '0', py: 1, fontWeight: 500, color: '#6D6D6D' }}>1-02-2023</TableCell>
            <TableCell align="center" sx={{ borderBottomWidth: '0', py: 1, fontWeight: 500, color: '#6D6D6D' }}>1-02-2023</TableCell>
            <TableCell align="center" sx={{ borderBottomWidth: '0', py: 1, fontWeight: 500, color: '#6D6D6D' }}>7.2</TableCell>
            <TableCell align="center" sx={{ borderBottomWidth: '0', py: 1, }}>
              <Button onClick={() => setUploadModal(true)} variant="outlined" color="secondary" size="small" sx={{ textTransform: 'capitalize', }}>
                Upload
                <FileUpload />
              </Button>
            </TableCell>
            <TableCell align="center" sx={{ borderBottomWidth: '0', py: 1, }}>
              <Button variant="outlined" color="primary" size="small" sx={{ textTransform: 'capitalize' }}>
                Download
                <FileDownload />
              </Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={15}
        rowsPerPage={5}
        page={1}
      />
    </Box>
    {/* Upload modal start */}
    <Modal
      open={uploadModal}
      onClose={() => setUploadModal(false)}
    >
      <Box sx={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center' }}>
        <Box sx={{ py: 4, px: 3, backgroundColor: '#fff', maxWidth: '100%', width: '600px' }}>
          <Box display='flex' justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Assignment 1</Typography>
            <Button onClick={() => setUploadModal(false)} sx={{ color: 'black' }} disableRipple={true}>
              <Close />
            </Button>
          </Box>
          <Box sx={{ border: 2, borderStyle: 'dashed', py: 2, textAlign: 'center', mt: 3 }}>
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.5 4C32.5 6.33141 32.5 18.4547 32.5 48.2967V4ZM32.5 4L48.8198 20.3198M32.5 4L16.1802 20.3198M3 61.2784V56.6156V40.2958V61.2784ZM3 61.2784H61.2852V40.2958" stroke="black" stroke-width="5" stroke-linecap="round" />
              <path d="M3 47.2911V40.2969" stroke="black" stroke-width="5" stroke-linecap="round" />
            </svg>
            <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>Drag & Drop or Choose file to upload</Typography>
            <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>PDF or DOCS</Typography>
          </Box>
          <Box sx={{ border: 2, borderStyle: 'solid', py: 2, px: 2, textAlign: 'center', mt: 3 }}>
            <Box display='flex' justifyContent="space-between" alignItems='center'>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <svg className="w-9 h-9" viewBox="0 0 50 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44.4444 5.55556H32.8333C31.6667 2.33333 28.6111 0 25 0C21.3889 0 18.3333 2.33333 17.1667 5.55556H5.55556C2.5 5.55556 0 8.05556 0 11.1111V50C0 53.0556 2.5 55.5556 5.55556 55.5556H44.4444C47.5 55.5556 50 53.0556 50 50V11.1111C50 8.05556 47.5 5.55556 44.4444 5.55556ZM25 5.55556C26.5278 5.55556 27.7778 6.80556 27.7778 8.33333C27.7778 9.86111 26.5278 11.1111 25 11.1111C23.4722 11.1111 22.2222 9.86111 22.2222 8.33333C22.2222 6.80556 23.4722 5.55556 25 5.55556ZM27.7778 44.4444H13.8889C12.3611 44.4444 11.1111 43.1944 11.1111 41.6667C11.1111 40.1389 12.3611 38.8889 13.8889 38.8889H27.7778C29.3056 38.8889 30.5556 40.1389 30.5556 41.6667C30.5556 43.1944 29.3056 44.4444 27.7778 44.4444ZM36.1111 33.3333H13.8889C12.3611 33.3333 11.1111 32.0833 11.1111 30.5556C11.1111 29.0278 12.3611 27.7778 13.8889 27.7778H36.1111C37.6389 27.7778 38.8889 29.0278 38.8889 30.5556C38.8889 32.0833 37.6389 33.3333 36.1111 33.3333ZM36.1111 22.2222H13.8889C12.3611 22.2222 11.1111 20.9722 11.1111 19.4444C11.1111 17.9167 12.3611 16.6667 13.8889 16.6667H36.1111C37.6389 16.6667 38.8889 17.9167 38.8889 19.4444C38.8889 20.9722 37.6389 22.2222 36.1111 22.2222Z" fill="black" />
                </svg>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>Harshita_01_2023.pdf</Typography>
                  <Typography align="left" variant="body2" sx={{ fontWeight: 500, color: '#7D8288' }}>445KB . 15 seconds left</Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" height="100%" justifyContent="space-between">
                <Close fontSize="small" />
                <Typography variant="body2">50%</Typography>
              </Box>
            </Box>
            <Box height="6px" width="100%" backgroundColor="#CCCCCC" sx={{ mt: 2, borderRadius: 7 }}>
              <Box height="100%" width="50%" backgroundColor="#3F66BF" sx={{ borderRadius: 7 }}></Box>
            </Box>
          </Box>
          {/* <Box sx={{ border: 2, borderStyle: 'solid', py: 2, textAlign: 'center', mt: 3 }}>
            <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>You haven’t uploaded any file yet.</Typography>
            <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>Submit the assignment on time</Typography>
          </Box> */}
          <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button variant="outlined" color="secondary" size="small" sx={{ textTransform: 'capitalize', fontWeight: '600', mr: 2 }}>
              Cancel
            </Button>
            <Button variant="outlined" color="primary" size="small" sx={{ textTransform: 'capitalize', fontWeight: '600' }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
    {/* Upload modal end */}
    {/* Stats modal start */}
    <Modal
      open={statsModal}
      onClose={() => setStatsModal(false)}
    >
      <Box height="100%" width="100%" display="flex" justifyContent="flex-end" alignItems="center">
        <Box width="330px" maxWidth="100%" height="100%" sx={{ borderRadius: 2, overflowY: 'auto', backgroundColor: '#fff', position: 'relative' }}>
          <Button sx={{ color: '#fff', position: 'absolute', top: '.5rem', right: '0.1rem' }} disableRipple={true} onClick={()=> setStatsModal(false)}>
            <Close fontSize="small" />
          </Button>
          <Box sx={{ py: 2, backgroundColor: '#4C9BFF', color: '#fff' }}>
            <Typography align="center" variant="h5" component="h1">Assignment Stats</Typography>
          </Box>
          <Box sx={{ px: 2, py: 3 }}>
            <Box sx={{ px: 2, borderRadius: 2, py: 2, boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.15)' }} display="flex" alignItems="center">
              <svg width="45" height="45" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="25" fill="#0064E1" />
                <path d="M16.25 36.25C15.5625 36.25 14.9737 36.0054 14.4837 35.5163C13.9946 35.0263 13.75 34.4375 13.75 33.75V16.25C13.75 15.5625 13.9946 14.9738 14.4837 14.4838C14.9737 13.9946 15.5625 13.75 16.25 13.75H21.5C21.7708 13 22.2242 12.3958 22.86 11.9375C23.495 11.4792 24.2083 11.25 25 11.25C25.7917 11.25 26.5054 11.4792 27.1413 11.9375C27.7763 12.3958 28.2292 13 28.5 13.75H33.75C34.4375 13.75 35.0263 13.9946 35.5163 14.4838C36.0054 14.9738 36.25 15.5625 36.25 16.25V33.75C36.25 34.4375 36.0054 35.0263 35.5163 35.5163C35.0263 36.0054 34.4375 36.25 33.75 36.25H16.25ZM16.25 33.75H33.75V16.25H16.25V33.75ZM18.75 31.25H27.5V28.75H18.75V31.25ZM18.75 26.25H31.25V23.75H18.75V26.25ZM18.75 21.25H31.25V18.75H18.75V21.25ZM25 15.3125C25.2708 15.3125 25.495 15.2238 25.6725 15.0463C25.8492 14.8696 25.9375 14.6458 25.9375 14.375C25.9375 14.1042 25.8492 13.88 25.6725 13.7025C25.495 13.5258 25.2708 13.4375 25 13.4375C24.7292 13.4375 24.5054 13.5258 24.3288 13.7025C24.1513 13.88 24.0625 14.1042 24.0625 14.375C24.0625 14.6458 24.1513 14.8696 24.3288 15.0463C24.5054 15.2238 24.7292 15.3125 25 15.3125ZM16.25 33.75V16.25V33.75Z" fill="white" />
              </svg>
              <Box flex={1}>
                <Typography align="center" variant="body1" sx={{ fontWeight: 600 }}>Total Assignments</Typography>
                <Typography align="center" variant="h5" component="p" sx={{ fontWeight: 600 }}>20</Typography>
              </Box>
            </Box>
            <Box sx={{ px: 2, mt: 3, borderRadius: 2, py: 2, boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.15)' }} display="flex" alignItems="center">
              <svg width="45" height="45" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="25" fill="#0064E1" />
                <path d="M16.25 36.25C15.5625 36.25 14.9737 36.0054 14.4837 35.5163C13.9946 35.0263 13.75 34.4375 13.75 33.75V16.25C13.75 15.5625 13.9946 14.9738 14.4837 14.4838C14.9737 13.9946 15.5625 13.75 16.25 13.75H21.5C21.7708 13 22.2242 12.3958 22.86 11.9375C23.495 11.4792 24.2083 11.25 25 11.25C25.7917 11.25 26.5054 11.4792 27.1413 11.9375C27.7763 12.3958 28.2292 13 28.5 13.75H33.75C34.4375 13.75 35.0263 13.9946 35.5163 14.4838C36.0054 14.9738 36.25 15.5625 36.25 16.25V33.75C36.25 34.4375 36.0054 35.0263 35.5163 35.5163C35.0263 36.0054 34.4375 36.25 33.75 36.25H16.25ZM16.25 33.75H33.75V16.25H16.25V33.75ZM18.75 31.25H27.5V28.75H18.75V31.25ZM18.75 26.25H31.25V23.75H18.75V26.25ZM18.75 21.25H31.25V18.75H18.75V21.25ZM25 15.3125C25.2708 15.3125 25.495 15.2238 25.6725 15.0463C25.8492 14.8696 25.9375 14.6458 25.9375 14.375C25.9375 14.1042 25.8492 13.88 25.6725 13.7025C25.495 13.5258 25.2708 13.4375 25 13.4375C24.7292 13.4375 24.5054 13.5258 24.3288 13.7025C24.1513 13.88 24.0625 14.1042 24.0625 14.375C24.0625 14.6458 24.1513 14.8696 24.3288 15.0463C24.5054 15.2238 24.7292 15.3125 25 15.3125ZM16.25 33.75V16.25V33.75Z" fill="white" />
              </svg>
              <Box flex={1}>
                <Typography align="center" variant="body1" sx={{ fontWeight: 600 }}>Complete Assignments</Typography>
                <Typography align="center" variant="h5" component="p" sx={{ fontWeight: 600 }}>
                  5/20
                </Typography>
              </Box>
            </Box>
            <Box borderRadius={2} border={1} borderColor="#E4E7EC" marginTop={2} overflow='hidden'>
              <Table>
                <TableHead sx={{ backgroundColor: '#0064E11A' }}>
                  <TableRow>
                    <TableCell align='center' sx={{ fontWeight: 600, fontSize: '1rem' }}>Assignment</TableCell>
                    <TableCell align='center' sx={{ fontWeight: 600, fontSize: '1rem' }}>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align='center' sx={{ fontWeight: 600, fontSize: '1rem', color: '#787878' }}>Assignment 1</TableCell>
                    <TableCell align='center' sx={{ fontWeight: 600, fontSize: '1rem', color: '#787878' }}>4.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center' sx={{ fontWeight: 600, fontSize: '1rem', color: '#787878' }}>Assignment 1</TableCell>
                    <TableCell align='center' sx={{ fontWeight: 600, fontSize: '1rem', color: '#787878' }}>4.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center' sx={{ fontWeight: 600, fontSize: '1rem', color: '#787878' }}>Assignment 1</TableCell>
                    <TableCell align='center' sx={{ fontWeight: 600, fontSize: '1rem', color: '#787878' }}>4.5</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Box py={2} textAlign="center">
                <Button variant="outlined" sx={{ textTransform: 'capitalize', borderRadius: 2, fontWeight: 600, fontSize: '1rem', py: '.1rem' }}>
                  See more
                  <KeyboardArrowDown fontSize="large" sx={{ ml: 1 }} />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal >
    {/* Stats modal end */}
  </Box >
};

export default Assignments;
