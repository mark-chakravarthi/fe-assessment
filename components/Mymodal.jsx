import * as React from "react";
import Modal from "@mui/material/Modal";
import {TextField, Button, Box,Typography,FormHelperText} from "@mui/material";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const schema = Yup.object().shape({
  companyName: Yup.string()
    .required()
    .min(3, "minimum 3 characters long")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("Name"),
  companyEmail: Yup.string()
    .required()
    .min(3, "minimum 3 characters long")
    .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
    .label("Name"),
  validTill: Yup.string()
    .required()
    .label("date"),
  organisationName: Yup.string()
    .required()
    .label("date"),
  companyId: Yup.string()
    .required()
    .label("date")
});

const handleDateChange=(date)=>{
  console.log(date,"dtt")
}

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

export default function Mymodal({open,handleClose}) {
  const {
    handleSubmit,
    formState: {errors},
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const submit = data => {
    console.log(data.D);
  };

  const inputBoxStyles = {
    backgroundColor:"#F0EFFF"
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(submit)}>
          <div style={{
              display:"flex",
              justifyContent:"space-between"
              }}>
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
          Add Company
        </Typography>
        <div><CloseIcon style={{cursor:"pointer"}} onClick={()=>handleClose()}/></div>
              </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: "10px"
              }}
            >
              <div>
              <InputLabel>Company Name</InputLabel>
              <TextField
                id="companyName"
                fullWidth
                sx={inputBoxStyles}
                placeholder=""
                {...register("companyName")}
                error={errors.companyName ? true : false}
              />
              {errors.companyName&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.companyName?.message}</FormHelperText>}
              </div>

              <div>
              <InputLabel>Company&aposs Email ID</InputLabel>
              <TextField
                id="companyEmail"
                fullWidth
                sx={inputBoxStyles}
                placeholder=""
                {...register("companyEmail")}
                error={errors.companyEmail ? true : false}
              />
              {errors.companyEmail&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.companyEmail?.message}</FormHelperText>}
              </div>

              <div>
              <InputLabel>Valid Till</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker disablePast={true} defaultValue="29/04/2024" format="DD/MM/YYYY" onChange={(event)=>handleDateChange(event)}/>
    </LocalizationProvider>
              {errors.companyName&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.validTill?.message}</FormHelperText>}
              </div>

              <div>
              <InputLabel>Organisation Name</InputLabel>
              <TextField
                id="organizationName"
                fullWidth
                sx={inputBoxStyles}
                placeholder=""
                {...register("organizationName")}
                error={errors.organizationName ? true : false}
              />
              {errors.organizationName&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.organizationName?.message}</FormHelperText>}
              </div>
              <div>
              <InputLabel>Company ID</InputLabel>
              <TextField
                id="companyName"
                fullWidth
                sx={inputBoxStyles}
                placeholder=""
                {...register("companyName")}
                error={errors.companyName ? true : false}
              />
              {errors.companyName&&<FormHelperText error={true} id="outlined-weight-helper-text">{errors?.companyName?.message}</FormHelperText>}
              </div>
              {/* <TextField
                id="companyEmail"
                label="Company's Email ID"
                fullWidth
                margin="dense"
                sx={errors?.companyEmail ? {} : inputBoxStyles}
                helperText={errors?.companyEmail?.message}
                {...register("companyEmail")}
                error={errors.companyEmail ? true : false}
              />

              <TextField
                id="email"
                label="Email"
                fullWidth
                margin="dense"
                sx={errors?.name ? {} : inputBoxStyles}
                helperText={errors?.email?.message}
                {...register("email")}
                error={errors.email ? true : false}
              />
              <TextField
                id="age"
                label="Age"
                fullWidth
                margin="dense"
                sx={errors?.age ? {} : inputBoxStyles}
                helperText={errors?.age?.message}
                {...register("age")}
                error={errors.age ? true : false}
              />
              <TextField
                id="phone"
                label="Phone"
                fullWidth
                margin="dense"
                sx={errors?.phone ? {} : inputBoxStyles}
                helperText={errors?.phone?.message}
                {...register("phone")}
                error={errors.phone ? true : false}
              />

              <TextField
                id="address"
                label="Address"
                fullWidth
                margin="dense"
                sx={errors?.address ? {} : inputBoxStyles}
                helperText={errors?.address?.message}
                {...register("address")}
                error={errors.address ? true : false}
              /> */}
            </div>
              <Button
                variant="contained"
                type="submit"
                sx={{marginTop:"1rem"}}
              >
                ADD
              </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}