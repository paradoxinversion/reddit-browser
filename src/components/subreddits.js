import React, { useEffect, useState } from "react";
import axios from "axios";
const Subreddits = ({ token, subredditView, setSubredditView }) => {
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
    <div id="subreddit-list" className="h-full scroll-y">
      {subredditData &&
        subredditData.map((dataChild) => {
          let selected = false;
          if (dataChild.data.url === subredditView) {
            selected = true;
          }
          return (
            <div className={`r-list-item${selected ? " active-item" : ""}`}>
              <p onClick={() => setSubredditView(dataChild.data.url)}>
                {dataChild.data.display_name_prefixed}
                <span>({dataChild.data.subscribers} subscribers)</span>
              </p>
              <p className="text-sm">{dataChild.data.public_description}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Subreddits;
