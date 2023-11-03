import { getUserByToken } from "../Axios/APICalls";
import React, { useEffect, useState } from "react";
import {changePassword, deleteAccount, editProfile} from '../Axios/APICalls';
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { logout, setUserInfo } from "../Redux/userActions";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import store from "../Redux/store";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [isDeleteSecondConfirmVisible, setIsDeleteSecondConfirmVisible] = useState(false);
    const [isFinalDeleteConfirmVisible, setIsFinalDeleteConfirmVisible] = useState(false);
    // const [userP, setUserP] = useState();
    const currUser = useSelector((state) => state.user.userInfo);
    const [formData, setFormData] = useState({
        prevpass: "",
        password: "",
        checkPassword: "",
      });

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editFormData, setEditFormData] = useState({
        username: currUser.user.username,
        firstname: currUser.user.firstname,
        lastname: currUser.user.lastname,
        profile_description: currUser.user.profile_description,
        type: currUser.user.type, 
    });

    const handleEditProfileClick = () => {
        setIsEditingProfile(true);
    };

    const handleNoEditProfileClick = () => {
        setIsEditingProfile(false);
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFirstDeleteClick = () => {
        setIsDeleteConfirmVisible(true);
    };

    const handleSecondDeleteClick = () => {
        setIsDeleteSecondConfirmVisible(true);
    };

    const handleFinalDeleteClick = () => {
        setIsFinalDeleteConfirmVisible(true);
    };

    const handleFinalNoClick = () => {
        setIsDeleteConfirmVisible(false);
        setIsDeleteSecondConfirmVisible(false);
        setIsFinalDeleteConfirmVisible(false);
    };
    // const currUser = useSelector((state) => state.user.userInfo);

    // const handleDisplay = async (e) => {
    //     if (localStorage.getItem("token")) {
    //         const token = localStorage.getItem("token");
    //         const user = await getUserByToken(token);
    //         console.log(user);
    //         setUserP(user);
    //     }
    // };

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const token = localStorage.getItem("token");
    //             const user = await getUserByToken(token);
    //             console.log(user);
    //             // setUserP(user);
    //         } catch (error) {
    //             console.error("Failed to fetch user: ", error);
    //         }
    //     };
    //     fetchUser();
    // }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        const persistor = persistStore(store);
        persistor.purge(); // This will purge the persisted state
        dispatch(logout()); // Dispatch the logout action to clear user-related state
        navigate("/unidish-test/login");
      };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePass = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.checkPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log("Starting to change password");
        try {
            // API CALL
            const token = localStorage.getItem("token");
            const changeResponse = await changePassword({
                token,
                oldPassword: formData.prevpass,
                newPassword: formData.password
            });
            if (changeResponse) {
                console.log(changeResponse.data);
                console.log("Successfully changed password");
                handleLogout();
            }
        } catch (err) {
            console.log("Error during password change", err);
        }
        console.log("Password change attempt");
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        console.log("Account deletion start attempt");
        try {
            // API CALL
            const deleteResponse = await deleteAccount(localStorage.getItem("token"));
            if (deleteResponse) {
                console.log(deleteResponse.data);
                console.log("Successfully deleted account");
                handleLogout();
            }
        } catch (err) {
            console.log("Error during account deletion", err);
            alert("Couldn't delete account, try again");
            navigate("/unidish-test/DiningHalls");
        }
        console.log("Account deletion attempt");
    };

    const handleEditProfile = async (e) => {
        e.preventDefault();
        console.log("Starting to edit profile");
        try {
            // API CALL
            console.log("Sending...", token, editFormData);
            const token = localStorage.getItem("token");
            const editResponse = await editProfile({
                token,
                ...editFormData
            });
            if (editResponse) {
                console.log(editResponse.data);
                console.log("Successfully edited profile");

                // Close the edit form
                setIsEditingProfile(false);

                // Refresh user info
                // const updatedUser = await getUserByToken(token);
                // Optionally, refresh user info or navigate to a different page
                // console.log("Updated user?", updatedUser.data.user);
                // console.log("Up 1: ", updatedUser.data);
                // console.log("Up 2: ", updatedUser);
                // dispatch(setUserInfo(updatedUser.data));
                handleLogout();
            }
        } catch (err) {
            console.log("Error during profile edit", err);
            alert("Couldn't edit profile, try again");
        }
        console.log("Profile edit attempt");
    };
    
    return (
    <div className="profile-container">
        <p>Profile</p>
        {/* <Button
        onClick={handleDisplay}>
            Click me!
        </Button> */}
            <Button
                onClick={handleEditProfileClick}
            >
                Edit Profile
            </Button>
            {isEditingProfile && (<Button
                onClick={handleNoEditProfileClick}
            >
                Close
            </Button>)}
            {isEditingProfile && (<>
                <form className="edit-profile-form" onSubmit={handleEditProfile}>
                    <TextField
                        placeholder="Username"
                        onChange={handleEditChange}
                        name="username"
                        value={editFormData.username}
                    />
                    <TextField
                        placeholder="First Name"
                        onChange={handleEditChange}
                        name="firstname"
                        value={editFormData.firstname}
                    />
                    <TextField
                        placeholder="Last Name"
                        onChange={handleEditChange}
                        name="lastname"
                        value={editFormData.lastname}
                    />
                    <TextField
                        placeholder="Profile Description"
                        onChange={handleEditChange}
                        name="profile_description"
                        value={editFormData.profile_description}
                    />
                    {/* Assuming 'type' is a string input, replace with a select or other component if needed */}
                    <TextField
                        placeholder="Type"
                        onChange={handleEditChange}
                        name="type"
                        value={editFormData.type}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Save and Logout
                    </Button>
                </form>
                <div className="profile-options">
                Change Password:
                <form className="change-password-form" onSubmit={handlePass}>
                    <TextField
                        className="change-password-field"
                        placeholder="previous password"
                        required
                        type="password"
                        onChange={handleChange}
                        name="prevpass"
                        value={formData.prevpass}
                    />
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
                onClick={handleFirstDeleteClick}
                >
                    Delete account
                </Button>
                {isDeleteConfirmVisible && (
                    <div>
                        Are you sure you want to delete?
                        <Button onClick={handleSecondDeleteClick}>Yes</Button>
                        <Button onClick={handleFinalNoClick}>No</Button>
                    </div>
                )}
                {isDeleteSecondConfirmVisible && (
                    <div>
                    Are you sure you sure you sure want to delete?
                    <Button onClick={handleFinalDeleteClick}>Yes I'm sure I'm sure I'm sure</Button>
                    <Button onClick={handleFinalNoClick}>No</Button>
                </div>
                )}
                {isFinalDeleteConfirmVisible && (
                    <div>
                        Last chance to stop!
                        <Button onClick={handleDeleteAccount}>Yes, delete my account</Button>
                        <Button onClick={handleFinalNoClick}>No, go back</Button>
                    </div>
                )}

            </div>
            </>
            )}
        {currUser && (
            <div className="profile-header">
                {currUser.user.username}
                <ul>
                    Hello, {currUser ? currUser.user.firstname + " " + currUser.user.lastname: ":P"}!
                </ul>
                <ul>
                    {currUser.user.type}
                </ul>
                <ul>
                    {currUser.user.profile_description}
                </ul>
                
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