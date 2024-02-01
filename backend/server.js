require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/twitchaccess", async (req, res) => {
  try {
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        grant_type: "client_credentials",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();
    console.log(data);
    console.log(data.access_token);
  } catch (error) {
    console.log(error);
  }
});

app.get("/:streamer", async (req, res) => {
  const { streamer } = req.params;
  try {
    // const auth = await twitchAuth();
    // if (auth === null) throw new Error("Auth failed");
    const response = await fetch(
      `https://api.twitch.tv/helix/search/channels?query=${streamer}&first=1`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.access_token,
          "Client-Id": process.env.client_id,
        },
      }
    );

    const data = await response.json();
    console.log(data);
    console.log(data.data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
      console.log("Connected to MongoDB");
    });
  })
  .catch((error) => {
    console.log(error);
  });
