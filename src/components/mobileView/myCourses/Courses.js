import { Tabs } from 'antd';

import './courses.scss';
import ViewAllTitle from '../helpers/ViewAllTitle/ViewAllTitle';
import MyCourses from './courses/MyCourses';
import MyWishlist from './wishlist/MyWishlist';
import MainNavbar from '../mainNavbar/MainNavbar';

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: `My Courses`,
    children: <MyCourses />,
  },
  {
    key: '2',
    label: `My Wishlist`,
    children: <MyWishlist />,
  },
];

export default function Courses() {
  return (
    <div className="my-courses">
      <ViewAllTitle title="My Courses" url="/" noCartIcon />
      <div className="my-courses-container">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
      <MainNavbar />
    </div>
  );
}
