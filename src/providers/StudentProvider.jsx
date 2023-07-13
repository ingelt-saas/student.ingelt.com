import homeApi from "../api/home";
import { StudentContext } from "../contexts";
// import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

const StudentProvider = ({ children }) => {

  const { data: student = null, isLoading: loading, refetch: studentFetch } = useQuery({
    queryKey: ['student'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (Cookies.get('student_auth_token')) {
        const res = await homeApi.getStudent();
        return res.data;
      } else {
        return null;
      }
    }
  });

  const logOut = () => {
    if (process.env.NODE_ENV === 'development') {
      Cookies.remove("student_auth_token", { path: '/' });
    } else {
      Cookies.remove("student_auth_token", { path: '/', domain: 'ingelt.com' });
    }

    studentFetch();
    // Cookies.remove("student_auth_token", { path: '/', domain: 'board.ingelt.com' });
    window.location.pathname = "/";

  };

  // useEffect(() => {
  //   // if (Cookies.get("student_auth_token")) {
  //   if (Cookies.get('student_auth_token')) {
  //     homeApi
  //       .getStudent()
  //       .then((res) => {
  //         setStudent(res?.data);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         if (err.response?.status === 401) {
  //           // Cookies.remove("student_auth_token", { path: "/", domain: "" });
  //           Cookies.remove("student_auth_token");
  //         }
  //         setStudent(null);
  //         setLoading(false);
  //       });
  //   } else {
  //     setStudent(null);
  //     setLoading(false);
  //   }
  // }, []);

  return (
    <StudentContext.Provider value={{ student, loading, logOut, studentFetch }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
