import React from "react";
import BreadCrumbsMultiple from "../../../helpers/breadCrumbs/BreadCrumbsMultiple";
import BlogTabs from "./BlogTabs";

function BlogsPage() {
  window.scroll(0, 0);
  return (
    <div className="blogsPage">
      <BreadCrumbsMultiple
        params={[{ label: "Blogs" }]}
        title="Where Possibilities Begin"
        txt={
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        }
        heroImg={
          <img
            className="landingPageHero"
            src="/assets/images/blogs/blogs-header.png"
          />
        }
      />
      <div className="blogTabs">
        <BlogTabs />
      </div>
    </div>
  );
}

export default BlogsPage;
