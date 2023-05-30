import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

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

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/auth/login`,
        credentials
      );
      localStorage.setItem("user-token", JSON.stringify(res.data.xauthtoken));

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast("Login Successfully");
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.message });
      toast.error(err.response.data.message);
    }
  };

  const toregister = () => {
    dispatch({ type: "CHANGE" });
    navigate("/register");
  };

  return (
    <Container>
      <ToastContainer />
      <div className="lContainer">
        <h2>Login</h2>
        <div>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
        </div>

        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button
          disabled={!(credentials.username && credentials.password)}
          onClick={handleClick}
          className="lButton"
        >
          Login
        </button>
        <div>
          <span>Do not have an account?</span>
          <span onClick={toregister} style={{ cursor: "pointer" }}>
            Register
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

export default Login;
