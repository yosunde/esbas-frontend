import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import EventList from './components/EventsList';
import CardReader from './components/CardReader'; 
import EventEnded from './components/EventEnded';
import AddNewParticipant from './components/AddNewParticipant';
import ParticipantList from './components/ParticipantList';
import EventUpdate from './components/EventUpdate';
import AddNewEvent from './components/AddNewEvent';
import EventType from './settings/EventType';
import EventLocation from './settings/EventLocation';
import ParticipantDepartment from './settings/ParticipantDepartment';
import ParticipantLocation from './settings/ParticipantLocation';
import ParticipantGender from './settings/ParticipantGender';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element= {<EventList />} /> 
                <Route path="/add-new-event" element= {<AddNewEvent />} /> 
                <Route path="/card-reader/:EventID" element= {<CardReader />} />
                <Route path="/event-ended/:EventID" element= {<EventEnded />} />
                <Route path="/add-new-participant/:EventID" element= {<AddNewParticipant />} />
                <Route path="/participant-list/:EventID" element={<ParticipantList />} />
                <Route path="/event-update/:EventID" element= {<EventUpdate />} />
                <Route path="/add-new-event/event-type" element= {<EventType />} />
                <Route path="/add-new-event/event-location" element= {<EventLocation />} />
                <Route path="/add-new-participant/participant-department" element= {<ParticipantDepartment />} />
                <Route path="/add-new-participant/participant-location" element= {<ParticipantLocation/>} />
                <Route path="/add-new-participant/participant-gender" element= {<ParticipantGender/>} />
            </Routes>
        </Router>
    );
}

export default App;

