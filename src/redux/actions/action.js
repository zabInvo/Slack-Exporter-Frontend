import service from "../services/axiosService";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQxMjA3NjE2LCJleHAiOjE2NDEyNTA4MTZ9.cJSeyPkQaOtsDMxzBsTjML3cNrLZnbu_WJyhTZigT5I";

const fetchPubblicChannels = (payload) => async (dispatch) => {
  try {
    const payload = {
      type: "public_channel",
    };
    const channels = await service.post("/fetch-groups", token, payload);
    dispatch({ type: "SET_PUBLIC_CHANNELS", payload: channels.data.data });
  } catch (error) {
    console.log(error);
  }
};

const fetchPrivateChannels = (payload) => async (dispatch) => {
  try {
    const payload = {
      type: "private_channel",
    };
    const channels = await service.post("/fetch-groups", token, payload);
    dispatch({ type: "SET_PRIVATE_CHANNELS", payload: channels.data.data });
  } catch (error) {
    console.log(error);
  }
};

const syncChannelHistroy = (payload) => async (dispatch) => {
  try {
    const syncResponse = await service.post("/sync-histroy", token, payload);
    console.log("syncResponse", syncResponse);
  } catch (error) {
    console.log(error);
  }
};

const fetchAuthedData = (payload) => async (dispatch) => {
  try {
    const userData = await service.get("/login/success");
    dispatch({ type: "SET_USER", payload: userData });
  } catch (error) {
    console.log(error);
  }
};

const updateMapping = (payload) => async () => {
  try {
    console.log("update-mapping", payload);
    await service.post("/update-mapping", null, payload);
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchPubblicChannels,
  fetchPrivateChannels,
  syncChannelHistroy,
  fetchAuthedData,
  updateMapping,
};
