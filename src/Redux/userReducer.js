const initialState = {
    user: null,
    isAuthenticated: false,
    // Other user-related state
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGOUT":
        return initialState; // Reset user state when logging out
      case "SET_USER_INFO":
        return { ...state, userInfo: action.payload };
      // Add other cases for different actions if needed
      default:
        return state;
    }
  };
  
  export default userReducer;