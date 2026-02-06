import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Tasks from "./pages/Tasks";
import Favorite from "./pages/Favorite";
import Work from "./pages/Work";
import Personal from "./pages/Personal";
import Learning from "./pages/Learning";
import WelcomeUI from "./components/WelcomeUI";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<WelcomeUI />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/work" element={<Work />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
