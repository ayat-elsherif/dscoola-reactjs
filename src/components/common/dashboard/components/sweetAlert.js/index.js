import Swal from 'sweetalert2';
import './index.scss';
const SweetAlert = (title, message, customImage = false) => {
  if (customImage) {
    return Swal.fire({
      title: `${title}`,
      text: `${message}`,
      imageUrl: `${customImage}`,
      imageWidth: 66,
      imageHeight: 66,
    });
  } else {
    return Swal.fire({
      icon: 'success',
      title: `${title}`,
      text: `${message}`,
    });
  }
};

export default SweetAlert;
