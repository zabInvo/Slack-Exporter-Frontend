const initialState = {
  info: {},
};

const dashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_INFO":
      return { ...state, info: payload };
    default:
      return { ...state, info: payload };
  }
};

export { dashboardReducer };
