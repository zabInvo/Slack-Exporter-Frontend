import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import PersonIcon from "@mui/icons-material/Person";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  fetchPubblicChannels,
  fetchDashboardEssentials,
} from "../redux/actions/action";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchPrivateChannels } from "../redux/actions/action";
import TagIcon from "@mui/icons-material/Tag";
import LockIcon from "@mui/icons-material/Lock";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(Tooltip, Legend);

const RecentMessages = (msg) => {
  return (
    <div
      style={{
        marginTop: "18px",
        padding: "4px",
        boxShadow: "0 4px 30px #0000001a",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar style={{ margin: "8px" }}>
          <PersonIcon />
        </Avatar>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#595959",
                fontWeight: "bold",
              }}
            >
              {msg?.user}
            </div>
            <ShortcutIcon style={{ color: "gray", marginLeft: "auto" }} />

            <div
              style={{
                fontWeight: "normal",
                color: "gray",
              }}
            >
              #{msg?.channel}
            </div>
          </div>
          <div style={{ color: "gray" }}>{msg?.text}</div>
        </div>
      </div>
      <div style={{ fontSize: "12px", padding: "5px" }}>Recent Messages</div>
    </div>
  );
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const getPreviousDay = (date = new Date(), backTo) => {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - backTo);

  return previous.toString().slice(0, 10);
};

