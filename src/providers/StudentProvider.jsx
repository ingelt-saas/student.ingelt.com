import home from "../api/home";
import { StudentContext } from "../contexts";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

const StudentProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  const logOut = () => {
    Cookies.remove('student_auth_token', { path: '', domain: 'ingelt.com' });
    setStudent(null);
    window.location.pathname = '/';
  }

  useEffect(() => {

    if (Cookies.get('student_auth_token')) {
      home.getStudent()
        .then(res => {
          setStudent(res?.data);
          setLoading(false);
        })
        .catch(() => {
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
