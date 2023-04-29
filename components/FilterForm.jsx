// import { Padding } from "@mui/icons-material";
import { Button, TextField, Grid, Typography, Divider,DialogActions } from "@mui/material";
import { useState } from "react";
import { AxiosInstance } from "@/axios/ConfigAxios";

const FilterForm = (props) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [wId, setWid] = useState("");
  const setWholesalerDetails = props.setWholesalerDetails;
  const setIsLastPage = props.setIsLastPage;
  const setOpenFilterModal=props.setOpenFilterModal;
  // const isLastPage=props.isLastPage;
  const filterDetails = {
    firstName: fname,
    lastName: lname,
    emailId: email,
    phoneNo: phoneNo,
    wholeSalerId: wId,
  };

  async function handleFilter() {
    setOpenFilterModal(false);
    AxiosInstance.get(`filter?pageNo=${props.page - 1}&pageSize=5`, {
      params: filterDetails,
    })
      .then((response) => {
        // Handle response
        setIsLastPage(response.data.lastPage);
        setWholesalerDetails(response.data.pageList);
        console.log(response.data, "");
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
  }

  function handleClear() {
    setFname("");
    setLname("");
    setEmail("");
    setPhoneNo("");
    setWid("");
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
            label="FirstName"
            sx={{ Padding: 5 }}
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="LastName"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Wholesaler Id"
            value={wId}
            onChange={(e) => setWid(e.target.value)}
          />
        </Grid>
        <DialogActions>
          <div>
            <Button variant="contained" color="primary" onClick={handleFilter}>
              continue
            </Button>
          </div>
        </DialogActions>
      </Grid>
    </form>
  );
};

export default FilterForm;
