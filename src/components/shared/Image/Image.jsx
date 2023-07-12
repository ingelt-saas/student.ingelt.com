import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import getFile from "../../../api/getFile";
// import avatar from "../../../assets/images/demodp.png";
import femaleAvatar from "../../../assets/images/FemaleAvatra.webp";
import maleAvatar from "../../../assets/images/MaleAvatra.webp";
import { StudentContext } from "../../../contexts";
const Image = ({ src, alt, className, gender, imageRef, ...props }) => {
  // let gender = "Male";
  // const { student } = useContext(StudentContext);
  // if (!genderForDiscussion) {
  //   gender = student.gender;
  // } else {
  //   gender = genderForDiscussion;
  // }
  // console.log(gender + "context", genderForDiscussion + "disscussion");

  const avatar = gender === "Female" ? femaleAvatar : maleAvatar;

  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (src) {
      getFile(src).then((res) => setUrl(res?.data));
    } else {
      setUrl(avatar);
    }
  }, [src, avatar]);
  return !url ? (
    <span className={`${className} shadow `}></span>
  ) : (
    <img
      ref={imageRef}
      {...props}
      src={url}
      alt={alt}
      className={className}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = avatar;
      }}
    />
  );
};

export default Image;
