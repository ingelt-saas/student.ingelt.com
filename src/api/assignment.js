import instance from "./config/axios";

const assignment = {
  getAllAssignments: (pageNo, limit) => instance.get(`/assignment/all/?pageno=${pageNo}&limit=${limit}`),
  searchAssignments: (searchQuery, pageNo, limit) => instance.get(`/assignment/search/?s=${searchQuery}&pageno=${pageNo}&limit=${limit}`),
  submitSubmission: (submissionId) => instance.put(`/submission/${submissionId}`, { status: 'submitted' }), // submit submission
  getSubmission: (assignmentId) => instance.get(`/submission/assignment/${assignmentId}`), // get submission by assignment id and student id
  deleteSubmission: (submissionId) => instance.delete(`submission/${submissionId}`), // delete submission , file has been uploaded but not submitted
  getAllSubmission: () => instance.get('/submission'),
};

export default assignment;
