import { Fragment } from "react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as BgOverlay } from "../../../static/svg/event.svg";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Zoom,
} from "@mui/material";
import Footer from "../../Layout/Footer";
import EventSort from "./EventSort";
import Pagination from "../../UI/Pagination";
import AllresHeader from "../SubComponents/AllresHeader";
import ResCard from "../SubComponents/ResCard";

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

const EventsPage = (props: ResProps) => {
  const location = useLocation();
  const [resources, setResources] = useState<ResProps[]>([]);
  let [count] = useState(0);

  var resUrl = `${process.env.REACT_APP_RES_URL}`;

  // console.log(location.pathname);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = resources.slice(firstPostIndex, lastPostIndex);

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

  useEffect(() => {
    getResource();
  }, []);
  return (
    <Fragment>
      <AllresHeader
        boxClassName="-mt-12 overscroll-x-hidden gap-2 flex pb-4"
        title="Events"
        titleInfo="Events & Conferences"
        titleExt="Find the Event for You"
        titleInfoclassName="text-left my-2 w-full font-columbia text-4xl capitalize font-[500]"
        pageInfo="Achieve your personal and professional goals with personalized
        solutions from our specialized experts in career, care, and s
        wellbeing."
        pageInfoClassName="font-semibold text-left text-[12px] font-areaSemi"
        ResIconUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661645343/image_3_woz2ng.png"
        BgUrl="https://res.cloudinary.com/mother-honestly/image/upload/v1661822837/image_wc3zxh.png"
      >
        <BgOverlay
          className="overflow-hidden absolute top-32 ml-[720px]"
          height="200px"
          width="300px"
        />
      </AllresHeader>
      <EventSort />

      <Box className="mx-auto pt-10 bg-white px-6 pb-4">
        <Grid container spacing={2}>
          {currentPosts.map((res, index) => (
            <>
              <p className="hidden"> {(count = count + 1)}</p>

              {count === 1 ? (
                <Grid item xs={12} md={12} lg={8}>
                  <Zoom in style={{ transitionDelay: "200ms" }}>
                    <Card
                      className={`relative w-auto h-auto object-cover bg-sky-400 rounded-md`}
                    >
                      <IconButton
                        disabled
                        className="absolute outline-none top-[6%] left-[6%]"
                      >
                        <img
                          className="h-6 w-6"
                          src="https://res.cloudinary.com/mother-honestly/image/upload/v1661645343/image_3_woz2ng.png"
                          alt=""
                        />

                        <Typography className="ml-2 uppercase font-areaExt text-xs font-[900] leading-[102%] tracking-[0.1rem] text-white">
                          upcoming summit
                        </Typography>
                      </IconButton>
                      <Box className="  absolute top-[20%] left-[6%]">
                        <Typography className=" capitalize  w-4/5 font-columbia text-[28px] leading-[143%] tracking-[-0.04rem] font-[500] text-white">
                          {res.titles}
                        </Typography>
                        <Typography className="pt-4 uppercase w-full font-areaNorm text-[11px] font-[900] leading-[102%] tracking-[0.1rem] text-white">
                          {res.createdAt}
                        </Typography>
                        <Typography className="pt-4  w-3/4 font-areaSemi line-clamp-3 text-[15px] font-[700] leading-[200%] tracking-[0.02rem]  text-white">
                          {res.texts}
                        </Typography>

                        <Box className="pt-12 space-x-4">
                          <Link
                            to={`${location.pathname}/${res.slugs}
                      `}
                            className="bg-white w-[108px] no-underline px-6 py-4 h-[45px] text-navy-900 font-areaSemi not-italic text-[12px] font-[700] leading-[102%] tracking-[0.05rem]"
                          >
                            Buy Ticket
                          </Link>
                          <Link
                            to={`${location.pathname}/${res.slugs}
                      `}
                            className="bg-white w-[120px] no-underline px-8 py-4 h-[45px] text-navy-900 font-areaSemi not-italic text-[12px] font-[700] leading-[102%] tracking-[0.05rem]"
                          >
                            Watch Video
                          </Link>
                        </Box>
                      </Box>
                      <CardMedia
                        className="object-cover h-[422px]"
                        component="img"
                        image="https://res.cloudinary.com/mother-honestly/image/upload/v1661545700/image_hsichu.png"
                        alt="Test Image"
                      />
                    </Card>
                  </Zoom>
                </Grid>
              ) : count >= 2 ? (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <ResCard
                    cardClass="relative w-[280px] mb-10 h-auto object-cover bg-cream-100 rounded-md shadow-sm"
                    iconClass="hidden absolute top-10 ml-20 mt-12 w-20 h-20" //absolute top-10 ml-20 mt-12 w-20 h-20
                    imgBg="bg-pink-700"
                    bodyBg="bg-cream-100"
                    imageSrc={res.image}
                    top={res.tops}
                    title={res.titles}
                    text=""
                    category={res.categ}
                    titleUrl={`${location.pathname}/toolkits/${res.slugs}`}
                    playUrl={`${location.pathname}/${res.slugs}`}
                  />
                </Grid>
              ) : null}
            </>
          ))}
        </Grid>
      </Box>
      <Pagination
        totalPosts={resources.length}
        postsPerPage={postsPerPage}
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
        onClicked={() => {
          setCurrentPage(currentPage + 1);
        }}
        currentPage={currentPage}
      />
      <Footer />
    </Fragment>
  );
};

export default EventsPage;