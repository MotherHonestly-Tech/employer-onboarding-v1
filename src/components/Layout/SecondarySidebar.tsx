import React from "react";
import { useState } from "react";

import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";

import { drawerWidth } from "../../utils/constants";
import { FnComponent } from "../../models/component.model";
import MHFormControl from "../Form/MHFormControl";
import MHButton from "../Form/MHButton";

import { ReactComponent as SearchIcon } from "../../static/svg/search.svg";
import { ReactComponent as ArrowBtn } from "../../static/svg/arrow-btn.svg";
import {
  Avatar,
  Button,
  createSvgIcon,
  Divider,
  FormGroup,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { MerchantList } from "../../pages/Dashboard/MerchantList";
import MHTextInput from "../Form/MHTextInput";

interface RouterLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

const SideDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "sticky",
    whiteSpace: "nowrap",
    width: drawerWidth,
    height: "100vh",
    padding: theme.spacing(3),
    background: "#F1F7F8",
    borderWidth: 1,
    boxShadow: "2px 4px 4px 0px #B7B7B740",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
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
}>(({ theme }) => ({}));

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
        <Typography variant="h3" className="mt-2">
          Merchants
        </Typography>
      </Box>
      {/* <FormGroup sx={{ marginTop: "20px" }}>
        <MHTextInput
          className="bg-white"
          placeholder="Search for a merchant"
          endAdornment={
            <MHButton sx={{}}>
              <SearchIcon width="1rem" />
            </MHButton>
          }
        />
      </FormGroup> */}

      <MerchantList merchantList={merchantsList} />

      <ListStyled component="nav" sx={{}} disablePadding>
        {/* <ListItem component={NavLink} to="/organization/dashboard"></ListItem> */}
      </ListStyled>
      <Box className="absolute bottom-0 left-4">
        <Divider className="mt-4  w-52 -ml-[3px]" variant="middle" />
        {/* <Avatar
          className="w-32 h-40 ml-24 absolute -mt-5"
          variant="square"
          alt="shape1"
          srcSet="../asset/shape1.png"
        /> */}
        <Typography
          variant="body2"
          color="#28404A"
          className="mt-12 w-56 overflow-x-none"
          sx={{}}
        >
          Are you joggling different task and <br /> still cant find time to do
          the needful.
          <br /> <br /> Lets take some task off from your
          <br /> plate.
        </Typography>

        <ListItem>
          <ListItemText sx={{ color: "#28404A" }}>
            <Typography
              variant="body2"
              color="#28404A"
              className="-ml-4 font-extrabold"
              sx={{}}
            >
              Talk to a Concierge Today!
            </Typography>
          </ListItemText>
          <ListItemIcon>
            <IconButton aria-label="" className="w-full left-6">
              <ArrowBtn />
            </IconButton>
          </ListItemIcon>
        </ListItem>
      </Box>
    </SideDrawer>
  );
};

export default SecondarySidebar;
