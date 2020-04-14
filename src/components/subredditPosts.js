import React, { useEffect, useState } from "react";
import axios from "axios";
const SubredditPosts = ({
  token,
  subredditURL,
  setPostViewData,
  setSubredditView,
  postViewData,
}) => {
  const [subredditPostData, setSubredditPostData] = useState(null);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    axios
      .get(`https://oauth.reddit.com${subredditURL}hot.json`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setFetching(false);
        setSubredditPostData(response.data.data.children);
      });
  }, [subredditURL, token]);
  return (
    <div id="post-list" className="p-sm h-full scroll-y">
      {!fetching ? (
        <React.Fragment>
          <button onClick={() => setSubredditView(null)}>close</button>
          {subredditPostData &&
            subredditPostData.map((dataChild) => {
              const post = dataChild.data;
              let selected = false;
              if (postViewData && post.name === postViewData.name) {
                selected = true;
              }
              return (
                <div
                  key={`${post.name}`}
                  className={`p-sm r-list-item${
                    selected ? " active-item" : ""
                  }`}
                  onClick={() => setPostViewData(post)}>
                  <p className="text-m">
                    <strong>{post.title}</strong>
                  </p>
                  <p className="text-sm">Score: {post.score}</p>
                  {post.thumbnail !== "self" && (
                    <img src={post.thumbnail} alt="thumbail" />
                  )}
                </div>
              );
            })}
        </React.Fragment>
      ) : (
        "Loading..."
      )}
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
