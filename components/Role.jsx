import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DialogModal from "@/components/DialogModal";
import TableData from "../components/Table"

export default function Role() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

  return (
    <>
    {
        open && 
        <DialogModal open={open} handleClose={handleClose} itemId = ''/>
    }
    <Grid container spacing={1} sx={{marginTop:"20px", marginBottom:"20px"}}>
        <Grid item xs={4}>
            Roles
        </Grid>
        <Grid item xs={4}>
            <Button variant="contained" onClick={handleOpen}>Add</Button>
        </Grid>
        <Grid item xs={4}>
            <Button variant="contained">Filters</Button>
        </Grid>
    </Grid>

    <TableData handleOpen ={ handleOpen} handleClose ={handleClose} />

    </>
    
  );
}