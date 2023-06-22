import React, { useEffect, useState } from "react";
import UsingUseEffect from "./UsingUseEffect";
import singleTab from "./singleTab";
import "./topViewedTabs.scss";
// import { mostViewed } from "../../../features/courses/mostViewedSilce";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import {
  fetchAdvanced,
  fetchBeginner,
  fetchIntermediate,
  fetchStudentsViewing,
} from "../../features/courses/mostViewedSilce";

const levelsLabels = [
  { tab: "most popular", url: "viewing", dispatchMethod: fetchStudentsViewing },
  {
    tab: "beginner",
    url: "viewing?level=beginner",
    dispatchMethod: fetchBeginner,
  },
  {
    tab: "intermediate",
    url: "viewing?level=intermediate",
    dispatchMethod: fetchIntermediate,
  },
  {
    tab: "advanced",
    url: "viewing?level=advanced",
    dispatchMethod: fetchAdvanced,
  },
];

export default function TopViewedTabs() {
  const mostViewed = useSelector((state) => {
    // console.log(state,"state in most viewing")
    return state.mostViewed.studentsViewing.mostViewed;
  });
  const viewedBeginner = useSelector((state) => {
    return state.mostViewed.studentsViewing.viewedBeginner;
  });
  const viewedIntermediate = useSelector((state) => {
    return state.mostViewed.studentsViewing.viewedIntermediate;
  });
  const viewedAdvanced = useSelector((state) => {
    return state.mostViewed.studentsViewing.viewedAdvanced;
  });

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
          param={"/courses/" + tab.url}
          dispatchMeth={tab.dispatchMethod}
        />
      </MDBTabsLink>
    </MDBTabsItem>
  ));

  return (
    <>
      <MDBTabs className="mb-3 ms-4 me-3">{allTabs}</MDBTabs>
      <MDBTabsContent className="row mx-0">
        <MDBTabsPane show={basicActive === "most popular"} className="px-0">
          <div className="">{singleTab(mostViewed, "mostViewed")}</div>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "beginner"} className="px-0">
          <div className="">{singleTab(viewedBeginner)}</div>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "intermediate"} className="px-0">
          <div className="">{singleTab(viewedIntermediate)}</div>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "advanced"} className="px-0">
          <div className="row">{singleTab(viewedAdvanced)}</div>
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}
