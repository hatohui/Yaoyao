import React from "react";

const RestaurantVideo = () => {
  return (
    <div className="fixed h-screen w-screen  inset-0 z-0">
      <video
        className="absolute inset-0 w-full  h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/videos/banner.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
    </div>
  );
};

export default RestaurantVideo;
