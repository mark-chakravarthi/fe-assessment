import {
  Button,
  TextField,
  Grid,
  Typography,
  Divider,
  DialogTitle,
} from "@mui/material";
import { AxiosInstance } from "@/axios/ConfigAxios";

const DeleteForm = (props) => {
  const setAlert=props.setAlert;
  const setMessage=props.setMessage;
  async function handleSubmit() {
    const res = await AxiosInstance.delete(`${props.wid}`);
    if(res.data.status==='ACCEPTED'){
      setAlert(true);
      setMessage(res.data.message);
    }
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
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ marginLeft: 3, color: "blue" }}>
            Delete
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container sx={{ margin: 3 }}>
        <Typography>
          Are you sure you want to delete this wholesaler?
        </Typography>

        <Grid item xs={6}>
          <Button variant="outlined" color="primary">
            cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Yes Delete
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DeleteForm;
