let searchQuery = [];
let sortbyObj = {};
export const sendSearchQuery = (value, checked, searchItem, filterBy) => {
  let searchQueryString = "";

  if (checked) {
    searchQuery.push({ [searchItem]: value });
  } else {
    for (let i = 0; i < searchQuery.length; i++) {
      if (searchQuery[i][searchItem] == value) {
        searchQuery.splice(i, 1);
      }
    }
  }
  if (searchItem == "sort[]") {
    console.log(searchQuery, "search query");

    for (let i = 0; i < searchQuery.length; i++) {
      if ("sort[]" in searchQuery[i]) {
        searchQuery.splice(i, 1);
      }
    }
    searchQuery.push({ [searchItem]: value });
  }

  if (searchItem == "page") {
    console.log(searchQuery, "search query");

    for (let i = 0; i < searchQuery.length; i++) {
      if ("page" in searchQuery[i]) {
        searchQuery.splice(i, 1);
      }
    }
    searchQuery.push({ [searchItem]: value });
  } else {
    // searchQuery.filter((item) => !item.page);
    searchQuery = searchQuery.filter((item) => !item.page);
    console.log(searchQuery, "searchQuery no page");
  }

  // console.log(searchQuery);
  searchQuery.map((item) => {
    for (let key in item) {
      searchQueryString += `${key}=${item[key]}&`;
    }
  });
  if (filterBy) {
    searchQueryString += filterBy;
  } else {
    searchQueryString = searchQueryString.slice(0, -1);
  } // console.log(searchQueryString);
  // window.location.href = "?" + searchQueryString;
  // if (searchItem == "sort") {
  //   searchQueryString += `&sort=${value}`;
  // }
  return searchQueryString;
};
