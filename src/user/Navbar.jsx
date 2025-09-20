import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dropdown, Menu, Spin, Modal } from "antd";
import { useEffect, useState } from "react";

function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  // Handler logout dengan konfirmasi
  const handleLogout = () => {
    modal.confirm({
      title: "Konfirmasi Keluar",
      content: "Apakah kamu yakin ingin keluar?",
      okText: "Ya, Keluar",
      cancelText: "Batal",
      okType: "danger",
      onOk() {
        localStorage.removeItem("authToken");
        if (onLogout) onLogout();
        navigate("/login");
      },
    });
  };

  // Deteksi perubahan route → tampilkan loading
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profil">👤 Profil</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/pengaturan">⚙️ Pengaturan</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout}>
        🚪 Keluar
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.logo}>Perjanjian Bersama Web</div>
        <ul style={styles.navLinks}>
          <li><Link to="/" style={styles.link}>Informasi PB</Link></li>
          <li><Link to="/AjukanPb" style={styles.link}>Ajukan PB</Link></li>
          <li><Link to="/HasilPb" style={styles.link}>Hasil PB</Link></li>
          <li>
            <Dropdown overlay={menu} trigger={["click"]}>
              <a style={styles.link} onClick={(e) => e.preventDefault()}>
                Akun ⬇️
              </a>
            </Dropdown>
          </li>
        </ul>
      </nav>

      {/* ✅ Overlay Loading */}
      {loading && (
        <div style={styles.loadingOverlay}>
          <Spin size="large" tip="Loading..." />
        </div>
      )}

      {/* ✅ Modal contextHolder untuk AntD v5 */}
      {contextHolder}
    </>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#007bff",
    color: "#fff",
  },
  logo: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  loadingOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255, 255, 255, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
};

export default Navbar;
