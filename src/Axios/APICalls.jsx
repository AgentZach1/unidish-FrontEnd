import axios from "axios";
import { setAuthToken } from "./setAuthToken";

export const checkDBConnection = async () => {
  try {
    const response = await axios.get("https://connect.weiss.land/api/unidish", {
      params: {table: "all"}
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const getTableFromDB = async (chosenTable) => {
  try {
    const response = await axios.get("https://connect.weiss.land/api/unidish", {
      params: {table: chosenTable}
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const login = async (loginPayload) => {
  try {
    const response = await axios.post("https://connect.weiss.land/api/unidish/login", loginPayload);
    const { token } = response.data;
    console.log(token);
    localStorage.setItem("token", token);
    setAuthToken(token);
    console.log(response.data);
    return token;
  } catch (err) {
    console.log(err);
    alert(err.response.data.error);
    return err;
  }
};


export const addUser = async (userData) => {
  try {
    const response = await axios.post("https://connect.weiss.land/api/unidish/addUser", userData);
    console.log(userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    alert(error.response.data.error);
    return error;
  }
};

export const getUserByToken = async (token) => {
  const headers = {
    Authorization: `${token}`,
  };
  try {
    const user = await axios.get("https://connect.weiss.land/api/unidish/getUserByToken", { headers });
    return user;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const getDiningHallsWithRestaurants = async () => {
  try {
    const response = await axios.get("https://connect.weiss.land/api/unidish/getDiningHallsWithRestaurants");
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const getRestaurantById = async (restId) => {
  try {
    const response = await axios.get("https://connect.weiss.land/api/unidish/getRestaurantById", {
      params: { restId },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const getMenuItemsForRestaurant = async (restId) => {
  try {
    const response = await axios.get("https://connect.weiss.land/api/unidish/getMenuItemsForRestaurant", {
      params: { restId },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
    return err;
  }
};

export const changePassword = async ({ token, oldPassword, newPassword }) => {
  try {
      const response = await axios.post("https://connect.weiss.land/api/unidish/changePassword", {
          token,
          oldPassword,
          newPassword
      });
    console.log(newPassword);
    console.log(response.data);
    return response.data;
  } catch (error) {
    alert(error.response.data.error);
    return error;
  }
};

export const deleteAccount = async (token) => {
  try {
    const response = await axios.post("https://connect.weiss.land/api/unidish/deleteAccount", {token});
    console.log(token);
    console.log(response.data);
    return response.data;
  } catch (error) {
    alert(error.response.data.error);
    return error;
  }
};

export const editProfile = async (token, username, firstname, lastname, profile_description, type) => {
  try {
    const response = await axios.post("https://connect.weiss.land/api/unidish/editProfile", {token, username, firstname, lastname, profile_description, type});
    console.log(token, username, firstname, lastname, profile_description, type);
    console.log(response.data);
    return response.data;
  } catch (error) {
    alert(error.response.data.error);
    return error;
  }
};