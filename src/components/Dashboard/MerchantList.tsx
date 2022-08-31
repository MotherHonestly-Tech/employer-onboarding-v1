import React from "react";

import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { ReactComponent as SearchIcon } from "../../static/svg/search.svg";
import SearchField from "../Form/SearchField";

type MerchantListProps = {
  merchantList: Array<{
    merchant: string;
    categories: string;
    iconUrl: string;
  }>;
};

export const MerchantList = ({ merchantList }: MerchantListProps) => {
  return (
    <>
      <List
        sx={{
          flexGrow: 1,
        }}
      >
        <SearchField
          icon={<SearchIcon width="1rem" />}
          placeholder="Search for a Merchant"
          bgcolor="#FFFFFF"
        />
        {merchantList.map((merchant, index) => (
          <ListItem
            component={"button"}
            key={index}
            sx={{
              mt: index < 1 ? 2 : 0,
            }}
            disableGutters
          >
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                alt={merchant.merchant}
                src={merchant.iconUrl}
              />
            </ListItemAvatar>
            <ListItemText>
              <Typography
                variant="subtitle1"
                className=""
                color="#28404A"
                sx={{ fontSize: "12px" }}
              >
                {merchant.merchant}
              </Typography>
              <Typography
                variant="body1"
                className=""
                sx={{ fontSize: "10px" }}
                color="#989898"
              >
                {merchant.categories}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
