#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2]; // Get Movie ID from command line argument

if (!movieId) {
  console.log('Please provide a Movie ID as a command line argument.');
  process.exit(1);
}

const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

// Function to fetch characters for a given movie ID
function getCharacters(movieUrl) {
  request(movieUrl, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      process.exit(1);
    }

    if (response.statusCode !== 200) {
      console.error(`Failed to fetch movie details. Status code: ${response.statusCode}`);
      process.exit(1);
    }

    const movieData = JSON.parse(body);
    const characters = movieData.characters;

    if (characters.length === 0) {
      console.log('No characters found for this movie.');
    } else {
      console.log('Characters in the movie:');
      characters.forEach((characterUrl) => {
        request(characterUrl, (charError, charResponse, charBody) => {
          if (charError) {
            console.error('Error:', charError);
          } else if (charResponse.statusCode !== 200) {
            console.error(`Failed to fetch character details. Status code: ${charResponse.statusCode}`);
          } else {
            const characterData = JSON.parse(charBody);
            console.log(characterData.name);
          }
        });
      });
    }
  });
}

// Fetch characters for the given movie ID
getCharacters(apiUrl);

