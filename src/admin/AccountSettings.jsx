import { useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Select, message } from "antd";

function AccountSettings() {
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [modal, contextHolder] = Modal.useModal();

  const fetchAccounts = async () => {
    try {
      const res = await fetch("https://backend-perjanjian-bersama.vercel.app/accounts");
      const accounts = await res.json();
      setData(accounts);
    } catch (error) {
      console.error("Error fetch accounts:", error);
      message.error("Gagal mengambil data akun.");
    }
  };

  // ✅ Perbaikan handleDelete
  const handleDelete = (id) => {
    modal.confirm({
      title: "Konfirmasi Hapus",
      content: "Apakah kamu yakin ingin menghapus akun ini?",
      okText: "Ya, Hapus",
      cancelText: "Batal",
      okType: "danger",
      onOk: async () => {
        try {
          const res = await fetch(
            `https://backend-perjanjian-bersama.vercel.app/accounts/${id}`,
            { method: "DELETE" }
          );

          const result = await res.json();
          if (res.ok) {
            message.success("Akun berhasil dihapus");
            fetchAccounts();
          } else {
            message.error("Gagal menghapus akun: " + result.message);
          }
        } catch (error) {
          console.error("Error hapus akun:", error);
          message.error("Terjadi kesalahan saat menghapus akun.");
        }
      },
    });
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    setNewRole(record.role);
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    try {
      const res = await fetch(
        `https://backend-perjanjian-bersama.vercel.app/accounts/${editingUser.key}/role`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        message.success(result.message);
        setEditingUser(null);
        fetchAccounts();
      } else {
        message.error("Gagal update role: " + result.message);
      }
    } catch (error) {
      console.error("Error update account:", error);
      message.error("Terjadi kesalahan update akun.");
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Nama", dataIndex: "nama", key: "nama" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Nama Perusahaan", dataIndex: "perusahaan", key: "perusahaan" },
    { title: "No HP", dataIndex: "noHp", key: "noHp" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "Admin" ? "red" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: "Aksi",
      key: "aksi",
      align: "center",
      render: (_, record) => (
        <>
          {record.nama !== "Denggan Nahason Aritonang" && (
            <>
              <Button type="link" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              {/* ✅ kirim record.key ke handleDelete */}
              <Button type="link" danger onClick={() => handleDelete(record.key)}>
                Hapus
              </Button>

              {contextHolder}
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>👥 Pengaturan Akun</h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        rowKey="no"
        bordered
        size="middle"
        className="custom-table"
        scroll={{ x: "max-content" }}
      />

      {/* Modal Edit */}
      <Modal
        title="Edit Role User"
        open={!!editingUser}
        onOk={handleUpdate}
        onCancel={() => setEditingUser(null)}
        okText="Update"
        cancelText="Batal"
      >
        <p><b>Nama:</b> {editingUser?.nama}</p>
        <p><b>Email:</b> {editingUser?.email}</p>
        <Select
          value={newRole}
          onChange={(value) => setNewRole(value)}
          style={{ width: "100%" }}
        >
          <Select.Option value="User">User</Select.Option>
          <Select.Option value="Admin">Admin</Select.Option>
        </Select>
      </Modal>
    </div>
  );
}

export default AccountSettings;
