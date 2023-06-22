import { levelsList } from 'apis/levelsList';
import CourseCard from 'helpers/cards/courseCard/courseCard';
import LiveSessionCard from 'helpers/cards/liveSessionCard';

export function Hit(props) {
  // if (props.hit.type === 'mixed' || props.hit.type === 'recorded') {
  //   return (
  //     <CourseCard
  //       course={props?.hit}
  //       levels={levelsList}
  //       sliderToggle={false}
  //       isWishlist={props?.hit?.isWishlist}
  //       algolia={true}
  //       hits={props?.hit}
  //     />
  //   );
  // }
  // if (props?.hit?.type === 'liveClass') {
  //   return (
  //     <LiveSessionCard
  //       course={props?.hit}
  //       levels={levelsList}
  //       sliderToggle={false}
  //       isWishlist={props?.hit?.isWishlist}
  //       algolia={true}
  //       hits={props?.hit}
  //     />
  //   );
  // } else {
  //   return (
  //     <CourseCard
  //       course={props?.hit}
  //       levels={levelsList}
  //       sliderToggle={false}
  //       isWishlist={props?.hit?.isWishlist}
  //       algolia={true}
  //       hits={props?.hit}
  //     />
  //   );
  // }
  return <CourseCard course={props?.hit} />;
}
