import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import Navbar from "./user/Navbar.jsx";
import InformasiPb from "./user/pages/InformasiPb.jsx";
import AjukanPb from "./user/pages/AjukanPb.jsx";
import HasilPb from "./user/pages/HasilPb.jsx";
import Profile from "./user/pages/Profile.jsx";
import Pengaturan from "./user/pages/Pengaturan";

// admin pages
import AdminLayout from "./admin/AdminLayout.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import AccountSettings from "./admin/AccountSettings.jsx";
import ApprovalPB from "./admin/ApprovalPB.jsx";

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState(null); // simpan data user (termasuk role)

  if (!user) {
    return (
      <>
        {isRegister ? (
          <Register
            onSwitch={() => setIsRegister(false)}
            onSuccess={(newUser) => setUser(newUser)}
          />
        ) : (
          <Login
            onSwitch={() => setIsRegister(true)}
            onSuccess={(loggedInUser) => setUser(loggedInUser)}
          />
        )}
      </>
    );
  }

  return (
    <Router>
      <AppRoutes user={user} onLogout={() => setUser(null)} />
    </Router>
  );
}

function AppRoutes({ user, onLogout }) {
  const location = useLocation();

  // jangan tampilkan navbar kalau route diawali "/admin"
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar onLogout={onLogout} />}
      <Routes>
        {/* jika role User → arahkan ke halaman user */}
        {user.role === "User" && (
          <>
            <Route path="/" element={<InformasiPb />} />
            <Route path="/AjukanPb" element={<AjukanPb />} />
            <Route path="/HasilPb" element={<HasilPb />} />
            <Route path="/admin/*" element={<Navigate to="/" replace />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/pengaturan" element={<Pengaturan />} />
          </>
        )}

        {/* jika role Admin → arahkan ke halaman admin */}
        {user.role === "Admin" && (
          <Route path="/admin" element={<AdminLayout onLogout={onLogout} />}>
            <Route index element={<Dashboard />} />
            <Route path="accounts" element={<AccountSettings />} />
            <Route path="approval" element={<ApprovalPB />} />
            {/* kalau coba akses user → redirect */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        )}

        {/* default redirect kalau tidak cocok */}
        <Route path="*" element={<Navigate to={user.role === "Admin" ? "/admin" : "/"} replace />} />
      </Routes>
    </>
  );
}

export default App;
