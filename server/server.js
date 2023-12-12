/*const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    console.log(refreshToken)
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '72819a70cac64cf89db4d27987913049',
        clientSecret: '369aa500d7d44daa9ce972ebcb7d974b',
        refreshToken,
    }) 

    spotifyApi.refreshAccessToken().then( 
        (data) =>{
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })
            //save the access token so that its used in future calls
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '72819a70cac64cf89db4d27987913049',
        clientSecret: '369aa500d7d44daa9ce972ebcb7d974b'
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            })
        })
        .catch(error => {
                console.log(error)
                res.sendStatus(400);
        })
})

app.listen(3001)*/

//import("@brandond/findthelyrics")
//import { find_lyrics } from "@brandond/findthelyrics";
//const { find_lyrics } = require("@brandond/findthelyrics");
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })
})

/*
app.get("/lyrics", async (req, res) => {
console.log(req.query.artist)
console.log(req.query.track)
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found";
    console.log(lyrics)
  res.json({ lyrics })
})
*/

import("@brandond/findthelyrics").then(({ find_lyrics }) => {
app.get("/lyrics", async (req, res) => {
    
    //const lyrics = await find_lyrics("Fitz and The Tantrums I Just Wanna Shine");
    const lyrics = await find_lyrics(req.query.artist +" "+ req.query.track);
    if (lyrics instanceof Error) {
        console.error(lyrics);
    } else {
        console.log(lyrics);
        res.json({ lyrics })
    }
})
})

app.listen(process.env.PORT || 3001)
