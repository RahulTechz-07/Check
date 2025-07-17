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
  Sector
} from "recharts";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

// Custom color palette
const COLORS = [
  "#4e79a7", "#f28e2b", "#e15759", "#26cdbfff",
  "#41b932ff", "#edc948", "#b07aa1", "#ff9da7",
  "#9c755f", "#bab0ab"
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
  const navigate = useNavigate();

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
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>

        <h3 className="stat-heading">College-wise Count</h3>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={collegeChartData}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="value"
              isAnimationActive={true}
              activeIndex={activeIndex}
              onMouseEnter={onPieEnter}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {collegeChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend layout="horizontal" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
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
