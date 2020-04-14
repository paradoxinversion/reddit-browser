import React, { useEffect, useState } from "react";
import axios from "axios";
import Subreddits from "./subreddits";
import SubredditPosts from "./subredditPosts";
/**
 * This Component can be further adapted to accomodates lists
 * of subreddits & posts... unused for now due to time constraint
 */
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
  useEffect(() => {
    axios
      .get(endpoint, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setData(response.data.data.children);
      });
  }, [endpoint, token]);
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
