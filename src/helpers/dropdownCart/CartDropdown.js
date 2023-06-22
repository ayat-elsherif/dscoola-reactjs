import React from 'react';
import './CartDropdown.scss';
import { Badge, Button, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CartIcon } from 'assets/svg';
import useCartInfo from 'api-hooks/cart/useCartInfo';

const CartDropdown = () => {
  const { cartInfo, cartInfoLod } = useCartInfo();

  const navigate = useNavigate();

  const menuCartItem = (item) => (
    <div className="menuCartItem">
      <div className="image-wrapper">
        <img alt="url" src={item.thumbnail_url} />
      </div>
      <div className="text-wrapper">
        <div className="title">{item.title}</div>
        <div className="sub-title">{item.slug}</div>

        <div className="title">
          {item.price_plan === 'free' ? (
            'free'
          ) : (
            <>{item.sale_price ? `$${item.sale_price}` : `$${item.price}`}</>
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
          size="small"
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
    onClick: () => {
      navigate('/cart');
      console.log('first');
      // hideDropdown();
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
      <Button
        type="link"
        style={{ padding: 0 }}
        icon={
          <Badge
            count={cartInfo?.items?.length}
            showZero
            size="small"
            color="#7e59d1"
          >
            <CartIcon />
          </Badge>
        }
        loading={cartInfoLod}
      />
    </Dropdown>
  );
};

export default CartDropdown;
