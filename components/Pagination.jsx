import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { Grid } from "@mui/material";

export default function PaginationControl(props) {
 
  // handle page number
  const handleChange = (event,value) => {
    props.setPage(value);
  };

  return (
    <>
        <Grid container sx={{marginTop:5}}>
            <Grid item xs={4}>
                <Typography>Page : {props.page}</Typography>
            </Grid>
            <Grid item xs={8}>
                <Pagination count={5} page={props.page} onChange={handleChange} />
            </Grid>
        </Grid>
    </>
  );
}