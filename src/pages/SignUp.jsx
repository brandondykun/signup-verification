import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const validationsTemp = {
  passwordPasses: true,
  lengthPasses: true,
  symbolPasses: true,
  numberPasses: true,
  uppercasePasses: true,
  lowercasePasses: true,
  passwordsMatch: true,
  userNameNotBlank: true,
};

const SignUpPage = () => {
  const { setContextUser, setContextPassword } = useUserContext();

  // Form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validations
  const [validationState, setValidationState] = useState(validationsTemp);

  const validations = { ...validationsTemp };

  const navigate = useNavigate();

  const symbolsReg = /[!@#$%^&*]/;
  const numbersReg = /[0-9]/;
  const uppercaseLettersReg = /[A-Z]/;
  const lowercaseLettersReg = /[a-z]/;

  const handleSubmit = (e) => {
    e.preventDefault();

    validations.userNameNotBlank = username !== "";
    validations.passwordsMatch = password === confirmPassword;
    validations.lengthPasses = password.length > 6;
    validations.passwordPasses = password.toLowerCase() !== "password";
    validations.symbolPasses = symbolsReg.test(password);
    validations.numberPasses = numbersReg.test(password);
    validations.uppercasePasses = uppercaseLettersReg.test(password);
    validations.lowercasePasses = lowercaseLettersReg.test(password);

    const validationBooleans = Object.values(validations);

    if (!validationBooleans.includes(false)) {
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
    } else {
      setValidationState(validations);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setValidationState(validationsTemp);
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
            <li
              id="password-warn"
              className={!validationState.passwordPasses ? "red" : ""}
            >
              cannot be "password"
            </li>
            <li
              id="length-warn"
              className={!validationState.lengthPasses ? "red" : ""}
            >
              must be greater than 6 characters
            </li>
            <li
              id="symbol-warn"
              className={!validationState.symbolPasses ? "red" : ""}
            >
              must contain a symbol !@#$%^&*
            </li>
            <li
              id="number-warn"
              className={!validationState.numberPasses ? "red" : ""}
            >
              must contain at least one number
            </li>
            <li
              id="upper-warn"
              className={!validationState.uppercasePasses ? "red" : ""}
            >
              must contain at least one uppercase letter
            </li>
            <li
              id="lower-warn"
              className={!validationState.lowercasePasses ? "red" : ""}
            >
              must contain at least one lowercase letter
            </li>
            {!validationState.passwordsMatch && (
              <li id="password-match">passwords do not match</li>
            )}
            {!validationState.userNameNotBlank && (
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
