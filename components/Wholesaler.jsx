import { Grid, Typography, Button, Divider, IconButton } from "@mui/material";
import Image from "next/image";
import filter from "../images/filter.png";
import DisplayTable from "./DisplayTable";
import { useState } from "react";
import DisplayPagination from "./DisplayPagination";
import DialogModal from "./DialogModal";
import AddForm from "./AddForm";
import FilterForm from "./FilterForm";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const Wholesaler = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [page, setPage] = useState(1);
  const [wholesalerDetails, setWholesalerDetails] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  function handleCloseAddModal() {
    setOpenAddModal(false);
  }
  function handleCloseFilterModal() {
    setOpenFilterModal(false);
  }

  return (
    <>
      <Collapse in={alert}>
        <Alert
          variant="filled"
          severity="success"
          width="120%"
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
      </Collapse>
      <Grid container sx={{ margin: 5 }} rowSpacing={4}>
        <Grid item xs={8}>
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

        <Grid item xs={4}>
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
            <Grid item xs={4}>
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
        <Divider />
        <Grid item>
          <DisplayTable
            page={page}
            wholesalerDetails={wholesalerDetails}
            setWholesalerDetails={setWholesalerDetails}
            setAlert={setAlert}
            setMessage={setMessage}
          />
        </Grid>
        <DisplayPagination
          page={page}
          setPage={setPage}
          isLastPage={isLastPage}
          setIsLastPage={setIsLastPage}
        />
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
          onClose={()=>setOpenAddModal(false)}
        />
        <DialogModal
          open={openFilterModal}
          children={
            <FilterForm
              wholesalerDetails={wholesalerDetails}
              setWholesalerDetails={setWholesalerDetails}
              isLastPage={isLastPage}
              setIsLastPage={setIsLastPage}
              page={page}
              setOpenFilterModal={setOpenFilterModal}
            />
          }
          handleClose={handleCloseFilterModal}
        />
      </Grid>
    </>
  );
};

export default Wholesaler;
