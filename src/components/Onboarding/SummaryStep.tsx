import React from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { ReactComponent as OrgLogo } from '../../static/svg/unilever-logo.svg';

const TextWidget = ({
  title,
  description,
  includeColon
}: {
  title?: string;
  description?: string;
  includeColon?: boolean;
}) => {
  return (
    <Box mb={.6}>
      {title && (
        <Typography
          variant="body2"
          fontFamily="Area-Normal-Bold"
          color="primary.main"
          display="inline-block">
          {title}
        </Typography>
      )}
      {includeColon ? ': ' : ''}
      {description && (
        <Typography variant="body2" color="primary.main" display="inline-block">
          {description}
        </Typography>
      )}
    </Box>
  );
};

const SummaryStep = () => {
  return (
    <Box maxWidth={'md'} mx="auto">
      <Box aria-label="org" sx={{ ml: 5, mb: 3 }}>
        {/* <MHPrimaryLogo className="mx-0" /> */}

        <ListItem disableGutters>
          <ListItemAvatar>
            <OrgLogo />
          </ListItemAvatar>
          <ListItemText
           >
            <Typography
              variant="body1"
              fontSize="12px"
              color="primary.main"
              fontFamily="Area-Normal-Bold">
              Michael Sofayo
            </Typography>

            <Typography variant="body2" fontSize={'.6rem'} color="#989898">
              michael@motherhonestly.com
            </Typography>
          </ListItemText>
        </ListItem>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="secondary.main"
        borderRadius={2}
        p={3}>
        <Box>
          <TextWidget title="Invoice Number" />
          <TextWidget title="INV-2022-010" />
          <TextWidget title="Issued Date: " description="19 Sept 2022" />
          <TextWidget title="Due Date: " description="27 Dec 2022" />
        </Box>
        <Box>
          <TextWidget title="Billed to" />
          <TextWidget description="Uniliver" />
          <TextWidget description="Moonlight Sunlight" />
        </Box>
      </Stack>
    </Box>
  );
};

export default SummaryStep;
