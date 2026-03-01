import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
});

API.interceptors.request.use((req) => {
  if (Cookies.get("fanstarAdmin")) {
    req.headers["authorization"] = `Bearer ${Cookies.get("fanstarAdmin")}`;
  }
  return req;
});

export const login = (loginData) => API.post("/public/login", loginData);

//blogs
export const getBlogs = () => API.get("/blogs");
export const postBlog = (data) => API.post("/blogs", data);
export const getBlogById = (id) => API.get(`/blogs/${id}`);
export const deleteBlogs = (id) => API.delete(`/blogs/${id}`);
export const updateBlogs = (payload) =>
  API.put(`/blogs/${payload?._id}`, payload);

//states
export const getStates = () => API.get("/states");
export const postState = (data) => API.post("/states", data);
export const getStateById = (id) => API.get(`/states/${id}`);
export const deleteStates = (id) => API.delete(`/states/${id}`);
export const updateStates = (payload) =>
  API.put(`/states/${payload?._id}`, payload);

//university
export const getUniversity = () => API.get("/universities");
export const DeleteUniversity = (id) => API.delete(`/universities/${id}`);
export const postUniversity = (data) => API.post("/universities", data);
export const getUniversityById = (id) => API.get(`/universities/${id}`);
export const updateUniversity = (payload) =>
  API.put(`/universities/${payload?._id}`, payload);

//colleges
export const getColleges = () => API.get("/colleges");
export const deleteCollege = (id) => API.delete(`/colleges/${id}`);
export const postColleges = (data) => API.post("/colleges", data);
export const getCollegeById = (id) => API.get(`/colleges/${id}`);
export const updateCollege = (payload) =>
  API.put(`/colleges/${payload._id}`, payload);

//course
export const getCourses = (id) => API.get(`/colleges/course/${id}`);
export const addCourses = (payload) =>
  API.post(`/colleges/course/add`, payload);
export const deleteCourse = (payload) =>
  API.post(`/colleges/course/delete`, payload);

// users
export const getUsers = () => API.get("/users");
//enquiry
export const getEnquiry = () => API.get("/contact");

//testimonial
export const getTestimonial = () => API.get("/testimonials");
export const getTestimonialById = (id) => API.get(`/testimonials/${id}`);
export const deleteTestimonial = (id) => API.delete(`/testimonials/${id}`);
export const postTestimonial = (payload) => API.post(`/testimonials`, payload);
export const updateTestimonial = (payload) =>
  API.post(`/testimonials/${payload._id}`, payload);

// update reveiw
export const UpdateReview = (payload) =>
  API.post(`/colleges/review/update/${payload?.courseid}`, payload);

//gallery data
export const PostGallaryImage = (payload) => API.post(`/gallery`, payload);
export const getGallaryImages = () => API.get(`/gallery`);
export const deleteGallaryImage = (id) => API.delete(`/gallery/${id}`);

//showcase data
export const postShowCaseImage = (payload) => API.post(`/showcase`, payload);
export const getShowcaseImages = () => API.get(`/showcase`);
export const getShowcaseImageById = (id) => API.get(`/showcase/${id}`);
export const deleteShowcaseImages = (id) => API.delete(`/showcase/${id}`);
export const updateShowcaseImages = (payload) =>
  API.put(`/showcase/${payload._id}`, payload);

// table
export const PostDyanmicTable = (payload) =>
  API.post(`/colleges/table/add`, payload);
export const getDyanmicTable = () => API.get(`/colleges/table`);
export const deleteDyanmicTable = (payload) =>
  API.post(`/colleges/table/delete`, payload);
export const getDyanmicTableById = (id) => API.get(`/colleges/table/${id}`);
export const updateDyanmicTable = (payload) =>
  API.put(`/colleges/table/${payload?.collegeId}/${payload?.tableId}`, payload);

//subpage
export const PostSubpage = (payload) => API.post(`/subpage/add`, payload);
export const getSubpages = () => API.get(`/subpage`);
export const getSubpagesById = (id) => API.get(`/subpage/${id}`);
export const deleteSubpages = (id) => API.delete(`/subpage/${id}`);
export const updateSubpages = (payload) =>
  API.put(`/subpage/${payload._id}`, payload);
