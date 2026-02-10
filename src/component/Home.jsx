import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Book Movies. Pick Seats. Enjoy 🎥</h1>
      <p>Your one-stop destination for movie tickets.</p>

      <button style={styles.cta} onClick={() => navigate("/movies")}>
        Explore Movies
      </button>
    </div>
  );
};

export default Home;

const styles = {
  container: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #020617, #0f172a)",
    color: "white",
    textAlign: "center"
  },
  cta: {
    marginTop: "20px",
    padding: "12px 24px",
    backgroundColor: "#38bdf8",
    border: "none",
    borderRadius: "25px",
    fontSize: "16px",
    cursor: "pointer"
  }
};
