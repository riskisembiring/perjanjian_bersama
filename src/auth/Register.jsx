import { useState } from "react";

function Register({ onSwitch }) {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [namaPerusahaan, setNamaPerusahaan] = useState("");
  const [noHp, setNoHp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://backend-perjanjian-bersama.vercel.app/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nama,
          email,
          namaPerusahaan,
          noHp,
          username,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`${data.message}\nNama: ${nama}\nUsername: ${username}`);
        // reset form
        setNama("");
        setEmail("");
        setNamaPerusahaan("");
        setNoHp("");
        setUsername("");
        setPassword("");
        onSwitch();
      } else {
        alert(`Gagal: ${data.message}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan saat menghubungi server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Buat Akun</h2>

        <input
          type="text"
          placeholder="Nama Lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          style={styles.input}
          maxLength={30}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          maxLength={30}
          required
        />
        <input
          type="text"
          placeholder="Nama Perusahaan"
          value={namaPerusahaan}
          onChange={(e) => setNamaPerusahaan(e.target.value)}
          style={styles.input}
          maxLength={30}
          required  
        />
        <input
          type="text"
          placeholder="No HP"
          value={noHp}
          onChange={(e) => setNoHp(e.target.value)}
          style={styles.input}
          maxLength={15}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          maxLength={30}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          maxLength={30}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Mendaftar..." : "Daftar"}
        </button>
        <p style={styles.toggleText}>
          Sudah punya akun?{" "}
          <span style={styles.link} onClick={onSwitch}>
            Login di sini
          </span>
        </p>
      </form>
    </div>
  );
}

// Reuse same style
const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: 'url("/background.jpg")', 
    backgroundSize: "cover",
    backgroundPosition: "center", 
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "350px",
  },
  title: { textAlign: "center", marginBottom: "1.5rem", color: "#333" },
  input: {
    marginBottom: "1rem",
    padding: "0.75rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "0.75rem",
    border: "none",
    borderRadius: "6px",
    background: "#007bff",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  toggleText: {
    marginTop: "1rem",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#555",
  },
  link: { color: "#007bff", cursor: "pointer", fontWeight: "bold" },
};

export default Register;
