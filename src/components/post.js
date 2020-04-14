import React, { useEffect, useState } from "react";
import axios from "axios";
const Post = ({ postViewData, setPostViewData }) => {
  console.log(postViewData);
  return (
    <div id="post" className="p-sm h-full scroll-y">
      <button onClick={() => setPostViewData(null)}>close</button>
      <p className="text-m">
        <strong>{postViewData.title}</strong>
        <span className="text-sm"> Score: {postViewData.score}</span>
      </p>
      <p>
        {postViewData.author} <span className="text-sm"></span>
      </p>
      {!postViewData.is_self && postViewData.post_hint === "image" && (
        <img className="w-full" src={postViewData.url} alt="reddit_thumb" />
      )}
      {!postViewData.is_self && postViewData.post_hint === "hosted:video" && (
        <a href={postViewData.url}>View video on Reddit.</a>
      )}
      {postViewData.selftext && <p>{postViewData.selftext}</p>}
    </div>
  );
};

export default Post;
