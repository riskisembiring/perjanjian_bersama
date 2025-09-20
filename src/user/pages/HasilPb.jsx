import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import "./css/HasilPb.css";

function HasilPb() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    fetch(`https://backend-perjanjian-bersama.vercel.app/hasil-pb/${user.id}`)
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
            status === "Selesai"
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
  ];

  return (
    <div className="hasilpb-container">
      <div className="hasilpb-table-wrapper">
        <h2 className="hasilpb-title">📑 Hasil PB</h2>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
}

export default HasilPb;
