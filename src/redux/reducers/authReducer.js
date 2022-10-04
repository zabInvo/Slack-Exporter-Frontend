const initialState = {
  userData: {},
};

const authReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return { ...state, userData: payload };
    default:
      return state;
  }
};

export { authReducers };
