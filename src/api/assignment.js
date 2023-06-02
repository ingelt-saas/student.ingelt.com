import instance from "./config/axios";

const assignmentApi = {
  getAllAssignments: (pageNo, limit, searchQuery) => instance.get(`/assignment/all/?pageNo=${pageNo}&limit=${limit}${searchQuery ? `&s=${searchQuery}` : ''}`),
  submitSubmission: (submissionId) => instance.put(`/submission/${submissionId}`, { status: 'submitted' }), // submit submission
  getSubmission: (assignmentId) => instance.get(`/submission/assignment/${assignmentId}`), // get submission by assignment id and student id
  deleteSubmission: (submissionId) => instance.delete(`submission/${submissionId}`), // delete submission , file has been uploaded but not submitted
  getAllSubmission: () => instance.get('/submission'),
  updateSubmission: (data) => instance.post(`/submission`, data, { headers: { "Content-Type": 'multipart/form-data' } }),
};

export default assignmentApi;
