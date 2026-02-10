


import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo} onClick={() => navigate("/")}>
        🎬 MovieBook
      </h2>

      <div style={styles.links}>
        
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/movies"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Movies
        </NavLink>

        
        {!isLoggedIn ? (
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        ) : (
          <>
            <NavLink
              to="/dashboard"
              style={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Dashboard
            </NavLink>

            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
            <button
              onClick={() => navigate("/login")}
              style={styles.primaryBtn}
            >
              Sign In
            </button>

          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 30px",
    backgroundColor: "#020617",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
  },

  logo: {
    color: "#38bdf8",
    fontSize: "22px",
    fontWeight: "700",
    cursor: "pointer"
  },

  links: {
    display: "flex",
    gap: "18px",
    alignItems: "center"
  },

  link: {
    textDecoration: "none",
    color: "#e5e7eb",
    fontSize: "15px",
    fontWeight: "500",
    padding: "6px 10px"
  },

  activeLink: {
    textDecoration: "none",
    color: "#38bdf8",
    fontSize: "15px",
    fontWeight: "600",
    borderBottom: "2px solid #38bdf8"
  },

  primaryBtn: {
    padding: "8px 18px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "500"
  },

  logoutBtn: {
    padding: "7px 14px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
