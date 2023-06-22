import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import BreadCrumbsMultiple from "../../helpers/breadCrumbs/BreadCrumbsMultiple";
import { termsData } from "./termsData.js";
import { chevronUpIcon } from "../../SVGs.js";
function PrivacyPolicyPage() {
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
  const termsTitle = termsData.map((item, i) => {
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
  const termsBody = termsData.map((item, i) => (
    <div className="termsOfUse-block" id={item.href} key={i}>
      <h4>{item.title}</h4>
      {item.setOfP.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  ));
  return (
    <div className="termsOfUsePage">
      <BreadCrumbsMultiple
        params={[{ label: "Privacy and Policy" }]}
        title="Privacy and Policy"
      />
      <div className="termsOfUse-body">
        <div className="container">
          {" "}
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
            <Col xl={6} lg={8}>
              <div className="termsOfUse-title">
                <ul className="termOfUse-list">{termsTitle}</ul>
              </div>
            </Col>
            <Col xl={18} lg={16}>
              <div className="termsOfUse-details">{termsBody}</div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
