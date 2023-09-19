import { css, cx } from '@emotion/css';
import { Button } from 'antd';
import { ArrowsLeftDouble, OverlayLeft, OverlayRight } from 'assets/svg';
import { Link } from 'react-router-dom';

function HomeBanner({ image, title, desc, learnMoreLink, invert }) {
  const HomeBannerStyles = css`
    min-height: 28.6rem;
    margin: 4rem 0;
    background: transparent url(${image}) 0% 0% no-repeat padding-box;
    background-size: cover;
    border-radius: 0 0.8rem 0.8rem 0;

    .content-wrapper {
      position: relative;
      display: flex;
      svg {
        width: 707px;
        height: 311px;
        @media screen and (max-width: 1599px) {
          width: 652;
          height: 286;
        }
        @media screen and (max-width: 1199px) {
          width: 534px;
          height: 234px;
          width: 624px;
          height: 275px;
        }
        @media screen and (max-width: 991px) {
          width: 521px;
          height: 229px;
          width: 593px;
          height: 261px;
        }
        @media screen and (max-width: 575px) {
          width: 100%;
          height: 100%;
        }
      }
      .text-wrapper {
        position: absolute;
        padding: 5rem;
        max-inline-size: 94ch;
        // @media screen and (max-width: 1199px) {
        //   padding: 4rem;
        //   max-inline-size: 80ch;
        // }
        @media screen and (max-width: 575px) {
          // padding: 2.5rem;
          padding: 3rem 2rem;

          max-inline-size: 74ch;
        }
        .learn-more-btn {
          @media screen and (max-width: 575px) {
            height: 30px;
          }
        }
        .title {
          font-size: 2.4rem;
          line-height: 2.7rem;
          font-weight: 600;
          color: #fff;

          margin-bottom: 1.2rem;
        }
        .desc {
          font-size: 1.5rem;
          line-height: 2.4rem;
          letter-spacing: 0px;
          color: #f9f2f2;
          margin-bottom: 2rem;
          @media screen and (max-width: 575px) {
            font-size: 1.2rem;
            line-height: 2rem;
          }
        }
        .learn-more-btn {
          min-height: 4rem;
          background-color: #efeff6;

          span {
            font: normal normal medium 1.6rem/3.2rem Poppins;
            letter-spacing: 0px;
            color: #7e59d1;
            text-transform: capitalize;
            font-weight: 500;
          }

          svg {
            width: 1.5rem;
            margin-inline-start: 0.5rem;
          }
        }
      }
    }
    &.invert {
      border-radius: 0.8rem 0 0 0.8rem;

      .content-wrapper {
        justify-content: flex-end;
        .text-wrapper {
          padding: 4rem 3rem 5rem 10rem;
          // @media screen and (max-width: 1199px) {
          //   padding: 2rem 2rem 5rem 1rem;
          //   max-inline-size: 67ch;
          // }
          @media screen and (max-width: 575px) {
            padding: 3rem 2rem;
            max-inline-size: 67ch;
          }
        }
      }
    }
  `;

  return (
    <div className={cx(HomeBannerStyles, { invert })}>
      <div className="content-wrapper">
        {invert ? <OverlayRight /> : <OverlayLeft />}
        <div className="text-wrapper">
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
          <Link to="/yallaonline">
            <Button type="ghost learn-more-btn">
              learn more
              <ArrowsLeftDouble />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
