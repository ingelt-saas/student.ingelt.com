// Modules
import { useState } from "react";
import dayjs from "dayjs";

// Components
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import PasswordIcon from "@mui/icons-material/Password";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/*
Student Settings Will Include:
TODO: Required Fields

!TODO: 3. password
*/

const StyledButton = styled(Button)(() => ({
  textTransform: "capitalize",
}));

const Settings = () => {
  const [dob, setDob] = useState(dayjs("01/01/1990"));
  const [testDate, setTestDate] = useState(dayjs(Date.getDate));
  const [gender, setGender] = useState("");
  const [ielts, setIelts] = useState("");
  const [open, setOpen] = useState(false);

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
          variant="outlined"
          endIcon={<CameraAltIcon />}
        >
          Edit Photo
        </StyledButton>
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

        <Grid item xs={6}>
          <StyledButton
            className="w-full h-full"
            variant="outlined"
            color="secondary"
            endIcon={<PasswordIcon />}
            size="large"
            onClick={handleClickOpen}
          >
            Change Password
          </StyledButton>
        </Grid>
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
