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

const AddForm = ({ setAlert, setMessage, setOpenModal }) => {
  const {
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const [newWholesaler, setNewWholesaler] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNo: "",
    wholeSalerId: "",
    role: "SUPER_ADMIN",
    locId: "",
  });
  const [addAlert, setAddAlert] = useState(false);
  const [nullAlert, setNullAlert] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  async function postDetails() {
    console.log(newWholesaler);
    try {
      const res = await axiosInstance.post("WholeSellers", newWholesaler);
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
      if (e.response.status === 409) {
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
  function handleChange(e) {
    setNewWholesaler({
      ...newWholesaler,
      [e.target.name]: e.target.value,
    });
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
            name="lirstName"
            {...register("firstName")}
            error={!!errors?.lirstName}
            helperText={errors?.lirstName?.message}
            sx={{ Padding: 5 }}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="LastName"
            name="lastName"
            {...register("lastName")}
            error={!!errors?.lastName}
            helperText={errors?.lastName?.message}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Email ID"
            name="emailId"
            {...register("emailId")}
            error={!!errors?.emailId}
            helperText={errors?.emailId?.message}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Phone Number"
            name="phoneNo"
            {...register("phoneNo")}
            error={!!errors?.phoneNo}
            helperText={
              addAlert
                ? "This Phone Number Already exists!"
                : errors?.phoneNo?.message
            }
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Wholesaler Id"
            name="wholeSalerId"
            {...register("wholeSalerId")}
            error={!!errors?.wholeSalerId}
            helperText={
              addAlert
                ? "This WholeSalerId Already Exists!"
                : errors?.wholeSalerId?.message
            }
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={newWholesaler.role}
            name="role"
            onChange={(e) => handleChange(e)}
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
            name="locId"
            {...register("locId")}
            error={!!errors?.locId}
            helperText={errors?.locId?.message}
            onChange={(e) => handleChange(e)}
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
