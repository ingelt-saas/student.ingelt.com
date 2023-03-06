import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Close, KeyboardArrowDown } from "@mui/icons-material";

const StatsModal = ({ statsModal, statsModalHandle }) => {
  return (
    <Modal open={statsModal} onClose={() => statsModalHandle(false)}>
      {/* Stats modal start */}
      <Box
        height="100%"
        width="100%"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Box
          width="330px"
          maxWidth="100%"
          height="100%"
          sx={{
            borderRadius: 2,
            overflowY: "auto",
            backgroundColor: "#fff",
            position: "relative",
          }}
        >
          <Button
            sx={{
              color: "#fff",
              position: "absolute",
              top: ".5rem",
              right: "0.1rem",
            }}
            disableRipple={true}
            onClick={() => statsModalHandle(false)}
          >
            <Close fontSize="small" />
          </Button>
          <Box sx={{ py: 2, backgroundColor: "#4C9BFF", color: "#fff" }}>
            <Typography align="center" variant="h5" component="h1">
              Assignment Stats
            </Typography>
          </Box>
          <Box sx={{ px: 2, py: 3 }}>
            <Box
              sx={{
                px: 2,
                borderRadius: 2,
                py: 2,
                boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)",
              }}
              display="flex"
              alignItems="center"
            >
              <svg
                width="45"
                height="45"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="25" cy="25" r="25" fill="#0064E1" />
                <path
                  d="M16.25 36.25C15.5625 36.25 14.9737 36.0054 14.4837 35.5163C13.9946 35.0263 13.75 34.4375 13.75 33.75V16.25C13.75 15.5625 13.9946 14.9738 14.4837 14.4838C14.9737 13.9946 15.5625 13.75 16.25 13.75H21.5C21.7708 13 22.2242 12.3958 22.86 11.9375C23.495 11.4792 24.2083 11.25 25 11.25C25.7917 11.25 26.5054 11.4792 27.1413 11.9375C27.7763 12.3958 28.2292 13 28.5 13.75H33.75C34.4375 13.75 35.0263 13.9946 35.5163 14.4838C36.0054 14.9738 36.25 15.5625 36.25 16.25V33.75C36.25 34.4375 36.0054 35.0263 35.5163 35.5163C35.0263 36.0054 34.4375 36.25 33.75 36.25H16.25ZM16.25 33.75H33.75V16.25H16.25V33.75ZM18.75 31.25H27.5V28.75H18.75V31.25ZM18.75 26.25H31.25V23.75H18.75V26.25ZM18.75 21.25H31.25V18.75H18.75V21.25ZM25 15.3125C25.2708 15.3125 25.495 15.2238 25.6725 15.0463C25.8492 14.8696 25.9375 14.6458 25.9375 14.375C25.9375 14.1042 25.8492 13.88 25.6725 13.7025C25.495 13.5258 25.2708 13.4375 25 13.4375C24.7292 13.4375 24.5054 13.5258 24.3288 13.7025C24.1513 13.88 24.0625 14.1042 24.0625 14.375C24.0625 14.6458 24.1513 14.8696 24.3288 15.0463C24.5054 15.2238 24.7292 15.3125 25 15.3125ZM16.25 33.75V16.25V33.75Z"
                  fill="white"
                />
              </svg>
              <Box flex={1}>
                <Typography
                  align="center"
                  variant="body1"
                  sx={{ fontWeight: 600 }}
                >
                  Total Assignments
                </Typography>
                <Typography
                  align="center"
                  variant="h5"
                  component="p"
                  sx={{ fontWeight: 600 }}
                >
                  20
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                px: 2,
                mt: 3,
                borderRadius: 2,
                py: 2,
                boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.15)",
              }}
              display="flex"
              alignItems="center"
            >
              <svg
                width="45"
                height="45"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="25" cy="25" r="25" fill="#0064E1" />
                <path
                  d="M16.25 36.25C15.5625 36.25 14.9737 36.0054 14.4837 35.5163C13.9946 35.0263 13.75 34.4375 13.75 33.75V16.25C13.75 15.5625 13.9946 14.9738 14.4837 14.4838C14.9737 13.9946 15.5625 13.75 16.25 13.75H21.5C21.7708 13 22.2242 12.3958 22.86 11.9375C23.495 11.4792 24.2083 11.25 25 11.25C25.7917 11.25 26.5054 11.4792 27.1413 11.9375C27.7763 12.3958 28.2292 13 28.5 13.75H33.75C34.4375 13.75 35.0263 13.9946 35.5163 14.4838C36.0054 14.9738 36.25 15.5625 36.25 16.25V33.75C36.25 34.4375 36.0054 35.0263 35.5163 35.5163C35.0263 36.0054 34.4375 36.25 33.75 36.25H16.25ZM16.25 33.75H33.75V16.25H16.25V33.75ZM18.75 31.25H27.5V28.75H18.75V31.25ZM18.75 26.25H31.25V23.75H18.75V26.25ZM18.75 21.25H31.25V18.75H18.75V21.25ZM25 15.3125C25.2708 15.3125 25.495 15.2238 25.6725 15.0463C25.8492 14.8696 25.9375 14.6458 25.9375 14.375C25.9375 14.1042 25.8492 13.88 25.6725 13.7025C25.495 13.5258 25.2708 13.4375 25 13.4375C24.7292 13.4375 24.5054 13.5258 24.3288 13.7025C24.1513 13.88 24.0625 14.1042 24.0625 14.375C24.0625 14.6458 24.1513 14.8696 24.3288 15.0463C24.5054 15.2238 24.7292 15.3125 25 15.3125ZM16.25 33.75V16.25V33.75Z"
                  fill="white"
                />
              </svg>
              <Box flex={1}>
                <Typography
                  align="center"
                  variant="body1"
                  sx={{ fontWeight: 600 }}
                >
                  Complete Assignments
                </Typography>
                <Typography
                  align="center"
                  variant="h5"
                  component="p"
                  sx={{ fontWeight: 600 }}
                >
                  5/20
                </Typography>
              </Box>
            </Box>
            <Box
              borderRadius={2}
              border={1}
              borderColor="#E4E7EC"
              marginTop={2}
              overflow="hidden"
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#0064E11A" }}>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 600, fontSize: "1rem" }}
                    >
                      Assignment
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 600, fontSize: "1rem" }}
                    >
                      Score
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "#787878",
                      }}
                    >
                      Assignment 1
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "#787878",
                      }}
                    >
                      4.5
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "#787878",
                      }}
                    >
                      Assignment 1
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "#787878",
                      }}
                    >
                      4.5
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "#787878",
                      }}
                    >
                      Assignment 1
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "#787878",
                      }}
                    >
                      4.5
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Box py={2} textAlign="center">
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: "1rem",
                    py: ".1rem",
                  }}
                >
                  See more
                  <KeyboardArrowDown fontSize="large" sx={{ ml: 1 }} />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Stats modal end */}
    </Modal>
  );
};

export default StatsModal;
