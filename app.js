const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 9000;
const AWS = require("aws-sdk");
let userAPI = "https://gorest.co.in/public/v1/users";
let postAPI = "https://gorest.co.in/public/v1/posts";

const detailsByName = async (name, api) => {
  //make initial call
  //linear complexity
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

const getPosts = async (name, foundUser, posts, api) => {
  //find the userid
  if (!foundUser) {
    foundUser = await detailsByName(name, userAPI);
    console.log(foundUser);
  }
  // search through the posts
  const response = await axios.get(api);
  let postsData = response.data.data;

  if (postsData.length > 0) {
    for (let post of postsData) {
      if (post.user_id === foundUser.id) posts.push(post);
    }
  } else if (postsData.length === 0) {
    console.log(posts);
    return posts;
  }
  api = response.data.meta.pagination.links.next;
  return getPosts(name, foundUser, posts, api);
};

// detailsByName("Bhushan Mehrotra Jr.", userAPI);
// getPosts("Bhushan Mehrotra Jr.", null, [], postAPI);

const recentPost = async (name) => {
  const userPosts = await getPosts(name, null, [], postAPI);
  if (userPosts) console.log(userPosts[0]);
  else console.log(`NO POSTS WAS RECORD BY ${name}`);
};

app.listen(PORT, () => {
  console.log("App runs on port 9000");
});
