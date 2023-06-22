import React, { useEffect } from "react";
import coursesAPI from "../../apis/coursesAPI";
import { useDispatch } from "react-redux";
function UsingUseEffect({ URL, dispatchMeth }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const TabsSection = async () => {
      const responseAll = await coursesAPI
        .get(URL)
        .catch((err) => console.log(err, "Err"));
      dispatch(dispatchMeth(responseAll.data.data));
    };
    TabsSection();
  }, [dispatch]);
  return <div></div>;
}

export default UsingUseEffect;
