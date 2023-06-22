import React, { useState } from "react";
import UsingUseEffect from "../../../helpers/tabs/UsingUseEffect";
import singleTab from "../../../helpers/tabs/singleTab";
// import "./topViewedTabs.scss";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import {
  fetchStartingCourses,
  fetchAdvanced,
  fetchBeginner,
  fetchIntermediate,
} from "../../../features/courses/categoriesSlice";

const levelsLabels = [
  {
    tab: "most popular",
    url: "category/620df7d62adc964671994b23/popular",
    dispatchMethod: fetchStartingCourses,
  },
  {
    tab: "beginner",
    url: "category/620df7d62adc964671994b23?level=beginner",
    dispatchMethod: fetchBeginner,
  },
  {
    tab: "intermediate",
    url: "category/620df7d62adc964671994b23?level=intermediate",
    dispatchMethod: fetchIntermediate,
  },
  {
    tab: "advanced",
    url: "category/620df7d62adc964671994b23?level=advanced",
    dispatchMethod: fetchAdvanced,
  },
];

export default function TopViewedTabs() {
  const mostViewed = useSelector(({ categories }) => {
    // console.log(state,"state in most viewing")
    return categories.startingCourses.mostViewed;
  });
  const viewedBeginner = useSelector(({ categories }) => {
    return categories.startingCourses.viewedBeginner;
  });
  const viewedIntermediate = useSelector(({ categories }) => {
    return categories.startingCourses.viewedIntermediate;
  });
  const viewedAdvanced = useSelector(({ categories }) => {
    return categories.startingCourses.viewedAdvanced;
  });
  const levels = useSelector((state) => state.allLevels);

  const [basicActive, setBasicActive] = useState(levelsLabels[0].tab);

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  const allTabs = levelsLabels.map((tab, i) => (
    <MDBTabsItem key={i}>
      <MDBTabsLink
        onClick={() => handleBasicClick(tab.tab)}
        active={basicActive === tab.tab}
      >
        {tab.tab}
        <UsingUseEffect
          param={"/get-all-courses"}
          dispatchMeth={tab.dispatchMethod}
        />
      </MDBTabsLink>
    </MDBTabsItem>
  ));

  return (
    <>
      <MDBTabs className="mb-3 ms-4 me-4">{allTabs}</MDBTabs>
      <MDBTabsContent className="row mx-0">
        <MDBTabsPane show={basicActive === "most popular"} className="px-0">
          <div className="row">
            {singleTab(mostViewed, "mostViewed", levels.levels)}
          </div>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "beginner"} className="px-0">
          <div className="row">{singleTab(viewedBeginner, levels.levels)}</div>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "intermediate"} className="px-0">
          <div className="row">
            {singleTab(viewedIntermediate, levels.levels)}
          </div>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "advanced"} className="px-0">
          <div className="row">{singleTab(viewedAdvanced, levels.levels)}</div>
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}
