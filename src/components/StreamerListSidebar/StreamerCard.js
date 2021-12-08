import React from "react";

const StreamerCard = ({
  user_name,
  title,
  viewer_count,
  url,
  profile_image_url,
  changeChannel,
}) => {
  return (
    <div
      className="mb-2 grid grid-cols-2 text-center"
      onClick={() => changeChannel(url)}
    >
      <div className="flex flex-col">
        <img
          className="sm:h-52 sm:w-52 sm:m-auto"
          src={profile_image_url}
          alt="Streamer"
        />
        <div>
          <div className="text-red-500">{user_name}</div>
          <div className="text-purple-400">{`Viewers: ${viewer_count}`}</div>
        </div>
      </div>
      <div className="w-full px-5 m-auto text-yellow-500 overflow-ellipsis overflow-hidden">
        {title}
      </div>
    </div>
  );
};

export default StreamerCard;
