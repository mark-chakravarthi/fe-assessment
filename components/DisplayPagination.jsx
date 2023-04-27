import { Typography, Grid, Pagination } from "@mui/material";
import { useState } from "react";

const DisplayPagination = () => {
  const [page, setPage] = useState(1);
  function handleChange(e, value) {
    setPage(value);
  }
  return (
    <>
      <Grid container style={{bottom:0}}>
        <Grid item xs={3}>
          <Typography>Page: {page}</Typography>
        </Grid>
        <Grid item xs={9}>
          <Pagination
            count={10}
            page={page}
            color="primary"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DisplayPagination;
