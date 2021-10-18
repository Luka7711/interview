const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 9000;
const AWS = require("aws-sdk");

const retrieveName = async (api) => {
  const user = axios.get(api);
  //search for user in result
  // if found return user data
  // else return retrieveName(next link)
};

let initialApi = "https://gorest.co.in/public/v1/users";

const detailsByName = async (name, api) => {
  //make initial call
  let userDetails = await axios.get(api);
  let users = userDetails.data.data;
  // search for user
  if (users.length > 0) {
    for (let user of users) {
      if (user.name.toLowerCase() === name.toLowerCase()) {
        console.log(user);
        return user;
      }
    }
  } else if (users.length === 0) {
    console.log(null);
    return null;
  }
  // if user not found search in next page
  // if next page is exist call detailsByName
  // else return foundUser
  let nextApi = userDetails.data.meta.pagination.links.next;
  return detailsByName(name, nextApi);
};

detailsByName("Mangalya Guha", initialApi);

// recentPost("Nikita Ganaka");

// const getCounts = async (name) => {
//   const allPosts = await axios.get("https://gorest.co.in/public/v1/posts");
//   const user = await detailsByName(name);
//   let postsByName = allPosts.data.data.filter(
//     (post) => post.user_id === user.id
//   );
//   if (!postsByName) console.log(`${name} has not posts`);
//   else console.log(`${name} HAS ${postsByName.length} POSTS`);

//   return postsByName;
// };

// const recentPost = async (name) => {
//   const userPosts = await getCounts(name);
//   if (userPosts) console.log(userPosts[0]);
//   else console.log(`NO POSTS WAS RECORD BY ${name}`);
// };
app.listen(PORT, () => {
  console.log("App runs on port 9000");
});
