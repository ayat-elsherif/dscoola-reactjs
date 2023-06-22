import { css } from '@emotion/css';
import { Button } from 'antd';
import { ActiveHIeartIcon, HeartIcon } from 'assets/svg';

function FavoriteIcon({ active, onClick, loading }) {
  const FavoriteIconStyles = css`
    .btn-fav {
      min-width: auto;
      min-height: auto;
      width: 2rem;
      height: 2rem;
      padding: 0;
      line-height: 0;
      svg {
        width: 1.8rem;
      }
    }
  `;

  return (
    <div className={FavoriteIconStyles}>
      <Button
        className="btn-fav"
        type="ghost"
        icon={active ? <ActiveHIeartIcon /> : <HeartIcon />}
        onClick={onClick}
        loading={loading}
      />
    </div>
  );
}

export default FavoriteIcon;
