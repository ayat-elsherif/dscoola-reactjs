import { Carousel } from 'antd';
import './sliders.scss';
import SingleCategories from 'components/mobileView/categories/SingleCategories';
// import Link from "next/link";
export default function CategoriesSlider({ items }) {
  const settings = {
    // className: "center",
    infinite: true,
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 2,
    speed: 500,
    dots: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const categoryItem = items?.map((category, i) => {
    // console.log(i, "single category in map");
    return <SingleCategories category={category} key={category.id} />;
  });
  // console.log(items, "in categoriesSlider");

  return (
    <>
      <Carousel {...settings} draggable="true" className={'categories-slider'}>
        {categoryItem}
      </Carousel>
    </>
  );
}
