import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
});

//COLLEGES
export const getColleges = () => API.get("/colleges");
export const getCollegeById = (collegeId) => API.get(`/colleges/${collegeId}`);
export const getCollegesWithFilters = (data) =>
  API.post("/colleges/filters", data);

//BLOGS
export const getBlogs = () => API.get("/blogs");
export const getBlogById = (blogId) => API.get(`/blogs/${blogId}`);

//STATES
export const getStates = () => API.get("/states");

//SHOWCASE
export const getShowcase = () => API.get("/showcase");

//TESTIMONIALS
export const getTestimonials = () => API.get("/testimonials");

//Enquiry
export const submitEnquiry = (payload) => API.post("/contact", payload);

//Apply now form
export const applyForm = (payload) => API.post("/apply", payload);

//RankPredictor
export const rankPredictor = (payload) => API.post("/rank-predictor", payload);
