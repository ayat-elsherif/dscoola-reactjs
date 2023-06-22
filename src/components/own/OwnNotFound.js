import { Link } from 'react-router-dom';
import { css } from '@emotion/css';
// import logo from "assets/images/logo_gray.png";
// import {
//   setHeaderLayout,
//   setFooterLayout,
//   resetLayout,
// } from 'services/util/LayoutConfig';
import { useEffect } from 'react';

const NotFound = () => {
  const NotFoundStyles = css`
    height: 100vh;
    background-color: #fff;

    .page-inner {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      top: 15vh;
      .title {
        font-size: 6rem;
        line-height: 1.3;
        font-weight: 700;
        text-transform: capitalize;
        color: #282c34;
      }
      .description {
        margin: 3rem 0;
        p {
          font-size: 1.8rem;
          font-weight: 300;
          color: #6d6d6d;
          text-align: center;
          max-width: 48rem;
        }

        p:last-child {
          font-size: 1.6rem;
          line-height: 1.7;
          font-weight: 600;
          margin-top: 2.5rem;
        }
      }
    }
  `;
  // useEffect(() => {
  //   setHeaderLayout(false);
  //   setFooterLayout(false);

  //   return () => resetLayout();
  // }, []);

  return (
    <div className={NotFoundStyles}>
      <div className="container">
        <div className="page-inner">
          <div className="title">page not found</div>
          <div className="description">
            <p>We couldn't find what you were looking for.</p>
            <p>
              Please contact the owner of the site that linked you to the
              original URL and let them know their link is broken.
            </p>
          </div>
          <Link to="/">
            {/* <img src={logo} title="go home" alt="brand" width={200} /> */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
