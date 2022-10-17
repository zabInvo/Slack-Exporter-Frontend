import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import _ from "lodash";
import moment from "moment";
import { syncChannelHistroy } from "../../redux/actions/action";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPubblicChannels } from "../../redux/actions/action";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(80, 7, 80)",

    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function PublicChannels() {
  const [filterText, setFilterText] = useState("");
  const [channels, setChannels] = useState([]);
  const [sorting, setSorting] = useState("desc");
  const dispatch = useDispatch();
  const publicGroups = useSelector((state) =>
    state.channelsReducers.public ? state.channelsReducers.public : []
  );

  useEffect(() => {
    dispatchApi();
  }, []);

  useEffect(() => {
    setChannels(publicGroups);
  }, [publicGroups]);

  const dispatchApi = _.throttle(
    function () {
      dispatch(fetchPubblicChannels());
    },
    1000,
    { leading: true, trailing: false }
  );

  const syncHistroyData = (item) => {
    const payload = {
      channelId: item.slackId,
    };
    dispatch(syncChannelHistroy(payload));
  };

  const filteredItems = channels.filter((item) => {
    return (
      (item.name &&
        item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.id && item.id.toLowerCase().includes(filterText.toLowerCase()))
    );
  });

  const convertDate = (unixTimestamp) => {
    let date = new Date(unixTimestamp * 1000);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  const sort = (column) => {
    if (column === "name") {
      if (sorting === "desc") {
        let sorting = _.orderBy(channels, ["name"], ["asc"]);
        setChannels(sorting);
        setSorting("asc");
      } else {
        let sorting = _.orderBy(channels, ["name"], ["desc"]);
        setChannels(sorting);
        setSorting("desc");
      }
    } else {
      if (sorting === "desc") {
        let sorting = _.orderBy(channels, ["created"], ["asc"]);
        setChannels(sorting);
        setSorting("asc");
      } else {
        let sorting = _.orderBy(channels, ["created"], ["desc"]);
        setChannels(sorting);
        setSorting("desc");
      }
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4">Public Channels</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          label="Search"
          placeholder="Search channels with name and ids"
          sx={{ mt: 4, width: "50ch" }}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <Grid container>
        <TableContainer
          component={Paper}
          sx={{ mt: 3 }}
          style={{ maxHeight: "450px" }}
        >
          <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  Channel Name
                  <IconButton
                    onClick={() => {
                      sort("name");
                    }}
                    sx={{ color: "white", mt: -1 }}
                  >
                    <ImportExportIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">Channel ID</StyledTableCell>
                <StyledTableCell align="center">No. of Members</StyledTableCell>
                <StyledTableCell align="center">
                  Created At
                  <IconButton
                    onClick={() => {
                      sort("date");
                    }}
                    sx={{ color: "white", mt: -1 }}
                  >
                    <ImportExportIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">Last Updated</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
              </TableRow>
            </TableHead>
            {channels.length !== 0 ? (
              <TableBody>
                {filteredItems.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      style={{ fontWeight: "bold" }}
                    >
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.slackId}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.membersCount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {convertDate(item.creationDate)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.lastUpdatedAt
                        ? moment(item.lastUpdatedAt).format("LLL")
                        : "N/A"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.status === "Pending" ? (
                        <>
                          <Button color="error" size="small">
                            Pending
                          </Button>
                          <LinearProgress color="error" />
                        </>
                      ) : (
                        <Button
                          color="success"
                          size="small"
                          onClick={() => {
                            syncHistroyData(item);
                          }}
                        >
                          Sync Histroy
                        </Button>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            ) : (
              <div className="middle">
                <div>{"</>"}</div>
                <br />
                <div style={{ fontWeight: "bolder" }}>No data to show.</div>
              </div>
            )}
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

export default PublicChannels;
