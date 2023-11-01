export const setUserInfo = (userInfo) => ({
    type: "SET_USER_INFO",
    payload: userInfo,
  });
  
  export const logout = () => ({
    type: "LOGOUT",
  });