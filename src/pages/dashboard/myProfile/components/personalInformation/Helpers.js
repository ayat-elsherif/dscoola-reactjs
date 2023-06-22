import { message } from "antd";
import fetch from "../../../../../auth/AuthInterceptor"

export function normalizeDataToFields(resource) {
  
  let fields = [];
  Object.entries(resource).map((p) => {
    fields.push({ name: [p[0]], value: p[1] });
    if (p[1] && p[0] === "social_media_urls") {
      fields.push({ name: ["facebook"], value: p[1].facebook });
      fields.push({ name: ["twitter"], value: p[1].twitter });
      fields.push({ name: ["youtube"], value: p[1].youtube });
      fields.push({ name: ["linkedin"], value: p[1].linkedin });
      fields.push({ name: ["facebook_check"], value: p[1].facebook_check });
      fields.push({ name: ["twitter_check"], value: p[1].twitter_check });
      fields.push({ name: ["youtube_check"], value: p[1].youtube_check });
      fields.push({ name: ["linkedin_check"], value: p[1].linkedin_check });
    }

    //  debugger;
    if (p[0] === "host_video") {
      fields.push({ name: ["host_video"], value: p[1] });
    }
    if (p[0] === "second_category_id") {
      fields.push({ name: ["second_category_id"], value: null });
  
    }
    if (p[0] === "parent_category_id") {
      fields.push({ name: ["parent_category_id"], value: null });
  
    }
    if (p[0] === "topic_id") {
      fields.push({ name: ["topic_id"], value: null });
  
    }
    
    if (p[0] === "level") {
      fields.push({ name: ["level"], value: null });
      
    }
    

    
    return null;
  });

  return fields;
}
export function normalizeErrors(errors) {
  return Object.keys(errors).map((errField) => {
    if (errField.includes(".")) {
      let fieldName = errField.replace(".", "_");
      return { name: [fieldName], errors: errors[errField] };
    }
    return {
      name: [errField],
      errors: errors[errField],
    };
  });
}
export function simpleRequest(url,method) {
  return  fetch({
    url: url ,
    method: method,
    headers: {
       "public-request": "true",
    },
 })
    .then((res) => {})
    .catch((err) => {
       message.error("something went wrong");
    });
}
