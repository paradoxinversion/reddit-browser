import React, { useState, useEffect } from "react";
import Subreddits from "./components/subreddits";
import SubredditPosts from "./components/subredditPosts";
import Post from "./components/post";
import "./style.css";
const cid = "3U33MeKVcTkBXw";

function App() {
  const [auth, setAuth] = useState(null);
  const [subredditView, setSubredditView] = useState(null);
  const [postViewData, setPostViewData] = useState(null);
  const [queryType, setQueryType] = useState("hot");

  useEffect(() => {
    if (window.location.hash) {
      const query = window.location.hash.slice(1);
      const authValues = query.split("&").reduce((acc, current) => {
        const kv = current.split("=");
        if (!acc[kv[0]]) acc[kv[0]] = kv[1];
        return acc;
      }, {});
      setAuth(authValues);
      window.location.replace("#");
      if (typeof window.history.replaceState == "function") {
        window.history.replaceState({}, "", window.location.href.slice(0, -1));
      }
    }
  }, []);

  const goToOAuth = () => {
    window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${cid}&response_type=token&state=wtfr&redirect_uri=http://localhost:3000&scope=read`;
  };

  return (
    <div className="container app">
      <header>
        <p className="text-m">Not-Reddit</p>
        {!auth && <button onClick={() => goToOAuth()}>Sign In</button>}
      </header>
      <div className="h-full">
        <div className="flex h-full">
          {auth ? (
            <React.Fragment>
              <Subreddits
                token={auth.access_token}
                setSubredditView={setSubredditView}
                subredditView={subredditView}
                setPostViewData={setPostViewData}
              />

              {subredditView && (
                <SubredditPosts
                  token={auth.access_token}
                  subredditURL={subredditView}
                  setPostViewData={setPostViewData}
                  setSubredditView={setSubredditView}
                  postViewData={postViewData}
                  queryType={queryType}
                  setQueryType={setQueryType}
                />
              )}
              {postViewData && (
                <Post
                  postViewData={postViewData}
                  setPostViewData={setPostViewData}
                />
              )}
            </React.Fragment>
          ) : (
            <p>
              Log In to view Reddit like you've never seen before! (Heads up:
              This site isn't mobile ready, yet. Sorry!)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
