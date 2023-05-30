import axios from "axios";
import Joi from "joi-browser";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("/img/background.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  box-sizing: border-box;
`;

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const [registerinfo, setRegisterinfo] = useState({});

  const schema = {
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("Username"),
    password: Joi.string().required().label("Password"),
    email: Joi.string().email().required().label("Email"),
  };

  const validate = () => {
    const result = Joi.validate(credentials, schema, { abortEarly: false });
    const errors = {};
    if (!result.error) return null;
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const errorinfo = validate();
    setRegisterinfo(errorinfo || {});
    if (errorinfo) return;
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/auth/register`,
        credentials
      );
      localStorage.setItem("user-token", JSON.stringify(res.data.xauthtoken));
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast("User created");
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.message });
      toast.error(err.response.data.message);
    }
  };

  const tologin = () => {
    dispatch({ type: "CHANGE" });
    navigate("/login");
  };

  return (
    <Container>
      <ToastContainer />
      <div className="lContainer">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
          autoFocus
        />
        {registerinfo["username"] && (
          <div className="registererror">{registerinfo["username"]}</div>
        )}

        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        {registerinfo["email"] && (
          <div className="registererror">{registerinfo["email"]}</div>
        )}
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        {registerinfo["password"] && (
          <div className="registererror">{registerinfo["password"]}</div>
        )}
        <button
          disabled={
            !(credentials.username && credentials.email && credentials.password)
          }
          onClick={handleClick}
          className="lButton"
        >
          Register
        </button>
        <div>
          <span>Already an account?</span>
          <span onClick={tologin} style={{ cursor: "pointer" }}>
            Login
          </span>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span>Home Page</span>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
