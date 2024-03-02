import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "../src/pages/NotFound";
import  AdminLogin from '../src/pages/AdminLogin'
import  ForgotPassword from '../src/pages/ForgotPassword'
import  ResetPassword from '../src/pages/ResetPassword'
function App() {
  return (
    <div className="App">
      {/* <SidebarMenu /> */}
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
