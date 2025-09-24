import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import "./css/HasilPb.css";

function HasilPb() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    fetch(`https://backend-perjanjian-bersama.vercel.app/hasil-pb/${user.id}`)
    // fetch(`http://localhost:5000/hasil-pb/${user.id}`)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error("Error fetch hasil PB:", err));
  }, []);

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Tanggal Upload", dataIndex: "tanggal", key: "tanggal" },
    { title: "Nama Pemohon", dataIndex: "pemohon", key: "pemohon" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Diterima"
              ? "green"
              : status === "Ditolak"
              ? "red"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Alasan",
      dataIndex: "alasan",
      key: "alasan",
      render: (alasan) => (alasan ? alasan : "-"),
    }
  ];

  return (
    <div className="hasilpb-container">
      <div className="hasilpb-table-wrapper">
        <h2 className="hasilpb-title">📑 Hasil PB</h2>
        <Table columns={columns} dataSource={data} pagination={false} />
        <h4 className="hasilpb-subtitle">* Hasil proses verifikasi akan di infokan melalui kontak resmi Pengadilan Negeri Ternate.</h4>
      </div>
    </div>
  );
}

export default HasilPb;
