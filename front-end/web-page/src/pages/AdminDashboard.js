// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LabelList
} from "recharts";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const COLORS = [
  "#ff6b6b", "#6a89cc", "#38ada9", "#f8c291", "#e55039",
  "#1e3799", "#78e08f", "#fad390", "#60a3bc", "#e66767"
];

const AdminDashboard = () => {
  const [participants, setParticipants] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    amount: 0,
    eventCounts: {},
    collegeCounts: {}
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await axios.get("https://symposiyum.onrender.com/participants");
        setParticipants(res.data);
        calculateStats(res.data);
      } catch (err) {
        console.error("Failed to fetch participants", err);
      }
    };
    fetchParticipants();
  }, []);

  const calculateStats = (data) => {
    const eventCounts = {};
    const collegeCounts = {};
    let total = data.length;
    let amount = 0;

    data.forEach((p) => {
      const eventsSelected = Object.values(p.events).filter(Boolean);
      const eventFee = eventsSelected.length === 2 ? 200 : eventsSelected.length === 1 ? 150 : 0;
      amount += eventFee;

      eventsSelected.forEach((event) => {
        eventCounts[event] = (eventCounts[event] || 0) + 1;
      });

      collegeCounts[p.college] = (collegeCounts[p.college] || 0) + 1;
    });

    setStats({ total, amount, eventCounts, collegeCounts });
  };

  const downloadExcel = () => {
    const formattedData = participants.map((p) => ({
      Name: p.name,
      College: p.college,
      Email: p.email,
      Phone: p.phone,
      Food: p.food,
      "Section 1": p.events.section1,
      "Section 2": p.events.section2,
      "Section 3": p.events.section3,
      "Section 4": p.events.section4
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Participants");
    XLSX.writeFile(wb, "Full_Participant_Details.xlsx");
  };

  const downloadEventWise = () => {
    const eventMap = {};

    participants.forEach((p) => {
      Object.values(p.events).forEach((event) => {
        if (event) {
          if (!eventMap[event]) eventMap[event] = [];
          eventMap[event].push({
            Name: p.name,
            College: p.college,
            Email: p.email,
            Phone: p.phone
          });
        }
      });
    });

    const wb = XLSX.utils.book_new();
    Object.entries(eventMap).forEach(([event, data]) => {
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, event);
    });

    XLSX.writeFile(wb, "EventWise_Participants.xlsx");
  };

  const eventChartData = Object.entries(stats.eventCounts).map(([event, count]) => ({
    name: event,
    count
  }));

  const collegeChartData = Object.entries(stats.collegeCounts).map(([college, count]) => ({
    name: college,
    value: count
  }));

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="stats-card">
        <p className="stat"><strong>Total Participants:</strong> {stats.total}</p>
        <p className="stat"><strong>Total Amount Collected:</strong> ₹{stats.amount}</p>

        <h3 className="stat-heading">Event-wise Count</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={eventChartData}>
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#007bff">
              {isMobile && (
                <LabelList
                  dataKey="name"
                  position="inside"
                  angle={-90}
                  fill="#fff"
                  fontSize={12}
                  style={{ textAnchor: "middle" }}
                />
              )}
              {!isMobile && <XAxis dataKey="name" />}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

      <h3 className="stat-heading">College-wise Count</h3>
<ResponsiveContainer width="100%" height={isMobile ? 220 : 320}>
  <PieChart>
    <Pie
      data={collegeChartData}
      cx="50%"
      cy="50%"
      outerRadius={isMobile ? 70 : 110}
      dataKey="value"
      isAnimationActive={true}
      activeIndex={activeIndex}
      label={isMobile ? ({ value }) => `${value}` : ({ name, value }) => `${name}: ${value}`}
    >
      {collegeChartData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
</ResponsiveContainer>

{/* Render Legend separately only on mobile */}
{isMobile && (
  <div className="mobile-college-legend">
    {collegeChartData.map((entry, index) => (
      <div key={index} className="legend-item">
        <span
          className="legend-color"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}
        ></span>
        <span className="legend-name">{entry.name}</span>
      </div>
    ))}
  </div>
)}


        {/* Display list of colleges only on mobile view */}
        
      </div>

      <div className="download-buttons">
        <button className="download-btn" onClick={downloadExcel}>Download Full Details</button>
        <button className="download-btn" onClick={downloadEventWise}>Download Event-wise Details</button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
