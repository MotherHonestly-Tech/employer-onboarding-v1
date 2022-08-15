import React from 'react';

import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';

import { drawerWidth } from '../../utils/constants';
import { FnComponent } from '../../models/component.model';

interface RouterLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

const SideDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'sticky',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    height: '100vh',
    padding: theme.spacing(3),
    background: "#F1F7F8",
    borderWidth: 1,
    boxShadow: "2px 4px 4px 0px #B7B7B740",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const merchantsList = [
  {
    id: 1,
    text: "Sittercity",
    text2: "Petcare, Childcare, Eldercare",
    // avatar: (
    //   <SittercityIcon width="41px" height="41px" className="rounded-lg" />
    // ),
    img: "../asset/sitter.png",
  },
  {
    id: 2,
    text: "Care",
    text2: "Childcare",
    img: "../asset/care.png",
    // avatar: <CaresIcon width="41px" height="41px" className="rounded-md" />,
  },
  {
    id: 3,
    text: "SnapHealth",
    text2: "Eldercare",
    img: "../asset/snap.png",
    // avatar: <SnapIcon width="41px" height="41px" className="rounded-lg" />,
  },
  {
    id: 4,
    text: "Care",
    text2: "Childcare",
    img: "../asset/care.png",
    // avatar: <CaresIcon width="41px" height="41px" className="rounded-md" />,
  },
  {
    id: 5,
    text: "SnapHealth",
    text2: "Eldercare",
    img: "../asset/snap.png",
    // avatar: <SnapIcon width="41px" height="41px" className="rounded-lg" />,
  },
];

const ListStyled = styled(
  List,
  {}
)<{
  component?: React.ElementType;
}>(({ theme }) => ({

}));

const ListItemStyled = styled(ListItem)<{
  component?: React.ElementType;
  to: string;
}>(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  height: 52,
}));


const SecondarySidebar: FnComponent = () => {

  return (
    <SideDrawer variant="permanent" open={true}>
      <Toolbar />

      <Box>
        <Typography variant="h3" >Merchants</Typography>
      </Box>

      <ListStyled component="nav" sx={{}} disablePadding>
        {/* <ListItem component={NavLink} to="/organization/dashboard"></ListItem> */}

      </ListStyled>
    </SideDrawer>
  );
};

export default SecondarySidebar;
