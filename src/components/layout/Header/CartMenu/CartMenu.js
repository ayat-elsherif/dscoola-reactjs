import React from 'react';
import { Badge, Button, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CartIcon } from 'assets/svg';
import useCartInfo from 'api-hooks/cart/useCartInfo';
import './CartMenu.scss';

const CartMenu = () => {
  const { cartInfo, cartInfoLod } = useCartInfo();
  // console.log('CartMenu  cartInfo', cartInfo);
  const imgBaseUrl = 'https://dscoola-files.s3.eu-west-1.amazonaws.com';

  const navigate = useNavigate();

  const menuCartItem = (item) => (
    <div
      className="menuCartItem"
      onClick={() => {
        if (item?.item_type === 'course') {
          navigate(`/course-view/${item?.slug}`);
        } else if (item?.item_type === 'webinar') {
          navigate(`/webinars/${item?.slug}`);
        }
      }}
    >
      <div className="image-wrapper">
        <img
          alt="url"
          src={
            item?.item_type === 'course'
              ? item?.thumbnail_url
              : `${imgBaseUrl}/${item?.thumbnail_url}`
          }
        />
      </div>
      <div className="text-wrapper">
        <div className="title">{item.title}</div>
        <div className="sub-title">{item.slug}</div>

        <div className="title">
          {item.price_plan === 'free' ? (
            'free'
          ) : (
            <>{item?.sale_price ? `$${item?.sale_price}` : `$${item?.price}`}</>
          )}
        </div>
      </div>
    </div>
  );

  const firstItem = {
    key: 'title',
    label: <div className="menu-title">Cart</div>,
  };

  const cartItems = cartInfo?.items?.map((el) => ({
    key: el?.id,
    label: menuCartItem(el),
  }));

  const lastItem = {
    key: 'price',
    label: (
      <div className="last-menu-cart-tem">
        <div>Total : ${cartInfo?.price_without_fees || 0}</div>
        <Button
          type="primary"
          block
          size="large"
          // onclick={() => {
          //   navigate('/cart');
          //   console.log('first');
          //   // hideDropdown();
          // }}
        >
          Got to cart
        </Button>
      </div>
    ),
    className: 'last-menu-cart-tem-wrapper',
    onClick: () => {
      navigate('/cart');
    },
  };

  const emptyMsgItem = {
    key: 'empty',
    label: <div className="menu-msg">Your cart is empty.</div>,
  };

  const items = cartInfo?.items?.length
    ? [firstItem, ...cartItems, lastItem]
    : [firstItem, emptyMsgItem];

  return (
    <Dropdown
      menu={{
        items,
        className: 'cart-menu-wrapper',
      }}
      arrow
    >
      <Badge
        count={cartInfo?.items?.length}
        showZero
        size="small"
        color="#7e59d1"
        offset={[-4, 10]}
      >
        <Button
          type="link"
          icon={<CartIcon />}
          // loading={cartInfoLod}
          className="typ-btn-icon"
        />
      </Badge>
    </Dropdown>
  );
};

export default CartMenu;
