import { Skeleton } from 'antd';
import React from 'react';
import CartCard from '../../../helpers/cards/shoppingCartCard/CartCard';
function CartItems({ loading, list }) {
  return (
    <>
      {loading ? (
        <>
          <Skeleton active style={{ padding: '0 1.5rem' }} />
          <Skeleton active style={{ padding: '0 1.5rem' }} />
          <Skeleton active style={{ padding: '0 1.5rem' }} />
        </>
      ) : (
        <>
          <h6 className="mb-3">{list?.length} Courses in Cart</h6>

          {list?.map((item) => {
            return <CartCard item={item} key={item?.id} />;
          })}
        </>
      )}
    </>
  );
}

export default CartItems;
