// import Image from 'next/image';
import { Link } from 'react-router-dom';
import './categories.scss';
export default function SingleCategories({ category, isAllCategories }) {
  return (
    <Link
      to={`/categories/${category?.id}/${category?.slug}`}
      className={isAllCategories ? `category-item big` : `category-item`}
      key={category?.id}
    >
      <div className="category-img">
        <img
          src={category?.thumbnail}
          // src={`${category.thumbnail}`}
          alt={category?.title}
        />
      </div>
      <h6 className="category-name">{category?.title}</h6>
    </Link>
  );
}
