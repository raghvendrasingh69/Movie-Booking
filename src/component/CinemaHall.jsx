import { useLocation, useNavigate, useParams } from "react-router-dom";

const CinemaHall = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { state: movie } = useLocation();

  if (!movie) {
    return <h2>Movie not found</h2>;
  }

  // Mock cinema halls
  const cinemaHalls = [
    { id: 1, name: "PVR Cinemas", location: "Mall Road" },
    { id: 2, name: "INOX", location: "City Center" },
    { id: 3, name: "Cinepolis", location: "Downtown" }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎬 {movie.title}</h2>
      <p>⭐ Rating: {movie.vote_average}</p>
      <p>🌐 Language: {movie.original_language}</p>

      <h3 style={{ marginTop: "30px" }}>
        🏢 Available Cinema Halls
      </h3>

      <div style={{ marginTop: "15px" }}>
        {cinemaHalls.map((hall) => (
          <div
            key={hall.id}
            style={styles.card}
            onClick={() =>
              navigate(
                `/shows/${movieId}/${hall.id}`,
                { state: { movie, hall } }
              )
            }
          >
            <h4>{hall.name}</h4>
            <p>📍 {hall.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaHall;

const styles = {
  card: {
    border: "1px solid black",
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#f9fafb"
  }
};
