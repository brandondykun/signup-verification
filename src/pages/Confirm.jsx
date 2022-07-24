import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const ConfirmPage = () => {
  const { contextUser, contextPassword } = useUserContext();

  return (
    <div className="sign-up-card">
      <h1 className="title">Account Details</h1>
      <div className="user-detail-container">
        <div>Username: {contextUser}</div>
        <div>Password: {contextPassword}</div>
      </div>
      <Link to="/">
        <button className="form-button submit">back</button>
      </Link>
    </div>
  );
};

export default ConfirmPage;
