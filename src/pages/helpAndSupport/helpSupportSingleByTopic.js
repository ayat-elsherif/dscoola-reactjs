import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import BreadCrumbsMultiple from "../../helpers/breadCrumbs/BreadCrumbsMultiple";
import { helpSingleTopicData } from "./helpData";
import { chevronUpIcon } from "../../SVGs.js";
import { Link } from "react-router-dom";
function HelpSupportSingleByTopic() {
  const [active, setActive] = useState(0);
  const [toTop, setToTop] = useState();
  window.onscroll = () => {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      setToTop(true);
    } else {
      setToTop(false);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    const links = document.querySelectorAll(".termOfUse-list a");

    for (const link of links) {
      link.addEventListener("click", clickHandler);
    }

    function clickHandler(e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      const offsetTop = document.querySelector(href).offsetTop;

      window.scroll({
        top: offsetTop + 250,
        behavior: "smooth",
      });
    }
  }, []);
  console.log(active, "active");
  const helpTopicTitle = helpSingleTopicData.map((item, i) => {
    return (
      <a href={"#" + item.href} key={i} onClick={() => setActive(i)}>
        <li
          className={active == i ? "termOfUse-item active" : "termOfUse-item"}
        >
          {item.title}
        </li>
      </a>
    );
  });
  const helpTopicBody = helpSingleTopicData.map((item, i) => (
    <div className="termsOfUse-block" id={item.href} key={i}>
      <h4>{item.title}</h4>
      {item.links?.map((l, i) => (
        <p key={i}>
          <Link to={l.linkUrl} key={i}>
            {l.linkTitle}
          </Link>
        </p>
      ))}
    </div>
  ));
  return (
    <div className="termsOfUsePage">
      <BreadCrumbsMultiple
        params={[
          {
            label: "help and support",
            url: "/support",
          },
          { label: "Get Started" },
        ]}
        title="Get Started"
      />
      <div className="termsOfUse-body">
        <div className="container">
          {toTop ? (
            <div
              className="toTop"
              style={{}}
              onClick={() => {
                window.scroll({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              {chevronUpIcon}
            </div>
          ) : (
            ""
          )}
          <Row gutter={36} align="top">
            <Col span={6}>
              <div className="termsOfUse-title">
                <ul className="termOfUse-list">{helpTopicTitle}</ul>
              </div>
            </Col>
            <Col span={18}>
              <div className="termsOfUse-details">{helpTopicBody}</div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default HelpSupportSingleByTopic;
