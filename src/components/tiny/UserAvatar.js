import { css } from '@emotion/css';
import { Avatar, Image } from 'antd';
import { UserAvatarIcon } from 'assets/svg';
import { avatarImg } from 'constant/constant';

function UserAvatar({ img, ...rest }) {
  const UserAvatarStyles = css`
    line-height: 28px;
    img {
      width: 100%;
      height: 100%;
    }

    .icon {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  `;

  return (
    <Avatar
      className={UserAvatarStyles}
      // icon={
      //   <img
      //     src={img || avatarImg}
      //     alt="user profile"
      //   />
      // }
      icon={
        img ? (
          <Image
            src={img || avatarImg}
            alt="user profile"
            fallback={avatarImg}
            preview={false}
          />
        ) : (
          <UserAvatarIcon
            // width={31} height={31}
            className="icon"
          />
        )
      }
      {...rest}
    />
  );
}

export default UserAvatar;
