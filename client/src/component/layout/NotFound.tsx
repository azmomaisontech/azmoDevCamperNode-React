import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main id="notFound">
      <div className="container">
        <h2>Not Found</h2>
        <p>
          You just hit a route that doesn't exist... What can you do now? That's
          a good question! There are several things you can do, going to{" "}
          <Link to="/">home page</Link> would be a good idea.
        </p>
        <p>
          How did you get here? Is this a broken link within the blog? Or maybe
          a link from a third party website? Please{" "}
          <a href="mailto:azmotech@azmotech.dev">let us know</a> and we will fix
          it ASAP!
        </p>
      </div>
    </main>
  );
};

export default NotFound;
