import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DialogModal from "@/components/DialogModal";
import TableData from "../components/Table"
import styles from "../styles/Home.module.css"
import PaginationControl from './Pagination';


export default function Role() {
    const [page, setPage] = React.useState(1);

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

        <Grid container spacing={1} sx={{marginBottom:"90px"}}>
            <Grid item xs={9}>
                <div className={styles.rolesdiv}>Roles</div>
            </Grid>
            <Grid item xs={1.5}>
                <Button sx={{marginTop:4, backgroundColor: "#4D47C3"}} variant="contained" onClick={handleOpen}>Add</Button>
            </Grid>
            <Grid item xs={1.5}>
                <Button sx={{marginTop:4, backgroundColor: "#4D47C3"}} variant="contained" onClick={handleOpen}>Filters</Button>
            </Grid>
        </Grid>

        <hr style={{position:"absolute", width: "1100px",height: "0px",left: "318px",top: "160px",border: "1px solid #CACACA"}}/>

        <TableData handleOpen = { handleOpen} handleClose = {handleClose} page={page}/>

        <PaginationControl page={page} setPage={setPage}/>
        
    </>
    
  );
}