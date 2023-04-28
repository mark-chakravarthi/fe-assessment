// import { Button, TextField, Grid, Typography, Divider } from "@mui/material";
// import { useState } from "react";
// import { AxiosInstance } from "@/axios/ConfigAxios";

// const FilterForm = (props) => {
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNo, setPhoneNo] = useState("");
//   const [wId, setWid] = useState("");
//   const setWholesalerDetails=props.setWholesalerDetails;
//   const setIsLastPage=props.setIsLastPage;
//   const IsLastPage=props.IsLastPage;
//   const filterDetails = {
//     firstName: fname,
//     lastName: lname,
//     emailId: email,
//     phoneNo: phoneNo,
//     wholeSalerId: wId,
//   };

//   async function handleFilter() {
//     console.log(filterDetails,'inside handleFilter');
//     AxiosInstance.get("filter?pageNo=0&pageSize=5", {params:filterDetails})
//       .then((response) => {
//         // Handle response
//         // console.log(response.data.content);
//         setWholesalerDetails(response.data.pageList);
//         setIsLastPage(response.data.lastPage)
//         console.log(IsLastPage,'in filter form');
//       })
//       .catch((err) => {
//         // Handle errors
//         console.error(err);
//       });
//   }

//   function handleClear(){
//     setFname('');
//     setLname("");
//     setEmail('');
//     setPhoneNo('');
//     setWid("");
//   }

//   return (
//     <form>
//       <Grid
//         container
//         sx={{
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 2,
//           marginBottom: 2,
//         }}
//       >
//         <Grid item xs={10}>
//           <Typography variant="h5" sx={{ marginLeft: 3, color: "blue" }}>
//             Filters
//           </Typography>
//         </Grid>
//         <Grid item xs={2}>
//           <Button variant="outlined" color="primary" onClick={handleClear}>
//             Clear filter
//           </Button>
//         </Grid>
//       </Grid>
//       <Divider />
//       <Grid container sx={{ margin: 3 }}>
//         <Grid item xs={6} sx={{ marginBottom: 3 }}>
//           <TextField
//             variant="outlined"
//             label="FirstName"
//             sx={{ Padding: 5 }}
//             value={fname}
//             onChange={(e) => setFname(e.target.value)}
//           />
//         </Grid>
//         <Grid item xs={6} sx={{ marginBottom: 3 }}>
//           <TextField
//             variant="outlined"
//             label="LastName"
//             value={lname}
//             onChange={(e) => setLname(e.target.value)}
//           />
//         </Grid>
//         <Grid item xs={6} sx={{ marginBottom: 3 }}>
//           <TextField
//             variant="outlined"
//             label="Email ID"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Grid>
//         <Grid item xs={6} sx={{ marginBottom: 3 }}>
//           <TextField
//             variant="outlined"
//             label="Phone Number"
//             value={phoneNo}
//             onChange={(e) => setPhoneNo(e.target.value)}
//           />
//         </Grid>
//         <Grid item xs={12} sx={{ marginBottom: 3 }}>
//           <TextField
//             variant="outlined"
//             label="Wholesaler Id"
//             value={wId}
//             onChange={(e) => setWid(e.target.value)}
//           />
//         </Grid>

//         <div>
//           <Button variant="contained" color="primary" onClick={handleFilter}>
//             continue
//           </Button>
//         </div>
//       </Grid>
//     </form>
//   );
// };

// export default FilterForm;

import { useState } from 'react';
import { TextField, Button, Grid , Typography, Divider} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';

const FilterForm = (props) => {
    
  const [rname, setRname] = useState('');
  const [orgname, setOrgname] = useState('');
  const [rid, setRid] = useState('');
  const [cdate, setCdate] = useState();
  const [rstate, setRstate] = useState('');

//   const filterDetails = {
//     roleName: rname,
//     organizationName: orgname,
//     selectedDate: cdate,
//     roleState: rstate,
//     roleId: rid,
//   };

  async function handleFilter() {
    axios.get(`${process.env.BASE_URL}/roles/new/filter?roleName=${rname}&roleId=${rid}&orgName=${orgname}&roleState=${rstate}&&pageNo=0&pageSize=2`)
      .then((response) => {
        // Handle response
        // console.log(response.data.content);
        props.setData(response.data.pageList);
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });

    //   fetch(`${process.env.BASE_URL}/roles/new/filter?roleName=${rname}&roleId=${rid}&orgName=${orgname}&roleState=${rstate}&createdDate=${cdate}`)
    //     // .then((res) => res.json())
    //     // .then((data) => props.setData(data.source));
    //     .then((response) => props.setData(response.data.pageList))
    }

  function handleClear(){
    setRname("");
    setOrgname("");
    setRid('');
    setCdate('');
    setRstate("");
  }

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
          <Button variant="outlined" color="primary" onClick={handleClear}>
            Clear filter
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid container sx={{ margin: 3 }}>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Role Name"
            sx={{ Padding: 5 }}
            value={rname}
            onChange={(e) => setRname(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Organisation Name"
            value={orgname}
            onChange={(e) => setOrgname(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Created Date"
            value={cdate}
            onChange={(e) => setCdate(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          {/* <TextField
            variant="outlined"
            label="Role State"
            value={rstate}
            onChange={(e) => setRstate(e.target.value)} /> */}
            <Select
                value={rstate}
                onChange={e=>{
                    setRstate(e.target.value)
                }}
                label="Role State"
                variant="outlined"
                sx={{ width: 226 }}
                >
                <MenuItem value={true}>active</MenuItem>
                <MenuItem value= {false}>inactive</MenuItem>
            </Select>
          
        </Grid>

        

        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Role Id"
            value={rid}
            onChange={(e) => setRid(e.target.value)}
          />
        </Grid>

        <div>
          <Button variant="contained" color="primary" onClick={handleFilter}>
            continue
          </Button>
        </div>
      </Grid>
    </form>

  );
}

export default FilterForm;