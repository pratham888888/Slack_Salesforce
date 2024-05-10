import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./Table.css";

function createData(caseid, jiralink, jiraId,jirastatus, jiracreated, ownerName, datetime, priority, text, customerType) {
  return { caseid, jiralink, jiraId,jirastatus, jiracreated, ownerName, datetime, priority, text, customerType };
}

const rows = [
  createData("1", "https://example.com/1", "1","In Progress", "2024-05-09", "John Doe", "2024-05-09", "High", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend.", "Premium"),
  createData("2", "https://example.com/2","2", "Open", "2024-05-08", "Jane Smith", "2024-05-08", "Medium", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.", "Normal"),
  createData("3", "https://example.com/3", "3","Closed", "2024-05-07", "Mitchell Johnson", "2024-05-07", "High", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "Premium"),
  createData("4", "https://example.com/4","4", "In Progress", "2024-05-06", "Emily Davis", "2024-05-06", "Low", "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Normal"),
  createData("5", "https://example.com/5", "5","Open", "2024-05-05", "David Wilson", "2024-05-05", "High", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "Premium"),
  createData("6", "https://example.com/6", "6","Resolved", "2024-05-04", "Sophia Martinez", "2024-05-04", "Medium", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Normal"),
  // Add more data here as needed...
  createData("1", "https://example.com/1", "1","In Progress", "2024-05-09", "John Doe", "2024-05-09", "High", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend.", "Premium"),
  createData("2", "https://example.com/2","2", "Open", "2024-05-08", "Jane Smith", "2024-05-08", "Medium", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.", "Normal"),
  createData("3", "https://example.com/3", "3","Closed", "2024-05-07", "Mitchell Johnson", "2024-05-07", "High", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "Premium"),
  createData("4", "https://example.com/4","4", "In Progress", "2024-05-06", "Emily Davis", "2024-05-06", "Low", "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Normal"),
  createData("5", "https://example.com/5", "5","Open", "2024-05-05", "David Wilson", "2024-05-05", "High", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "Premium"),
  createData("6", "https://example.com/6", "6","Resolved", "2024-05-04", "Sophia Martinez", "2024-05-04", "Medium", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Normal"),
  // Add more data here as needed...
];


const makeStyle = (priority) => {
  if (priority === "Low") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (priority === "High") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};


export default function BasicTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterRows(event.target.value);
  };

  // Function to filter rows based on search term
  const filterRows = (searchTerm) => {
    const filteredData = rows.filter(
      (row) =>
        row.caseid.includes(searchTerm) ||
        row.jiraId.includes(searchTerm) ||
        row.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filteredData);
  };

  // Function to clear search term and filtered rows
  const clearSearch = () => {
    setSearchTerm("");
    setFilteredRows([]);
  };

  // Function to handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    filterRows(searchTerm); // Update filtered rows when page changes
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
    filterRows(searchTerm); // Update filtered rows when rows per page changes
  };

  const dataToShow = searchTerm.trim() ? filteredRows : rows;

  return (
    <>
      <div className="Table">
        <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Recent Entries
          <div style={{ position: "relative", width: "50%" }}>
            <InputBase
              placeholder="Search by Case ID, JIRA ID, or Customer Name"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                width: "100%",
                paddingRight: "30px",
                paddingLeft: "10px", // Adjust left padding
                borderRadius: "4px", // Add border radius
                backgroundColor: "rgba(0, 0, 0, 0.08)", // Add background color
              }}
            />
            {searchTerm && (
              <IconButton
                onClick={clearSearch}
                style={{ position: "absolute", top: "50%", right: "60px", transform: "translateY(-50%)" }}
              >
                <ClearIcon />
              </IconButton>
            )}
            <IconButton
              style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Rows per page:"
          />
        </h3>
        <div className="TableContainer">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Case ID</TableCell>
                  <TableCell align="left">JIRA ID</TableCell>
                  <TableCell align="left">JIRA Status</TableCell>
                  <TableCell align="left">JIRA Created</TableCell>
                  <TableCell align="left">Customer Name</TableCell>
                  <TableCell align="left">CASE Created</TableCell>
                  <TableCell align="left">Priority</TableCell>
                  <TableCell align="left">Customer Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {dataToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.caseid}
                    </TableCell>
                    <TableCell align="left"><a href={row.jiralink}>{row.jiraId}</a></TableCell>
                    <TableCell align="left">{row.jirastatus}</TableCell>
                    <TableCell align="left">{row.jiracreated}</TableCell>
                    <TableCell align="left">{row.ownerName}</TableCell>
                    <TableCell align="left">{row.datetime}</TableCell>
                    <TableCell align="left">
                      <span className="status" style={makeStyle(row.priority)}>{row.priority}</span>
                    </TableCell>
                    <TableCell align="left">{row.customerType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}




 

