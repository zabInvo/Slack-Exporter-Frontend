const initialState = {
    public: [],
    private: []
  };
  
  const channelsReducers = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_PUBLIC_CHANNELS":
        return { ...state, public: payload };
      case "SET_PRIVATE_CHANNELS":
        return { ...state, private: payload };
      default:
        return state;
    }
  };
  
  export { channelsReducers };