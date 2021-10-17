const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 9000;
const AWS = require("aws-sdk");

const detailsByName = async (name) => {
  let users = await axios.get("https://gorest.co.in/public/v1/users");
  // find person by data
  let foundUser = users.data.data.filter((user) => user.name === name);
  console.log(foundUser);
  return foundUser[0];
};

const getCounts = async (name) => {
  const allPosts = await axios.get("https://gorest.co.in/public/v1/posts");
  const user = await detailsByName(name);
  let postsByName = allPosts.data.data.filter(
    (post) => post.user_id === user.id
  );
  if (!postsByName) console.log(`${name} has not posts`);
  else console.log(`${name} HAS ${postsByName.length} POSTS`);

  return postsByName;
};

const recentPost = async (name) => {
  const userPosts = await getCounts(name);
  if (userPosts) console.log(userPosts[0]);
  else console.log(`NO POSTS WAS RECORD BY ${name}`);
};

app.get("/", (req, res) => {
  res.status(200).json({ name: "Luka" });
});

// recentPost("Nikita Ganaka");

app.listen(PORT, () => {
  console.log("App runs on port 9000");
});
