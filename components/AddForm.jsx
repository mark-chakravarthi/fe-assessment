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
import { useState, useRef } from "react";
import { AxiosInstance } from "@/axios/ConfigAxios";
// import { useForm } from "react-hook-form";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// const schema = Yup.object().shape({
//   FirstName: Yup.string()
//     .required()
//     // .min(3, "minimum 3 characters long")
//     // .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
//     .label("Name"),
//   LastName: Yup.string()
//     .required()
//     // .min(3, "minimum 3 characters long")
//     // .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
//     .label("Name"),
//   EmailId: Yup.string()
//     .required()
//     // .min(3, "minimum 3 characters long")
//     // .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
//     .label("Name"),
//   PhoneNo: Yup.string()
//     .required()
//     .label("date"),
//   WholesalerId: Yup.string()
//     .required()
//     .label("date"),
//   // Role: Yup.string()
//   //   .required()
//   //   .label("role"),
//   LocId: Yup.string()
//     .required()
//     .label("date"),
// });

const AddForm = (props) => {
  // const {
  //   handleSubmit,
  //   formState: { errors },
  //   register,
  // } = useForm({
  //   resolver: yupResolver(schema),
  //   mode: "onTouched",
  // });
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [role, setRole] = useState("SUPER_ADMIN");
  const [wId, setWid] = useState("");
  const [locId, setlocId] = useState("");
  // const [wholesalerDetail, setWholesalerDetail] = useState({});
  // const fnameRef = useRef(null);
  // const lnameRef = useRef();
  // const emailIdRef = useRef();
  // const phoneNoRef = useRef();
  // const wIdRef = useRef();
  // const locIdRef = useRef();

  // const submit = data => {
  //   console.log(data);
  // };
  // function handleDetailsChange(e) {
  //   const newWholesaler = {
  //     firstName: fnameRef.current.value,
  //     lastName: lnameRef.current.value,
  //     emailId: emailIdRef.current.value,
  //     phoneNo: phoneNoRef.current.value,
  //     wholesalerId: wIdRef.current.value,
  //     wRole: role,
  //     locId: locIdRef.current.value,
  //   };
  //   console.log(fnameRef.current.value);
  //   setWholesalerDetail(newWholesaler);
  // }
  // console.log(wholesalerDetail);
  const wholesalerDetail = {
    firstName: fname,
    lastName: lname,
    emailId: email,
    phoneNo: phoneNo,
    wholeSalerId: wId,
    role: role,
    locId: locId,
  };
  async function handleSubmit() {
    const res = await AxiosInstance.post("WholeSellers",wholesalerDetail);
    // console.log(wholesalerDetail);
  }
  return (
    <form >
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
            // {...register("FirstName")}
            sx={{ Padding: 5 }}
            onChange={(e) => setFname(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="LastName"
            name="LastName"
            // {...register("LastName")}

            // ref={lnameRef}
            onChange={(e) => setLname(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Email ID"
            name="EmailId"
            // {...register("EmailId")}

            // ref={emailIdRef}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Phone Number"
            name="PhoneNo"
            // {...register("PhoneNo")}

            // ref={phoneNoRef}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Wholesaler Id"
            name="WholesalerId"
            // {...register("WholesalerId")}

            // ref={wIdRef}
            onChange={(e) => setWid(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: 3 }}>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            name="Role"
            // {...register("Role")}

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
            // {...register("LOCId")}

            // ref={locIdRef}
            onChange={(e) => setlocId(e.target.value)}
          />
        </Grid>

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </div>
      </Grid>
    </form>
  );
};

export default AddForm;
