import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import BreadCrumbsMultiple from "../../../../helpers/breadCrumbs/BreadCrumbsMultiple";
import {
  facebookColofulIcon,
  linkedColorfulIcon,
  telegramColofulIcon,
  twitterColorfulIcon,
  WhatsappColorfulIcon,
} from "../../../../SVGs";

function SingleBlog() {
  return (
    <div className="singleBlog">
      <BreadCrumbsMultiple
        params={[
          { label: "Blogs", url: "/blogs" },
          { label: "What Is Mobile Website Design? 7 Principles" },
        ]}
        title="What Is Mobile Website Design? 7 Principles"
        txt="By Dee Naidoo, March 23, 2020"
        socialMedia={
          <div className="shareToSocialMedia">
            <FacebookShareButton
              url="https://www.tatvasoft.com/blog/reactjs-best-practices/"
              quote="try to see article 1"
            >
              {facebookColofulIcon}
            </FacebookShareButton>
            <TwitterShareButton
              url="https://www.tatvasoft.com/blog/reactjs-best-practices/"
              quote="try to see article 1"
              hashtag="react-"
            >
              {twitterColorfulIcon}
            </TwitterShareButton>
            <WhatsappShareButton
              url="https://www.tatvasoft.com/blog/reactjs-best-practices/"
              quote="try to see article 1"
            >
              {WhatsappColorfulIcon}
            </WhatsappShareButton>

            <LinkedinShareButton
              url="https://www.tatvasoft.com/blog/reactjs-best-practices/"
              quote="try to see article 1"
            >
              {linkedColorfulIcon}
            </LinkedinShareButton>
            <TelegramShareButton
              url="https://www.tatvasoft.com/blog/reactjs-best-practices/"
              quote="try to see article 1"
            >
              {telegramColofulIcon}
            </TelegramShareButton>
          </div>
        }
        alignEnd={true}
      ></BreadCrumbsMultiple>
      <div className="container">
        <div className="articleHero">
          <div className="articleHero-img">
            <img
              src="/assets/images/blogs/articles/article-header.jpg"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
        <div className="articleBody">
          <h3>What are Adobe Illustrator’s primary features?</h3>
          <p>
            Adobe Illustrator is a popular software application used by artists
            and graphic designers to create vector graphics. Adobe released the
            first version of Illustrator in 1987, and the application has gone
            through many iterations since then, establishing itself as a staple
            in graphic design. It offers sophisticated digital drawing tools for
            creating vector-based illustrations, icons, typography, logos, and
            other artwork. Adobe Illustrator is one of the software applications
            included in Adobe Creative Cloud. It is popular for personal art and
            entertainment, as well as business branding and design. <br /> Adobe
            Illustrator is a robust application with a wide array of features
            and tools for designers. Some of Illustrator’s core capabilities
            include:
          </p>
          <p>
            The ability to draw freehand with a variety of digital brushes,
            pencils, and pens.
            <br /> Advanced color options for creating color palettes, filling
            shapes, using gradient color schemes, and mixing different color
            effects. <br /> A “Layers” feature that allows you to split the
            components of your design across different layers, making it easy to
            edit one layer without impacting the others. <br /> A grid feature
            with anchor points and “snapping” capabilities, allowing you to
            easily align shapes and lines with accuracy. <br /> Cloud libraries
            where you can gather and store all of your design assets for a
            project — such as colors, brushes, graphics, text, and character
            styles — in one accessible place, making it easy to pick up in the
            middle of a project
            <br /> A library of available fonts with a search capability so you
            can find the perfect font types to use for your projects. <br />{" "}
            Tools to quickly create geometric shapes, adjust curvatures, and
            manipulate lines. <br /> Graphic Design Bootcamp: Phot
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
