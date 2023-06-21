import { Navigate } from "react-router-dom";
const Protected = ({ id, children }) => {
  if (id) {
    return children;
  } else {
    return <Navigate to='/' />;
  }
};

export default Protected;
