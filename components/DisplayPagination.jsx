import { Typography, Grid, Pagination } from "@mui/material";

const DisplayPagination = (props) => {
  function handleChange(e, value) {
    props.setPage(value);
  }
  return (
    <>
      <Grid container style={{bottom:0}}>
        <Grid item xs={3}>
          <Typography>Page: {props.page}</Typography>
        </Grid>
        <Grid item xs={9}>
          <Pagination
            count={10}
            page={props.page}
            color="primary"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DisplayPagination;

