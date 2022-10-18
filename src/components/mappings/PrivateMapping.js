import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { updateMapping } from "../../redux/actions/action";
import { LoadingButton } from "@mui/lab";
import { Snackbar } from "@mui/material";

import Typography from "@mui/material/Typography";
import _ from "lodash";

import { fetchPrivateChannels } from "../../redux/actions/action";

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

export default function PrivateMapping() {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [channels, setChannels] = useState([]);
  const [filterText, setFilterText] = useState("");
  const filteredItems = channels?.filter((item) => {
    return (
      (item.name &&
        item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.id && item.id.toLowerCase().includes(filterText.toLowerCase()))
    );
  });

  const handleClose = (event, reason) => {
    setNotification(false);
  };

  const updateMap = (id, indx) => {
    dispatch(
      updateMapping({
        mattermostName: filteredItems[indx].mattermostName,
        forwardUrl: filteredItems[indx].forwardUrl,
        id,
      })
    ).then(() => {
      setLoading(false);
      setNotification(true);
      setMessage("Updated " + filteredItems[indx].name);
    });
  };

  const dispatch = useDispatch();
  const privateGroups = useSelector((state) =>
    state.channelsReducers.private ? state.channelsReducers.private : []
  );

  useEffect(() => {
    dispatchApi();
  }, [dispatch]);

  useEffect(() => {
    setChannels(privateGroups?.channels);
  }, [privateGroups]);

  const dispatchApi = _.throttle(
    function () {
      dispatch(fetchPrivateChannels());
    },
    1000,
    { leading: true, trailing: false }
  );

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Snackbar
          open={notification}
          message={message}
          autoHideDuration={1500}
          onClose={handleClose}
        />
        <Typography variant="h4">Private Mappings</Typography>
        <TextField
          label="Search"
          placeholder="Search channels with name and ids"
          sx={{ mb: 4, mt: 4, width: "50ch" }}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <TableContainer component={Paper} style={{ maxHeight: "385px" }}>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <b>Channel Name</b>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>Channel Id</b>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>Mattermost channel name</b>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>Fowarding URL</b>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>Actions</b>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          {filteredItems?.length !== 0 ? (
            <TableBody>
              {filteredItems?.map((row, indx) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ fontWeight: "bold" }}
                  >
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Input
                      placeholder="Enter Channel Name"
                      key={row.id}
                      defaultValue={row.mattermostName}
                      onChange={(e) => {
                        filteredItems[indx].mattermostName = e.target.value;
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Input
                      placeholder="Enter URL"
                      key={row.id}
                      defaultValue={row.forwardUrl}
                      onChange={(e) => {
                        filteredItems[indx].forwardUrl = e.target.value;
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <LoadingButton
                      loading={loading}
                      key={row.id}
                      variant="contained"
                      style={{ margin: "4px" }}
                      onClick={() => {
                        setLoading(true);
                        updateMap(row.id, indx);
                      }}
                    >
                      Submit
                    </LoadingButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <div
              className={
                // eslint-disable-next-line
                location?.pathname == "/privatemap" ||
                // eslint-disable-next-line
                location?.pathname == "/publicmap"
                  ? "middle-70"
                  : "middle"
              }
            >
              <div>{"</>"}</div>
              <br />
              <div style={{ fontWeight: "bolder" }}>No data to show.</div>
            </div>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
