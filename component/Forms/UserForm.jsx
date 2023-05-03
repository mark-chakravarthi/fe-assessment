import React, {useEffect} from "react";
import Modal from "@mui/material/Modal";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import CustomTextField from "../CustomTextField";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {displayNotification} from "../../services/notificationService";
import {addUser} from "../../api/addUser";
import {getUser} from "../../api/getUser";
import {editUser} from "../../api/editUser";
import {filterUser} from "@/api/filterUser";

const schema = Yup.object().shape({
  first_name: Yup.string()
    .required()
    .min(2, "minimum 2 characters long")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("First Name"),
  last_name: Yup.string()
    .required()
    .min(1, "minimum 1 characters long")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("Last Name"),
  email: Yup.string()
    .required()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g, "Should be a valid email")
    .label("Company Email"),
  phone: Yup.string()
    .required()
    .matches(/^[6789]\d{9}$/, "Invalid Phone number")
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
  const initialUserData={
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company_name: "",
    user_state: "",
  }

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
    setError,
  } = useForm({
    resolver: action == "Filter" ? "" : yupResolver(schema),
    mode: "onTouched",
    defaultValues: editFormData || initialUserData,
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
      clearErrors();
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
        console.log(err);
        if (err.response.status == "409") {
          setError(err.response.data.property, {
            type: "custom",
            message: err.response.data.message,
          });
        } else {
          displayNotification("error", "Could not edit user data");
        }
      }
    }

    if (action == "Edit") {
      try {
        if (data.user_state == "Active") {
          data.user_state = true;
        } else {
          data.user_state = false;
        }
        clearErrors();
        console.log(data,"idat")
        const response = await editUser(data.user_id, data);
        console.log(response,"resp")
        if (response.status >= "200" || response.status < "300") {
          setEditFormData(initialUserData);
          displayNotification("info", "Successfully Edited");
          fetchData();
          handleClose();
        } else {
          reset();
          displayNotification("error", "Could not edit user data");
        }
      } catch (err) {
        console.log("error", err)
        if (err.response.status == "409") {
          setError(err.response.data.property, {
            type: "custom",
            message: err.response.data.message,
          });
        } else {
          displayNotification("error", "Could not edit user data");
        }
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
        console.log(response,"rs")
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
    <FormProvider register={register}>
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
                      setEditFormData(initialUserData);
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
                <CustomTextField
                  label="First Name"
                  name="first_name"
                  errors={errors}
                />
                <CustomTextField
                  label="Last Name"
                  name="last_name"
                  errors={errors}
                />
                <CustomTextField
                  label="Email ID"
                  name="email"
                  errors={errors}
                />
                <CustomTextField
                  label="Phone Number"
                  name="phone"
                  errors={errors}
                />
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
                    <FormHelperText
                      error={true}
                      id="outlined-weight-helper-text"
                    >
                      {errors?.user_state?.message}
                    </FormHelperText>
                  )}
                </div>
                <CustomTextField
                  label="Company Name"
                  name="company_name"
                  errors={errors}
                />
              </div>
              <Button
                variant="contained"
                type="submit"
                sx={{marginTop: "1rem"}}
              >
                {action == "Add" && `ADD`}
                {action == "Edit" && `Update`}
                {action == "Filter" && `Continue`}
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </FormProvider>
  );
}
