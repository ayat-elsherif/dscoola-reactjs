import WebinarCard from 'helpers/cards/WebinarCard/WebinarCard';

export function WebinarsHit(props) {
  return (
    <WebinarCard course={props?.hit} sliderToggle={false} algolia={true} />
  );
}
