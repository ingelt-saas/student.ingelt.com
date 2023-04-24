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
import settingsApi from "../../api/settings";


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
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // profile details handler
  const updateProfile = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fromElement = Array.from(form);
    const types = ['text', 'email', 'date'];
    const fromData = {};
    fromElement.forEach(element => {
      if (types.includes(element.type) && element.name) {
        fromData[element.name] = element.value;
      }
    });
    setLoading(true);
    try {
      const result = await settingsApi.update(fromData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // profile picture update
  const profilePictureHandler = async (e) => {
    const file = e.target.files[0];
    const Form = new FormData();
    Form.append('image', file);

    try {
      const result = await settingsApi.updateProfile(Form);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }

  // password change
  const passwordHandler = async (e) => {
    e.preventDefault();
    const form = e.target,
      password = form.password.value,
      confirmPassword = form.confirmPassword.value,
      previousPassword = form.previousPassword.value;
    setPasswordError(null);
    if (password !== confirmPassword) {
      setPasswordError('Password does not match');
      return;
    }
    try {
      const result = await settingsApi.updatePassword({ password, confirmPassword, previousPassword });
      if (result?.data?.status === 'bad') {
        setPasswordError(result?.data?.message);
      } else {
        form.reset();
        handleClose();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full gap-y-5 py-4 h-full">
      <div className=" md:w-2/5 mr-2 flex flex-col items-center mt-4">
        <img
          className="rounded-full object-cover object-center h-52 w-52 md:h-64 md:w-64 mb-4"
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
          alt=""
        />
        <div>
          <input type='file' id='file' className="sr-only" onChange={profilePictureHandler} />
          <label className="flex items-center gap-x-2 px-5 py-2 shadow-md cursor-pointer text-white bg-[#1976d2] font-medium rounded-md" htmlFor="file">
            Edit Photo
            <CameraAltIcon />
          </label>
        </div>
      </div>

      <form onSubmit={updateProfile} className='md:w-3/5'>
        <Grid
          className="ml-2 flex items-center justify-center md:px-4 pb-10"
          container
          rowSpacing={1}
          columnSpacing={{
            xs: 1,
            sm: 2,
            md: 3,
          }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Name"
              typeof="text"
              variant="outlined"
              size="small"
              sx={InputFieldSx}
              required
              name="name"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Email"
              typeof="email"
              variant="outlined"
              size="small"
              sx={InputFieldSx}
              required
              name='email'
            />
          </Grid>

          <Grid item xs={12} sm={6}>
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
              name='dob'
            />
          </Grid>

          {/* <Grid item xs={12} sm={6}>
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
              name='testDate'
            />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Phone Number"
              typeof="tel"
              variant="outlined"
              size="small"
              sx={InputFieldSx}
              required
              name='phoneNo'
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Father Name"
              typeof="text"
              variant="outlined"
              size="small"
              sx={InputFieldSx}
              required
              name='fathersName'
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" size="small" sx={InputFieldSx}>
              <InputLabel id="demo-simple-select-label">Gender*</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
                required
                name="gender"
              >
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
                <MenuItem value={"O"}>Other</MenuItem>
                <MenuItem value={"R"}>Rather Not Say</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid className="w-full" item xs={12} sm={6}>
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
          </Grid> */}

          {/* <Grid item xs={12} sm={6}>
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
                name='ielts'
              >
                <MenuItem value={"Academic"}>Academic</MenuItem>
                <MenuItem value={"General"}>General</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}

          {/* <Grid item xs={12} sm={6}>
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
                readOnly
              >
                <MenuItem value={"Student"}>Student</MenuItem>
                <MenuItem value={"Working Professional"}>
                  Working Professional
                </MenuItem>
              </Select>
            </FormControl>
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Status"
              variant="outlined"
              size="small"
              sx={InputFieldSx}
              disabled
              readonly
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              className="w-full"
              id="outlined-basic"
              label="City"
              variant="outlined"
              size="small"
              sx={InputFieldSx}
              required
              name='city'
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              className="w-full"
              id="outlined-basic"
              label="State"
              variant="outlined"
              size="small"
              sx={InputFieldSx}
              required
              name='state'
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Pincode"
              variant="outlined"
              size="small"
              sx={InputFieldSx}
              required
              name='pinCode'
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Country"
              variant="outlined"
              size="small"
              sx={InputFieldSx}
              required
              name='country'
            />
          </Grid>

          <Grid className="w-full" item xs={12} sm={6}>
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

          <Grid className="w-full" item xs={12} sm={6}>
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
              name='previousScore'
            />
          </Grid>

          <Grid className="w-full" item xs={12} sm={6}>
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
              name='targetScore'
            />
          </Grid>

          <Grid className="w-full" item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
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
              marginTop: '1rem',
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button sx={{ px: 5 }} variant="outlined" type='submit' disabled={loading}>
              Save
            </Button>
          </Box>
        </Grid>
      </form>

      {/* Dialog Box */}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={passwordHandler}>
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
              name='password'
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
              name='confirmPassword'
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
              name='previousPassword'
              fullWidth
              variant="standard"
            />
            <p className="text-sm text-red-500 text-center mt-4">{passwordError}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} type='button'>Cancel</Button>
            <Button type='submit'>Update</Button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
};

export default Settings;
