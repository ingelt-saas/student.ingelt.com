// Modules
import { useContext, useState } from "react";

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
import { StudentContext } from "../../contexts";
import Image from "../../components/shared/Image/Image";
import { toast } from "react-toastify";

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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  // student context
  let { student } = useContext(StudentContext);
  const {
    id,
    createdAt,
    image,
    name,
    email,
    dob,
    phoneNo,
    fathersName,
    gender,
    city,
    state,
    country,
    pinCode,
    status,
    previousScore,
    targetScore,
  } = student;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // profile details handler
  const updateProfile = async (e) => {
    // check email
    const emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (updatedData.email && !emailRegex.test(updatedData.email)) {
      toast.warn("Please, Select valid email address");
      return;
    }

    // Whether it is a float number
    const floatRegex = /^[+-]?((\.\d+)|(\d+(\.\d+)?))$/;
    if (
      updatedData.previousScore &&
      !floatRegex.test(updatedData.previousScore)
    ) {
      toast.warn("Please enter the previous score as a 1.2 or 1");
      return;
    }

    if (updatedData.targetScore && !floatRegex.test(updatedData.targetScore)) {
      toast.warn("Please enter the target score as a 1.2 or 1");
      return;
    }

    const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (updatedData.phoneNo && !phoneRegex.test(updatedData.phoneNo)) {
      toast.warn("Please provide the valid phone number.");
      return;
    }

    // age validation
    if (updatedData.dob) {
      const dob = new Date(updatedData.dob);
      dob.setFullYear(dob.getFullYear() + 14);
      if (dob.getTime() > new Date().getTime()) {
        toast.warn('You must be at least 14 years old');
        return;
      }
    }
    // check any update here
    const newData = {};

    for (let key in { ...updatedData }) {
      if (updatedData[key] !== student[key]) {
        newData[key] = updatedData[key];
      }
    }

    if (Object.keys(newData).length <= 0) {
      toast.warning("No changes here", {
        icon: false,
        theme: "colored",
        closeOnClick: false,
      });
      return;
    }

    setLoading(true);
    try {
      await settingsApi.update(newData);
      toast.success("Profile has been updated");
    } catch (err) {
      toast.error("Sorry! Your profile couldn't be updated");
    } finally {
      setLoading(false);
    }
  };

  // profile picture update
  const profilePictureHandler = async (e) => {
    const file = e.target.files[0];
    const Form = new FormData();
    Form.append("image", file);

    if (loading) {
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Updating...");
    try {
      const result = await settingsApi.updateProfile(Form);
      student.image = result?.data?.image;
      toast.success("Your profile image has been updated.");
    } catch (err) {
      toast.error("Sorry! Your profile image has not been updated.");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  // password change
  const passwordHandler = async (e) => {
    e.preventDefault();
    const form = e.target,
      password = form.password.value,
      confirmPassword = form.confirmPassword.value,
      previousPassword = form.previousPassword.value;
    setPasswordError(null);

    if (password !== confirmPassword) {
      setPasswordError("Your password does not match.");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Your password must be at least 6 characters");
      return;
    }
    if (password.search(/[a-z]/i) < 0) {
      setPasswordError("Your password must contain at least one letter.");
      return;
    }
    if (password.search(/[0-9]/) < 0) {
      setPasswordError("Your password must contain at least one digit.");
      return;
    }

    try {
      const result = await settingsApi.updatePassword({
        password,
        confirmPassword,
        previousPassword,
      });
      if (result?.data?.status === "bad") {
        setPasswordError(result?.data?.message);
      } else {
        form.reset();
        handleClose();
        toast.success("Password updated successfully");
      }
    } catch (err) {
      toast.error("Your password has not been updated.");
    }
  };

  // const studentStatus = (text) => {
  //   switch (text) {
  //     case "PRE":
  //       return "Not Applied";
  //     case "APPL":
  //       return "Applied";
  //     case "FEE":
  //       return "Fee Paid";
  //     case "ADM":
  //       return "Admitted";
  //     case "COM":
  //       return "Completed";
  //     default:
  //       return "";
  //   }
  // };

  const inputFieldArr = [
    { name: "name", label: "Name", defaultValue: name, type: "text" },
    { name: "email", label: "Email", defaultValue: email, type: "email" },
    { name: "dob", label: "Date Of Birth", defaultValue: dob, type: "date" },
    {
      name: "phoneNo",
      label: "Phone Number",
      defaultValue: phoneNo,
      type: "tel",
    },
    {
      name: "fathersName",
      label: "Father Name",
      defaultValue: fathersName,
      type: "text",
    },
    {
      name: "gender",
      label: "Gender",
      defaultValue: gender,
      type: "select",
      options: ["Male", "Female", "Other", "Rather Not Say"],
    },
    { name: "city", label: "City", defaultValue: city, type: "text" },
    { name: "state", label: "State", defaultValue: state, type: "text" },
    { name: "country", label: "Country", defaultValue: country, type: "text" },
    { name: "pinCode", label: "Pincode", defaultValue: pinCode, type: "text" },
    {
      name: "registrationDate",
      label: "Registration Date",
      defaultValue: new Date(createdAt)
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-"),
      type: "text",
      readOnly: true,
    },
    {
      name: "previousScore",
      label: "Previous Score",
      defaultValue: previousScore,
      type: "text",
    },
    {
      name: "targetScore",
      label: "Target Score",
      defaultValue: targetScore,
      type: "text",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full gap-y-5 py-4 h-full">
      <div className=" md:w-2/5 mr-2 flex flex-col items-center mt-4">
        <Image
          src={image}
          alt={name}
          className="rounded-full object-cover object-center h-52 w-52 md:h-64 md:w-64 mb-4"
        />
        <div>
          <input
            type="file"
            id="file"
            className="sr-only"
            onChange={profilePictureHandler}
          />
          <label
            className="flex items-center gap-x-2 px-5 py-2 shadow-md cursor-pointer text-white bg-[#1976d2] font-medium rounded-md"
            htmlFor="file"
          >
            Edit Photo
            <CameraAltIcon />
          </label>
        </div>
      </div>

      <div className="md:w-3/5">
        <Grid
          className="ml-2 flex items-start justify-start md:px-4 pb-10"
          container
          rowSpacing={5}
          columnSpacing={{
            xs: 1,
            sm: 2,
            md: 3,
          }}
        >
          {inputFieldArr.map((item, index) =>
            item?.type === "date" ? (
              <Grid item xs={12} sm={6} key={index}>
                {/* <label className="text-xs text-[#93999C]" htmlFor="DOB">
                  {item?.label}*
                </label> */}
                <TextField
                  id="DOB"
                  type="date"
                  label="Date Of Birth"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    // style: { color: "gray" },
                    placeholder: "Select date",
                  }}
                  sx={InputFieldSx}
                  required
                  defaultValue={
                    item?.defaultValue && item?.defaultValue.split("T")[0]
                  }
                  name={item?.name}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      [item?.name]: e.target.value,
                    })
                  }
                />
              </Grid>
            ) : item?.type === "select" ? (
              <Grid item xs={12} sm={6} key={index}>
                <FormControl variant="outlined" size="small" sx={InputFieldSx}>
                  <InputLabel id="demo-simple-select-label">
                    {item?.label}*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    required
                    name="gender"
                    defaultValue={item?.defaultValue}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        [item?.name]: e.target.value,
                      })
                    }
                  >
                    {item?.options.map((i) => (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  className="w-full"
                  id="outlined-basic"
                  label={item?.label}
                  typeof={item?.text}
                  variant="outlined"
                  size="small"
                  defaultValue={item?.defaultValue}
                  sx={InputFieldSx}
                  required
                  name={item?.name}
                  disabled={item?.readOnly}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      [item?.name]: e.target.value,
                    })
                  }
                />
              </Grid>
            )
          )}
          <Grid className="w-full" item xs={12} sm={6}>
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Student ID *"
              typeof="number"
              variant="outlined"
              size="small"
              sx={InputFieldSx}
              disabled
              value={id}
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
              marginTop: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button onClick={updateProfile} size='large' sx={{ width:'97%' }} variant="contained">
              Save
            </Button>
          </Box>
        </Grid>
      </div>

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
              name="password"
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
              name="confirmPassword"
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
              name="previousPassword"
              fullWidth
              variant="standard"
            />
            <p className="text-sm text-red-500 text-center mt-4">
              {passwordError}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} type="button">
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Settings;
