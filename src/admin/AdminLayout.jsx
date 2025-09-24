import { Layout, Menu, Spin, Modal, Button } from "antd";
import {
  UserOutlined,
  FileSearchOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

const { Sider, Content, Header } = Layout;

function AdminLayout({ onLogout }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "Admin";

  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // ✅ AntD v5 modal hook
  const [modal, contextHolder] = Modal.useModal();

  // ✅ state collapse untuk sidebar
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    modal.confirm({
      title: "Konfirmasi Keluar",
      content: "Apakah kamu yakin ingin keluar?",
      okText: "Ya, Keluar",
      cancelText: "Batal",
      okType: "danger",
      onOk() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        if (onLogout) onLogout();
      },
    });
  };

  // ✅ Loading saat pindah route
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  // ✅ Swipe handler
  const handlers = useSwipeable({
    onSwipedLeft: () => setCollapsed(true),   // geser kiri → sembunyikan sidebar
    onSwipedRight: () => setCollapsed(false), // geser kanan → tampilkan sidebar
    preventDefaultTouchmoveEvent: false,
    trackMouse: false,
  });

  return (
    <Layout style={{ minHeight: "100vh" }} {...handlers}>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        collapsedWidth="0"
        trigger={null} // biar tanpa tombol bawaan
        breakpoint="md"
      >
        <div
          style={{
            color: "#fff",
            textAlign: "center",
            padding: "1rem",
            fontWeight: "bold",
          }}
        >
          {userName}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[
            location.pathname.includes("accounts")
              ? "2"
              : location.pathname.includes("approval")
              ? "3"
              : "1",
          ]}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/admin/accounts">Pengaturan Akun</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FileSearchOutlined />}>
            <Link to="/admin/approval">Approval PB</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleLogout}>
            Keluar
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        {/* ✅ Header dengan tombol toggle */}
        <Header
          style={{
            padding: "0 16px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "18px", marginRight: "16px" }}
          />
          <h3 style={{ margin: 0 }}>Admin Panel</h3>
        </Header>

        <Content style={{ margin: "16px", minHeight: "80vh" }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Spin size="large" tip="Loading..." />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>

      {/* ✅ Wajib render modal context holder */}
      {contextHolder}
    </Layout>
  );
}

export default AdminLayout;
