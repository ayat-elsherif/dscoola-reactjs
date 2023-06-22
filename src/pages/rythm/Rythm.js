import React from 'react';
import BreadCrumbs from '../../helpers/breadCrumbs/BreadCrumbs';
import MainSearchResults from 'pages/searchResults/MainSearchResults';
function Rythm() {
  window.scrollTo(0, 0);
  return (
    <div className="innerPage">
      <BreadCrumbs
        param="rythm"
        title="Raise Yourself To Help Mankind"
        txt="Free courses simply dummy text of the printing and typesetting industry"
      />
      <MainSearchResults />
    </div>
  );
}

export default Rythm;
