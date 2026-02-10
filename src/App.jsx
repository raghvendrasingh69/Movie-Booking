// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Login from "./component/login";
// import Register from "./component/Register";
// import Dashboard from "./component/Dashboard";
// import Navbar from "./component/Navbar";
// import CinemaHall from "./component/CinemaHall";
// import ShowTimings from "./component/ShowTimings";


// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const loginStatus = localStorage.getItem("isLoggedIn");
//     if (loginStatus === "true") {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <Router>
//       <Navbar />

//       <Routes>
//         {/* Login Route */}
//         <Route
//           path="/login"
//           element={
//             isLoggedIn ? (
//               <Navigate to="/dashboard" />
//             ) : (
//               <Login setIsLoggedIn={setIsLoggedIn} />
//             )
//           }
//         />

//         {/* Register Route */}
//         <Route
//           path="/register"
//           element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
//         />

//         {/* Protected Dashboard Route */}
//         <Route
//           path="/dashboard"
//           element={
//             isLoggedIn ? (
//               <Dashboard setIsLoggedIn={setIsLoggedIn} />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route
//           path="/cinemas/:movieId"
//           element={isLoggedIn ? <CinemaHall /> : <Navigate to="/login" />}
//         />

//         <Route
//           path="/shows/:movieId/:hallId"
//           element={isLoggedIn ? <ShowTimings /> : <Navigate to="/login" />}
//         />



//         {/* Default Route */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./component/login";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
import Navbar from "./component/Navbar";
import CinemaHall from "./component/CinemaHall";
import ShowTimings from "./component/ShowTimings";

// ✅ ADD THESE
import Home from "./component/Home";
import ExploreMovies from "./component/ExploreMovies";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      {/* ✅ UPDATED */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        {/* ✅ NEW ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<ExploreMovies />} />

        {/* Existing routes — unchanged */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
        />

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/cinemas/:movieId"
          element={isLoggedIn ? <CinemaHall /> : <Navigate to="/login" />}
        />

        <Route
          path="/shows/:movieId/:hallId"
          element={isLoggedIn ? <ShowTimings /> : <Navigate to="/login" />}
        />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
