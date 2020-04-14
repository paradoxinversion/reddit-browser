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
        setSubredditData(response.data.data.children);
      });
  }, [token]);
  return (
    <div id="subreddit-list" className="h-full scroll-y">
      {subredditData &&
        subredditData.map((dataChild) => {
          let selected = false;
          const subreddit = dataChild.data;
          if (subreddit.url === subredditView) {
            selected = true;
          }

          return (
            <div
              key={subreddit.name}
              className={`p-sm r-list-item${selected ? " active-item" : ""}`}
              onClick={() => setSubredditView(subreddit.url)}>
              <p className="text-m">
                <strong>
                  {subreddit.display_name_prefixed}
                  <span>({subreddit.subscribers} subscribers)</span>
                </strong>
              </p>
              <p className="text-sm">{subreddit.public_description}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Subreddits;
