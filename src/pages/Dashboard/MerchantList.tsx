import {
  Avatar,
  Button,
  FormGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import MHButton from "../../components/Button/MHButton";
import MHTextInput from "../../components/Form/MHTextInput";

import { ReactComponent as SearchIcon } from "../../static/svg/search.svg";

type MerchantListProps = {
  merchantList: {
    id: number;
    text: string;
    text2: string;
    img: string;
  }[];
};

export const MerchantList = (props: MerchantListProps) => {
  const [noOfElement, setnoOfElement] = React.useState(5);
  const slice = props.merchantList.slice(0, noOfElement);
  const [searchText, setSearchText] = React.useState("");

  const handleClick = () => {
    // const findUsers =
    //   props.merchantList && props.merchantList?.length > 0
    //     ? props.merchantList?.filter((u) => u?.text === searchText)
    //     : undefined;
    console.log("hello handleclick");
  };

  return (
    <>
      <FormGroup sx={{ marginTop: "20px" }}>
        <MHTextInput
          className="bg-white"
          placeholder="Search for a merchant"
          // value={searchText}
          // onChange={(e) => setSearchText(e.target.value)}
          endAdornment={
            <MHButton sx={{}}>
              <SearchIcon width="1rem" />
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
      </FormGroup>
      <List>
        {slice.map((item, index) => (
          <ListItem
            className="-ml-4"
            key={index}
            button
            // onClick={}
            sx={{ py: 2 }}
          >
            <ListItemAvatar>
              <Avatar
                className="rounded-md"
                variant="square"
                alt={item.text}
                srcSet={item.img}
              />
            </ListItemAvatar>
            <ListItemText>
              <Typography
                variant="h4"
                className=""
                color="#28404A"
                sx={{ fontSize: "12px" }}
              >
                {item.text}
              </Typography>
              <Typography
                variant="h6"
                className=""
                sx={{ fontSize: "10px" }}
                color="#989898"
              >
                {item.text2}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
