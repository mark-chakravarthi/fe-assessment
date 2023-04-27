import { Grid, Typography, Button, Divider } from "@mui/material";
import Image from "next/image";
import filter from "../images/filter.png";
import DisplayTable from "./DisplayTable";
import { useState } from "react";
import DisplayPagination from "./DisplayPagination";
import DialogModal from "./DialogModal";
import Forms from "./Forms";
// import { ThemeProvider, createTheme } from '@mui/system';

// const theme = createTheme({
//     palette: {
//       background: {
//         paper: '#fff',
//       },
//       text: {
//         primary: '#173A5E',
//         secondary: '#46505A',
//       },
//       action: {
//         active: '#001E3C',
//       },
//       success: {
//         dark: '#009688',
//       },
//     },
//   });
const Wholesaler = () => {
  const [items, setItems] = useState([
    { fname: "Frozen yoghurt", lname: 159, email: 6.0, pno: 24, wid: 1 },
    { fname: "Frozen yoghurt", lname: 159, email: 6.0, pno: 24, wid: 2 },
    { fname: "Frozen yoghurt", lname: 159, email: 6.0, pno: 24, wid: 3 },
    { fname: "Frozen yoghurt", lname: 159, email: 6.0, pno: 24, wid: 4 },
  ]);
  const [openModal,setOpenModal]=useState(false);
  return (
    <>
      <Grid container sx={{ margin: 5 }}>
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
                onClick={()=>setOpenModal(true)}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: 82, height: 36, fontweight: 400, fontsize: 15 }}
              >
                <Image src={filter} width="18px" height="15.3px" />
                {/* &nbsp; */}
                Filters
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ color: "grey" }} />
        <Grid item>
          <DisplayTable items={items} setItems={setItems} />
        </Grid>
       <DisplayPagination/>
       <DialogModal open={openModal} children={<Forms/>} />
      </Grid>
    </>
  );
};

export default Wholesaler;
