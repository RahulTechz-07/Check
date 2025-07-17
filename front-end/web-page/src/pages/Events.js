import React from "react";
import "./Events.css";

const eventsData = [
  // 🛠 Technical Events
  {
    title: "Paper-Presentation",
    type: "Technical",
    image: require("../images/ppt.jpg"),
    description: "A competitive coding challenge to test logical thinking and speed.",
    coordinators: ["Rahul M - 9876543210"]
  },
  {
    title: "Tech Quiz",
    type: "Technical",
    image: require("../images/quizz.jpg"),
    description: "Quiz based on tech trends, hardware, software, and IT history.",
    coordinators: ["Vikram P - 9876543212"]
  },
  {
    title: "Debugging Hunt",
    type: "Technical",
    image: require("../images/debug.jpg"),
    description: "Find and fix the bugs in real-time code problems.",
    coordinators: ["Sanjana R - 9876543213"]
  },
  {
    title: "Web Design",
    type: "Technical",
    image: require("../images/webdesign.jpg"),
    description: "Show off your UI/UX and front-end skills under time pressure.",
    coordinators: ["Karthik A - 9876543214"]
  },
  // 🎉 Non-Technical Events
  {
    title: "Treasure Hunt",
    type: "Non-Technical",
    image: require("../images/tresurehunt.jpg"),
    description: "An adventurous hunt full of puzzles and campus clues.",
    coordinators: ["Aishwarya D - 9876543215"]
  },
  {
    title: "Photography",
    type: "Non-Technical",
    image: require("../images/photo.jpg"),
    description: "Capture the best moments of the day with creativity.",
    coordinators: ["Suresh K - 9876543216"]
  },
  {
    title: "Gaming Arena",
    type: "Non-Technical",
    image: require("../images/gaming.webp"),
    description: "Face off in popular multiplayer games for ultimate glory.",
    coordinators: ["Divya M - 9876543217"]
  }
];

const Events = () => {
  const technicalEvents = eventsData.filter(event => event.type === "Technical");
  const nonTechnicalEvents = eventsData.filter(event => event.type === "Non-Technical");

  return (
    <div className="events-container">
      <h1>Symposium Events</h1>

      {/* Technical Events Section */}
      <h2 className="event-section-title">Technical Events</h2>
      <div className="events-grid">
        {technicalEvents.map((event, index) => (
          <div className="event-card" key={index}>
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-info">
              <h2>{event.title}</h2>
              <p className="event-type">{event.type}</p>
              <p>{event.description}</p>
              <div className="coordinators">
                <strong>Coordinators:</strong>
                <ul>
                  {event.coordinators.map((coord, i) => (
                    <li key={i}>{coord}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Non-Technical Events Section */}
      <h2 className="event-section-title">Non-Technical Events</h2>
      <div className="events-grid center-non-tech">
        {nonTechnicalEvents.map((event, index) => (
          <div className="event-card" key={index}>
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-info">
              <h2>{event.title}</h2>
              <p className="event-type">{event.type}</p>
              <p>{event.description}</p>
              <div className="coordinators">
                <strong>Coordinators:</strong>
                <ul>
                  {event.coordinators.map((coord, i) => (
                    <li key={i}>{coord}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
