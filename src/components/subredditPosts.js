import React, { useEffect, useState } from "react";
import axios from "axios";
const SubredditPosts = ({ token, subredditURL }) => {
  const [subredditPostData, setSubredditPostData] = useState(null);
  //https://www.reddit.com/r/politics/hot.json
  useEffect(() => {
    axios
      .get(`https://oauth.reddit.com${subredditURL}hot.json`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        console.log(response);
        setSubredditPostData(response.data.data.children);
      });
  }, []);
  return (
    <div>
      {subredditPostData &&
        subredditPostData.map((dataChild) => {
          const post = dataChild.data;
          return (
            <div>
              <p>{post.title}</p>
              <span>Score: {post.score}</span>
              {post.thumbnail !== "self" && <img src={post.thumbnail} />}
            </div>
          );
        })}
    </div>
  );
};

export default SubredditPosts;
// thumbnail: "https://b.thumbs.redditmedia.com/R60ED5kY3rNxS7IMPKIERjj5WpS5ctrQcQZ4UNytNRQ.jpg"
// post_hint: "image"
// author: "goldrocco"
// num_comments: 4
// created_utc: 1586877506
// score: 9
