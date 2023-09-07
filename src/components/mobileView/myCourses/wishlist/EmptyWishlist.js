import './emptyWishlist.scss';
import NotFoundGraph from '../../../../assets/svg/NotFoundGraph';

export default function EmptyWishlist() {
  return (
    <div className="empty_wishlist">
      <NotFoundGraph />
      <p>You don&apos;t have any Wishlist</p>
    </div>
  );
}
