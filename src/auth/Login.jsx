import { useState } from "react";

function Login({ onSwitch, onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://backend-perjanjian-bersama.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`${data.message}\nSelamat datang, ${data.user.name}`);

        // simpan data user ke localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);

        // Reset form
        setUsername("");
        setPassword("");

        // Panggil callback sukses → pindah ke UserPage
        if (onSuccess) onSuccess(data.user);
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
        <h2 style={styles.title}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Memproses..." : "Login"}
        </button>
        <p style={styles.toggleText}>
          Belum punya akun?{" "}
          <span style={styles.link} onClick={onSwitch}>
            Daftar di sini
          </span>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5",
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

export default Login;
