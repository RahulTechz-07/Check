import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// // Pages (you'll create these later)
import Home from "./pages/Home";
import Events from "./pages/Events";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <Router>
       <ScrollToTop /> 
      <Navbar />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
         <ToastContainer position="top-right" autoClose={3000}/>

      </main>
      <Footer />
    </Router>
  );
}

export default App;

