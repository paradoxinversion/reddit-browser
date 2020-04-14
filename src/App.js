import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Subreddits from "./components/subreddits";
import SubredditPosts from "./components/subredditPosts";
import Post from "./components/post";
const cid = "3U33MeKVcTkBXw";

function App() {
  const [auth, setAuth] = useState(null);
  const [subredditView, setSubredditView] = useState(null);
  const [postViewData, setPostViewData] = useState(null);

  useEffect(() => {
    if (window.location.hash) {
      const query = window.location.hash.slice(1);
      // http://localhost:3000/#access_token=49298123-4y14W0d4Tc-GaP1so9Pl8YiJHWM&token_type=bearer&state=wtfr&expires_in=3600&scope=read
      const authValues = query.split("&").reduce((acc, current) => {
        const kv = current.split("=");
        if (!acc[kv[0]]) acc[kv[0]] = kv[1];
        return acc;
      }, {});
      setAuth(authValues);
    }
  }, []);

  const goToOAuth = () => {
    window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${cid}&response_type=token&state=wtfr&redirect_uri=http://localhost:3000&scope=read`;
  };

  return (
    <div className="container app">
      <header className="flex">
        <p className="text-red-700">Not-Reddit</p>
        <p onClick={() => goToOAuth()}>Auth</p>
      </header>
      <div className="h-full">
        <div className="flex h-full">
          {auth ? (
            <React.Fragment>
              <Subreddits
                token={auth.access_token}
                setSubredditView={setSubredditView}
                subredditView={subredditView}
              />
              {subredditView && (
                <SubredditPosts
                  token={auth.access_token}
                  subredditURL={subredditView}
                  setPostViewData={setPostViewData}
                  setSubredditView={setSubredditView}
                  postViewData={postViewData}
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
            <p>Log In</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
