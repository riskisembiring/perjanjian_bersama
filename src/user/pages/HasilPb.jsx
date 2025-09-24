import { useEffect, useState } from "react";
import { Table, Tag, Input } from "antd"; // tambahkan Input
import "./css/HasilPb.css";

const { Search } = Input;

function HasilPb() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

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
    },
  ];

  // filter data berdasarkan pencarian
  const filteredData = data.filter(
    (item) =>
      item.pemohon.toLowerCase().includes(searchText.toLowerCase()) ||
      item.tanggal.toLowerCase().includes(searchText.toLowerCase()) ||
      item.status.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.alasan && item.alasan.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div className="hasilpb-container">
      <div className="hasilpb-table-wrapper">
        <h2 className="hasilpb-title">📑 Hasil PB</h2>

        {/* Input Pencarian */}
        <Search
          placeholder="Cari berdasarkan pemohon, tanggal, status, alasan..."
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16, maxWidth: 400 }}
          allowClear
        />
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          rowKey="no"
          bordered
          size="middle"
          className="custom-table"
          scroll={{ x: "max-content" }}   // biar bisa scroll horizontal
        />
        <h4 className="hasilpb-subtitle">
          * Hasil proses verifikasi akan diinfokan melalui kontak resmi Pengadilan Negeri Ternate.
        </h4>
      </div>
    </div>
  );
}

export default HasilPb;
