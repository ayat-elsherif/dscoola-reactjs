import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { CartIcon } from '../../../../../assets/svg';
import './index.scss';
import { Link } from 'react-router-dom';
import CartService from '../../../../../services/CartSrevices';
import { useDispatch, useSelector } from 'react-redux';
import { cartList } from '../../../../../features/courses/cartList';
import { useQuery } from '@tanstack/react-query';

const Cart = () => {
  const cartInfo = useSelector((state) => state.cartList.cartList);
  const dispatch = useDispatch();
  const getCartList = () => {
    return CartService.getCartList();
  };
  const onSuccess = (data) => {
    dispatch(cartList(data?.data));
  };
  const onError = (data) => {};

  // eslint-disable-next-line no-unused-vars
  const { isLoading, data } = useQuery([`cart-list`], (id) => getCartList(id), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const menu = (
    <Menu>
      <div className="cart-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Cart</h4>
      </div>
      <div className="custom-divider"></div>
      {cartInfo?.items?.map((item) => {
        return (
          <React.Fragment key={item.id}>
            <Menu.Item key={item.id}>
              <div>
                <div className="avater-container">
                  <Avatar src={item.thumbnail_url} />
                </div>
                <div className="cart-content">
                  <span>{item.title} </span>
                  <span>{item.slug}</span>
                  {item?.price_plan === 'free' ? (
                    <span className="price">Free</span>
                  ) : item?.sale_price ? (
                    <>
                      <span className="price">{item?.sale_price}EGP</span>
                      <span className="old-price">{item?.price}EGP</span>
                    </>
                  ) : (
                    <span className="price">{item?.price}EGP</span>
                  )}

                  {/* <span>
                    {item.price_plan === 'free' ? (
                      'free'
                    ) : (
                      <>
                        {item.sale_price
                          ? `$${item.sale_price}`
                          : `$${item.price}`}
                      </>
                    )}
                  </span> */}
                </div>
              </div>
            </Menu.Item>
            <div className="custom-divider"></div>
          </React.Fragment>
        );
      })}

      {cartInfo?.items?.length === 0 && (
        <div className="empty-state"> Your cart is empty.</div>
      )}
      <div className="cart-footer">
        {cartInfo?.items?.length === 0 ? (
          <Link to="/">Go shopping</Link>
        ) : (
          <>
            <div className="total-price">
              Total : ${cartInfo?.price_without_fees || 0}
            </div>
            <Link to="/cart">Go to cart</Link>
          </>
        )}
      </div>
    </Menu>
  );

  return (
    <Dropdown
      placement="bottomRight"
      overlay={menu}
      trigger={['click']}
      arrow
      className="cart-menu"
      overlayClassName="cart-dropdown"
    >
      <div className="bill">
        <span>
          <CartIcon />
        </span>
        {cartInfo?.items?.length ? (
          <span className="cart-num">{cartInfo?.items?.length}</span>
        ) : null}
      </div>
    </Dropdown>
  );
};

export default Cart;
