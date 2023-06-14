import React, { useState } from "react";

// images
import SignupStepOne from "./SignupStepOne";
import SignupStepTwo from "./SignupStepTwo";

const SignUp = ({ open, handleClose, img, text, formData, setFormData }) => {
  // console.log(formData);
  return (
    <>
      {!formData?.name && !formData?.phoneNo && (
        <SignupStepOne
          img={img}
          open={open}
          text={text}
          handleClose={handleClose}
          setFormData={setFormData}
          formData={formData}
        />
      )}
      {formData?.name && formData?.phoneNo && (
        <SignupStepTwo
          img={img}
          open={open}
          text={text}
          handleClose={handleClose}
          setFormData={setFormData}
          formData={formData}
        />
      )}
    </>
  );
};

export default SignUp;
