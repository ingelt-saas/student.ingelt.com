// Modules
import { useState } from "react";

// Components
import { styled } from "@mui/material/styles";

// Date Picker
// Icons
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PasswordIcon from "@mui/icons-material/Password";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const StyledButton = styled(Button)(() => ({ textTransform: "capitalize" }));
const InputFieldSx = {
  borderRadius: "20px",
  height: "40px",
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
  },
};

const Settings = () => {
  const [gender, setGender] = useState("");
  const [open, setOpen] = useState(false);
  const [expertise, setExpertise] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex w-full py-4 h-full">
      <div className="w-3/5 mr-2 flex flex-col items-center mt-4">
        <img
          className="rounded-full object-cover object-center h-64 w-64 mb-4"
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
          alt=""
        />

        <StyledButton
          size="large"
          variant="contained"
          endIcon={<CameraAltIcon />}
        >
          Edit Photo
        </StyledButton>
      </div>

      <Grid
        className="w-2/5 ml-2 flex items-center justify-center px-4"
        container
        rowSpacing={1}
        columnSpacing={{
          xs: 1,
          sm: 2,
          md: 3,
        }}
      >
        <Grid item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Name"
            typeof="text"
            variant="outlined"
            size="small"
            sx={InputFieldSx}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Email"
            typeof="email"
            variant="outlined"
            size="small"
            sx={InputFieldSx}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <label className="text-xs text-[#93999C]" htmlFor="DOB">
            Date Of Birth*
          </label>
          <TextField
            id="DOB"
            type="date"
            variant="outlined"
            size="small"
            InputProps={{
              style: { color: "gray" },
              placeholder: "Select date",
            }}
            sx={InputFieldSx}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <label className="text-xs text-[#93999C]" htmlFor="ExpDate">
            Expected Test Date
          </label>
          <TextField
            id="ExpDate"
            type="date"
            variant="outlined"
            size="small"
            InputProps={{
              style: { color: "gray" },
              placeholder: "Select date",
            }}
            sx={InputFieldSx}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Phone Number"
            typeof="tel"
            variant="outlined"
            size="small"
            sx={InputFieldSx}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl variant="outlined" size="small" sx={InputFieldSx}>
            <InputLabel id="demo-simple-select-label">Gender*</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
              required
            >
              <MenuItem value={"M"}>Male</MenuItem>
              <MenuItem value={"F"}>Female</MenuItem>
              <MenuItem value={"O"}>Other</MenuItem>
              <MenuItem value={"R"}>Rather Not Say</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid className="w-full" item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="University / School Name"
            typeof="number"
            variant="outlined"
            size="small"
            sx={InputFieldSx}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "black" },
            }}
          >
            <InputLabel id="demo-simple-select-label">IELTS *</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              label="IELTS"
              required
            >
              <MenuItem value={"Academic"}>Academic</MenuItem>
              <MenuItem value={"General"}>General</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "black" },
            }}
          >
            <InputLabel id="demo-simple-select-label">Status *</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              label="Status"
              required
            >
              <MenuItem value={"Student"}>Student</MenuItem>
              <MenuItem value={"Working Professional"}>
                Working Professional
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="City"
            variant="outlined"
            size="small"
            sx={InputFieldSx}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="State"
            variant="outlined"
            size="small"
            sx={InputFieldSx}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Pincode"
            variant="outlined"
            size="small"
            sx={InputFieldSx}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Country"
            variant="outlined"
            size="small"
            sx={InputFieldSx}
            required
          />
        </Grid>

        <Grid className="w-full" item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Registration Date"
            typeof="date"
            variant="outlined"
            size="small"
            sx={InputFieldSx}
            disabled
          />
        </Grid>

        <Grid className="w-full" item xs={6}>
          <label className="text-xs text-[#93999C]" htmlFor="outlined-basic">
            Previous Score
          </label>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Previous Score"
            typeof="number"
            variant="outlined"
            size="small"
            sx={InputFieldSx}
          />
        </Grid>

        <Grid className="w-full" item xs={6}>
          <label className="text-xs text-[#93999C]" htmlFor="outlined-basic">
            Target Score
          </label>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Previous Score"
            typeof="number"
            variant="outlined"
            size="small"
            sx={InputFieldSx}
          />
        </Grid>

        <Grid className="w-full" item xs={6}>
          <label className="text-xs text-[#93999C]" htmlFor="outlined-basic">
            Student ID
          </label>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Student ID"
            typeof="number"
            variant="outlined"
            size="small"
            sx={InputFieldSx}
            disabled
          />
        </Grid>

        <Grid item xs={6}>
          <label className="text-xs text-[#93999C]" htmlFor="outlined-basic">
            Change Password
          </label>
          <StyledButton
            className="w-full h-full"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
            }}
            color="secondary"
            endIcon={<PasswordIcon />}
            onClick={handleClickOpen}
          >
            Change Password
          </StyledButton>
        </Grid>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Button sx={{ px: 5 }} variant="outlined">
            Save
          </Button>
        </Box>
      </Grid>

      {/* Dialog Box */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change User Credentials</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Try to create a strong password with a combination of numbers,
            alphabets and special characters.
          </DialogContentText>
          <TextField
            className="my-4"
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />

          <TextField
            className="my-4"
            autoFocus
            margin="dense"
            id="name"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
          />

          <TextField
            className="my-4"
            autoFocus
            margin="dense"
            id="name"
            label="Previous Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
