import React, { useState } from "react";
import "./Login.css";
import Logo from "../../assets/logo.png";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import { login, signup } from "../../firebase";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  return loading ? (
    <div className="login_spinner">
      <img src={netflix_spinner} alt="" />
    </div>
  ) : (
    <div className="login-container">
      <img src={Logo} alt="" />
      <div className="login">
        <div className="contact">
          <h1>{signState}</h1>
          <form>
            {signState === "Sign Up" ? (
              <input
                type="text"
                placeholder="Your Name"
                required
                value={name}
                onChange={handleName}
              />
            ) : (
              <></>
            )}

            <input
              type="email"
              value={email}
              onChange={handleEmail}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
              required
            />
            <button type="submit" onClick={user_auth}>
              {signState}
            </button>
            <div className="remember">
              <span className="rem">
                <input type="checkbox" className="check" />
                Remember me
              </span>
              <span>Need help?</span>
            </div>
          </form>
          <div className="sign">
            {signState === "Sign In" ? (
              <p>
                New to Netflix?
                <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
              </p>
            ) : (
              <p>
                Already have an account?
                <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
