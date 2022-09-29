import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Grid from "@mui/material/Grid";
import _ from "lodash";

import { useState, useEffect } from "react";
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

function PublicChannels() {
  const [showModal, setShowModal] = useState(false);
  const [channels, setChannels] = useState([]);
  const [sorting, setSorting] = useState("desc");
  const dispatch = useDispatch();
  const publicGroups = useSelector((state) =>
    state.channelsReducers.public ? state.channelsReducers.public : []
  );

  useEffect(() => {
    dispatch(fetchPubblicChannels());
  }, []);

  useEffect(() => {
    setChannels(publicGroups);
  }, [publicGroups]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const syncHistroyData = (item) => {};

  const convertDate = (unixTimestamp) => {
    let date = new Date(unixTimestamp * 1000);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  //   const sort = (column) => {
  //     if (column === "name") {
  //       if (sorting === "desc") {
  //         let sorting = _.orderBy(salaries, ["name"], ["asc"]);
  //         setSalaries(sorting);
  //         setSorting("asc");
  //       } else {
  //         let sorting = _.orderBy(salaries, ["name"], ["desc"]);
  //         setSalaries(sorting);
  //         setSorting("desc");
  //       }
  //     } else {
  //       if (sorting === "desc") {
  //         let sorting = _.orderBy(salaries, ["Salary.amount"], ["asc"]);
  //         setSalaries(sorting);
  //         setSorting("asc");
  //       } else {
  //         let sorting = _.orderBy(salaries, ["Salary.amount"], ["desc"]);
  //         setSalaries(sorting);
  //         setSorting("desc");
  //       }
  //     }
  //   };

  return (
    <Grid container>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                Channel Name
                <IconButton
                  onClick={() => {
                    // sort("name");
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
                    // sort("salary");
                  }}
                  sx={{ color: "white", mt: -1 }}
                >
                  <ImportExportIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {channels.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {item.name}
                </StyledTableCell>
                <StyledTableCell align="center">{item.id}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.num_members}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {convertDate(item.created)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  <Button
                    color="success"
                    size="small"
                    onClick={() => {
                      toggleModal();
                      syncHistroyData(item);
                    }}
                  >
                    Sync Histroy
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default PublicChannels;