import { Button } from "@mui/material";
import { getUserByToken } from "../Axios/APICalls";
import React, { useEffect, useState } from "react";

const Profile = () => {
    const [userP, setUserP] = useState();
    const [formData, setFormData] = useState({
        password: "",
        checkPassword: "",
      });
    // const currUser = useSelector((state) => state.user.userInfo);

    const handleDisplay = async (e) => {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            const user = await getUserByToken(token);
            console.log(user);
            setUserP(user);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const user = await getUserByToken(token);
                console.log(user);
                setUserP(user);
            } catch (error) {
                console.error("Failed to fetch user: ", error);
            }
        };
        fetchUser();
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePass = async (e) => {
        e.preventDefault();
        try {
            // API CALL
            const changeResponse = await changePassword(formData);
            if (changeResponse) {
                console.log(changeResponse.data);
                console.log("Successfully changed password");
            }
        } catch (err) {
            console.log("Error during password change", err);
        }
        console.log("Password change attempt");
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        try {
            // API CALL
            const deleteResponse = await deleteAccount(localStorage.getItem("token"));
            if (deleteResponse) {
                console.log(deleteResponse.data);
                console.log("Successfully deleted account");
                navigate("/unidish-test/DiningHalls");
            }
        } catch (err) {
            console.log("Error during account deletion", err);
        }
        console.log("Account deletion attempt");
    };
    
    return (
    <div className="profile-container">
        <p>Profile</p>
        <Button
        onClick={handleDisplay}>
            Click me!
        </Button>
        {userP && (
            <div className="profile-header">
                {userP.user.Username}
                <ul>
                    Hello, {userP.user.FName} {userP.user.LName}!
                </ul>
                <ul>
                    {userP.user.Description}
                </ul>
                <div className="profile-options">
                    Change Password:
                    <form className="change-password-form" onSubmit={handlePass}>
                        <TextField
                            className="change-password-field"
                            placeholder="new password"
                            required
                            type="password"
                            onChange={handleChange}
                            name="password"
                            value={formData.password}
                        />
                        <TextField
                            className="change-password-field"
                            placeholder="confirm password"
                            required
                            onChange={handleChange}
                            name="checkPassword"
                            value={formData.checkPassword}
                            type="password"
                        />
                        <div className="change-password-actions">
                            <Button variant="contained" color="primary" type="submit">
                            Change Password
                            </Button>
                        </div>
                    </form>
                    <Button
                    onClick={handleDeleteAccount}
                    >
                        Delete account
                    </Button>
                </div>
            </div>
        )}
        {/* Display 
        Values from DBMS
        Button to change password
        Button to delete account
        */}
    </div>
    );
};

export default Profile;