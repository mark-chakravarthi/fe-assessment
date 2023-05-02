import React, {useEffect} from "react";
import Modal from "@mui/material/Modal";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {displayNotification} from "../services/notificationService";
import {addUser} from "../api/addUser";
import {getUser} from "../api/getUser";
import {editUser} from "../api/editUser";
import {filterUser} from "@/api/filterUser";

const schema = Yup.object().shape({
  first_name: Yup.string()
    .required()
    .min(3, "minimum 3 characters long")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("First Name"),
  last_name: Yup.string()
    .required()
    .min(3, "minimum 3 characters long")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("Last Name"),
  email: Yup.string()
    .required()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Should be a valid email")
    .label("Company Email"),
  phone: Yup.string()
    .required()
    .matches(/^[789]\d{9}$/, "Invalid Phone number")
    .label("Phone Number"),
  company_name: Yup.string()
    .required()
    .min(3, "Minimum 3 Characters required")
    .label("Company Name"),
  user_state: Yup.string()
    .oneOf(["Active", "Inactive"])
    .required()
    .label("User State"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "7px",
  p: 4,
};

export default function UserForm({
  open,
  handleClose,
  editFormData,
  setEditFormData,
  selectedDomain,
  action,
  setData,
  setFilterQuery,
  setIsFilter,
  setPageNumber,
  pageNumber = 1,
}) {
  const fetchData = async () => {
    try {
      const data = await getUser(pageNumber);
      setData(data);
    } catch (err) {
      displayNotification("error", "Could not get user data");
    }
  };

  const {
    handleSubmit,
    formState: {errors},
    register,
    setValue,
    getValues,
    clearErrors,
    reset,
  } = useForm({
    resolver: action == "Filter" ? "" : yupResolver(schema),
    mode: "onTouched",
    defaultValues: editFormData || {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company_name: "",
      user_state: "",
    },
  });

  useEffect(() => {
    if (action == "Add") {
      reset();
    }
    reset(editFormData);
  }, [editFormData, action]);

  const submit = async data => {
    if (action == "Add") {
      setIsFilter(false);
      setFilterQuery();
      setPageNumber(1);
      if (data.user_state == "Active") {
        data.user_state = true;
      } else {
        data.user_state = false;
      }
      try {
        const response = await addUser(data);
        if (response.status >= "200" && response.status <= "300") {
          reset();
          displayNotification("info", "Successfully Added");
          fetchData();
          handleClose();
        } else {
          displayNotification(
            "error",
            response?.response?.data?.error?.message ||
              "Could not add user to database"
          );
        }
      } catch (err) {
        if (err.response.data.status == "400")
          displayNotification("error", err.response.data.message);
        else displayNotification("error", "Could not add user to database");
      }
    }

    if (action == "Edit") {
      try {
        if (data.user_state == "Active") {
          data.user_state = true;
        } else {
          data.user_state = false;
        }
        const response = await editUser(data.userId, data);
        if (response.status >= "200" || response.status < "300") {
          setEditFormData({
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            company_name: "",
            user_state: "",
          });
          displayNotification("info", "Successfully Edited");
          fetchData();
          handleClose();
        } else {
          reset();
          displayNotification("error", "Could not edit user data");
        }
      } catch (err) {
        displayNotification("error", "Could not edit user data");
      }
    }

    if (action == "Filter") {
      try {
        if (data.user_state == "Active") {
          data.user_state = true;
        } else if (data.user_state == "Inactive") {
          data.user_state = false;
        } else {
          data.user_state = "";
        }
        setIsFilter(true);
        setFilterQuery(data);
        setPageNumber(1);
        const response = await filterUser(data);
        setData(response.data);
        handleClose();
      } catch (err) {
        displayNotification("error", "Could not filter");
      }
    }
  };

  const inputBoxStyles = {
    backgroundColor: "#F0EFFF",
    width: "100%",
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(submit)}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontfamily: "Montserrat",
                  fontstyle: "normal",
                  fontweight: 600,
                  fontsize: 10,
                  color: "blue",
                }}
              >
                {selectedDomain == "Companies" && `${action} Company`}
                {selectedDomain == "Users" && `${action} Users`}
              </Typography>
              <div>
                {action === "Filter" && (
                  <Button variant="outlined" onClick={() => reset()}>
                    Clear
                  </Button>
                )}
                <CloseIcon
                  style={{
                    cursor: "pointer",
                    marginLeft: "0.5rem",
                  }}
                  onClick={() => {
                    setEditFormData({
                      first_name: "",
                      last_name: "",
                      email: "",
                      phone: "",
                      company_name: "",
                      user_state: "",
                    });
                    handleClose();
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: "10px",
              }}
            >
              <div>
                <InputLabel>First Name</InputLabel>
                <TextField
                  id="first_name"
                  fullWidth
                  sx={inputBoxStyles}
                  placeholder=""
                  {...register("first_name")}
                  error={errors.first_name ? true : false}
                />
                {errors.first_name && (
                  <FormHelperText error={true} id="outlined-weight-helper-text">
                    {errors?.first_name?.message}
                  </FormHelperText>
                )}
              </div>

              <div>
                <InputLabel>Last Name</InputLabel>
                <TextField
                  id="last_name"
                  fullWidth
                  sx={inputBoxStyles}
                  placeholder=""
                  {...register("last_name")}
                  error={errors.last_name ? true : false}
                />
                {errors.last_name && (
                  <FormHelperText error={true} id="outlined-weight-helper-text">
                    {errors?.last_name?.message}
                  </FormHelperText>
                )}
              </div>

              <div>
                <InputLabel>Email ID</InputLabel>
                <TextField
                  id="email"
                  fullWidth
                  sx={inputBoxStyles}
                  placeholder=""
                  {...register("email")}
                  error={errors.email ? true : false}
                />
                {errors.email && (
                  <FormHelperText error={true} id="outlined-weight-helper-text">
                    {errors?.email?.message}
                  </FormHelperText>
                )}
              </div>

              <div>
                <InputLabel>Phone Number</InputLabel>
                <TextField
                  id="phone"
                  fullWidth
                  sx={inputBoxStyles}
                  placeholder=""
                  {...register("phone")}
                  error={errors.phone ? true : false}
                />
                {errors.phone && (
                  <FormHelperText error={true} id="outlined-weight-helper-text">
                    {errors?.phone?.message}
                  </FormHelperText>
                )}
              </div>
              <div>
                <InputLabel>User State</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={getValues("user_state")}
                  onChange={event => {
                    setValue("user_state", event.target.value, true);
                    clearErrors("user_state");
                  }}
                  sx={inputBoxStyles}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem key="inactive" value={"Inactive"}>
                    Inactive
                  </MenuItem>
                  <MenuItem key="active" value={"Active"}>
                    Active
                  </MenuItem>
                </Select>
                {errors.user_state && (
                  <FormHelperText error={true} id="outlined-weight-helper-text">
                    {errors?.user_state?.message}
                  </FormHelperText>
                )}
              </div>
              <div>
                <InputLabel>Company Name</InputLabel>
                <TextField
                  id="company_name"
                  fullWidth
                  sx={inputBoxStyles}
                  placeholder=""
                  {...register("company_name")}
                  error={errors.company_name ? true : false}
                />
                {errors.company_name && (
                  <FormHelperText error={true} id="outlined-weight-helper-text">
                    {errors?.company_name?.message}
                  </FormHelperText>
                )}
              </div>
            </div>
            <Button variant="contained" type="submit" sx={{marginTop: "1rem"}}>
              {action == "Add" && `ADD`}
              {action == "Edit" && `Update`}
              {action == "Filter" && `Continue`}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
