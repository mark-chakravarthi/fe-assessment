import {
  Button,
  TextField,
  Select,
  MenuItem,
  Grid,
  Typography,
  Divider,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/axios/ConfigAxios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations/Editval";
const EditForm = (props) => {
  const {
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const wDetails = props.wDetail;
  const [fname, setFname] = useState(wDetails.fname);
  const [lname, setLname] = useState(wDetails.lname);
  const [email, setEmail] = useState(wDetails.email);
  const [phoneNo, setPhoneNo] = useState(wDetails.pno);
  const [locId, setlocId] = useState(wDetails.locId);
  const [role, setRole] = useState(wDetails.role);
  const [nullAlert, setNullAlert] = useState(false);
  const [addAlert, setAddAlert] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const setAlert = props.setAlert;
  const setMessage = props.setMessage;
  const setOpenEditModal = props.setOpenEditModal;
  const filterDetails = props.filterDetails;
  const setFilterDetails = props.setFilterDetails;
  const table = props.table;

  const wholesalerDetail = {
    firstName: fname,
    lastName: lname,
    emailId: email,
    phoneNo: phoneNo,
    wholeSalerId: wDetails.wId,
    role: role,
    locId: locId,
  };
  async function putRequest() {
    try {
      const res = await axiosInstance.put(`${wDetails.wId}`, wholesalerDetail);
      if (res.status === 200) {
        if (table === "filter") {
          setFilterDetails({ ...filterDetails });
        }
        setOpenEditModal(false);
        setAlert(true);
        setMessage("Successfully Updated!");
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        setNullAlert(true);
      }
      if (
        e.response.data.statusCode === 302 &&
        e.response.data.message === "This Phone Number Already exists"
      ) {
        setAddAlert(true);
      }
    }
  }

  function handleUpdate() {
    setIsDisabled(true);
    putRequest();
    setTimeout(() => {
      setIsDisabled(false);
    }, 1000);
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
            name="FirstName"
            {...register("FirstName")}
            error={!!errors?.FirstName}
            helperText={errors?.FirstName?.message}
            sx={{ Padding: 5 }}
            defaultValue={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="LastName"
            name="LastName"
            {...register("LastName")}
            error={!!errors?.LastName}
            helperText={errors?.LastName?.message}
            defaultValue={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Email ID"
            name="EmailId"
            {...register("EmailId")}
            error={!!errors?.EmailId}
            helperText={errors?.EmailId?.message}
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Phone Number"
            name="PhoneNo"
            {...register("PhoneNo")}
            error={!!errors?.PhoneNo}
            helperText={
              addAlert
                ? "This Phone Number Already exists!"
                : errors?.PhoneNo?.message
            }
            defaultValue={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Wholesaler Id"
            disabled={true}
            defaultValue={wDetails.wId}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
            name="LOCId"
            {...register("LOCId")}
            error={!!errors?.LOCId}
            helperText={errors?.LOCId?.message}
            defaultValue={locId}
            onChange={(e) => setlocId(e.target.value)}
          />
        </Grid>
        {nullAlert && (
          <Grid item xs={12}>
            <p style={{ color: "red", fontFamily: "monospace" }}>
              Enter valid Details!
            </p>
          </Grid>
        )}
        <DialogActions>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              disabled={isDisabled}
            >
              Update
            </Button>
          </div>
        </DialogActions>
      </Grid>
    </form>
  );
};

export default EditForm;
