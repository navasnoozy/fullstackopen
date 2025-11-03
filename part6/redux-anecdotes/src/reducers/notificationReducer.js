const initialState = null;

// Action creators
export const setNotification = (message) => {
  return {
    type: "SET_NOTIFICATION",
    payload: message,
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
