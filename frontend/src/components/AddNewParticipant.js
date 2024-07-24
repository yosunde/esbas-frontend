import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddNewParticipant.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const AddNewParticipant = () => {
  const navigate = useNavigate();
  const {eventId} = useParams();
  const [form, setForm] = useState({
    "name-surname": "",
    "card-id" : "",
    department: "",
    konum: "",
    cinsiyet: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       // Add the new user
       const userResponse = await axios.post('http://localhost:3005/users', form);
      
       // Link the new user to the event
       const userId = userResponse.data.id; // Get the new user's ID
       await axios.post('http://localhost:3005/userEvents', { eventId: parseInt(eventId), userId });
 
       navigate(`/participant-list/${eventId}`);
     } catch (error) {
       console.error('Error adding participant:', error);
     }
  };

  const handleIconClick = (path) => {
    navigate(path);
  };


  return (
    <div className="add-participant-container">
      <header className="header">
        <img src={"./logo-esbas.png"} className="logo" alt="ESBAŞ Logo" />
      </header>{" "}
      <div className="add-participant">
        <h2> Yeni Katılımcı Ekle </h2>{" "}
        <form onSubmit={handleSubmit}>
          <label>
            Ad Soyad:
            <input
              type="text"
              name="name-surname"
              value={form["name-surname"]}
              onChange={handleChange}
              required
            />
          </label>{" "}
          <label>
            ID:
            <input
              type="text"
              name="card-id"
              value={form["card-id"]}
              onChange={handleChange}
              required
            />
          </label>{" "}
          <label>
            Departman:
            <FontAwesomeIcon
            icon = {faCog}
            onClick={() => handleIconClick('/add-new-participant/participant-department')}
            className="icon"
            />
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value=""> Seçiniz </option>{" "}
              <option value="İnsan Kaynakları"> İnsan Kaynakları </option>{" "}
              <option value="Bilgi İşlem"> Bilgi İşlem </option>{" "}
            </select>{" "}
          </label>{" "}
          <label>
            Çalışma Alanı:
            <FontAwesomeIcon
            icon = {faCog}
            onClick={() => handleIconClick('/add-new-participant/participant-location')}
            className="icon"
            />
            <select
              name="konum"
              value={form.konum}
              onChange={handleChange}
              required
            >
              <option value=""> Seçiniz </option>{" "}
              <option value="Ofis"> Ofis </option>{" "}
              <option value="Saha"> Saha </option>{" "}
            </select>{" "}
          </label>{" "}
          <label>
            Cinsiyet:
            <FontAwesomeIcon
            icon = {faCog}
            onClick={() => handleIconClick('/add-new-participant/participant-gender')}
            className="icon"
            />
            <select
              name="cinsiyet"
              value={form.cinsiyet}
              onChange={handleChange}
              required
            >
              <option value=""> Seçiniz </option>{" "}
              <option value="Kadın"> Kadın </option>{" "}
              <option value="Erkek"> Erkek </option>{" "}
            </select>{" "}
          </label>{" "}
          <button type="submit"> Kaydet </button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};

export default AddNewParticipant;
