import React from "react";
import ImageSlider from "./ImageSlider";

const Cityslider = () => {
  const slides = [
    {
      url: "/img/London.jpg",
      title: "London",
    },
    {
      url: "/img/NY.jpg",
      title: "New York",
    },
    {
      url: "/img/Amsterdam.jpg",
      title: "Amsterdam",
    },
    {
      url: "/img/Paris.png",
      title: "Paris",
    },
    {
      url: "/img/Prague.jpg",
      title: "Prague",
    },
    {
      url: "/img/Rome.jpg",
      title: "Rome",
    },
    {
      url: "/img/SF.jpg",
      title: "San Francisco",
    },
    {
      url: "/img/Tokyo.jpg",
      title: "Tokyo",
    },
    {
      url: "/img/Vancouver.jpg",
      title: "Vancouver",
    },
  ];
  const containerStyles = {
    width: "1000px",
    height: "540px",
    margin: "0 auto",
  };

  return (
    <div style={containerStyles}>
      <ImageSlider slides={slides} />
    </div>
  );
};

export default Cityslider;
