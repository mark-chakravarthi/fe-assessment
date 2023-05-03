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
import { useState, useRef } from "react";
import { axiosInstance } from "@/axios/ConfigAxios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations/Addval";

const AddForm = (props) => {
  const {
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [role, setRole] = useState("SUPER_ADMIN");
  const [wId, setWid] = useState("");
  const [locId, setlocId] = useState("");
  const [addAlert, setAddAlert] = useState(false);
  const [nullAlert, setNullAlert] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const setAlert = props.setAlert;
  const setMessage = props.setMessage;
  const wholesalerDetail = {
    firstName: fname,
    lastName: lname,
    emailId: email,
    phoneNo: phoneNo,
    wholeSalerId: wId,
    role: role,
    locId: locId,
  };
  const setOpenModal = props.setOpenModal;
  async function postDetails() {
    try {
      const res = await axiosInstance.post("WholeSellers", wholesalerDetail);
      setOpenModal(false);
      if (res.status == 200) {
        setAlert(true);
        setMessage("Successfully Added Wholesaler");
      }
    } catch (e) {
      console.log(e);
      if (
        e.response.data.statusCode === 302 &&
        e.response.data.message === "This WholeSalerId Already Exists"
      ) {
        setAddAlert(true);
      }
      if (
        e.response.data.statusCode === 302 &&
        e.response.data.message === "This Phone Number Already exists"
      ) {
        setAddAlert(true);
      }
      if (e.response.status === 400) {
        setNullAlert(true);
      }
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    setIsDisabled(true);
    postDetails();
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
        Add Wholesaler
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
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Wholesaler Id"
            name="WholesalerId"
            {...register("WholesalerId")}
            error={!!errors?.WholesalerId}
            helperText={
              addAlert
                ? "This WholeSalerId Already Exists!"
                : errors?.WholesalerId?.message
            }
            onChange={(e) => setWid(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            name="Role"
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
            label="LOC Id"
            name="LOCId"
            {...register("LOCId")}
            error={!!errors?.LOCId}
            helperText={errors?.LOCId?.message}
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
        <div>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Add
            </Button>
          </DialogActions>
        </div>
      </Grid>
    </form>
  );
};

export default AddForm;
