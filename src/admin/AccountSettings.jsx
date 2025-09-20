import { useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Select } from "antd";

function AccountSettings() {
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // user yang sedang diedit
  const [newRole, setNewRole] = useState("");

  const fetchAccounts = async () => {
    try {
      const res = await fetch("https://backend-perjanjian-bersama.vercel.app/accounts");
      const accounts = await res.json();
      setData(accounts);
    } catch (error) {
      console.error("Error fetch accounts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://backend-perjanjian-bersama.vercel.app/accounts/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      alert(result.message);
      fetchAccounts(); // refresh data
    } catch (error) {
      console.error("Error delete account:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    setNewRole(record.role); // default isi role sekarang
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    try {
      const res = await fetch(`https://backend-perjanjian-bersama.vercel.app/accounts/${editingUser.key}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const result = await res.json();
      alert(result.message);
      setEditingUser(null); // tutup modal
      fetchAccounts(); // refresh data
    } catch (error) {
      console.error("Error update account:", error);
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
            <Button type="link" danger onClick={() => handleDelete(record.key)}>
                Hapus
            </Button>
            </>
        )}
        </>
    ),
    }
  ];

  return (
    <div>
      <h2>👥 Pengaturan Akun</h2>
      <Table columns={columns} dataSource={data} pagination={false} />

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
