import { css } from '@emotion/css';
import { Button, Col, Row } from 'antd';
import { SignupArrsIcon } from 'assets/svg';
import useScreens from 'Hooks/ui/useScreens';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function HeroSection({ topCoursesEl }) {
  const { isLg } = useScreens();
  const HeroSectionStyles = css`
    background: transparent linear-gradient(154deg, #7e59d1 0%, #382464 100%) 0%
      0% no-repeat padding-box;
    min-height: 40vw;
    padding: 4rem 0 6rem;
    display: flex;

    .inner {
      .content-wrapper {
        max-inline-size: 72ch;
        .text-wrapper {
          line-height: 1.5;
          color: white;
          .title {
            font-family: 'Segoe', sans-serif;
            font-size: 3.8rem;
            margin-bottom: 1.2rem;

            .clr {
              color: #f2b636;
            }
          }
          .lead {
            padding-top: 2rem;
            font-family: 'Poppins-Regular', sans-serif;
            font-size: 1.7rem;
            letter-spacing: 0px;
            color: #ebebeb;
          }
        }
        .btns-wrapper {
          margin-top: 5rem;
        }
      }
      .image-wrapper {
        width: 44rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  `;
  const { currentUser } = useSelector((state) => state?.user);

  const onCheckCourses = () => {
    // console.log('HeroSection  topCoursesEl:', topCoursesEl);
    if (topCoursesEl) {
      topCoursesEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      });
    } else {
      window.location.reload(false);
    }
  };

  return (
    <div className={HeroSectionStyles}>
      <div className="container">
        <div className="inner">
          <Row
            gutter={[30, 30]}
            align="middle"
            justify={isLg ? 'space-between' : 'space-around'}
            wrap={isLg ? false : true}
          >
            <Col lg={{ order: 2 }}>
              <div className="image-wrapper">
                <img src="/assets/images/hero-avatar.png" alt="artwork" />
              </div>
            </Col>
            <Col>
              <div className="content-wrapper">
                <div className="text-wrapper">
                  <div className="title">
                    <span>Let`s </span>
                    <span className="clr">Grow</span>{' '}
                    <span>Your Education Level Up With </span>
                    <span className="clr">Scoola</span>
                  </div>
                  <div className="lead">
                    The best place to discover & share your knowledge here on
                    our platform let's figure it out.
                  </div>
                </div>
                <div className="btns-wrapper">
                  <Row gutter={[28, 10]}>
                    {!currentUser && (
                      <Col>
                        <Link to="/sign-up">
                          <Button
                            type="primary"
                            size="large"
                            dir="rtl"
                            icon={<SignupArrsIcon width={50} />}
                          >
                            Sign up
                          </Button>
                        </Link>
                      </Col>
                    )}
                    <Col>
                      <a href="#checkCourses">
                        <Button
                          type="primary"
                          size="large"
                          className="introSection-sec-btn"
                          onClick={onCheckCourses}
                        >
                          Check courses
                        </Button>
                      </a>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
