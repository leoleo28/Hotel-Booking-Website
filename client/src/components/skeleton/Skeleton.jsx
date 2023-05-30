import React from "react";
import "./skeleton.css";
import { CircularProgress } from "@material-ui/core";

export default function Skeleton({ type }) {
  const COUNTER = 4;

  const ListSkeleton = () => (
    <div className=" skListitemContainer">
      <div className="skcontainerleft">
        <img className="skeleton skListitemImage" alt="" />
      </div>
      <div className="skcontainermid">
        <div className="skcontainermidup">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
        <div className="skcontainermiddown">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
        <div className="skcontainermiddown">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
      </div>
      <div className="skcontainerright">
        <div className="skcontainerrightup">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
        <div className="skcontainerrightdown">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
      </div>
    </div>
  );

  const Circle = () => (
    <>
      <div className="circle">
        <CircularProgress />
      </div>
      {Array.from({ length: COUNTER }, (_, i) => (
        <ListSkeleton key={i} />
      ))}
    </>
  );

  const Progress = () => (
    <div className="circleonly">
      <CircularProgress />
    </div>
  );

  const MapSkeleton = () => (
    <div className=" mpListitemContainer">
      <img className="skeleton mpListitemImage" alt="" />
      <div className="skeleton skeleton-title"></div>
      <div className="mpListitempropertyflex">
        <div className="skeleton skeleton-left"></div>
        <div className="skeleton skeleton-rightshort"></div>
      </div>
      <div className="mpListitempropertyflex">
        <div className="skeleton skeleton-left"></div>
        <div className="skeleton skeleton-rightlong"></div>
      </div>
      <div className=" mpListitemproperty">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
    </div>
  );

  const Map = () => (
    <>
      {Array.from({ length: COUNTER }, (_, i) => (
        <MapSkeleton key={i} />
      ))}
    </>
  );

  if (type === "circular") return <Circle />;
  if (type === "progress") return <Progress />;
  if (type === "map") return <Map />;
}
