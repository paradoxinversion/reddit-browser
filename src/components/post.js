import React, { useEffect, useState } from "react";
import axios from "axios";
const Post = ({ postViewData, setPostViewData }) => {
  return (
    <div id="post" className="h-full scroll-y">
      <button onClick={() => setPostViewData(null)}>close</button>
      <p>{postViewData.title}</p>
      <p>{postViewData.author}</p>
      <p>{new Date(postViewData.created_utc).toString()}</p>
      <span>Score: {postViewData.score}</span>
      {postViewData.thumbnail !== "self" && (
        <img src={postViewData.thumbnail} />
      )}
      {postViewData.selftext && <p>{postViewData.selftext}</p>}
    </div>
  );
};

export default Post;
// thumbnail: "https://b.thumbs.redditmedia.com/R60ED5kY3rNxS7IMPKIERjj5WpS5ctrQcQZ4UNytNRQ.jpg"
// post_hint: "image"
// author: "goldrocco"
// num_comments: 4
// created_utc: 1586877506
// score: 9
