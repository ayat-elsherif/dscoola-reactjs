import AboutDscoolaOutlineIcon from '../../../assets/svg/dashboard/AboutDscoolaOutlineIcon';
import BecomeinstructorOutlineIcon from '../../../assets/svg/dashboard/BecomeinstructorOutlineIcon';
import BundlesOutlineIcon from '../../../assets/svg/dashboard/BundlesOutlineIcon';
import CertificatesOutlineIcon from '../../../assets/svg/dashboard/CertificatesOutlineIcon';
import ContactUsOutlineIcon from '../../../assets/svg/dashboard/ContactUsOutlineIcon';
import CreditCardOutlineIcon from '../../../assets/svg/dashboard/CreditCardOutlineIcon';
import HelpSupportOutlineIcon from '../../../assets/svg/dashboard/HelpSupportOutlineIcon';
import LanguageOutlineIcon from '../../../assets/svg/dashboard/LanguageOutlineIcon';
import LoginActivityOutlineIcon from '../../../assets/svg/dashboard/LoginActivityOutlineIcon';
import NotificationOutlineIcon from '../../../assets/svg/dashboard/NotificationOutlineIcon';
import ProfileOutlineIcon from '../../../assets/svg/dashboard/ProfileOutlineIcon';
import SecuritySetteingOutlineIcon from '../../../assets/svg/dashboard/SecuritySetteingOutlineIcon';
import SignOutOutlineIcon from '../../../assets/svg/dashboard/SignOutOutlineIcon';
import WalletOutlineIcon from '../../../assets/svg/dashboard/WalletOutlineIcon';
import YallaonlineOutlineIcon from '../../../assets/svg/dashboard/YallaonlineOutlineIcon';

export const dashSections = [
  {
    icon: <ProfileOutlineIcon />,
    sectionName: 'Edit Profile',
    url: 'student-dashboard/my-profile',
  },
  {
    icon: <CreditCardOutlineIcon />,
    sectionName: 'Payment Methods',
    url: 'student-dashboard/my-profile/credit-cards',
  },
  {
    icon: <WalletOutlineIcon />,
    sectionName: 'My Wallet',
    url: 'student-dashboard/my-profile/my-wallet',
  },
  {
    icon: <BundlesOutlineIcon />,
    sectionName: 'My Courses',
    url: '/student-dashboard/my-courses',
  },
  {
    icon: <NotificationOutlineIcon />,
    sectionName: 'Notification Settings',
    url: 'student-dashboard/my-profile/notification-settings',
  },
  {
    icon: <YallaonlineOutlineIcon />,
    sectionName: 'Yalla Online',
    url: 'student-dashboard/yalla-online',
  },
  {
    icon: <BecomeinstructorOutlineIcon />,
    sectionName: 'Become instructor',
    url: 'become-instructor',
  },
  {
    icon: <CertificatesOutlineIcon />,
    sectionName: 'My certificates',
    url: 'student-dashboard/certificates',
  },
  {
    icon: <HelpSupportOutlineIcon />,
    sectionName: 'help and support',
    url: 'support',
  },
  {
    icon: <SecuritySetteingOutlineIcon />,
    sectionName: 'Security Settings',
    url: 'student-dashboard/my-profile/security-settings',
  },
  {
    icon: <AboutDscoolaOutlineIcon />,
    sectionName: 'About scoola',
    url: 'about',
  },
  // { icon: <LanguageOutlineIcon />, sectionName: 'Language', url: 'language' },
  {
    icon: <ContactUsOutlineIcon />,
    sectionName: 'Contact Us',
    url: 'contact',
  },
  {
    icon: <LoginActivityOutlineIcon />,
    sectionName: 'Login activity',
    url: 'student-dashboard/my-profile/login-activity',
  },
  { icon: <SignOutOutlineIcon />, sectionName: 'Sign out', url: 'signout' },
];
