import { Navigate, Outlet } from "react-router-dom"
import { isAuthenticated } from "../components/helper/isAuthenticated"

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute