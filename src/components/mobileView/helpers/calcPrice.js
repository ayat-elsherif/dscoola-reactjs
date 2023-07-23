import './helpers.scss';

export const calcPrice = (course) => {
  if (course?.price_plan === 'paid' && !course?.price === 'null') {
    if (course?.sale_price) {
      return (
        <>
          <div className="current-price">${course?.sale_price}</div>
          <div className="sale-price">${course?.price}</div>
        </>
      );
    } else return <div className="current-price">${course?.price}</div>;
  } else return <div className="current-price">Free</div>;
};
