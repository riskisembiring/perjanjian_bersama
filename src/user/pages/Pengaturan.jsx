import { Form, Input, Button, Card, message } from "antd";

function Pengaturan() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Guest",
    email: "guest@example.com",
  };

  const [form] = Form.useForm();

  const handleSave = (values) => {
    // Simpan ke localStorage (simulasi, nanti bisa ke backend)
    const updatedUser = {
      ...storedUser,
      name: values.name,
      email: values.email,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    message.success("Pengaturan berhasil disimpan!");
  };

  return (
    <div style={styles.container}>
      <Card
        title="Pengaturan Akun"
        bordered={false}
        style={{ width: 500, textAlign: "left" }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            name: storedUser.name,
            email: storedUser.email,
          }}
        >
          <Form.Item
            label="Nama"
            name="name"
            rules={[{ required: true, message: "Nama tidak boleh kosong" }]}
          >
            <Input placeholder="Masukkan nama lengkap" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email tidak boleh kosong" },
              { type: "email", message: "Format email tidak valid" },
            ]}
          >
            <Input placeholder="Masukkan email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
          </Form.Item>
        </Form>
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

export default Pengaturan;
