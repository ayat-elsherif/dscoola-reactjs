// import Image from 'next/image';
import { Link } from 'react-router-dom';

import './profilePicture.scss';

import CameraIcon from '../../../../assets/svg/CameraIcon';

export default function ProfilePicture({ imageUrl }) {
  return (
    <div className={'profile-picture'}>
      <figure>
        <img alt="porfile image" src={imageUrl} />
        <Link to={'#'} onClick={() => alert("I'm clicked")}>
          <CameraIcon />
        </Link>
      </figure>
    </div>
  );
}
