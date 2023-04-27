// import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import deleteicon from "../images/deleteicon.png";
import editicon from "../images/editicon.png";
import { useState } from "react";
import { Button } from "@mui/material";


const DisplayTable = (props) => {
  let items = props.items;

  function handleDelete(wid){
    let newItems=props.items.filter(item => {
      if(wid!==item.wid){
        return {
          ...item
        }
      }
    })
    props.setItems(newItems)
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email ID</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="left">Wholesaler ID</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow
                key={row.wid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.fname}
                </TableCell>
                <TableCell align="left">{row.lname}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.pno}</TableCell>
                <TableCell align="left">{row.wid}</TableCell>
                <TableCell align="left">
                  <Button>
                    <Image src={editicon} />
                  </Button>
                  <Button onClick={()=>handleDelete(row.wid)}>
                    <Image src={deleteicon} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DisplayTable;
