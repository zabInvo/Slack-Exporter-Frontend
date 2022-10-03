import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import { useDispatch, useSelector } from "react-redux";
// import { fetchSlackStats } from "../redux/actions/action";

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

const pieData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random() * 500 - 250),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random() * 500 - 250),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [channels, setChannels] = useState([]);
  const [sorting, setSorting] = useState("desc");
  const dispatch = useDispatch();

  const state = useSelector((state) => (state ? state : []));

  useEffect(() => {
    // dispatch(fetchSlackStats());
  }, []);

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
        <div style={{ fontSize: "12px", padding: "12px" }}>
          Channel Popularity
        </div>
      </div>
      <section>
        <div style={{ boxShadow: "0 4px 30px #0000001a" }}>
          <Pie data={pieData} />
          <div style={{ fontSize: "12px", padding: "12px" }}>
            Channel Activity
          </div>
        </div>
        <div
          style={{
            marginTop: "18px",
            padding: "4px",
            boxShadow: "0 4px 30px #0000001a",
          }}
        >
          <div></div>
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
                  Bilal Asghar
                </div>
                <ShortcutIcon style={{ color: "gray", marginLeft: "auto" }} />

                <div
                  style={{
                    fontWeight: "normal",
                    color: "gray",
                  }}
                >
                  #general
                </div>
              </div>
              <div style={{ color: "gray" }}>Assalam o alaikum everyone!</div>
            </div>
          </div>
          <div style={{ fontSize: "12px", padding: "5px" }}>
            Recent Messages
          </div>
        </div>
      </section>
    </div>
  );
}
