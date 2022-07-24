import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUpPage = () => {
  const { setContextUser, setContextPassword } = useUserContext();

  // Form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordPasses, setPasswordPasses] = useState(true);

  // Password validation
  const [lengthPasses, setLengthPasses] = useState(true);
  const [symbolPasses, setSymbolPasses] = useState(true);
  const [numberPasses, setNumberPasses] = useState(true);
  const [uppercasePasses, setUppercasePasses] = useState(true);
  const [lowercasePasses, setLowercasePasses] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userNameNotBlank, setUsernameNotBlank] = useState(true);

  const navigate = useNavigate();

  const symbolsReg = /[!@#$%^&*]/;
  const numbersReg = /[0-9]/;
  const uppercaseLettersReg = /[A-Z]/;
  const lowercaseLettersReg = /[a-z]/;

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorCount = 0;

    if (!username) {
      setUsernameNotBlank(false);
      errorCount += 1;
    } else {
      setUsernameNotBlank(true);
    }

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      errorCount += 1;
    } else {
      setPasswordsMatch(true);
    }

    if (password.length <= 6) {
      setLengthPasses(false);
      errorCount += 1;
    } else {
      setLengthPasses(true);
    }

    if (password.toLowerCase() == "password") {
      setPasswordPasses(false);
      errorCount += 1;
    } else {
      setPasswordPasses(true);
    }

    if (!symbolsReg.test(password)) {
      setSymbolPasses(false);
      errorCount += 1;
    } else {
      setSymbolPasses(true);
    }

    if (!numbersReg.test(password)) {
      setNumberPasses(false);
      errorCount += 1;
    } else {
      setNumberPasses(true);
    }

    if (!uppercaseLettersReg.test(password)) {
      setUppercasePasses(false);
      errorCount += 1;
    } else {
      setUppercasePasses(true);
    }

    if (!lowercaseLettersReg.test(password)) {
      setLowercasePasses(false);
      errorCount += 1;
    } else {
      setLowercasePasses(true);
    }

    if (errorCount === 0) {
      // make api call (this is a fake one)
      try {
        const response = { message: "Fake response message", status: 201 };
        if (response.status === 201) {
          setContextUser(username);
          setContextPassword(password);
          navigate("/confirm");
        }
      } catch (error) {
        // set and display error message
        console.error(error);
      }
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setLengthPasses(true);
    setPasswordPasses(true);
    setSymbolPasses(true);
    setNumberPasses(true);
    setUppercasePasses(true);
    setLowercasePasses(true);
    setPasswordsMatch(true);
    setUsernameNotBlank(true);
  };

  return (
    <div className="sign-up-card">
      <h1 className="title">Create Account</h1>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <div className="password-input-container">
          <input
            type="text"
            id="username"
            aria-label="Username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-input-container">
          <input
            type={!showPassword ? "password" : "text"}
            id="password"
            aria-label="Password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!showPassword ? (
            <FontAwesomeIcon
              icon={faEye}
              size="sm"
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              size="sm"
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <div className="password-input-container">
          <input
            type={!showConfirmPassword ? "password" : "text"}
            id="confirm-password"
            aria-label="Confirm Password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!showConfirmPassword ? (
            <FontAwesomeIcon
              icon={faEye}
              size="sm"
              className="eye"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              size="sm"
              className="eye"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          )}
        </div>
        <div className="requirements-container">
          <h3 className="requirements-title">Password Requirements:</h3>
          <ul className="requirements-list">
            <li id="password-warn" className={!passwordPasses ? "red" : ""}>
              cannot be "password"
            </li>
            <li id="length-warn" className={!lengthPasses ? "red" : ""}>
              must be greater than 6 characters
            </li>
            <li id="symbol-warn" className={!symbolPasses ? "red" : ""}>
              must contain a symbol !@#$%^&*
            </li>
            <li id="number-warn" className={!numberPasses ? "red" : ""}>
              must contain at least one number
            </li>
            <li id="upper-warn" className={!uppercasePasses ? "red" : ""}>
              must contain at least one uppercase letter
            </li>
            <li id="lower-warn" className={!lowercasePasses ? "red" : ""}>
              must contain at least one lowercase letter
            </li>
            {!passwordsMatch && (
              <li id="password-match">passwords do not match</li>
            )}
            {!userNameNotBlank && (
              <li id="password-match">username cannot be empty</li>
            )}
          </ul>
        </div>
        <div className="button-container">
          <button className="form-button" type="button" onClick={handleClear}>
            clear
          </button>
          <button className="form-button submit" type="submit">
            sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
