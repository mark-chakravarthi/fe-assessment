// import { Padding } from "@mui/icons-material";
import { Button, TextField, Grid, Typography, Divider, DialogTitle } from "@mui/material";
import { useState } from "react";

const DeleteForm = (props) => {
  return (
    <form>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ marginLeft: 3, color: "blue" }}>
            Delete
          </Typography>
          {/* <DialogTitle>Delte</DialogTitle> */}
        </Grid>
      </Grid>
      <Divider />
      <Grid container sx={{ margin: 3 }}>
        <Typography>
          Are you sure you want to delete this wholesaler?
        </Typography>

        <Grid item xs={6}>
          <Button variant="outlined" color="primary">
            cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary">
            Yes Delete
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DeleteForm;
