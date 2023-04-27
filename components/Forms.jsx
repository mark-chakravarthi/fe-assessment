import { Padding } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";

const Forms = (props) => {
  return (
    <form>
      <TextField variant="outlined" label="FirstName" sx={{Padding:5}}/>
      <TextField variant="outlined" label="LastName" />
      <TextField variant="outlined" label="UserName" />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        // autoComplete="current-password"
      />

      <div>
        <Button variant="contained" color="error" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default Forms;
