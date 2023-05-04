import {
  Grid,
  Typography,
  Button,
  IconButton,
  BottomNavigation,
  Paper,
  Snackbar,
} from "@mui/material";
import Image from "next/image";
import filter from "../images/filter.png";
import { useState } from "react";
import DisplayPagination from "./DisplayPagination";
import DialogModal from "./DialogModal";
import AddForm from "./AddForm";
import FilterForm from "./FilterForm";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import MyTable from "./MyTable";

const Wholesaler = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [page, setPage] = useState(1);
  const [wholesalerDetails, setWholesalerDetails] = useState([]);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [table, setTable] = useState("get");
  const [filterDetails, setFilterDetails] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNo: "",
    wholeSalerId: "",
  });
  const [pages, setPages] = useState(0);

  function handleCloseAddModal() {
    setOpenAddModal(false);
  }
  function handleCloseFilterModal() {
    setOpenFilterModal(false);
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        autoHideDuration={3000}
        onClose={() => setAlert(false)}
      >
        <Alert
          variant="filled"
          severity="success"
          style={{ width: "70%" }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Grid
        container
        sx={{ marginTop: 0, marginLeft: 5, marginRight: 5 }}
        rowSpacing={4}
      >
        <Grid item xs={9}>
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
            Wholesalers
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: 82, height: 36 }}
                onClick={() => setOpenAddModal(true)}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={7}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: 82, height: 36, fontweight: 400, fontsize: 15 }}
                onClick={() => setOpenFilterModal(true)}
              >
                <Image src={filter} width="18px" height="15.3px" />
                Filters
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <hr
          style={{
            position: "relative",
            width: "960px",
            left: "-30px",
            top: "30px",
            border: "0.5px solid #CACACA",
          }}
        />
        <Grid item>
          <MyTable
            page={page}
            wholesalerDetails={wholesalerDetails}
            setWholesalerDetails={setWholesalerDetails}
            setAlert={setAlert}
            setMessage={setMessage}
            openFilterModal={openFilterModal}
            table={table}
            filterDetails={filterDetails}
            setFilterDetails={setFilterDetails}
            openAddModal={openAddModal}
            setPages={setPages}
          />
        </Grid>
        <Paper sx={{ position: "fixed", bottom: 0, left: 288, right: 0 }}>
          <BottomNavigation sx={{ alignItems: "center" }}>
            <DisplayPagination page={page} setPage={setPage} pages={pages} />
          </BottomNavigation>
        </Paper>
        <DialogModal
          open={openAddModal}
          children={
            <AddForm
              setAlert={setAlert}
              setMessage={setMessage}
              setOpenModal={setOpenAddModal}
            />
          }
          handleClose={handleCloseAddModal}
          onClose={() => setOpenAddModal(false)}
        />
        <DialogModal
          open={openFilterModal}
          children={
            <FilterForm
              wholesalerDetails={wholesalerDetails}
              setWholesalerDetails={setWholesalerDetails}
              page={page}
              setOpenFilterModal={setOpenFilterModal}
              setTable={setTable}
              filterDetails={filterDetails}
              setFilterDetails={setFilterDetails}
            />
          }
          handleClose={handleCloseFilterModal}
        />
      </Grid>
    </>
  );
};

export default Wholesaler;
