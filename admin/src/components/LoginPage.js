import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import demoLogo from "../images/brand-logo.webp";
import LoadingPage from "./utils/LoadingPage";
import { login } from "../redux/api";
import Cookies from "js-cookie";
import axios from "axios";
import "../styles/LoginPage.css";

const initialData = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const history = useHistory();
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleLogin = async () => {
    if (formData.email && formData.password) {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/admin/login`,
          formData
        );
        setLoading(false);
        if (data.success) {
          localStorage.setItem("fanstarAdmin", data.data.token);
          localStorage.setItem("adminData", JSON.stringify(data.data.admin));
          history.push("/universities");
        } else {
          alert(data.message || "Login failed");
        }
      } catch (error) {
        setLoading(false);
        alert(error.response?.data?.message || "Login failed");
      }
    } else {
      alert("Both fields required");
    }
  };

  return (
    <div className="loginPage-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="loginPage-formDiv">
          <div className="loginPage-formHeaderDiv">
            <div className="logoContainer">
              <img src={demoLogo} alt="logo" className="logoImage" />
            </div>
            <div className="loginPage-headerContent">
              <h3 className="loginPage-headerTitle">Login to Dashboard </h3>
              <p className="loginPage-headerSub">
                Enter your email and password below
              </p>
            </div>
          </div>
          <div className="loginPage-formContent">
            <div className="loginPage-formFieldDiv">
              <label className="loginPage-inputLabel">Email</label>
              <input
                type="email"
                name="email"
                className="loginPage-inputField"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="loginPage-formFieldDiv">
              <div className="loginPage-passDiv">
                <label className="loginPage-inputLabel">Password</label>
                <label className="loginPage-inputLabel forgotPass">
                  Forgot password?
                </label>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                className="loginPage-inputField"
              />
            </div>
            <div className="loginPage-submitBtnDiv">
              <button className="loginPage-submitBtn" onClick={handleLogin}>
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
