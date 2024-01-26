import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GalacticDashboard = () => {
    const [username, setUsername] = useState('');
    const [spaceMissions, setSpaceMissions] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/userdetails', {
                    headers: { Authorization: `${token}` },
                });

                setUsername(response.data.name);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        const hardcodedMissions = [
            { id: 1, name: 'Mission Alpha', description: "In the year 2145, the Interstellar Explorer spacecraft embarks on a groundbreaking mission to explore the with state art instruments, the crew aims to analyze exoplanets for signs of habitability and extraterrestrial life.As the spacecraft navigates the cosmic terrain, it encounters gravitational anomalies and cosmic phenomena, adding complexity to the thrilling journey.The mission promises unprecedented insights into the vastness of our universe." },
            { id: 2, name: 'Mission Beta', description: "In a daring venture, the Starlight Voyager sets course for the enigmatic Nebula Nexus, a celestial wonder shrouded in cosmic mysteries. Its mission: to unveil the secrets of dark matter anomalies and witness the birth of new stars. The crew, comprising elite  and unlock the secrets of the universe's stellar cradles." },
            { id: 3, name: 'Mission Gamma', description: "In the year 2145, the Interstellar Explorer spacecraft embarks on a groundbreaking mission to explore the mysterious Gliese 581 system. Equipped with sexoplanets for signs of habitability and extraterrestrial life. As the spacecraft navigates the cosmic terrain, it encounters gravitational anomalies and cosmic phenomena, adding complexity to the thrilling journey. The mission promises unprecedented insights into the vastness of our universe." },
        ];

        setSpaceMissions(hardcodedMissions);

        fetchUserDetails();
    }, []);

    return (
        <div className="p-8">
            <div className="bg-white p-6 rounded shadow-md mb-6">
                <h2 className="text-2xl font-bold">Welcome To the DashBoard, {username}!</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {spaceMissions.map((mission) => (
                    <div key={mission.id} className="bg-white p-4 rounded shadow-md">
                        <h3 className="text-lg font-semibold mb-2">{mission.name}</h3>
                        <p className="text-gray-600">{mission.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalacticDashboard;
