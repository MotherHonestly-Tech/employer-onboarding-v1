import React from 'react';

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import MHButton from '../Button/MHButton';
import MHTextInput from '../Form/MHTextInput';

import { ReactComponent as SearchIcon } from '../../static/svg/search.svg';

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
      {/* <FormGroup sx={{ marginTop: '20px' }}>
        <MHTextInput
          className="bg-white"
          placeholder="Search for a merchant"
          // value={searchText}
          // onChange={(e) => setSearchText(e.target.value)}
          endAdornment={
            <MHButton sx={{}}>
            </MHButton>
            // <Button
            //   color={"primary"}
            //   sx={{ backgroundColor: "black" }}
            //   onClick={handleClick}
            // >
            //   <SearchIcon width="1rem" />
            // </Button>
          }
        />
              <SearchIcon width="1rem" />

      </FormGroup> */}
      <List sx={{
        flexGrow: 1,
      }}>
        {merchantList.map((merchant, index) => (
          <ListItem component={'button'} key={index} sx={{ }} disableGutters>
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
                sx={{ fontSize: '12px' }}>
                {merchant.merchant}
              </Typography>
              <Typography
                variant="body1"
                className=""
                sx={{ fontSize: '10px' }}
                color="#989898">
                {merchant.categories}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
