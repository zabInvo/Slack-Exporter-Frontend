import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import Avatar from "@mui/material/Avatar";
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
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(ArcElement, Tooltip, Legend);

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

export default function Dashboard() {
  const [channelName, setChannelName] = useState("");
  const [lineChart, setLineChart] = useState({});
  const [channels, setChannels] = useState([]);
  const [latestMessage, setLatestMessage] = useState();
  const dispatch = useDispatch();

  var socket = window.io.connect(
    "https://electron-sockets-server.herokuapp.com/",
    {
      transports: ["websocket"],
    }
  );
  socket.off().on("message", (data) => {
    setLatestMessage(data);
  });

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
    console.log(
      dashboardState?.dashboardReducer?.info?.data?.week === undefined
        ? "Preparing correct data"
        : dashboardState?.dashboardReducer?.info?.data?.week
    );
  }, [dashboardState]);

  const handleChange = (event) => {
    setChannelName(event.target.value);
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
        alignItems: "start",
        justifyContent: "space-evenly",
      }}
    >
      <div style={{ width: "70%", boxShadow: "0 4px 30px #0000001a" }}>
        <Line options={options} data={data} />
        <div
          style={{
            fontSize: "24px",
            padding: "12px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <FormControl sx={{ m: 1, minWidth: 320 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Channel
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={channelName}
                label="channel"
                onChange={handleChange}
              >
                {channels.map((el, ix) => (
                  <MenuItem value={el.slackId}>{el.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              fontSize: "24px",
              marginLeft: "auto",
              textAlign: "right",
            }}
          >
            Total Messages:{" "}
            {dashboardState?.dashboardReducer?.info?.data?.messages}
            <div style={{ fontSize: "14px", color: "purple" }}>
              Messages:{" "}
              {dashboardState?.dashboardReducer?.info?.data?.total?.messages}
            </div>
            <div style={{ fontSize: "14px", color: "indigo" }}>
              Images:{" "}
              {dashboardState?.dashboardReducer?.info?.data?.total?.images}
            </div>
            <div style={{ fontSize: "14px", color: "#483248" }}>
              Videos:{" "}
              {dashboardState?.dashboardReducer?.info?.data?.total?.videos}
            </div>
          </div>
        </div>
      </div>
      <section>
        <div style={{ boxShadow: "0 4px 30px #0000001a" }}>
          <Pie data={pieData} />
          <div style={{ fontSize: "12px", padding: "12px" }}>
            No. of channels
          </div>
        </div>
        {RecentMessages(latestMessage)}
      </section>
    </div>
  );
}
