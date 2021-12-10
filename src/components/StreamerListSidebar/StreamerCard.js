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
      className="flex flex-row mb-2 border-double border-4 rounded border-purple-400"
      onClick={() => changeChannel(url)}
    >
      <div className="flex-col">
        <img
          className="sm:m-auto sm:w-52 md:w-36"
          src={profile_image_url}
          alt="Streamer"
        />
        <div>
          <div className="text-red-500">{user_name}</div>
          <div className="text-purple-400">{`Viewers: ${viewer_count}`}</div>
        </div>
      </div>
      <div className="w-full px-5 m-auto text-yellow-500 md:text-xl overflow-ellipsis overflow-hidden">
        {title}
      </div>
    </div>
  );
};

export default StreamerCard;
