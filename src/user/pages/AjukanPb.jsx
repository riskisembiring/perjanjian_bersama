import { useState, useEffect } from "react";
import { Modal } from "antd";
import { Upload } from "upload-js";
import "./css/AjukanPb.css";

function AjukanPb() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [namaPemohon, setNamaPemohon] = useState("");

  const upload = new Upload({ apiKey: "public_kW2K8YTEByNL3BnDdkvQJuhfcbED" });

  useEffect(() => {
    setIsModalVisible(true);
  }, []);

  // ✅ Simpan file ke cache saja (tidak upload dulu)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;
    setSelectedFiles((prev) => ({ ...prev, [name]: file }));
  };

  // ✅ Submit (baru upload semua file ke Upload.io di sini)
  const doSubmit = async () => {
    setLoading(true);
    try {
      const uploadedFiles = {};
      for (const key in selectedFiles) {
        const file = selectedFiles[key];
        const { fileUrl } = await upload.uploadFile(file);
        uploadedFiles[key] = fileUrl;
      }

      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        userId: user?.id || "guest",
        namaUser: user?.name || "guest",
        namaPemohon,
        files: uploadedFiles,
      };

      const res = await fetch("https://backend-perjanjian-bersama.vercel.app/ajukan-pb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Dokumen berhasil diajukan!");
        setSelectedFiles({});
        setNamaPemohon("");
      } else {
        alert("Gagal: " + data.message);
      }
    } catch (error) {
      console.error("Error submit:", error);
      alert("Terjadi kesalahan saat submit.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmVisible(true); // tampilkan konfirmasi
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="title">Ajukan Perjanjian Bersama (PB)</h1>

          <div className="form-group">
            <label>👤 Nama Pemohon</label>
            <input
              type="text"
              value={namaPemohon}
              onChange={(e) => setNamaPemohon(e.target.value)}
              placeholder="Masukkan nama pemohon"
              required
            />
          </div>

          <div className="form-group">
            <label>📄 Surat Permohonan PB</label>
            <input type="file" name="suratPermohonan" onChange={handleFileChange} required />
            {selectedFiles["suratPermohonan"] && <small>{selectedFiles["suratPermohonan"].name}</small>}
          </div>

          <div className="form-group">
            <label>📑 Perjanjian Bersama</label>
            <input type="file" name="perjanjianBersama" onChange={handleFileChange} required />
            {selectedFiles["perjanjianBersama"] && <small>{selectedFiles["perjanjianBersama"].name}</small>}
          </div>

          <div className="form-group">
            <label>🖋️ Surat Kuasa</label>
            <input type="file" name="suratKuasa" onChange={handleFileChange} required />
            {selectedFiles["suratKuasa"] && <small>{selectedFiles["suratKuasa"].name}</small>}
          </div>

          <div className="form-group">
            <label>🏢 Akte Pendirian Perusahaan</label>
            <input type="file" name="aktePerusahaan" onChange={handleFileChange} required />
            {selectedFiles["aktePerusahaan"] && <small>{selectedFiles["aktePerusahaan"].name}</small>}
          </div>

          <div className="form-group">
            <label>💰 Tanda Pembayaran</label>
            <input type="file" name="tandaPembayaran" onChange={handleFileChange} required />
            {selectedFiles["tandaPembayaran"] && <small>{selectedFiles["tandaPembayaran"].name}</small>}
          </div>

          <div className="form-group">
            <label>🆔 KTP Pegawai</label>
            <input type="file" name="ktpPegawai" onChange={handleFileChange} required />
            {selectedFiles["ktpPegawai"] && <small>{selectedFiles["ktpPegawai"].name}</small>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "⏳ Mengirim..." : "Kirim Dokumen"}
          </button>
        </form>
      </div>

      {/* Modal syarat */}
      <Modal
        title="📌 Syarat Permohonan PB"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <button
            key="ok"
            onClick={() => setIsModalVisible(false)}
            style={{
              backgroundColor: "#52c41a",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "6px 16px",
              cursor: "pointer"
            }}
          >
            Saya Mengerti
          </button>,
        ]}
      >
        <ul>
          <li>Nama Pemohon</li>
          <li>Surat Permohonan PB</li>
          <li>Perjanjian Bersama</li>
          <li>Surat Kuasa</li>
          <li>Akte Pendirian Perusahaan</li>
          <li>Tanda Pembayaran</li>
          <li>KTP Pegawai</li>
        </ul>
      </Modal>

      {/* Modal konfirmasi */}
      <Modal
        title="Konfirmasi Pengiriman"
        open={confirmVisible}
        onCancel={() => setConfirmVisible(false)}
        footer={[
          <button key="cancel" onClick={() => setConfirmVisible(false)} disabled={loading}>
            Batal
          </button>,
          <button
            key="submit"
            onClick={() => {
              doSubmit();
              setConfirmVisible(false);
            }}
            disabled={loading}
            style={{
              backgroundColor: "#1890ff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "6px 16px",
              cursor: "pointer"
            }}
          >
            {loading ? "⏳ Mengirim..." : "Ya, Kirim"}
          </button>,
        ]}
      >
        <p>Apakah kamu yakin ingin mengirim dokumen?</p>
        <ul>
          {Object.keys(selectedFiles).map((key) => (
            <li key={key}>{key}: {selectedFiles[key].name}</li>
          ))}
        </ul>
      </Modal>
    </>
  );
}

export default AjukanPb;
