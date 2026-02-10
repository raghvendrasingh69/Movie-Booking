


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const API_KEY = "4806a390cb0bdeb41ac3e0b8000ffc5e"; // ← put your key here
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function Dashboard({ setIsLoggedIn }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [loading, setLoading] = useState(true);

  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai"];


  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        const data = await res.json();

        const mappedMovies = data.results.map((movie, index) => ({
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          original_language: movie.original_language.toUpperCase(),
          poster: movie.poster_path
            ? `${IMAGE_URL}${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image",
          city: cities[index % cities.length] // fake city mapping
        }));

        setMovies(mappedMovies);
      } catch (error) {
        console.error("TMDB Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

 
  const filteredMovies = movies.filter((movie) => {
    const matchName = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCity = city === "All" || movie.city === city;

    return matchName && matchCity;
  });

  return (
    <div style={{ padding: "20px" }}>
      
      <div style={styles.header}>
        <h2>Welcome, {user?.name} 👋</h2>
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        >
          <option value="All">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

    
      {loading ? (
        <h3>Loading movies...</h3>
      ) : (
        <div style={styles.grid}>
          {filteredMovies.map((movie) => (
            <div key={movie.id} style={styles.card}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={styles.image}
              />

              <h3>{movie.title}</h3>
              <p>📅 Year: {movie.release_date?.slice(0, 4)}</p>
              <p>⭐ Rating: {movie.vote_average}</p>
              <p>🌐 Language: {movie.original_language}</p>
              <p>🏙 City: {movie.city}</p>

              <button
                style={styles.button}
                onClick={() =>
                  navigate(`/cinemas/${movie.id}`, { state: movie })
                }
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;


const styles = {
  header: {
    border: "2px solid black",
    padding: "20px",
    marginBottom: "30px",
    backgroundColor: "lightyellow",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoutBtn: {
    border: "2px solid black",
    backgroundColor: "lightblue",
    padding: "6px 12px",
    cursor: "pointer"
  },
  filters: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px"
  },
  input: {
    padding: "8px",
    fontSize: "14px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  image: {
    width: "100%",
    height: "320px",
    objectFit: "cover",
    borderRadius: "6px"
  },
  button: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};
