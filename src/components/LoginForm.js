import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async () => {
    const errors = [];

    if (!username) {
      errors.push("Username is required");
      document.getElementById("username").classList.add("invalid-field");
    }

    if (!password) {
      errors.push("Password is required");
      document.getElementById("password").classList.add("invalid-field");
    }

    if (errors.length > 0) {
      toast.error(errors.join(", "));
      return;
    }

    const user = {
      username,
      password,
    };

    try {
      const res = await axios.post("/user/login", user);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role)
      toast.success("Login Successful");

      setTimeout(() => {
        if (res.data.role === "Admin") {
          // Redirect to the admin page if the user is an admin
          window.location.replace("/admin");
        } else {
          // Redirect to the dashboard for other users
          window.location.replace("/");
        }
      }, 2000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.msg
      ) {
        toast.error(`Login Failed! ${error.response.data.msg}`);
      } else {
        toast.error("Login Failed!");
      }
    }
  };

  return (
    <>
      <div className="text-center">
        <h3 className="page-title">Login</h3>
        <div className="user-form">
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required="required"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required="required"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="btn-group">
              <button className="primary-btn" onClick={onSubmit}>
                Log In
              </button>
              <h5>or</h5>
              <Link to="/register">
                <button className="register-button">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
