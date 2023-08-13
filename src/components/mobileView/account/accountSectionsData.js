import DashboardOutlineIcon from 'assets/svg/dashboard/DashboardOutlineIcon';
import MyCoursesOutlineIcon from 'assets/svg/dashboard/MyCoursesOutlineIcon';

import CertificatesOutlineIcon from '../../../assets/svg/dashboard/CertificatesOutlineIcon';

import ProfileOutlineIcon from '../../../assets/svg/dashboard/ProfileOutlineIcon';

import YallaonlineOutlineIcon from '../../../assets/svg/dashboard/YallaonlineOutlineIcon';
import { Link } from 'react-router-dom';
import OneOnOneOutlineIcon from 'assets/svg/dashboard/OneOnOneOutlineIcon';
import MyWishlistOutlineIcon from 'assets/svg/dashboard/MyWishlistOutlineIcon';
import InstructorCoursesOutlineIcon from 'assets/svg/dashboard/InstructorCoursesOutlineIcon';
import AnnouncementOutlineIcon from 'assets/svg/dashboard/AnnouncementOutlineIcon';
import {
  CouponIcon,
  FileManagerIcon,
  InvoicesIcon,
  MeetingSettingsIcon,
  ReportsIcon,
  ReviewsIcon,
  WebinarsIcon,
} from 'assets/svg';

function getItem(label, key, icon, children, role, type) {
  return {
    key,
    icon,
    children,
    role,
    label,
    type,
  };
}

export const accountItems = [
  getItem(
    <Link to="/student-dashboard"> Dashboard</Link>,
    '1',
    <DashboardOutlineIcon />,
    '',
    3,
  ),
  getItem(
    <Link to="/student-dashboard/my-profile/personal-information">
      {' '}
      My profile
    </Link>,
    '2',
    <ProfileOutlineIcon />,
    '',
    3,
  ),
  getItem(
    <Link to="/student-dashboard/my-courses"> My Courses</Link>,
    '3',
    <MyCoursesOutlineIcon />,
    '',
    3,
  ),
  getItem(
    <Link to="/student-dashboard/yalla-online"> Yalla Online</Link>,
    '4',
    <YallaonlineOutlineIcon />,
    '',
    3,
  ),
  getItem(
    <Link to="/student-dashboard/one-to-one"> One To One</Link>,
    '5',
    <OneOnOneOutlineIcon />,
    '',
    3,
  ),
  getItem(
    <Link to="/student-dashboard/certificates">Certificates</Link>,
    '6',
    <CertificatesOutlineIcon />,
    '',
    3,
  ),
  getItem(
    <Link to="/student-dashboard/my-wishlist"> My Wishlist</Link>,
    '7',
    <MyWishlistOutlineIcon />,
    '',
    3,
  ),
  getItem(
    'Meeting Settings',
    'sub1',
    // <MeetingSettingsOutlineIcon />,
    <MeetingSettingsIcon />,
    [
      getItem(
        <Link to="/student-dashboard/zoom-settings">Zoom Settings</Link>,
        'g1',
        null,
      ),
      getItem(
        <Link to="/student-dashboard/bigblue-button-settings">
          Bigblue Button Settings
        </Link>,
        'g2',
        null,
      ),
      getItem(
        <Link to="/student-dashboard/jitsi-settings">Jitsi Settings</Link>,
        'g3',
        null,
      ),
    ],
    3,
  ),
  getItem(
    <Link to="/student-dashboard/invoices">Invoices</Link>,
    '8',
    <InvoicesIcon />,
    '',
    3,
  ),
  getItem(
    <Link to="/instructor-dashboard/dashboard"> Dashboard</Link>,
    '1',
    <DashboardOutlineIcon />,
    '',
    2,
  ),
  getItem(
    <Link to="/instructor-dashboard/my-profile/personal-information">
      {' '}
      My profile
    </Link>,
    '9',
    <ProfileOutlineIcon />,
    '',
    2,
  ),
  getItem(
    <Link to="/instructor-dashboard/courses">Courses</Link>,
    '10',
    <InstructorCoursesOutlineIcon />,
    '',
    2,
  ),
  getItem(
    'One-On-One',
    'sub2',
    <OneOnOneOutlineIcon />,
    [
      getItem(
        <Link to="/instructor-dashboard/one-on-one-list">One-on-one list</Link>,
        'g4',
        null,
      ),
      getItem(
        <Link to="/instructor-dashboard/one-on-one-settings">
          One-on-one-settings
        </Link>,
        'g5',
        null,
      ),
    ],
    2,
  ),
  getItem(
    <Link to="/instructor-dashboard/annoncement">Announcement</Link>,
    '11',
    <AnnouncementOutlineIcon />,
    '',
    2,
  ),
  getItem(
    <Link to="/instructor-dashboard/reviews">Reviews</Link>,
    '12',
    <ReviewsIcon />,
    '',
    2,
  ),
  getItem(
    <Link to="/instructor-dashboard/webinars-talks">Webinars & Talks</Link>,
    '13',
    <WebinarsIcon />,
    '',
    2,
  ),
  getItem(
    <Link to="/instructor-dashboard/file-manager">File Manager</Link>,
    '14',
    <FileManagerIcon />,

    '',
    2,
  ),
  getItem(
    <Link to="/instructor-dashboard/reports">Reports</Link>,
    '15',
    <ReportsIcon />,
    '',
    2,
  ),
  getItem(
    <Link to="/instructor-dashboard/coupons">Coupons</Link>,
    '17',
    <CouponIcon />,
    '',
    2,
  ),

  getItem(
    'Meeting Settings',
    'sub3',
    <MeetingSettingsIcon />,
    [
      getItem(
        <Link to="/instructor-dashboard/zoom-settings">Zoom Settings</Link>,
        'g5',
        null,
      ),
      getItem(
        <Link to="/instructor-dashboard/bigblue-button-settings">
          BigblueButton Settings
        </Link>,
        'g6',
        null,
      ),
      getItem(
        <Link to="/instructor-dashboard/jitsi-settings">Jitsi Settings</Link>,
        'g7',
        null,
      ),
    ],
    2,
  ),
];

console.log(accountItems, 'accountItems');

//WebinarsIcon
