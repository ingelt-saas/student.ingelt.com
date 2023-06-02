// Modules
import { useContext, useEffect, useState } from "react";

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
import { Check } from "@mui/icons-material";

const StyledButton = styled(Button)(() => ({ textTransform: "capitalize" }));

const InputFieldSx = {
  borderRadius: "20px",
  height: "40px",
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
  },
};

const PasswordChangeModal = ({ open, close }) => {

  const [error, setError] = useState('');
  const [changePwd, setChangePwd] = useState({
    password: "",
    confirmPassword: "",
    prevPassword: "",
  });
  const [passwordRequirements, setPasswordRequirements] = useState({
    uppercase: false,
    specialChar: false,
    number: false,
    length: false,
    match: false,
  });


  const handleClose = () => {
    setPasswordRequirements({
      uppercase: false,
      specialChar: false,
      number: false,
      length: false,
      match: false,
    });
    setError('');
    close();
  };


  // password change
  const pwdChangeHandler = async (e) => {

    if (Object.values(passwordRequirements).includes(false)) {
      return;
    }

    if (!changePwd.prevPassword) {
      return;
    }
    e.target.disabled = true;
    setError('');
    try {
      const result = await settingsApi.updatePassword({
        password: changePwd.password,
        previousPassword: changePwd.prevPassword,
      });
      if (result?.data?.status === "bad") {
        setError(result?.data?.message);
      } else {
        handleClose();
        toast.success("Password updated successfully");
      }
    } catch (err) {
      toast.error("Your password has not been updated.");
    } finally {
      e.target.disabled = false;
    }
  };

  useEffect(() => {
    const newRequirements = {
      uppercase: /^(?=.*[A-Z])/.test(changePwd.password),
      specialChar: /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(changePwd.password),
      number: /^(?=.*[0-9]).*$/.test(changePwd.password),
      length: changePwd.password.length >= 8,
      match: changePwd.password.length > 0 && changePwd.password === changePwd.confirmPassword
    };
    setPasswordRequirements(newRequirements);
  }, [changePwd]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Change User Credentials</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Try to create a strong password with a combination of numbers,
          alphabets and special characters.
        </DialogContentText>
        <TextField
          className="my-4 !text-sm"
          autoFocus
          margin="dense"
          name='password'
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          InputLabelProps={{ className: '!text-sm' }}
          size="small"
          onChange={(e) => setChangePwd({ ...changePwd, [e.target.name]: e.target.value })}
        />

        <TextField
          className="my-4 !text-sm"
          autoFocus
          margin="dense"
          name='confirmPassword'
          label="Confirm Password"
          type="password"
          fullWidth
          variant="standard"
          InputLabelProps={{ className: '!text-sm' }}
          size="small"
          onChange={(e) => setChangePwd({ ...changePwd, [e.target.name]: e.target.value })}
        />

        <TextField
          className="my-4 !text-sm"
          autoFocus
          margin="dense"
          name='prevPassword'
          label="Previous Password"
          type="password"
          fullWidth
          variant="standard"
          InputLabelProps={{ className: '!text-sm' }}
          size="small"
          onChange={(e) => setChangePwd({ ...changePwd, [e.target.name]: e.target.value })}
        />
        <div className="text-xs mt-5 bg-[#1b3c7d1f] pb-5 pt-2 rounded-lg pl-3">
          <div className="flex items-left mt-0.5 pt-1">
            <Check
              className={`${passwordRequirements.uppercase ? "text-green-500" : ""
                } `}
              sx={{
                visibility: passwordRequirements.uppercase
                  ? "visible"
                  : "hidden",
              }}
            />
            <p className="ml-2 pt-1">
              Contains at least one uppercase letter
            </p>
          </div>
          <div className="flex items-left mt-0.5">
            <Check
              className={`${passwordRequirements.specialChar ? "text-green-500" : ""
                }`}
              sx={{
                visibility: passwordRequirements.specialChar
                  ? "visible"
                  : "hidden",
              }}
            />
            <p className="ml-2 pt-1">
              Contains at least one special character
            </p>
          </div>
          <div className="flex items-left mt-0.5">
            <Check
              className={`${passwordRequirements.number ? "text-green-500" : ""
                }`}
              sx={{
                visibility: passwordRequirements.number
                  ? "visible"
                  : "hidden",
              }}
            />
            <p className="ml-2 pt-1">Contains at least one number</p>
          </div>
          <div className="flex items-left mt-0.5">
            <Check
              className={`${passwordRequirements.length ? "text-green-500" : ""
                }`}
              sx={{
                visibility: passwordRequirements.length
                  ? "visible"
                  : "hidden",
              }}
            />
            <p className="ml-2 pt-1">
              Password length is at least 8 characters
            </p>
          </div>
          <div className="flex items-left mt-0.5">
            <Check
              className={`${passwordRequirements.match ? "text-green-500" : ""}`}
              sx={{
                visibility: passwordRequirements.match ? "visible" : "hidden",
              }}
            />
            <p className="ml-2 pt-1">
              Password matches
            </p>
          </div>
        </div>
        {error && <p className='text-center text-sm text-red-500 py-2'>{error}</p>}
      </DialogContent>

      <DialogActions sx={{ pb: 2 }}>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button
          variant="outlined"
          onClick={pwdChangeHandler}
          disabled={Object.values(passwordRequirements).includes(false)}
        >Update</Button>
      </DialogActions>
    </Dialog>
  );
}


const Settings = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

    // float number
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
      if (updatedData[key] !== student[key] && updatedData[key]) {
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
          rowSpacing={2}
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
            <Button onClick={updateProfile} size='large' sx={{ width: '97%' }} variant="contained">
              Save
            </Button>
          </Box>
        </Grid>
      </div>

      {/* Dialog Box */}
      <PasswordChangeModal open={open} close={handleClose} />

    </div>
  );
};

export default Settings;
