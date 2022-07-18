import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Zoom from '@mui/material/Zoom';

import { FnComponent } from '../../models/component.model';

const Consultant: FnComponent<{ imageSrc: string }> = ({ imageSrc }) => {
  return (
    <Zoom in style={{ transitionDelay: '300ms' }}>
    <Box borderRadius={2} overflow="hidden" bgcolor="rgba(222, 220, 183, 0.26)">
      <Box
        component="div"
        sx={{
          width: '100%',
          overflow: 'hidden'
        }}>
        <img
          src={imageSrc}
          alt="Consultant"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </Box>
      <Box p={2}>
        <Typography
          variant="body1"
          component="h4"
          color="#28404A"
          gutterBottom
          sx={{
            fontWeight: 500,
            fontSize: '1rem'
          }}>
          Blessing Adesiyan
        </Typography>
        <Typography
          variant="body1"
          color="#979797"
          sx={{
            fontWeight: 500,
            fontSize: '0.75rem'
          }}>
          From $20 Per Session
        </Typography>
        <Divider
          sx={{
            my: 1.5,
            color: '#D3D3D3'
          }}
        />
        <Typography
          gutterBottom
          variant="body1"
          color="#909090"
          mb={2}
          sx={{
            fontWeight: 400,
            fontSize: '0.75rem'
          }}>
          Lorem ipsum dolor sit amet, consec tempor incididunt tempor incididunt
        </Typography>
        <Typography
          variant="body1"
          color="#28404A"
          sx={{
            fontWeight: 400,
            fontSize: '0.75rem'
          }}>
          Care, Family, Back to Work
        </Typography>
      </Box>
    </Box>
    </Zoom>
  );
};

export default Consultant;
