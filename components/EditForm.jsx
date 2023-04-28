// import { Padding } from "@mui/icons-material";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import { AxiosInstance } from "@/axios/ConfigAxios";
const EditForm = (props) => {
  const wDetails = props.wDetail;
  const [fname, setFname] = useState(wDetails.fname);
  const [lname, setLname] = useState(wDetails.lname);
  const [email, setEmail] = useState(wDetails.email);
  const [phoneNo, setPhoneNo] = useState(wDetails.pno);
  const [locId, setlocId] = useState(wDetails.locId);
  // console.log('in edit form',wDetails);
  const [role, setRole] = useState(wDetails.role);

  const wholesalerDetail = {
    firstName: fname,
    lastName: lname,
    emailId: email,
    phoneNo: phoneNo,
    wholeSalerId: wDetails.wId,
    role: role,
    locId: locId,
  };
  async function handleUpdate() {
    const res = await AxiosInstance.put(`${wDetails.wId}`, wholesalerDetail);
    // console.log(wholesalerDetail,'inside axios update');
  }
  return (
    <form>
      <Typography
        variant="h5"
        sx={{ marginLeft: 3, marginTop: 3, color: "blue" }}
      >
        Edit Wholesaler
      </Typography>
      <Divider />
      <Grid container sx={{ margin: 3 }}>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="FirstName"
            sx={{ Padding: 5 }}
            defaultValue={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="LastName"
            defaultValue={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Email ID"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Phone Number"
            defaultValue={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Wholesaler Id"
            disabled="true"
            defaultValue={wDetails.wId}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            onChange={() => setRole(e.target.value)}
            sx={{ width: 225 }}
          >
            <MenuItem value={"SUPER_ADMIN"}>SUPER_ADMIN</MenuItem>
            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
            <MenuItem value={"F&B_MANAGER"}>F&B_MANAGER</MenuItem>
            <MenuItem value={"BA"}>BA</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="LOC id"
            defaultValue={locId}
            onChange={(e) => setlocId(e.target.value)}
          />
        </Grid>

        <div>
          {/* <Button variant="contained" color="error" onClick={props.handleClose}>
            Cancel
          </Button> */}
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </Grid>
    </form>
  );
};

export default EditForm;
