import React from 'react';
import { useLocation } from 'react-router-dom';
import './footer.scss';
import { FacebookIcon } from '../../../assets/svg';
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownLink,
} from 'mdb-react-ui-kit';

import { Link } from 'react-router-dom';
import { footerLogo, globeIcon } from '../../../SVGs';
import { useSelector } from 'react-redux';
function Footer() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state?.user);

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="footer-logo">
            <Link
              to="/"
              onClick={() => {
                window.location.href('/');
                window.location.reload().then(() => window.scroll(0, 0));
              }}
            >
              {footerLogo}
            </Link>
          </div>
          <div className="col-lg-5 col-12">
            <p className="footer-brief">
              D-scoola is a platform designed to serve instructors & students &
              Course Providers by Connecting them with quality training .
            </p>

            <div className="footer-social">
              <a href="https://www.facebook.com" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                >
                  <g
                    id="svgexport-6_-_2022-04-10T122245.114"
                    data-name="svgexport-6 - 2022-04-10T122245.114"
                    transform="translate(0 0.322)"
                  >
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Color">
                        <g id="_01.Facebook" data-name="01.Facebook">
                          <circle
                            id="Background"
                            cx="13"
                            cy="13"
                            r="13"
                            transform="translate(0 -0.322)"
                            fill="#4a6ea9"
                          />
                          <path
                            id="Icon"
                            d="M388.414,263.387h-1.673c-.263,0-.357-.1-.357-.36v-2.041c0-.263.1-.362.358-.362h1.671v-1.472a3.683,3.683,0,0,1,.459-1.895,2.778,2.778,0,0,1,1.5-1.249,3.688,3.688,0,0,1,1.287-.222h1.654c.237,0,.337.1.337.337v1.92c0,.241-.1.337-.337.337-.453,0-.905,0-1.356.019s-.7.224-.7.695c-.01.5,0,1,0,1.515h1.944c.276,0,.37.094.37.372v2.029c0,.274-.087.36-.365.362h-1.959v5.476c0,.293-.091.385-.38.385h-2.107c-.254,0-.353-.1-.353-.353Z"
                            transform="translate(-377.233 -249.727)"
                            fill="#fff"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </a>
              <a href="https://www.twitter.com" target="_blank">
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                >
                  <g
                    id="svgexport-6_-_2022-04-10T122438.134"
                    data-name="svgexport-6 - 2022-04-10T122438.134"
                    transform="translate(0.352 0.322)"
                  >
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="_02.twitter" data-name="02.twitter">
                        <circle
                          id="background"
                          cx="13"
                          cy="13"
                          r="13"
                          transform="translate(-0.352 -0.322)"
                          fill="#00a6de"
                        />
                        <path
                          id="icon"
                          d="M50.992,45.881a5.5,5.5,0,0,1-1.115,1.224.476.476,0,0,0-.171.372v.043a7.806,7.806,0,0,1-.5,2.716,7.955,7.955,0,0,1-1.481,2.483,7.318,7.318,0,0,1-3.211,2.122,8.032,8.032,0,0,1-2.524.392,7.706,7.706,0,0,1-3.87-1.042.223.223,0,0,1-.107-.247.214.214,0,0,1,.209-.161h.325a5.179,5.179,0,0,0,2.9-.88,2.812,2.812,0,0,1-2.226-1.911.147.147,0,0,1,.171-.19,2.582,2.582,0,0,0,.473.045h.06a2.814,2.814,0,0,1-1.639-2.588.147.147,0,0,1,.217-.128,2.473,2.473,0,0,0,.64.248,2.812,2.812,0,0,1-.454-3.411.147.147,0,0,1,.241-.021,7.352,7.352,0,0,0,5.054,2.7H44a.106.106,0,0,0,.1-.115,2.973,2.973,0,0,1,.065-1.028A2.725,2.725,0,0,1,46,44.547a3.012,3.012,0,0,1,.889-.137,2.8,2.8,0,0,1,1.856.7.363.363,0,0,0,.241.092.368.368,0,0,0,.086-.012,5.138,5.138,0,0,0,1.37-.567.146.146,0,0,1,.214.171,2.779,2.779,0,0,1-.738,1.177,5.172,5.172,0,0,0,.9-.3.147.147,0,0,1,.18.212Z"
                          transform="translate(-31.494 -36.805)"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </a>
              <a href="https://www.youtube.com" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                >
                  <g
                    id="svgexport-10_1_"
                    data-name="svgexport-10 (1)"
                    transform="translate(-7.383 -11.339)"
                  >
                    <path
                      id="Path_12043"
                      data-name="Path 12043"
                      d="M11.955,0A11.955,11.955,0,1,1,0,11.955,11.955,11.955,0,0,1,11.955,0Z"
                      transform="translate(8.323 12.332)"
                      fill="#fff"
                    />
                    <path
                      id="Path_12042"
                      data-name="Path 12042"
                      d="M25.053,26.98a.422.422,0,0,0-.281.106q-.116.09-.116.679v.2l.025.024h.72l.025-.024v-.482q0-.5-.372-.5Zm-3.136-.016a.5.5,0,0,0-.389.2V30a.541.541,0,0,0,.389.2h.074q.257,0,.256-.393V27.4Q22.215,26.964,21.917,26.964ZM17.375,26.3h.852v3.5q0,.3.19.3h.058q.2,0,.5-.343V26.3h.86v4.563h-.86v-.491h-.008a1.418,1.418,0,0,1-.993.556h-.017a.506.506,0,0,1-.43-.213,1.608,1.608,0,0,1-.149-.908Zm7.653-.106h.091q1.191,0,1.191,1.431v1.055h-1.63l-.025.024v.785q0,.7.339.7h.074a.456.456,0,0,0,.223-.065q.132-.1.132-.54v-.352h.885v.2a2.487,2.487,0,0,1-.1.81,1.127,1.127,0,0,1-1.183.744,1.36,1.36,0,0,1-.521-.1,1.249,1.249,0,0,1-.72-1.259V27.5a1.555,1.555,0,0,1,.1-.54,1.209,1.209,0,0,1,1.142-.76Zm-4.352-1.513h.852v1.979h.016a1.037,1.037,0,0,1,.753-.417q.836,0,.836,1.177v2.5a2.16,2.16,0,0,1-.05.441.691.691,0,0,1-.67.548H22.3a1.018,1.018,0,0,1-.753-.376h-.017v.327h-.852Zm-6.255,0h2.962v.883h-.976l-.025.024v5.275h-.96V25.59l-.025-.024h-.976Zm5.27-1.6q-1.812,0-3.078.049a8.069,8.069,0,0,0-1.77.123,2.048,2.048,0,0,0-1.142.859,2.5,2.5,0,0,0-.273.662q-.124,1.333-.124,2.78v.466q0,1.218.074,2.1a2.142,2.142,0,0,0,.645,1.725,2.055,2.055,0,0,0,1.076.54q2,.115,4.616.114h1.332q2.159,0,3.806-.074a3.124,3.124,0,0,0,1.365-.213,2.059,2.059,0,0,0,1.059-1.186,14.907,14.907,0,0,0,.182-2.92v-.638q0-1.194-.074-1.987a2.185,2.185,0,0,0-.6-1.709,2.005,2.005,0,0,0-1.125-.589q-1.986-.106-4.608-.106Zm.585-4.6.157.025a.35.35,0,0,1,.223.36v2.363q0,.458-.372.458h-.008q-.339,0-.339-.368V18.8q0-.278.339-.319Zm2.01-.687-.025.024v3.721a2.168,2.168,0,0,0,.05.491.537.537,0,0,0,.554.417,1.413,1.413,0,0,0,.985-.556v.458l.025.024H24.7l.025-.024v-4.53L24.7,17.8h-.827l-.025.024v3.451q-.3.327-.488.327H23.33q-.2,0-.2-.368v-3.41l-.025-.024Zm-2.01-.106a1.258,1.258,0,0,0-.836.27,1.188,1.188,0,0,0-.405,1.079V21a3.935,3.935,0,0,0,.033.564,1.159,1.159,0,0,0,1.216.932l.414-.049a1.124,1.124,0,0,0,.844-1.177V18.827a1.036,1.036,0,0,0-.074-.4,1.123,1.123,0,0,0-1.117-.736ZM15.86,16.178l-.017.016.141.474q1,3.189,1,3.3v2.38l.025.024h.935l.025-.024V19.858q0-.074,1.125-3.663h-.008l-.017-.016H18.1l-.6,2.469h-.058q-.273-1.145-.488-1.905a2.069,2.069,0,0,0-.157-.564Zm4.523-4.839a13,13,0,1,1-13,13,13,13,0,0,1,13-13Z"
                      fill="#cc1915"
                      fillRule="evenodd"
                    />
                  </g>
                </svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank">
                <svg
                  id="svgexport-6_-_2022-04-10T122728.262"
                  data-name="svgexport-6 - 2022-04-10T122728.262"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                >
                  <g id="Group_10851" data-name="Group 10851">
                    <path
                      id="Path_10731"
                      data-name="Path 10731"
                      d="M13,0A13,13,0,1,1,0,13,13,13,0,0,1,13,0Z"
                      fill="#0e76a8"
                    />
                    <path
                      id="Path_10732"
                      data-name="Path 10732"
                      d="M81.946,84.154h2.426V76.067H81.946ZM91.4,75.787a3.641,3.641,0,0,0-2.978,1.379V76.041H85.984v8.113h2.435V79.767a1.926,1.926,0,0,1,1.913-1.832c1.064,0,1.326.9,1.326,1.809v4.409h2.426v-4.59C94.085,76.375,92.576,75.787,91.4,75.787Zm-8.25-.528a1.215,1.215,0,1,0-1.215-1.215A1.215,1.215,0,0,0,83.148,75.259Z"
                      transform="translate(-74.599 -66.313)"
                      fill="#fff"
                    />
                  </g>
                </svg>
              </a>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7 col-12 ms-xl-5">
            <div className="row">
              <div className="col-md-4 col-12 footer-about">
                {/* <h6>About us</h6> */}
                <ul className="footer-list mb-4">
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                  {+currentUser?.role_id !== 2 && (
                    <li>
                      <Link to="/become-instructor">Become An Instructor</Link>
                    </li>
                  )}
                </ul>
              </div>
              <div className="col-md-4 col-12 footer-links">
                {/* <h6>Links</h6> */}
                <ul className="footer-list mb-4">
                  <li>
                    <Link to="/careers">Careers</Link>
                  </li>
                  <li>
                    <Link to="/blogs">News & Blogs</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 col-12 footer-support">
                {/* <h6>Support</h6> */}
                <ul className="footer-list mb-4">
                  <li>
                    <Link to="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/support">Help & Support</Link>
                  </li>
                  <li>
                    <Link to="/terms">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="mb-sm-0 mb-3">
            Scoola © powered by Kimit innovations 2022.
          </div>
          <div>
            <MDBDropdown className="langDropdown">
              <MDBDropdownToggle>{globeIcon} English</MDBDropdownToggle>
              <MDBDropdownMenu className="lang-list">
                <MDBDropdownItem>
                  <MDBDropdownLink href="#">Arabic</MDBDropdownLink>
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
