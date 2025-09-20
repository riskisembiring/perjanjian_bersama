import { Card } from "antd";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Guest",
    email: "guest@example.com",
  };

  return (
    <div style={styles.container}>
      <Card
        title="Profil Pengguna"
        bordered={false}
        style={{ width: 400, textAlign: "left" }}
      >
        <p><b>Nama:</b> {storedUser.name}</p>
        <p><b>Email:</b> {storedUser.email}</p>
        <p><b>Role:</b> {localStorage.getItem("role") || "User"}</p>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    background: "#f5f5f5",
  },
};

export default Profile;
