import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElements from "./SkeletonElements";

export default function SkeletonVideo() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-product">
        <SkeletonElements type="rectangle" />
        <SkeletonElements type="title" />
        <SkeletonElements type="text" />
        <SkeletonElements type="text" />
      </div>
      <Shimmer />
    </div>
  );
}
