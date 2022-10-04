import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPubblicChannels } from "../redux/actions/action";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";

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

export default function PublicMapping() {
  const [channels, setChannels] = useState([]);
  const [filterText, setFilterText] = useState("");
  const filteredItems = channels.filter((item) => {
    return (
      (item.name &&
        item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.id && item.id.toLowerCase().includes(filterText.toLowerCase()))
    );
  });

  const dispatch = useDispatch();
  const publicGroups = useSelector((state) =>
    state.channelsReducers.public ? state.channelsReducers.public : []
  );

  useEffect(() => {
    dispatch(fetchPubblicChannels());
  }, [dispatch]);

  useEffect(() => {
    setChannels(publicGroups);
  }, [publicGroups]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h4">Public Mappings</Typography>
        <TextField
          label="Search"
          placeholder="Search channels with name and ids"
          sx={{ mb: 4, mt: 4, width: "50ch" }}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <TableContainer component={Paper} style={{ maxHeight: "600px" }}>
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
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Input placeholder="Enter Channel Name" />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Input placeholder="Enter URL" />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      key={indx}
                      variant="contained"
                      style={{ margin: "4px" }}
                    >
                      Submit
                    </Button>
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