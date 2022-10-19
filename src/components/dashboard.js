import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { fetchPubblicChannels } from "../redux/actions/action";
import { Select, MenuItem } from "@mui/material";
import {
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

const Dashboard = ({ open }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [publicChannels, setPublicChannels] = useState();
  const [privateChannels, setPrivateChannels] = useState();
  const [allChannels, setAllChannels] = useState([]);
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

  useEffect(() => {
    dispatch(fetchPubblicChannels());
    dispatch(fetchPrivateChannels());
  }, [dispatch]);

  useEffect(() => {
    console.log(state?.channelsReducers?.public);
    setPublicChannels(state?.channelsReducers?.public);
    setPrivateChannels(state?.channelsReducers?.private);
    setAllChannels([
      ...state?.channelsReducers?.public,
      ...state?.channelsReducers?.private,
    ]);
  }, [state]);

  const publicGroups = useSelector((state) =>
    state.channelsReducers.public ? state.channelsReducers.public : []
  );

  useEffect(() => {
    setChannels(publicGroups);
  }, [publicGroups]);

  const handleChange = (event) => {
    setChannels(event.target.value);
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
            alignItems: "start",
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
                minHeight: open ? 210 : 230,
                maxHeight: open ? 100 : 230,
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
            <List
              sx={{
                transition: "0.2s",
                minWidth: open ? 225 : 265,
                maxWidth: open ? 225 : 265,
                minHeight: open ? 210 : 230,
                maxHeight: open ? 100 : 230,
                bgcolor: "transparent",
                paddingTop: 0,
                overflowY: "auto",
              }}
            >
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
            </List>
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
