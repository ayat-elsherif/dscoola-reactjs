// import Image from 'next/image';
import { Link } from 'react-router-dom';
import './categories.scss';
export default function SingleCategories({ category, isAllCategories }) {
  return (
    <Link
      to={`/categories/${category?.id}/${category?.slug}`}
      className={isAllCategories ? `category_item big` : `category_item`}
      key={category?.id}
    >
      <div className="category_img">
        <img
          src={category?.thumbnail}
          // src={`${category.thumbnail}`}
          alt={category?.title}
        />
      </div>
      <h6 className="category_name">{category?.title}</h6>
    </Link>
  );
}
