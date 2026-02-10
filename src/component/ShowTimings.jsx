// import { useLocation, useParams } from "react-router-dom";

// const ShowTimings = () => {
//   const { movieId, hallId } = useParams();
//   const { state } = useLocation();

//   if (!state) {
//     return <h2>Data not available</h2>;
//   }

//   const { movie, hall } = state;

//   const timings = ["10:00 AM", "1:30 PM", "5:00 PM", "9:00 PM"];

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>🎬 {movie.title}</h2>
//       <h3>🏢 {hall.name}</h3>
//       <p>📍 {hall.location}</p>

//       <h4 style={{ marginTop: "20px" }}>⏰ Show Timings</h4>

//       <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
//         {timings.map((time) => (
//           <button key={time} style={styles.timeBtn}>
//             {time}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShowTimings;

// const styles = {
//   timeBtn: {
//     padding: "10px 15px",
//     border: "1px solid black",
//     backgroundColor: "lightgreen",
//     cursor: "pointer",
//     borderRadius: "5px"
//   }
// };



// import { useLocation } from "react-router-dom";
// import { useState } from "react";

// const ShowTimings = () => {
//   const { state } = useLocation();

//   if (!state) {
//     return <h2>Data not available</h2>;
//   }

//   const { movie, hall } = state;

//   // ✅ Current date by default
//   const today = new Date().toISOString().split("T")[0];

//   const [selectedDate, setSelectedDate] = useState(today);
//   const [selectedTime, setSelectedTime] = useState("");

//   // Mock show timings
//   const timings = ["10:00 AM", "1:30 PM", "5:00 PM", "9:00 PM"];

//   return (
//     <div style={{ padding: "20px" }}>
//       {/* 🎬 MOVIE & HALL INFO */}
//       <h2>🎬 {movie.title}</h2>
//       <h3>🏢 {hall.name}</h3>
//       <p>📍 {hall.location}</p>

//       {/* 📅 DATE SELECTION */}
//       <div style={{ marginTop: "20px" }}>
//         <h4>Select Date</h4>
//         <input
//           type="date"
//           value={selectedDate}
//           min={today}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           style={{ padding: "8px" }}
//         />
//       </div>

//       {/* ⏰ TIME SELECTION */}
//       <div style={{ marginTop: "25px" }}>
//         <h4>Select Show Time</h4>

//         <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
//           {timings.map((time) => (
//             <button
//               key={time}
//               onClick={() => setSelectedTime(time)}
//               style={{
//                 padding: "10px 15px",
//                 border: "1px solid black",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 backgroundColor:
//                   selectedTime === time ? "#22c55e" : "lightgray",
//                 color: selectedTime === time ? "white" : "black"
//               }}
//             >
//               {time}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ✅ CONFIRM SELECTION */}
//       {selectedTime && (
//         <div style={{ marginTop: "30px" }}>
//           <h4>✅ Selected Slot</h4>
//           <p>
//             📅 Date: <b>{selectedDate}</b>
//           </p>
//           <p>
//             ⏰ Time: <b>{selectedTime}</b>
//           </p>

//           <button
//             style={{
//               marginTop: "10px",
//               padding: "10px 20px",
//               backgroundColor: "#2563eb",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer"
//             }}
//           >
//             Proceed to Seat Selection
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowTimings;


import { useLocation } from "react-router-dom";
import { useState } from "react";

const ShowTimings = () => {
  const { state } = useLocation();

  if (!state) {
    return <h2>Data not available</h2>;
  }

  const { movie, hall } = state;
  const user = JSON.parse(localStorage.getItem("user"));

  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const timings = ["10:00 AM", "1:30 PM", "5:00 PM", "9:00 PM"];

  // ✅ Confirm Booking
  const confirmBooking = () => {
    const booking = {
      user: user.name,
      movie: movie.title,
      city: movie.city,
      cinemaHall: hall.name,
      location: hall.location,
      date: selectedDate,
      time: selectedTime
    };

    // Get previous bookings
    const existingBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    // Save new booking
    localStorage.setItem(
      "bookings",
      JSON.stringify([...existingBookings, booking])
    );

    setBookingSuccess(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎬 {movie.title}</h2>
      <h3>🏢 {hall.name}</h3>
      <p>📍 {hall.location}</p>

      {/* 📅 Date */}
      <div style={{ marginTop: "20px" }}>
        <h4>Select Date</h4>
        <input
          type="date"
          value={selectedDate}
          min={today}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* ⏰ Time */}
      <div style={{ marginTop: "20px" }}>
        <h4>Select Show Time</h4>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {timings.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              style={{
                padding: "10px",
                border: "1px solid black",
                borderRadius: "5px",
                backgroundColor:
                  selectedTime === time ? "#22c55e" : "#e5e7eb",
                color: selectedTime === time ? "white" : "black",
                cursor: "pointer"
              }}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Confirm Button */}
      {selectedTime && !bookingSuccess && (
        <button
          onClick={confirmBooking}
          style={{
            marginTop: "25px",
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Confirm Booking
        </button>
      )}

      {/* 🎉 SUCCESS MESSAGE */}
      {bookingSuccess && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#dcfce7",
            border: "2px solid #22c55e",
            borderRadius: "8px"
          }}
        >
          <h3>✅ Your ticket has been successfully booked!</h3>

          <p><b>User:</b> {user.name}</p>
          <p><b>Movie:</b> {movie.title}</p>
          <p><b>City:</b> {movie.city}</p>
          <p><b>Cinema Hall:</b> {hall.name}</p>
          <p><b>Date:</b> {selectedDate}</p>
          <p><b>Time:</b> {selectedTime}</p>
        </div>
      )}
    </div>
  );
};

export default ShowTimings;
