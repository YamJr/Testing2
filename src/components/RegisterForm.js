import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const RegisterForm = () => {
  const [previewImage, setPreviewImage] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(imageFile);
  };

  const onSubmit = async () => {
    const errors = [];

    if (!username) {
      errors.push("Username is required");
      document.getElementById("username").classList.add("invalid-field");
    } else if (username.length < 5) {
      errors.push("Username must be at least 5 characters long");
      document.getElementById("username").classList.add("invalid-field");
    }

    if (!password) {
      errors.push("Password is required");
      document.getElementById("password").classList.add("invalid-field");
    } else if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
      document.getElementById("password").classList.add("invalid-field");
    }

    if (!confirmPassword) {
      errors.push("Confirm Password is required");
      document.getElementById("confirmPassword").classList.add("invalid-field");
    } else if (confirmPassword !== password) {
      errors.push("Passwords do not match");
      document.getElementById("confirmPassword").classList.add("invalid-field");
    }

    if (!email) {
      errors.push("Email is required");
      document.getElementById("email").classList.add("invalid-field");
    }

    if (!fullname) {
      errors.push("Full name is required");
      document.getElementById("fullname").classList.add("invalid-field");
    }

    if (errors.length > 0) {
      toast.error(errors.join(", "));
      return;
    }

    const user = {
      username,
      email,
      fullname,
      password,
      image,
    };
    
    console.log(user)

    try {
      await axios.post("/user/", user);
      toast.success("User Registered Successfully");
      setTimeout(() => {
        window.location.replace("/login");
      }, 2000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.msg
      ) {
        toast.error(`Registration Failed! ${error.response.data.msg}`);
      } else {
        toast.error("Registration Failed!");
      }
    }
  };

  return (
    <>
    <h3 className="text-center page-title">Register</h3>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required="required"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            required="required"
            value={fullname}
            onChange={handleFullnameChange}
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required="required"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="image-upload">Profile Picture</label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="preview-container">
            {previewImage && <img src={previewImage} alt="Blog Thumbnail" />}
          </div>
        </div> */}
        <div className="btn-group">
          <button onClick={onSubmit} className="primary-btn">
            Register
          </button>
          <h5>or</h5>
          <Link to="/login">
            <button className="register-button">Login</button>
          </Link>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default RegisterForm;
