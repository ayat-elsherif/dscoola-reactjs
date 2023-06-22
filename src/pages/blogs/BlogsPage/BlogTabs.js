import React from "react";
import { Tabs, Input } from "antd";
import BlogsContent from "./BlogsContent";
const { TabPane } = Tabs;

const { Search } = Input;

const onChange = (key) => {
  console.log(key);
};
const tempArr = [
  { tab: "all", content: <BlogsContent /> },
  { tab: "development", content: "  Content of Tab Pane 2" },
  { tab: "IT & Software", content: "  Content of Tab Pane 3" },
  { tab: "Data Science", content: "  Content of Tab Pane 4" },
  { tab: "Soft Skills", content: "  Content of Tab Pane 5" },
  { tab: "HR & L&D", content: "  Content of Tab Pane 6" },
  { tab: "Business", content: "  Content of Tab Pane 7" },
  { tab: "marketing", content: "  Content of Tab Pane 8" },
  { tab: "Design", content: "  Content of Tab Pane 9" },
];
const allTabs = tempArr.map((item, i) => (
  <TabPane tab={item.tab} key={i}>
    {item.content}
  </TabPane>
));
const onSearch = (value) => console.log(value);

const BlogsTabs = () => (
  <>
    <Tabs defaultActiveKey="0" onChange={onChange}>
      {allTabs}
    </Tabs>
    <Search
      placeholder="Search.."
      onSearch={onSearch}
      className="trying-search"
    />
  </>
);

export default BlogsTabs;
