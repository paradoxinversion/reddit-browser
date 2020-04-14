import React, { useEffect, useState } from "react";
import axios from "axios";
import Subreddits from "./subreddits";
import SubredditPosts from "./subredditPosts";
const components = {
  subreddits: Subreddits,
  subredditPosts: SubredditPosts,
};
const RedditItemList = ({
  endpoint,
  setViewData,
  token,
  incomingViewData,
  listType,
}) => {
  const [data, setData] = useState(null);
  //https://www.reddit.com/r/politics/hot.json
  useEffect(() => {
    axios
      .get(endpoint, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        console.log(response);
        setData(response.data.data.children);
      });
  }, [endpoint]);
  const Component = components[listType];
  return (
    <Component
      data={data}
      incomingViewData={incomingViewData}
      setViewData={setViewData}
    />
  );
};

export default RedditItemList;
// thumbnail: "https://b.thumbs.redditmedia.com/R60ED5kY3rNxS7IMPKIERjj5WpS5ctrQcQZ4UNytNRQ.jpg"
// post_hint: "image"
// author: "goldrocco"
// num_comments: 4
// created_utc: 1586877506
// score: 9
