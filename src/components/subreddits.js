import React, { useEffect, useState } from "react";
import axios from "axios";
const Subreddits = ({
  token,
  subredditView,
  setSubredditView,
  setPostViewData,
}) => {
  const [subredditData, setSubredditData] = useState(null);
  const [subredditSearch, setSubredditSearch] = useState("");
  useEffect(() => {
    axios
      .get("https://oauth.reddit.com/subreddits/popular.json?raw_json=1", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setSubredditData(response.data.data.children);
      });
    setPostViewData(null);
  }, [token, subredditView, setPostViewData]);
  return (
    <div id="subreddit-list" className="h-full scroll-y">
      <form>
        <label htmlFor="reddit-search">Search</label>
        <input
          id="reddit-search"
          name="reddit-search"
          type="search"
          value={subredditSearch}
          onChange={async (e) => {
            setSubredditSearch(e.target.value);
            if (subredditSearch.trim().length > 0) {
              // !TODO: Debounce this
              const searchResults = await axios.get(
                `https://www.reddit.com/subreddits/search.json?q=${e.target.value}`
              );
              setSubredditData(searchResults.data.data.children);
            }
          }}
        />
      </form>
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
