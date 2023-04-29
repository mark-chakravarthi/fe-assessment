import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DialogModal from "@/components/DialogModal";
import TableData from "../components/Table"
import styles from "../styles/Home.module.css"
import PaginationControl from './Pagination';
import FilterModal from './FilterModal';

export default function Role() {

    // table data
    const [data, setData] = useState([]);

    // page state for pagination
    const [page, setPage] = React.useState(1);

    // add modal open
    const [open, setOpen] = useState(false);

    // filter modal open 
    const [filterOpen, setFilterOpen] = useState(false);

    // handle open and close of add modal

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // handle open and close of filter modal

    function handleFilterOpen() {
        setFilterOpen(true);
    }

    function handleFilterClose() {
        setFilterOpen(false);
    }

    return (
    <>

        {/* open modal to add */}

        {
            open && 
            <DialogModal open={open} handleClose={handleClose} itemId = ''/>
        }
 
        {/* Filter modal open */}

        {   
            filterOpen && 
            <FilterModal open={filterOpen} handleFilterClose={handleFilterClose} data={data} setData={setData}/>
        } 
        
        
        <Grid container spacing={1} sx={{marginBottom:"90px"}}>
            <Grid item xs={9}>
                <div className={styles.rolesdiv}>Roles</div>
            </Grid>
            <Grid item xs={1.5}>
                <Button sx={{marginTop:4, backgroundColor: "#4D47C3"}} variant="contained" onClick={handleOpen}>Add</Button>
            </Grid>
            <Grid item xs={1.5}>
                <Button sx={{marginTop:4, backgroundColor: "#4D47C3"}} variant="contained" onClick={handleFilterOpen}>Filters</Button>
            </Grid>
        </Grid>

        <hr style={{position:"absolute", width: "1100px",height: "0px",left: "318px",top: "160px",border: "1px solid #CACACA"}}/>

        {/* Table component */}

        <TableData 
            handleOpen = {handleOpen} 
            handleClose = {handleClose} 
            page={page} 
            data={data}
            setData={setData}
        />

        {/* Pagination component */}

        <PaginationControl 
            page={page} 
            setPage={setPage}
        />
  
    </>
    
  );
}