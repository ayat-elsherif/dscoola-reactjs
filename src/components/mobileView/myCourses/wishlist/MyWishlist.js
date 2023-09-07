import './myWishlist.scss';

import CourseCardHorizontal from '../../helpers/CourseCardHorizontal/CourseCardHorizontal';
import EmptyWishlist from './EmptyWishlist';

export default function MyWishlist({ notFound }) {
  const fakeArr = [1, 2, 3, 4];
  const allWishList = fakeArr.map((item, i) => (
    <CourseCardHorizontal key={i} />
  ));
  return <div>{notFound ? <EmptyWishlist /> : <>{allWishList}</>}</div>;
}
