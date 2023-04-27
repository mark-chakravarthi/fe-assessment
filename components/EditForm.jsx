// import { Padding } from "@mui/icons-material";
import { Button, TextField, Select, MenuItem, Grid, Typography, Divider } from "@mui/material";
import { useState } from "react";

const EditForm = (props) => {
  const [role, setRole] = useState("SUPER_ADMIN");
  function handleChange(e) {
    setRole(e.target.value);
  }
  return (
    <form>
      <Typography variant="h5" sx={{marginLeft:3,marginTop:3,color:'blue'}}>Edit Wholesaler</Typography>
      <Divider/>
      <Grid container sx={{margin:3}} >
        <Grid item xs={4} sx={{marginBottom:3}}>
          <TextField variant="outlined" label="FirstName" sx={{ Padding: 5 }} />
        </Grid>
        <Grid item xs={4} sx={{marginBottom:3}}>
          <TextField variant="outlined" label="LastName" />
        </Grid>
        <Grid item xs={4} sx={{marginBottom:3}}>
          <TextField variant="outlined" label="Email ID" />
        </Grid>
        <Grid item xs={4} sx={{marginBottom:3}}>
          <TextField variant="outlined" label="Phone Number" />
        </Grid>
        <Grid item xs={4} sx={{marginBottom:3}}>
          <TextField variant="outlined" label="Wholesaler Id" disabled='true'/>
        </Grid>
        <Grid item xs={4} sx={{marginBottom:3}}>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            onChange={handleChange}
            sx={{width:225}}
          >
            <MenuItem value={"SUPER_ADMIN"}>SUPER_ADMIN</MenuItem>
            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
            <MenuItem value={"F&B_MANAGER"}>F&B_MANAGER</MenuItem>
            <MenuItem value={"BA"}>BA</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sx={{marginBottom:3}}>
          <TextField variant="outlined" label="LOC id" />
        </Grid>

        <div>
          {/* <Button variant="contained" color="error" onClick={props.handleClose}>
            Cancel
          </Button> */}
          <Button variant="contained" color="primary">
            Update
          </Button>
        </div>
      </Grid>
    </form>
  );
};

export default EditForm;
