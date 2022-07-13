import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MHInterestCheckbox from '../../components/Form/MHInterestCheckbox';
import MHButton from '../../components/Form/MHButton';

import MHLogoIcon from '../../theme/icons/Logo';
import { theme } from '../../theme/mui/dashboard.theme';

const Interests = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: theme.palette.background.paper,
        position: 'relative'
      }}>
      <Grid container spacing={0} sx={{ minHeight: '100vh' }}>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            py: 8
          }}>
          <Box component={'div'} mx="auto">
            <MHLogoIcon />
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 6 }}>
            <Box>
              <Typography variant="h1" my={1} align="center" gutterBottom>
                Let's learn about your interests
              </Typography>
              <Typography variant="subtitle2" align="center" gutterBottom>
                Your Dashboard will be populated by your interest
              </Typography>
            </Box>

            <Stack
              direction="row"
              justifyContent={'center'}
              alignItems="center"
              mt={6}
              flexWrap="wrap">
              <MHInterestCheckbox
                label="Homecare"
                fill="#F7DAA0"
                stroke="#77633B"
              />
              <MHInterestCheckbox
                fill="#D4E0CC"
                label="Single Motherhood"
                stroke="#5B6C50"
              />
              <MHInterestCheckbox
                fill="#F7DAA0"
                label="Anxiety"
                stroke="#77633B"
              />
              <MHInterestCheckbox
                fill="#B5B4D6"
                label="Career"
                stroke="#FFFFFF"
              />
              <MHInterestCheckbox
                fill="#F7DAA0"
                label="Divorce"
                stroke="#77633B"
              />
              <MHInterestCheckbox
                fill="#F7DAA0"
                label="Sales & Marketing"
                stroke="#77633B"
              />
              <MHInterestCheckbox
                fill="#B27771"
                label="Postpartum"
                stroke="#FFFFFF"
              />
              <MHInterestCheckbox
                fill="#F7DAA0"
                label="House Keeping"
                stroke="#77633B"
              />
              <MHInterestCheckbox
                fill="#CED7E6"
                label="Healthcare"
                stroke="#465672"
              />
              <MHInterestCheckbox
                fill="#F7DAA0"
                label="Time management"
                stroke="#77633B"
              />
              <MHInterestCheckbox
                fill="#F7DAA0"
                label="Work-life"
                stroke="#77633B"
              />
              <MHInterestCheckbox
                fill="#F7DAA0"
                label="Business"
                stroke="#77633B"
              />
            </Stack>

            <Grid container spacing={2} mt={4}>
              <Grid item xs>
                <MHButton sx={{}} variant="outlined">Skip</MHButton>
              </Grid>
              <Grid item xs>
                <MHButton sx={{}}>{"Finish"}</MHButton>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Interests;
