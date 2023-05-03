import { Typography, Grid, Pagination } from "@mui/material";

const DisplayPagination = (props) => {
  function handleChange(e, value) {
    props.setPage(value);
  }
  return (
    <>
      <Grid container >
        <Grid item  xs={3}>
          <Typography sx={{textAlign:'center'}}>Page: {props.page}</Typography>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={8}>
          <Pagination
            count={props.pages}
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

