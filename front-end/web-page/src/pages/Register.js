import React, { useState } from "react";
import "./Registration.css";
import axios from "axios";
import img from '../images/image.png';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  college: "",
  email: "",
  phone: "",
  food: "Yes",
  events: {
    section1: "",
    section2: "",
    section3: "",
    section4: ""
  }
};

const colleges = [
  "Select Your College",
  "Anna University",
  "PSG College of Technology",
  "SSN College of Engineering",
  "SASTRA University",
  "Coimbatore Institute of Technology",
  "Thiagarajar College of Engineering",
  "Velammal Engineering College",
  "Kongu Engineering College",
  "Kumaraguru College of Technology",
  "Others"
];

const eventDetails = {
  section1: [{ name: "Paper Presentation", type: "Technical" }],
  section2: [
    { name: "Debugging", type: "Technical" },
    { name: "Quiz", type: "Technical" }
  ],
  section3: [
    { name: "Web Designing", type: "Technical" },
    { name: "Treasure Hunt", type: "Non-Technical" }
  ],
  section4: [
    { name: "Photography", type: "Non-Technical" },
    { name: "Gaming", type: "Non-Technical" }
  ]
};

const sectionTimings = {
  section1: "10:30 AM – 1:30 PM",
  section2: "11:00 AM – 12:30 PM",
  section3: "12:30 PM – 2:00 PM",
  section4: "3:00 PM – 4:00 PM"
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEventChange = (section, value) => {
    const updatedEvents = { ...formData.events, [section]: value };
    setFormData({ ...formData, events: updatedEvents });

    const selectedEvents = Object.values(updatedEvents).filter(Boolean);
    const selectedTypes = selectedEvents.map((event) => {
      for (let sec in eventDetails) {
        const evt = eventDetails[sec].find((e) => e.name === event);
        if (evt) return evt.type;
      }
      return null;
    });

    const nonTechCount = selectedTypes.filter((type) => type === "Non-Technical").length;

    if (nonTechCount === 2) {
      setError("You cannot select both non-technical events.");
    } else if (selectedEvents.length > 2) {
      setError("You can select a maximum of 2 events.");
    } else {
      setError("");
    }

    const fee = selectedEvents.length === 2 ? 200 : selectedEvents.length === 1 ? 150 : 0;
    setAmount(fee);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.college || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (error) {
      alert("Fix form errors before submitting.");
      return;
    }

    try {
      const orderRes = await axios.post("https://symposiyum.onrender.com/create-order", {
        amount
      });

      const options = {
        key: "rzp_test_YourKeyIDHere", // 🔁 Replace with your Razorpay Test Key ID
        amount: orderRes.data.amount,
        currency: "INR",
        name: "IT Symposium",
        description: "Event Registration Fee",
        order_id: orderRes.data.id,
        handler: async function (response) {
          const registerRes = await axios.post("https://symposiyum.onrender.com/register", {
            ...formData,
            paymentId: response.razorpay_payment_id
          });

          toast.success(`${registerRes.data.message}\nTotal Paid: ₹${amount}`);
          setFormData(initialState);
          setAmount(0);

          setTimeout(() => {
            navigate("/");
          }, 3000);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#2563eb"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("This email is already registered.");
      } else {
        console.error(err);
        toast.error("Something went wrong during payment.");
      }
    }
  };

  const selectedCount = Object.values(formData.events).filter(Boolean).length;

  return (
    <div className="registration-container">
      <img src={img} className="img" alt="" />
      <h1>Register for Symposium</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-row">
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="college">College:</label>
          <select id="college" name="college" required value={formData.college} onChange={handleChange}>
            {colleges.map((clg, i) => (
              <option key={i} value={clg === "Select Your College" ? "" : clg}>{clg}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="food">Food Required:</label>
          <select id="food" name="food" value={formData.food} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <hr />
        <h2>Select Your Events (Max 2 Total)</h2>
        <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
          You are allowed to select only 1 or 2 events. Both non-technical events are not allowed.
        </p>

        {Object.keys(eventDetails).map((section) => {
          const isDisabled = !formData.events[section] && selectedCount >= 2;
          return (
            <div className="form-row" key={section}>
              <label htmlFor={section}>
                {section.toUpperCase()} ({sectionTimings[section]}):
              </label>
              <select
                id={section}
                disabled={isDisabled}
                value={formData.events[section]}
                onChange={(e) => handleEventChange(section, e.target.value)}
              >
                <option value="">-- Select Event --</option>
                {eventDetails[section].map((evt, i) => (
                  <option key={i} value={evt.name}>
                    {evt.name} ({evt.type})
                  </option>
                ))}
              </select>
            </div>
          );
        })}

        {error && <p className="error">{error}</p>}
        <h3>Total Payment: ₹{amount}</h3>
        <button type="submit" disabled={!!error}>Pay & Register</button>
      </form>
    </div>
  );
};

export default Register;
