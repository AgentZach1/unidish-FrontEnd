import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const ExternUser = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://connect.weiss.land/api/unidish/getUserByID`, {
                    params: { userId }
                });
                console.log(response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('Error fetching user data');
            }
        };

        fetchUserData();
    }, [userId]);

    if (!userData) {
        return (
            <div className="extern-user">
                Loading...
            </div>
        );
    }
    return (
        <div className="extern-user">
            <h1>External User</h1>
            <p>Username: {userData.Username}</p>
            <p>First Name: {userData.FName}</p>
            <p>Last Name: {userData.LName}</p>
            <p>Profile Description: {userData.Profile_Description}</p>
        </div>
    );
};

export default ExternUser;