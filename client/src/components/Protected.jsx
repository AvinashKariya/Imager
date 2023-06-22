import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const Protected = ({ id, children }) => {
  const idState = localStorage.getItem("api_id");
  if (id || idState) {
    return children;
  } else {
    return <Navigate to='/' />;
  }
};

export default Protected;
