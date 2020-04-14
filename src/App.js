import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Subreddits from "./components/subreddits";
import SubredditPosts from "./components/subredditPosts";
const cid = "3U33MeKVcTkBXw";

function App() {
  const [auth, setAuth] = useState(null);
  const [subbredditView, setSubredditView] = useState(null);
  const [postView, setPostView] = useState(null);

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
    <div className="App">
      <header>
        <p className="text-red-700">Not-Reddit</p>
      </header>
      <div>
        <p>Post area</p>
        <p onClick={() => goToOAuth()}>Auth</p>
        <div>
          {auth ? (
            <div className="flex">
              <Subreddits
                token={auth.access_token}
                setSubredditView={setSubredditView}
              />
              {subbredditView && (
                <SubredditPosts
                  token={auth.access_token}
                  subredditURL={subbredditView}
                />
              )}
              {postView && (
                <SubredditPosts
                  token={auth.access_token}
                  subredditURL={subbredditView}
                />
              )}
            </div>
          ) : (
            <p>Log In</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
