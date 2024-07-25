import React, { useState, useEffect } from "react";  
import { Link, useParams, useNavigate } from "react-router-dom"; 
import { FaTrashAlt, FaEdit } from "react-icons/fa"; 
import "./ParticipantList.css";  
import * as XLSX from 'xlsx';  
import { saveAs } from 'file-saver';  
import axios from 'axios';  

const ParticipantList = () => {  
    const { EventID } = useParams(); // Correctly destructuring to get eventId  
    const navigate = useNavigate();
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true); 
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user events and users
                const [eventsUsersResponse, usersResponse] = await Promise.all([
                    axios.get('http://localhost:3005/Events_Users'),
                    axios.get('http://localhost:3005/Users')
                ]);
                console.log('EventsUsersResponse:', eventsUsersResponse.data);
                console.log('UsersResponse:', usersResponse.data);

                // Create a map for Events_Users
                const eventsUsersMap = eventsUsersResponse.data.reduce((map, item) => {
                    if (!map[item.EventID]) {
                        map[item.EventID] = [];
                    }
                    map[item.EventID].push(item.UserID);
                    return map;
                }, {});

                console.log('Events Users Map:', eventsUsersMap);
                console.log('Current Event ID:', EventID);
                console.log('User IDs for current event:', eventsUsersMap[EventID]);


                // Get the list of users for the selected event
                const updatedUsers = usersResponse.data.filter(user =>
                    (eventsUsersMap[EventID] || []).includes(user.ID)
                );

                console.log('Filtered Users:', updatedUsers);

                setUsers(updatedUsers);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [EventID]); // Re-fetch when eventId changes


    const exportToExcel = () => {  
        const worksheet = XLSX.utils.json_to_sheet(users);  
        const workbook = XLSX.utils.book_new();  
        XLSX.utils.book_append_sheet(workbook, worksheet, "Katılımcılar");  
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });  
        saveAs(blob, 'katilimci-listesi.xlsx');  
    };  


    return (  
        <div className="container">  
            <header className="header">  
                <img src="./logo-esbas.png" alt="ESBAŞ Logo" className="logo" />  
            </header>  
            <div className="participant-list">  
                <div className="toolbar">  
                    <button className="excel-button" onClick={exportToExcel}>  
                        +Excel'e Aktar  
                    </button>  
                </div>  
                <h2> Katılımcı Listesi </h2> 
                {loading ? (
                    <p>Loading...</p>
                ):(
                    <div className="participants">  
                        <table>  
                            <thead>  
                                <tr>  
                                    <th> # </th>  
                                    <th> Ad Soyad </th>  
                                    <th> ID </th>  
                                    <th> Departman </th>  
                                    <th> Konum </th>  
                                    <th> Cinsiyet </th>
                                    <th> İşlemler</th>  
                                </tr>  
                            </thead>  
                            <tbody>  
                                {users.map((user, index) => (  
                                    <tr key={user.ID}>  
                                        <td> {index + 1} </td>  
                                        <td> {user.FullName} </td>  
                                        <td> {user.UserID} </td>  
                                        <td> {user.Department} </td>  
                                        <td> {user.IsOfficeEmployee} </td>  
                                        <td> {user.Gender} </td> 
                                        <td> 
                                            <button className="update-button">
                                            <FaEdit />
                                            </button>
                                            <button className= "delete-button">
                                            <FaTrashAlt />
                                            </button>
                                        </td> 
                                    </tr>  
                                ))}  
                            </tbody>  
                        </table>  
                    </div>  
                   )}
                <Link to={`/add-new-participant/${EventID}`} className="add-button">  
                    Yeni Katılımcı  
                </Link> 
                
            </div>  
        </div>  
    );  
};  

export default ParticipantList;  
