import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import WalletBalance from "../../components/Dashboard/WalletBalance";
import Consultant from "../../components/Dashboard/Consultant";
import Concierge from "../../components/Dashboard/Concierge";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Box mb={4}>
        <Typography variant="h2" my={1} gutterBottom>
          Welcome Damian!
        </Typography>

        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={4} lg={4.5}>
          <WalletBalance />
        </Grid>
        <Grid item xs={8} lg={7.5}></Grid>
      </Grid>

      <Box mt={5}>
        <Typography variant="h3" gutterBottom mb={4}>
          Connect 1:1 with Leaders at Indeed
        </Typography>

        <Grid container spacing={3.4}>
          <Grid item xs={4}>
            <Consultant imageSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1657976885/linkedin-sales-solutions-pAtA8xe_iVM-unsplash_kzskcn.png" />
          </Grid>
          <Grid item xs={4}>
            <Consultant imageSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1657976885/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash_dxhylh.png" />
          </Grid>
          <Grid item xs={4}>
            <Consultant imageSrc="https://res.cloudinary.com/mother-honestly/image/upload/v1657976886/jurica-koletic-7YVZYZeITc8-unsplash_1_bxrqph.png" />
          </Grid>
        </Grid>
      </Box>
      <Box mt={5}>
        <Concierge />
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;
