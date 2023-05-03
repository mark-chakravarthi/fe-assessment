import {
  Button,
  TextField,
  Grid,
  Typography,
  Divider,
  DialogActions,
} from "@mui/material";
import { axiosInstance } from "@/axios/ConfigAxios";

const FilterForm = ({
  setWholesalerDetails,
  setOpenFilterModal,
  setTable,
  filterDetails,
  setFilterDetails,
  page,
}) => {
  function handleFilter() {
    setTable("filter");
    setOpenFilterModal(false);
    filterRequest(filterDetails);
  }

  function filterRequest(filterDetails) {
    axiosInstance
      .get(`filter?pageNo=${page - 1}&pageSize=5`, {
        params: filterDetails,
      })
      .then((response) => {
        // Handle response
        setWholesalerDetails(response.data.pageList);
        console.log(response.data, "");
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
  }

  function handleChange(e) {
    console.log(e.target.name);
    setFilterDetails({ ...filterDetails, [e.target.name]: e.target.value });
  }

  function handleClear() {
    setOpenFilterModal(false);
    setTable("get");
    setFilterDetails({
      firstName: "",
      lastName: "",
      emailId: "",
      phoneNo: "",
      wholeSalerId: "",
    });
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
            name="firstName"
            sx={{ Padding: 5 }}
            value={filterDetails.firstName}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="LastName"
            name="lastName"
            value={filterDetails.lastName}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Email ID"
            name="emailId"
            value={filterDetails.emailId}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={6} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Phone Number"
            name="phoneNo"
            value={filterDetails.phoneNo}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <TextField
            variant="outlined"
            label="Wholesaler Id"
            name="wholeSalerId"
            value={filterDetails.wholeSalerId}
            onChange={(e) => handleChange(e)}
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
