import  React, { useState, useEffect }  from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DialogModal from "@/components/DialogModal";
import { Button } from '@mui/material';


export default function TableData(props) {


  const [open, setOpen] = useState(false);
  const [updateItemId, setUpdateItemId] = useState('')
  const handleOpen = (e) => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };


  const [data, setData] = useState([]);
  const [isTableUpdated, setIsTableUpdated]= useState(true);
  useEffect(() => {
    getData();
  }, []);

  function getData(){
    fetch(`${process.env.BASE_URL}/roles`)
        .then((res) => res.json())
        .then((data) => setData(data));
  }



  async function deleteData(id) {
    console.log(id)
     await fetch(`${process.env.BASE_URL}/roles/${id}`, {
      method: 'DELETE'
    })
    .then(()=>alert("Deleted"));
  
    getData();
  }


  return (
    <>
       {
        open && 
        <DialogModal open={open} handleClose={handleClose} itemId = {updateItemId} setUpdateItemId = {setUpdateItemId} />
    }
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Actions</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.roleId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="item">
                {item.roleName}
              </TableCell>
              <TableCell align="right">{item.orgName}</TableCell>
              <TableCell align="right">{item.createdDate}</TableCell>
              <TableCell align="right">{item.roleId}</TableCell>
              <TableCell align="right">{item.roleState && "Active" || "inactive"}</TableCell>
              <TableCell align="right">
                <Button
                onClick={e=>{
                  setUpdateItemId(item.id)
                  handleOpen()

                }}>Update</Button>
                <Button  onClick={e=>{
                  deleteData(item.id)
                }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}