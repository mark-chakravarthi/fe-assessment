// import { Padding } from "@mui/icons-material";
import { Button, TextField, Grid, Typography, Divider, DialogTitle } from "@mui/material";
import { useState } from "react";
import { AxiosInstance } from "@/axios/ConfigAxios";

const DeleteForm = (props) => {
  async function handleSubmit(){
    const res=await AxiosInstance.delete(`${props.wid}`);
    console.log("in delete");
  }
  console.log(props.wid);
  return (
    <form >
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Yes Delete
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DeleteForm;
