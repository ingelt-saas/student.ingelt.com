// API
import home from "../api/home";
import { StudentContext } from "../contexts";
import { useState, useEffect } from "react";

const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState({});

  useEffect(() => {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlVTRVIwMDEiLCJiYXRjaElkIjoiQkFUMDEiLCJuYW1lIjoiTGF1cmEgSGVuc2VuIiwiZmF0aGVyc05hbWUiOm51bGwsImVtYWlsIjoibGF1cmFAZW1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkV3huZEFTU0I3LjdKVnZiYkY1RnlXdUtwd1dWQ29YdS9kL1VaZnEweUphaFpCYmlEZnhVb0ciLCJwaG9uZU5vIjoiMTIzNDU2Nzg5MCIsImdlbmRlciI6IkZlbWFsZSIsImNpdHkiOiJNdW1iYWkiLCJzdGF0ZSI6Ik1haGFyYXNodHJhIiwiY291bnRyeSI6IkluZGlhIiwicGluQ29kZSI6NDAwMDAxLCJkb2IiOiIxOTkwLTAxLTAxVDAwOjAwOjAwLjAwMFoiLCJhY3RpdmUiOnRydWUsInN0YXR1cyI6bnVsbCwidGFyZ2V0U2NvcmUiOjcsInByZXZpb3VzU2NvcmUiOjYuNSwiYXZlcmFnZUJhbmQiOjcsInRvdGFsQXZlcmFnZUJhbmQiOjcsImNyZWF0ZWRBdCI6IjIwMjMtMDMtMjVUMDc6NDI6NTAuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDMtMjVUMDc6NDI6NTAuMDAwWiIsImlhdCI6MTY3OTczMDc5NiwiZXhwIjoxNjc5OTAzNTk2fQ.msGfphLFEoeV9OPnel50d2FGYMqQv7nC5WsguZwI0JI"
    );

    async function getStudent() {
      const student = await home.getStudent();
      console.log(student.data);
      setStudent(student.data);
    }

    getStudent();
  }, []);

  return (
    <StudentContext.Provider value={student}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
