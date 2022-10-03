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
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPubblicChannels } from "../redux/actions/action";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blue["900"],
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
  const [rows, setRows] = useState();
  const dispatch = useDispatch();
  const publicGroups = useSelector((state) =>
    state.channelsReducers.public ? state.channelsReducers.public : []
  );

  useEffect(() => {
    dispatch(fetchPubblicChannels());
  }, []);

  useEffect(() => {
    setRows(publicGroups);
  }, [publicGroups]);

  return (
    <TableContainer component={Paper} style={{ maxHeight: "600px" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
        <TableBody>
          {rows?.map((row, indx) => (
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
      </Table>
    </TableContainer>
  );
}
