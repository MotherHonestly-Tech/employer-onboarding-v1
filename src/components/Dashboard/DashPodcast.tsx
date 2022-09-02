import { Box, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import React, { useEffect, useState } from "react";

import ResCard from "../Resources/SubComponents/ResCard";
import MHButton from "../Button/MHButton";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { ReactComponent as ResPodcastIcon } from "../../static/svg/respod.svg";
import { ReactComponent as LeftBtn } from "../../static/svg/left-btn.svg";
import { ReactComponent as RightBtn } from "../../static/svg/right-btn.svg";

type ResProps = {
  image?: string;
  tops?: string;
  titles?: string;
  texts?: string;
  categ?: string;
  id?: number;
  slugs?: string;
  createdAt?: string;
  updatedAt?: string;
};

const DashPodcast = (props: ResProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ResProps[]>([]);
  const [noOfElement, setnoOfElement] = useState(3);

  var resUrl = `${process.env.REACT_APP_RES_URL}`;

  let history = useHistory();

  const { path } = useRouteMatch();

  const handleClickOpen = () => {
    history.push(`resources/podcasts`);
  };

  // console.log(location.pathname);

  const getResource = async () => {
    try {
      const response = await fetch(resUrl, {
        method: "GET",
      });
      const jsonData = await response.json();
      setResources(jsonData);
      console.log(resources);
    } catch (err) {
      console.error("Cannot find Data");
    }
  };

  const slice = resources.slice(0, noOfElement);

  useEffect(() => {
    getResource();
  }, []);
  return (
    <Fragment>
      <Box className=" py-12 ">
        <Box className="mx-auto overscroll-x-hidden flex" sx={{}}>
          <Typography
            variant="body2"
            className="mx-auto gap-2 flex font-normal uppercase "
            color="primary"
            sx={{
              fontWeight: 900,
              fontSize: "12px",
              fontFamily: "Area-Extended",
            }}
          >
            <ResPodcastIcon className="-mt-2" height="24px" width="25px" />
            podcast
          </Typography>
        </Box>
        <Typography
          variant="h3"
          className="mx-auto text-center my-2 "
          color="primary"
          sx={{
            fontWeight: 500,
            fontSize: "28px",
            fontFamily: "Columbia-Sans",
          }}
        >
          The Podcast
        </Typography>

        <Box className="mx-auto pt-10 pb-4">
          <Grid container spacing={1} className=" relative">
            <Box className="flex ">
              <Box className="absolute top-[40%] z-10 -left-6">
                <LeftBtn
                  className="cursor-pointer"
                  onClick={() => console.log("left")}
                />
              </Box>
              <Box className="absolute top-[40%] z-10 -right-3">
                <RightBtn
                  className="cursor-pointer"
                  onClick={() => console.log("right")}
                />
              </Box>
            </Box>
            {slice.map((res, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <ResCard
                  cardClass="relative w-[260px] h-[440px] object-cover bg-cream-100 rounded-md"
                  iconClass="hidden"
                  imgBg="bg-cream-200 "
                  bodyBg="bg-cream-100"
                  imageSrc={res.image}
                  top={res.tops}
                  title={res.titles}
                  text={res.texts}
                  category={res.categ}
                  titleUrl={`resources/podcasts/${res.slugs}`}
                  playUrl={`resources/podcasts/${res.slugs}`}
                />
              </Grid>
            ))}
          </Grid>
          <div className="flex justify-center py-12">
            <MHButton onClick={() => handleClickOpen()} sx={{ width: "113px" }}>
              View All
            </MHButton>
          </div>
        </Box>
      </Box>
    </Fragment>
  );
};

export default DashPodcast;
