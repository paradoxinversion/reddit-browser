import React, { useEffect, useState } from "react";
import axios from "axios";
const Subreddits = ({ token, setSubredditView }) => {
  const [subredditData, setSubredditData] = useState(null);
  useEffect(() => {
    axios
      .get("https://oauth.reddit.com/subreddits/popular.json?raw_json=1", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        console.log(response);
        setSubredditData(response.data.data.children);
      });
  }, []);
  return (
    <div id="subreddit-list">
      {subredditData &&
        subredditData.map((dataChild) => {
          return (
            <div className="r-list-item">
              <p onClick={() => setSubredditView(dataChild.data.url)}>
                {dataChild.data.display_name_prefixed}
                <span>({dataChild.data.subscribers} subscribers)</span>
              </p>
              <p>{dataChild.data.public_description}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Subreddits;
