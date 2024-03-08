import homeApi from "../api/home";
import { StudentContext } from "../contexts";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import paymentApi from "../api/payment";

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
    if (process.env.NODE_ENV === 'priyanshu') {
      Cookies.remove("student_auth_token", { path: '/' });
    } else {
      Cookies.remove("student_auth_token", { path: '/', domain: 'ingeltboard.com' });
    }
    Cookies.remove("couponCode");
    studentFetch();
    // Cookies.remove("student_auth_token", { path: '/', domain: 'board.ingelt.com' });
    window.location.pathname = "/";

  };

  const couponState = useState('');
  useEffect(()=>{
    let coupon= Cookies.get('couponCode')
    if(coupon) {
      paymentApi.verifyModuleCoupon({coupon}).then(res=>{
        // console.log(res?.data?.coupon?.amount);
        couponState[1](res?.data?.coupon?.amount);
      }).catch(err=>{
        console.log(err);
        Cookies.remove("couponCode");
      })
    }
  }, []);
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

  //coupon amount is used to know the exact amount that the user has been paid
  return (
    <StudentContext.Provider value={{ student, loading, logOut, studentFetch, couponState }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
