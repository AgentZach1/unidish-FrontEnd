import axios from "axios";

// const baseURL = "http://10.0.0.95";
// const instance = axios.create({ baseURL });

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