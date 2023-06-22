import React from 'react';
import BreadCrumbsMultiple from '../../helpers/breadCrumbs/BreadCrumbsMultiple';

import HelpSupportFaq from './helpSupportSections/HelpSupportFaq';

import HelpSupportByTopic from './helpSupportSections/HelpSupportByTopic copy';

function HelpSupportPage() {
  window.scroll(0, 0);
  return (
    <div className="helpSupportPage">
      <BreadCrumbsMultiple
        params={[{ label: 'Help and Support' }]}
        title="How can we help?"
        txt="Get answers to frequently asked questions"
        heroImg={
          <img
            src="/assets/images/pages/help-and-support.png"
            alt="help and support"
          />
        }
      />
      <div className="helpSupport-body">
        <div className="container">
          <HelpSupportFaq />
          <HelpSupportByTopic />
        </div>
      </div>
    </div>
  );
}

export default HelpSupportPage;
