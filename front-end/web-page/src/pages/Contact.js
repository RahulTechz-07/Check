import React from 'react';
import './Contact.css';

const coordinators = {
  hod: {
    name: "Dr. K. Mohan",
    role: "Head of Department, IT",
    phone: "98765432xx"
  },
  overallStaff: [
    { name: "Dr. V. Kalaivazhi", phone: "98456789xx" },
    { name: "Prof. Mrs. R. Priya", phone: "98234567xx" },
    { name: "Prof. Mrs.G.Jeyasri", phone: "98123456xx" },
    { name: "Mrs. M.C. Jayaprasanna", phone: "98012345xx" },
  ],
  overallStudents: [
    { name: "Rahul V", phone: "90012345xx" },
    { name: "Sachin S", phone: "90123456xx" },
    { name: "Meena P", phone: "90234567xx" },
    { name: "Santhosh A", phone: "90345678xx" },
  ],
  events: [
    {
      event: "Paper Presentation",
      staff: [
        { name: "Dr. V. Kalaivazhi", phone: "99012345xx" },
        { name: "Prof. Mrs. R. Priya", phone: "99123456xx" }
      ],
      students: [
        { name: "Kavin R", phone: "99345678xx" },
        { name: "Nisha M", phone: "99456789xx" },
        { name: "Hari K", phone: "99567890xx" },
        { name: "Deepika V", phone: "99678901xx" }
      ]
    },
    {
      event: "Debugging",
      staff: [
        { name: "Prof. Mrs.G.Jeyasri", phone: "99789012xx" },
        { name: "Prof. Dr.R.Rebekha", phone: "99890123xx" }
      ],
      students: [
        { name: "Ravi K", phone: "97654321xx" },
        { name: "Divya S", phone: "96543210xx" },
        { name: "Ajay M", phone: "95432109xx" },
        { name: "Sowmiya D", phone: "94321098xx" }
      ]
    },
    {
      event: "Web Designing",
      staff: [
        { name: "Prof. Mrs. V. Sivasakthi", phone: "91230123xx" },
        { name: "Prof. Mr. B. Venkatesh", phone: "92345678xx" }
      ],
      students: [
        { name: "Vishnu R", phone: "94567890xx" },
        { name: "Preethi M", phone: "95678901xx" },
        { name: "Sujith K", phone: "96789012xx" },
        { name: "Anitha S", phone: "97890123xx" }
      ]
    },
    {
      event: "Quiz",
      staff: [
        { name: "Prof. Mrs. J. SathiyaJothi", phone: "98901234xx" },
        { name: "Prof. Mrs. K. Sowndharya", phone: "97801234xx" }
      ],
      students: [
        { name: "Saravanan T", phone: "95601234xx" },
        { name: "Deepa L", phone: "94501234xx" },
        { name: "Manoj B", phone: "93401234xx" },
        { name: "Ramya P", phone: "92301234xx" }
      ]
    },
    {
      event: "Treasure Hunt",
      staff: [
        { name: "Prof. Mrs. S. Ponnarasi", phone: "93211234xx" },
        { name: "Prof. Mrs. S. Sudha", phone: "92121234xx" }
      ],
      students: [
        { name: "Karthik S", phone: "90941234xx" },
        { name: "Meera G", phone: "89851234xx" },
        { name: "Aravind T", phone: "88761234xx" },
        { name: "Sahana V", phone: "87671234xx" }
      ]
    },
    {
      event: "Photography",
      staff: [
        { name: "Prof. Mr. R. Rama Rajesh", phone: "86581234xx" },
        { name: "Prof. Mrs. N. Mohamed Haris", phone: "85491234xx" }
      ],
      students: [
        { name: "Lokesh R", phone: "83311234xx" },
        { name: "Kavitha S", phone: "82221234xx" },
        { name: "Yogesh K", phone: "81131234xx" },
        { name: "Anu B", phone: "80041234xx" }
      ]
    },
    {
      event: "Gaming",
      staff: [
        { name: "Prof. Mrs .M .C Jayaprasanna", phone: "78951234xx" },
        { name: "Prof. Mrs . Jansi", phone: "77861234xx" }
      ],
      students: [
        { name: "Arjun R", phone: "75681234xx" },
        { name: "Priya D", phone: "74591234xx" },
        { name: "Kishore M", phone: "73501234xx" },
        { name: "Sneha S", phone: "72411234xx" }
      ]
    }
  ],
  foodTeam: {
    staff: [
      { name: "Prof. Mr. R. Rama Rajesh", phone: "93210987xx" },
      { name: "Prof. Mrs. S. Ponnarasi", phone: "92109876xx" }
    ],
    students: [
      { name: "Lavanya", phone: "91234567xx" },
      { name: "Arun R", phone: "90213456xx" },
      { name: "Priya V", phone: "89123456xx" },
      { name: "Saran D", phone: "88012345xx" }
    ]
  }
};


const CoordinatorList = ({ title, members }) => (
  <div className="coordinator-group fade-in">
    <h3>{title}</h3>
    <ul>
      {members.map((person, index) => (
        <li key={index}>
          <span>{person.name}</span>
          <a href={`tel:${person.phone}`}>{person.phone}</a>
        </li>
      ))}
    </ul>
  </div>
);

const Contact = () => {
  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Information</h1>

      {/* 🎓 HOD Section */}
      <section className="hod fade-in delay-1">
        <h2>HOD</h2>
        <p><strong>{coordinators.hod.name}</strong> - {coordinators.hod.role}</p>
        <a href={`tel:${coordinators.hod.phone}`}>{coordinators.hod.phone}</a>
      </section>

      {/* 🤝 Overall Coordinators */}
      <section className="overall fade-in delay-2">
        <h2>Overall Coordinators</h2>
        <CoordinatorList title="Staff Members" members={coordinators.overallStaff} />
        <CoordinatorList title="Student Members" members={coordinators.overallStudents} />
      </section>

      {/* 🎯 Events Coordinators */}
      <section className="events fade-in delay-3">
        <h2>Event Coordinators</h2>
        {coordinators.events.map((ev, idx) => (
  <div key={idx} className={`event-block event-${idx + 1} fade-in`}>
    <h3>{ev.event}</h3>
    <CoordinatorList title="Staff" members={ev.staff} />
    <CoordinatorList title="Students" members={ev.students} />
  </div>
))}

      </section>

      {/* 🍽️ Food & Snacks Coordinators */}
      <section className="food fade-in delay-4">
        <h2>Food & Snacks Coordinators</h2>
        <CoordinatorList title="Staff" members={coordinators.foodTeam.staff} />
        <CoordinatorList title="Students" members={coordinators.foodTeam.students} />
      </section>
    </div>
  );
};

export default Contact;
