import { useState, useEffect } from "react";
import { Table, Button, Tag, Modal, message } from "antd";

function ApprovalPB() {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/approval-pb");
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

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/approval-pb/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();
      if (res.ok) {
        message.success(result.message);
        fetchData(); // refresh data
        setIsModalVisible(false); // tutup modal setelah update
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
      <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />

      <Modal
        title="📂 Dokumen Pengajuan PB"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="approve"
            type="primary"
            onClick={() => handleUpdateStatus(selectedId, "Disetujui")}
          >
            ✅ Setujui
          </Button>,
          <Button
            key="reject"
            danger
            onClick={() => handleUpdateStatus(selectedId, "Ditolak")}
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
    </div>
  );
}

export default ApprovalPB;
