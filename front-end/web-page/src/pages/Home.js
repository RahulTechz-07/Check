import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import CountdownTimer from "./CountdownTimer";
import aamecimage from "../images/aamec_background.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="welcome-heading">Welcome You All... 🙏</h1>

  <section className="hero-section">
  <div className="hero-content">
    <h1>ITechians-2K25</h1>
    <p>National Level IT Symposium</p>
    <p>Organized by Department of Information Technology, AAMEC College</p>
    <p>Date: August 30, 2025 | Venue: AAMEC College PG Campus</p>
    <div style={{ height: "60px" }}></div>
    <Link to="/register" className="register-btn">Register Now</Link>
  </div>
</section>


      {/* About College / Dept */}
      <section className="about-section">
        <h2>About AAMEC</h2>
        <img src={aamecimage} className="about-img" alt="AAMEC College" />
        <p>
          AAMEC constantly strives for excellence. We, at AAMEC aim at ensuring that the students who bear the seal of AAMEC are capable of competing in
          any global context with success and distinction. Located in a sprawling campus of about 65 acres of land at the historic site of Kovilvenni,
          AAMEC provides the right environment for students to showcase their talents and network with peers across the nation.
        </p>
      </section>

      {/* Why Participate */}
      <section className="why-section">
        <h2>BENEFITS OF PARTICIPATION</h2>
        <div className="benefits-grid">
          <div className="benefit-card">🏆 Exciting Competitions</div>
          <div className="benefit-card">🎓 Certificate of Participation</div>
          <div className="benefit-card">🧠 Skill-Based Challenges</div>
          <div className="benefit-card">🎁 Exciting Prizes & Swags</div>
        </div>
      </section>

      {/* Countdown Timer */}
      <CountdownTimer />

      {/* New Section: Facilities & Prizes */}
      <section className="facilities-section">
        <h2>Facilities & Prizes</h2>
        <div className="facility-grid">
          <div className="facility-card">
            🍽️ <strong>Food Provided:</strong> Only vegetarian lunch and snacks will be served for all participants.
          </div>
          <div className="facility-card">
            🚌 <strong>Transport Facility:</strong> Free college bus transport available from key locations (Contact coordinators).
          </div>
          <div className="facility-card">
            🏅 <strong>Prizes:</strong> Winners will receive cash prizes, certificates, and trophies for each event.
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
