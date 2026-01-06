import { createSlice } from "@reduxjs/toolkit";
let timer;
const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return "";
    },
  },
});

export const setNotification = (notificationText, type, timeout) => {
  return async (dispatch) => {
    clearTimeout(timer);
    dispatch(
      notificationSlice.actions.setNotification({
        text: notificationText,
        type,
      })
    );
    timer = setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification());
    }, timeout * 1000);
  };
};
export default notificationSlice.reducer;
