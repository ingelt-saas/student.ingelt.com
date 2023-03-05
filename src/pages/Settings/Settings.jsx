// Modules
import { useState } from "react";
import dayjs from "dayjs";

// MUI Support
import {
  styled,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { CameraAlt, Password } from "@mui/icons-material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const StyledButton = styled(Button)(() => ({
  textTransform: "capitalize",
}));

const Settings = () => {
  const [dob, setDob] = useState(dayjs("01/01/1990"));
  const [testDate, setTestDate] = useState(dayjs(Date.getDate));
  const [gender, setGender] = useState("");
  const [ielts, setIelts] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full py-4 h-full">
      <div className="w-3/5 mr-2 flex flex-col items-center mt-4">
        <img
          className="rounded-full object-cover object-center h-64 w-64 mb-4"
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
          alt=""
        />

        <div className="mb-4">
          <StyledButton
            size="large"
            variant="outlined"
            endIcon={<CameraAlt />}
            className="w-52"
          >
            Edit Photo
          </StyledButton>
        </div>

        <div>
          <StyledButton
            variant="outlined"
            sx={{ color: "#707070", borderColor: "#707070" }}
            endIcon={<Password />}
            size="large"
            className="w-52"
            onClick={() => setOpen(true)}
          >
            Change Password
          </StyledButton>
        </div>
      </div>

      <Grid
        className="w-2/5 ml-2 flex items-center justify-center px-4"
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Name"
            typeof="text"
            variant="outlined"
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
            required
          />
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              className="w-full"
              label="Date of Birth"
              value={dob}
              minDate={dayjs("01/01/1920")}
              onChange={(newValue) => {
                setDob(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              required
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Phone Number"
            typeof="tel"
            variant="outlined"
            required
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="Gender"
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <MenuItem value={"M"}>Male</MenuItem>
              <MenuItem value={"F"}>Female</MenuItem>
              <MenuItem value={"O"}>Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">IELTS</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ielts}
              label="IELTS"
              onChange={(e) => setIelts(e.target.value)}
              required
            >
              <MenuItem value={"A"}>Academic</MenuItem>
              <MenuItem value={"G"}>General</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              className="w-full"
              label="Decided Test Date"
              value={testDate}
              minDate={dayjs(Date.getDate)}
              onChange={(newValue) => {
                setTestDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid className="w-full" item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Previous Score"
            typeof="number"
            variant="outlined"
          />
        </Grid>

        <Grid className="w-full" item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Target Score"
            typeof="number"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="City"
            variant="outlined"
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="State"
            variant="outlined"
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Pincode"
            variant="outlined"
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Country"
            variant="outlined"
            required
          />
        </Grid>
      </Grid>

      {/* Dialog Box */}
      <Dialog open={open} onClose={() => setOpen(false)}>
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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
