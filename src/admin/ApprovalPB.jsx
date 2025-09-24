import { useState, useEffect } from "react";
import { Table, Button, Tag, Modal, message } from "antd";

function ApprovalPB() {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [rejectVisible, setRejectVisible] = useState(false);
  const [alasanTolak, setAlasanTolak] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://backend-perjanjian-bersama.vercel.app/approval-pb"
        // "http://localhost:5000/approval-pb"
      );
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Error fetch approval:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewDocs = (id, files) => {
    setSelectedId(id);
    setSelectedFiles(files);
    setIsModalVisible(true);
  };

  const handleUpdateStatus = async (id, status, alasan = "") => {
    try {
      const res = await fetch(
        `https://backend-perjanjian-bersama.vercel.app/approval-pb/${id}`,
        // `http://localhost:5000/approval-pb/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, alasan }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        message.success(result.message);
        fetchData();
      } else {
        message.error("Gagal update status: " + result.message);
      }
    } catch (error) {
      console.error("Error update:", error);
      message.error("Terjadi kesalahan update status.");
    }
  };

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Nama User", dataIndex: "nama", key: "nama" },
    { title: "Tanggal Upload", dataIndex: "tanggal", key: "tanggal" },
    { title: "Nama Pemohon", dataIndex: "namaPemohon", key: "namaPemohon" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Disetujui"
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
    },
    {
      title: "Aksi",
      key: "aksi",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            type="default"
            onClick={() => handleViewDocs(record.id, record.files)}
            style={{ marginRight: 8 }}
          >
            Lihat Dokumen
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Approval Permohonan PB</h2>
         <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        rowKey="no"
        bordered
        size="middle"
        className="custom-table"
      />
      <Modal
        title="📂 Dokumen Pengajuan PB"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="approve"
            type="primary"
            onClick={() => {
              handleUpdateStatus(selectedId, "Disetujui")
              setAlasanTolak("");
              setIsModalVisible(false);
            }}
          >
            ✅ Setujui
          </Button>,
          <Button
            key="reject"
            danger
            onClick={() => {
              setIsModalVisible(false);
              setRejectVisible(true);
            }}
          >
            ❌ Tolak
          </Button>,
        ]}
        width={800}
      >
        {Object.entries(selectedFiles).length === 0 ? (
          <p>Tidak ada dokumen.</p>
        ) : (
          <ul>
            {Object.entries(selectedFiles).map(([key, url]) => (
              <li key={key} style={{ marginBottom: "10px" }}>
                <b>{key}</b>:{" "}
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Buka Dokumen
                </a>
                <br />
                {url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <img
                    src={url}
                    alt={key}
                    style={{ maxWidth: "200px", marginTop: "5px" }}
                  />
                ) : url.match(/\.pdf$/i) ? (
                  <iframe
                    src={url}
                    width="100%"
                    height="400px"
                    title={key}
                  ></iframe>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Modal>
      <Modal
        title="Alasan Penolakan"
        open={rejectVisible}
        onCancel={() => setRejectVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setRejectVisible(false)}>
            Batal
          </Button>,
          <Button
            key="submit"
            danger
            onClick={() => {
              handleUpdateStatus(selectedId, "Ditolak", alasanTolak);
              setRejectVisible(false);
              setAlasanTolak(""); // reset
            }}
          >
            Kirim Penolakan
          </Button>,
        ]}
      >
        <textarea
          value={alasanTolak}
          onChange={(e) => setAlasanTolak(e.target.value)}
          placeholder="Tuliskan alasan penolakan..."
          rows={4}
          style={{ width: "100%", padding: "8px" }}
          maxLength={200}
        />
      </Modal>
      ;
    </div>
  );
}

export default ApprovalPB;
