import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Wholesaler from "@/components/Wholesaler";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          <Wholesaler />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
