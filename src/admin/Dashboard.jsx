import { useState, useEffect } from "react";
import { UserOutlined, FileTextOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "./css/Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    pengajuan: 0,
    dokumen: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://backend-perjanjian-bersama.vercel.app/stats");
        if (!res.ok) throw new Error("Gagal fetch data");
        const data = await res.json();

        // ✅ Ambil dari data.stats
        setStats({
          users: data.stats?.users || 0,
          pengajuan: data.stats?.pengajuan || 0,
          dokumen: data.stats?.dokumen || 0,
        });
      } catch (error) {
        console.error("Error ambil stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>📊 Selamat Datang di Admin Dashboard</h2>
      <p>Gunakan menu di sebelah kiri untuk navigasi.</p>

      {loading ? (
        <p>⏳ Memuat data...</p>
      ) : (
        <div className="stats-grid">
          <div className="card user-card">
            <UserOutlined className="icon" />
            <h3>{stats.users}</h3>
            <p>Total User</p>
          </div>

          <div className="card pengajuan-card">
            <FileTextOutlined className="icon" />
            <h3>{stats.pengajuan}</h3>
            <p>Pengajuan PB</p>
          </div>

          <div className="card dokumen-card">
            <CheckCircleOutlined className="icon" />
            <h3>{stats.dokumen}</h3>
            <p>Dokumen Terkirim</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
