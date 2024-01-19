import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Sidebar from "./componenets/Sidebar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="grow mt-12">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
