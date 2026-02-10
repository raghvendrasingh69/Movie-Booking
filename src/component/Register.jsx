import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formdata, setformData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handlechange = (e) => {
    setformData({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const handleregister = () => {
    if (!formdata.name || !formdata.email || !formdata.password) {
      alert("All fields required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formdata.email)) {
      alert("Please enter a valid email address");
      return;
    }

    localStorage.setItem("user", JSON.stringify(formdata));
    alert("Registration successful");
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Account</h2>
        <p style={styles.subText}>Join us and book movies easily 🎬</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handlechange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handlechange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handlechange}
          style={styles.input}
        />

        <button style={styles.button} onClick={handleregister}>
          Register
        </button>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;


const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "lightgreen",
  },

  card: {
    width: "340px",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    textAlign: "center"
  },

  heading: {
    marginBottom: "5px",
    color: "#0f172a"
  },

  subText: {
    marginBottom: "20px",
    fontSize: "14px",
    color: "#475569"
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #cbd5f5",
    fontSize: "14px",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "10px"
  },

  footerText: {
    marginTop: "18px",
    fontSize: "14px",
    color: "#475569"
  },

  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "500"
  }
};
