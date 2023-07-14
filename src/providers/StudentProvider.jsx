import home from "../api/home";
import { StudentContext } from "../contexts";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const StudentProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  const logOut = () => {
    if (process.env.NODE_ENV === 'development') {
      Cookies.remove("student_auth_token", { path: '/' });
    } else {
      Cookies.remove("student_auth_token", { path: '/', domain: 'ingelt.com' });
    }

    // Cookies.remove("student_auth_token", { path: '/', domain: 'board.ingelt.com' });
    window.location.pathname = "/";

  };

  useEffect(() => {
    // if (Cookies.get("student_auth_token")) {
    if (Cookies.get('student_auth_token')) {
      home
        .getStudent()
        .then((res) => {
          setStudent(res?.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            // Cookies.remove("student_auth_token", { path: "/", domain: "" });
            Cookies.remove("student_auth_token");
          }
          setStudent(null);
          setLoading(false);
        });
    } else {
      setStudent(null);
      setLoading(false);
    }
  }, []);

  return (
    <StudentContext.Provider value={{ student, loading, logOut }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