const Dashboard = ({ open }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [publicChannels, setPublicChannels] = useState();
  const [privateChannels, setPrivateChannels] = useState();
  const [allChannels, setAllChannels] = useState([]);
  const [lineChart, setLineChart] = useState({});
  const [channels, setChannels] = useState("public");

  const latestSync = (check) => {
    let latestDate = 0;
    let indx = 0;
    for (let ix = 0; ix < check.length; ix++) {
      let date = new Date(check[ix]?.lastUpdatedAt);
      if (date) {
        if (latestDate < date.getTime()) {
          indx = ix;
        }
      }
    }

    return check[indx];
  };

  const labels = {
    date: [
      getPreviousDay(new Date(), 6),
      getPreviousDay(new Date(), 5),
      getPreviousDay(new Date(), 4),
      getPreviousDay(new Date(), 3),
      getPreviousDay(new Date(), 2),
      getPreviousDay(new Date(), 1),
      getPreviousDay(new Date(), 0),
    ],
  };
  labels.messages = new Array(labels.date.length).fill(
    0,
    0,
    labels.date.length
  );
  labels.images = new Array(labels.date.length).fill(0, 0, labels.date.length);
  labels.videos = new Array(labels.date.length).fill(0, 0, labels.date.length);

  const data = {
    labels: labels.date,
    datasets: [
      {
        label: "Messages",
        data: lineChart?.messages?.map((msg, ix) => lineChart?.messages[ix]),
        borderColor: "purple",
        backgroundColor: "purple",
      },
      {
        label: "Images",
        data: lineChart?.messages?.map((msg, ix) => lineChart?.images[ix]),
        borderColor: "indigo",
        backgroundColor: "indigo",
      },
      {
        label: "Videos",
        data: lineChart?.messages?.map((msg, ix) => lineChart?.videos[ix]),
        borderColor: "#483248",
        backgroundColor: "#483248",
      },
    ],
  };

  const dispatchApi = _.throttle(
    function () {
      dispatch(fetchPubblicChannels());
      dispatch(
        fetchDashboardEssentials({
          channelId: "C043URAS04W",
          week: labels,
        })
      );
    },
    1000,
    { leading: true, trailing: false }
  );

  useEffect(() => {
    dispatchApi();
  }, []);

  useEffect(() => {
    dispatch(fetchPubblicChannels());
    dispatch(fetchPrivateChannels());
  }, [dispatch]);

  useEffect(() => {
    console.log(state?.channelsReducers?.public?.channels);
    setPublicChannels(state?.channelsReducers?.public?.channels);
    setPrivateChannels(state?.channelsReducers?.private?.channels);
    setAllChannels(
      state?.channelsReducers?.public?.channels?.concat(
        state?.channelsReducers?.private?.channels
      )
    );
  }, [state]);

  useEffect(() => {
    console.log(allChannels);
  }, [allChannels]);

  const privateGroups = useSelector((state) =>
    state.channelsReducers.private ? state.channelsReducers.private : []
  );

  const publicGroups = useSelector((state) =>
    state.channelsReducers.public ? state.channelsReducers.public : []
  );

  const pieData = {
    labels: ["Private", "Public", "Limited"],
    datasets: [
      {
        label: "# of Votes",
        data: [privateGroups.length, publicGroups.length, 8],
        backgroundColor: ["#411a40", "#823B80", "indigo"],
        borderColor: ["#411a40", "#823B80", "indigo"],
        borderWidth: 0.5,
      },
    ],
  };

  let dashboardState = useSelector((state) => state);

  useEffect(() => {
    setChannels(publicGroups);
  }, [publicGroups]);

  useEffect(() => {
    setLineChart(dashboardState?.dashboardReducer?.info?.data?.week);
  }, [dashboardState]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setChannels(event.target.value);
    dispatch(
      fetchDashboardEssentials({
        channelId: event.target.value,
        week: labels,
      })
    );
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <section style={{ width: "100%", margin: "12px" }}>
        <div
          style={{
            width: "90%",
            margin: "auto",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
          }}
        >
          <Bar
            options={{ responsive: true }}
            data={{
              labels: ["Public", "Private"],
              datasets: [
                {
                  label: "Channels",
                  data: ["Public", "Private"].map((el, ix) =>
                    ix === 0 ? publicChannels?.length : privateChannels?.length
                  ),
                  backgroundColor: "purple",
                },
              ],
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
            margin: "auto",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                backgroundColor: "purple",
                padding: "8px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              🟢 Synced
            </div>
            <List
              sx={{
                transition: "0.2s",
                width: "100%",
                minWidth: open ? 225 : 265,
                maxWidth: open ? 225 : 265,
                minHeight: 230,
                maxHeight: 230,
                paddingTop: 0,
                overflowY: "auto",
              }}
            >
              {allChannels?.map((el) =>
                el?.lastUpdatedAt === null ? null : (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        {el?.type == "public_channel" ? (
                          <TagIcon />
                        ) : (
                          <LockIcon />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={el?.name}
                      secondary={new Date(el?.lastUpdatedAt).toLocaleString()}
                    />
                  </ListItem>
                )
              )}
            </List>
          </div>
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                backgroundColor: "purple",
                padding: "8px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              🔴 Non Synced
            </div>
            {allChannels?.length ? (
              allChannels?.map((el) =>
                el?.lastUpdatedAt !== null ? null : (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        {el?.type == "public_channel" ? (
                          <TagIcon />
                        ) : (
                          <LockIcon />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={el?.name}
                      secondary={"Not Synced Yet."}
                    />
                  </ListItem>
                )
              )
            ) : (
              <span style={{ textAlign: "center", margin: "auto" }}>
                Loading...
              </span>
            )}
            <List
              sx={{
                transition: "0.2s",
                minWidth: open ? 225 : 265,
                maxWidth: open ? 225 : 265,
                minHeight: 230,
                maxHeight: 230,
                bgcolor: "transparent",
                paddingTop: 0,
                overflowY: "auto",
              }}
            ></List>
          </div>
        </div>
      </section>

      <div
        style={{
          width: "70%",
          margin: "12px",
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
        }}
      >
        <div style={{ fontSize: "12px", padding: "20px", color: "grey" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>Last Synced Channel 🟢</div>
            <Select
              style={{ marginLeft: "auto", minWidth: "140px" }}
              variant="standard"
              labelId="demo-select-small"
              id="demo-select-small"
              value={channels}
              label="Channels"
              onChange={handleChange}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"public"}>Public</MenuItem>
              <MenuItem value={"private"}>Private</MenuItem>
            </Select>
          </div>

          <div
            style={{
              fontWeight: "300",
              padding: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="https://www.pngkey.com/png/full/984-9844126_slack-new-slack-logo-png.png"
                width={"40px"}
              />
              <div style={{ fontWeight: "600", marginLeft: "20px" }}>
                {publicChannels?.length
                  ? channels === "public"
                    ? latestSync(publicChannels)?.name || "No Channels Found.."
                    : channels === "private"
                    ? latestSync(privateChannels)?.name || "No Channels Found.."
                    : channels === "all"
                    ? latestSync(allChannels)?.name || "No Channels Found.."
                    : null
                  : "Loading.."}
              </div>
            </div>

            <div
              style={{
                margin: "0 0 20px 0",
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
                padding: "20px",
                lineHeight: "1.8em",
              }}
            >
              <div style={{ fontWeight: "500", color: "black" }}>
                Channel Details
              </div>
              <div style={{ fontWeight: "300" }}>
                <b>Channel Id: </b>
                <span>
                  {publicChannels?.length
                    ? channels === "public"
                      ? latestSync(publicChannels)?.slackId ||
                        "Coudn't find record..."
                      : channels === "private"
                      ? latestSync(privateChannels)?.slackId ||
                        "Coudn't find record..."
                      : channels === "all"
                      ? latestSync(allChannels)?.slackId ||
                        "Coudn't find record..."
                      : null
                    : "Loading.."}
                </span>
              </div>
              <div style={{ fontWeight: "300" }}>
                <b>Mattermost Name: </b>
                {publicChannels?.length
                  ? channels === "public"
                    ? latestSync(publicChannels)?.mattermostName ||
                      "Coudn't find record..."
                    : channels === "private"
                    ? latestSync(privateChannels)?.mattermostName ||
                      "Coudn't find record..."
                    : channels === "all"
                    ? latestSync(allChannels)?.mattermostName ||
                      "Coudn't find record..."
                    : null
                  : "Loading.."}
              </div>
              <div style={{ fontWeight: "300" }}>
                <b>Mattermost Id: </b>
                {publicChannels?.length
                  ? channels === "public"
                    ? latestSync(publicChannels)?.mattermostId ||
                      "Coudn't find record..."
                    : channels === "private"
                    ? latestSync(privateChannels)?.mattermostId ||
                      "Coudn't find record..."
                    : channels === "all"
                    ? latestSync(allChannels)?.mattermostId ||
                      "Coudn't find record..."
                    : null
                  : "Loading.."}
              </div>
            </div>

            <div
              style={{
                margin: "0 0 20px 0",
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
                padding: "20px",
                lineHeight: "1.8em",
              }}
            >
              <div style={{ fontWeight: "500", color: "green" }}>
                Sync Details
              </div>
              <div style={{ fontWeight: "300" }}>
                <b>Synced on: </b>
                {publicChannels?.length
                  ? channels === "public"
                    ? new Date(
                        latestSync(publicChannels)?.lastUpdatedAt
                      ).toLocaleString() || "Coudn't find record..."
                    : channels === "private"
                    ? new Date(
                        latestSync(privateChannels)?.lastUpdatedAt
                      ).toLocaleString() || "Coudn't find record..."
                    : channels === "all"
                    ? new Date(
                        latestSync(allChannels)?.lastUpdatedAt
                      ).toLocaleString() || "Coudn't find record..."
                    : null
                  : "Loading.."}
              </div>
              <div style={{ fontWeight: "300" }}>
                <b>Time Spend on sync: </b>
                {publicChannels?.length
                  ? channels === "public"
                    ? latestSync(publicChannels)?.timeSpent ||
                      "Coudn't find record..."
                    : channels === "private"
                    ? latestSync(privateChannels)?.timeSpent ||
                      "Coudn't find record..."
                    : channels === "all"
                    ? latestSync(allChannels)?.timeSpent ||
                      "Coudn't find record..."
                    : null
                  : "Loading.."}
              </div>
              <div style={{ fontWeight: "300" }}>
                <b>Fowarding Url: </b>
                {publicChannels?.length
                  ? channels === "public"
                    ? latestSync(publicChannels)?.fowardUrl ||
                      "Coudn't find record..."
                    : channels === "private"
                    ? latestSync(privateChannels)?.fowardUrl ||
                      "Coudn't find record..."
                    : channels === "all"
                    ? latestSync(allChannels)?.fowardUrl ||
                      "Coudn't find record..."
                    : null
                  : "Loading.."}
              </div>
              <div style={{ fontWeight: "300" }}>
                <b>Schedule: </b>
                {publicChannels?.length
                  ? channels === "public"
                    ? latestSync(publicChannels)?.schedule ||
                      "Coudn't find record..."
                    : channels === "private"
                    ? latestSync(privateChannels)?.schedule ||
                      "Coudn't find record..."
                    : channels === "all"
                    ? latestSync(allChannels)?.schedule ||
                      "Coudn't find record..."
                    : null
                  : "Loading.."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
