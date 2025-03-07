import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";
import './practice.css'; // Import the CSS file for styling
// import Header from "../components/header";
import Header from "../components/header.jsx";
const PracticeTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const problems = [
    { id: 1, name: "Problem 1", difficulty: "easy" },
    { id: 2, name: "Problem 2", difficulty: "medium" },
    { id: 3, name: "Problem 3", difficulty: "hard" },
  ];

  // Filter problems based on the search term
  const filteredProblems = problems.filter((problem) =>
    problem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    {/* <Header/> */}
    <div className="table-container">
      {/* Search Header */}
      <div className="search-header">
        <TextField
          label="Search Problem"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          />
      </div>

      {/* Table */}
      <TableContainer component={Paper} className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Problem Name</TableCell>
              <TableCell>Difficulty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProblems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell>{problem.id}</TableCell>
                <TableCell>
                  <Link to={`/problem/${problem.id}`}>{problem.name}</Link>
                </TableCell>
                <TableCell
                  style={{
                    color:
                    problem.difficulty === "easy"
                    ? "green"
                        : problem.difficulty === "medium"
                        ? "orange"
                        : "red",
                      }}
                      >
                  {problem.difficulty}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
};

export default PracticeTable;
