import React, { useEffect, useState } from "react";
import axios from "axios";
const SubredditPosts = ({
  token,
  subredditURL,
  setPostViewData,
  setSubredditView,
  postViewData,
  queryType,
  setQueryType,
}) => {
  const handleToggleChange = (e) => {
    setQueryType(e.target.value);
  };
  const [subredditPostData, setSubredditPostData] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://oauth.reddit.com${subredditURL}${queryType}.json?raw_json=1`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        setFetching(false);
        setSubredditPostData(response.data.data.children);
      });
  }, [subredditURL, token, queryType]);

  return (
    <div id="post-list" className="p-sm h-full scroll-y">
      <form id="query-toggle">
        <div>
          <input
            id="query-type-hot"
            type="radio"
            name="query-type"
            value="hot"
            onChange={handleToggleChange}
            checked={queryType === "hot"}
          />
          <label htmlFor="query-type-hot">Hot</label>
        </div>
        <div>
          <input
            id="query-type-new"
            type="radio"
            name="query-type"
            value="new"
            onChange={handleToggleChange}
            checked={queryType === "new"}
          />
          <label htmlFor="query-type-new">New</label>
        </div>
      </form>

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
