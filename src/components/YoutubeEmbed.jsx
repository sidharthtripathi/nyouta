import React, { useState } from "react";
import youtubeLogo from "../assets/template/youtube.png";

const YoutubeEmbed = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState(null);

  // Extract YouTube video ID
  const getVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:.*v=|v\/|embed\/|shorts\/|live\/))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const videoId = getVideoId(videoUrl);
    if (videoId) {
      setSubmittedUrl(videoUrl);
    } else {
      alert("Please enter a valid YouTube URL");
    }
  };

  // Reset input
  const handleReset = () => {
    setSubmittedUrl(null);
    setVideoUrl("");
  };

  return (
    <div className="w-full mb-20 mx-auto  bg-white  rounded-lg text-center">
      {/* Show Input Field if No URL is Submitted */}
      {!submittedUrl ? (
        <div className=" w-full flex flex-col items-center justify-center gap-10">
          <img src={youtubeLogo} alt="Youtube" />
          <form
            onSubmit={handleSubmit}
            className="flex md:w-[400px] flex-col gap-3"
          >
            <input
              type="text"
              placeholder="Enter YouTube URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white py-2 rounded-md hover:bg-pink-300 transition"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="relative group flex items-center justify-center flex-col gap-10">
          {/* Thumbnail Preview */}
          <img
            src={`https://img.youtube.com/vi/${getVideoId(
              submittedUrl
            )}/hqdefault.jpg`}
            alt="YouTube Video Thumbnail"
            className="  h-[500px] rounded-lg cursor-pointer transition-transform duration-300 transform group-hover:scale-105"
            onClick={() => window.open(submittedUrl, "_blank")}
          />

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink- transition"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default YoutubeEmbed;
