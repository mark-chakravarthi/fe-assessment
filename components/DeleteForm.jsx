import {
  Button,
  Grid,
  Typography,
  Divider,
  DialogActions,
} from "@mui/material";
import { axiosInstance } from "@/axios/ConfigAxios";

const DeleteForm = (props) => {
  const setOpenDeleteModal = props.setOpenDeleteModal;
  const setAlert = props.setAlert;
  const setMessage = props.setMessage;

  async function DeleteRequest() {
    const res = await axiosInstance.delete(`${props.wid}`);
    if (res.data.status === "ACCEPTED") {
      setAlert(true);
      setMessage(res.data.message);
    }
  }
  function handleSubmit() {
    setOpenDeleteModal(false);
    DeleteRequest();
  }
  function handleClose() {
    setOpenDeleteModal(false);
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

        <DialogActions>
          <Grid item xs={6}>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Yes Delete
            </Button>
          </Grid>
        </DialogActions>
      </Grid>
    </form>
  );
};

export default DeleteForm;
