// import { Padding } from "@mui/icons-material";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";

const FilterForm = (props) => {
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
        <Grid item xs={10}>
          <Typography variant="h5" sx={{ marginLeft: 3, color: "blue" }}>
            Filters
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" color="primary">
            Clear filter
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid container sx={{ margin: 3 }}>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          <TextField variant="outlined" label="FirstName" sx={{ Padding: 5 }} />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          <TextField variant="outlined" label="LastName" />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          <TextField variant="outlined" label="Email ID" />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          <TextField variant="outlined" label="Phone Number" />
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <TextField variant="outlined" label="Wholesaler Id" />
        </Grid>

        <div>
          <Button variant="contained" color="primary">
            continue
          </Button>
        </div>
      </Grid>
    </form>
  );
};

export default FilterForm;
