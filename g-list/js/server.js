const express = require("express");
// import { config } from "./config.js";
const app = express();

const myClientId = config.MY_CLIENT_ID;
const mySecret = config.MY_SECRET;
// const myToken = config.MY_TOKEN;

/**
 * méthode fetch pour récupérer le ouath2 token et le retourner
 * */
const getToken = async () => {
  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `client_id=${myClientId}&client_secret=${mySecret}&grant_type=client_credentials`,
  });

  const data = await response.json();
  console.log(data);
  return data.access_token;
};

app.get("/games", async (req, res) => {
  var token = await getToken();
  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": myClientId,
      Authorization: `Bearer ${token}`,
    },
    body: "fields name, rating, genres.name;",
  });

  const games = await response.json();
  res.json(games);
});

app.listen(3000, () => console.log("Server running on port 3000"));

function getGame() {
  fetch("http://localhost:3000/games")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}

// require("dotenv").config();
// const express = require("express");
// // // const fetch = require("node-fetch");

// // import express from "express";
// // import fetch from "node-fetch";
// // import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const port = 4200;

// // Function to get the token
// async function getAccessToken() {
//   try {
//     const response = await fetch("https://id.twitch.tv/oauth2/token", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         client_id: process.env.MY_CLIENT_ID,
//         client_secret: process.env.MY_SECRET,
//         grant_type: "client_credentials",
//       }),
//     });

//     const data = await response.json();
//     if (data.access_token) {
//       console.log(data);
//       return data.access_token;
//     } else {
//       throw new Error("Failed to get access token");
//     }
//   } catch (error) {
//     console.error("Error fetching access token:", error);
//     return null;
//   }
// }

// // Route to fetch games using the IGDB API
// app.get("/games", async (req, res) => {
//   const token = await getAccessToken();
//   if (!token) {
//     return res.status(500).json({ error: "Failed to obtain access token" });
//   }

//   try {
//     const response = await fetch("https://api.igdb.com/v4/games", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Client-ID": process.env.MY_CLIENT_ID,
//         Authorization: `Bearer ${token}`,
//       },
//       body: `
//         fields name, rating, genres.name;
//         limit 10;
//       `,
//     });

//     const games = await response.json();
//     res.json(games);
//   } catch (error) {
//     console.error("Error fetching games:", error);
//     res.status(500).json({ error: "Error fetching games from IGDB API" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });