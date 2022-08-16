import React from 'react';

import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

import { MerchantList } from '../Dashboard/MerchantList';

import { ReactComponent as ArrowBtnIcon } from '../../static/svg/arrow-btn.svg';
import { drawerWidth } from '../../utils/constants';
import { FnComponent } from '../../models/component.model';

const SideDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'sticky',
    width: `${drawerWidth + 60}px`,
    height: '100vh',
    padding: theme.spacing(2),
    background: '#F1F7F8',
    boxShadow: '2px 4px 4px 0px #B7B7B740',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

const ListStyled = styled(
  List,
  {}
)<{
  component?: React.ElementType;
}>(({ theme }) => ({}));

const ListItemStyled = styled(ListItem)<{
  component?: React.ElementType;
  to: string;
}>(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  height: 52
}));

const merchantsList: Array<{
  merchant: string;
  categories: string;
  iconUrl: string;
}> = [
  {
    merchant: 'Sittercity',
    categories: 'Petcare, Childcare, Eldercare',
    iconUrl:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1658581169/sittercity_square_logo_1_t7zj5w.svg'
  },
  {
    merchant: 'Care.com',
    categories: 'Petcare, Childcare, Eldercare',
    iconUrl:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1658581169/care_1_ofwdit.svg'
  },
  {
    merchant: 'SnapHealth',
    categories: 'Petcare, Childcare, Eldercare',
    iconUrl:
      'https://res.cloudinary.com/mother-honestly/image/upload/v1658581169/Snaphealth_1_g44p2m.svg'
  }
];

const SecondarySidebar: FnComponent = () => {
  return (
    <SideDrawer variant="permanent" open={true}>
      <Toolbar
        sx={{
          mb: 1
        }}
      />
      <Box display="flex" flexDirection={'column'} height="100%">
        <Typography variant="h3" gutterBottom>
          Merchants
        </Typography>

        <MerchantList merchantList={merchantsList} />

        <Divider
          variant="fullWidth"
          light
          sx={{
            borderColor: '#E8E8E8',
            my: 4
          }}
        />

        <Typography
          variant="body2"
          color="#28404A"
          fontSize={'.7rem'}
          gutterBottom
          mb={2}
          sx={{}}>
          Are you joggling different task and still can't find time to do the
          needful.
        </Typography>

        <Typography variant="body2" color="#28404A" gutterBottom mb={2} sx={{}}>
          Lets take some tasks off from your plate.
        </Typography>

        <ListItem
          component="button"
          disableGutters
          secondaryAction={<ArrowBtnIcon />}>
          <ListItemText sx={{ color: '#28404A', verticalAlign: 'middle' }}>
            <Typography variant="body2" color="#28404A" sx={{}}>
              Talk to a Concierge Today!
            </Typography>
          </ListItemText>
        </ListItem>
      </Box>
    </SideDrawer>
  );
};

export default SecondarySidebar;
