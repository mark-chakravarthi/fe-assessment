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
const EditForm = ({
  setAlert,
  setMessage,
  setOpenEditModal,
  filterDetails,
  setFilterDetails,
  table,
  existingWholesalerDetail,
  setExistingWholesalerDetail,
}) => {
  const {
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const [nullAlert, setNullAlert] = useState(false);
  const [addAlert, setAddAlert] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  async function putRequest() {
    try {
      const res = await axiosInstance.put(
        `${existingWholesalerDetail.wholeSalerId}`,
        existingWholesalerDetail
      );
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
      if (e.response.status === 409) {
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

  function handleChange(e) {
    setExistingWholesalerDetail({
      ...existingWholesalerDetail,
      [e.target.name]: e.target.value,
    });
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
            name="firstName"
            {...register("firstName")}
            error={!!errors?.firstName}
            helperText={errors?.firstName?.message}
            sx={{ Padding: 5 }}
            value={existingWholesalerDetail.firstName}
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
            value={existingWholesalerDetail.lastName}
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
            value={existingWholesalerDetail.emailId}
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
            value={existingWholesalerDetail.phoneNo}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Wholesaler Id"
            disabled={true}
            defaultValue={existingWholesalerDetail.wholeSalerId}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <Select
            labelId="role-select-label"
            id="role-select"
            name="role"
            value={existingWholesalerDetail.role}
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
            label="LOC id"
            name="locId"
            {...register("locId")}
            error={!!errors?.locId}
            helperText={errors?.locId?.message}
            value={existingWholesalerDetail.locId}
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
