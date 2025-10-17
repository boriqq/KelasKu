import React, { useState } from "react";
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from "../utils/youtube";

function VideoPlayer({ videoUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  const thumbnail = getYouTubeThumbnail(videoUrl);

  if (!embedUrl) {
    return (
      <a href={videoUrl} target="_blank" rel="noreferrer" className="text-blue-400">
        Lihat Video
      </a>
    );
  }

  if (!isPlaying) {
    return (
      <div className="relative cursor-pointer" onClick={() => setIsPlaying(true)}>
        <img src={thumbnail} alt="Video" className="w-full h-64 object-cover rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
          <div className="bg-red-600 rounded-full p-4">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  const iframeStyle = {
    paddingBottom: "56.25%"
  };

  return (
    <div className="relative w-full" style={iframeStyle}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={embedUrl + "?autoplay=1"}
        title="Video"
        frameBorder="0"
        allow="autoplay"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoPlayer;