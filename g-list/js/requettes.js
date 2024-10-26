window.onload = (event) => {
  console.log("page is fully loaded");
  $("#test").html(`test`);

  (async () => {
    const token = await getToken();
    await fetchGames(token);
  })();
};

const myClientId = config.MY_CLIENT_ID;
const mySecret = config.MY_SECRET;
const myToken = config.MY_TOKEN;

const url = `https://id.twitch.tv/oauth2/token?client_id=${myClientId}&client_secret=${mySecret}&grant_type=client_credentials`;

// /* fetch pour retourner une list de jeux */
// function getGame() {
//   fetch("https://api.igdb.com/v4/games", {
//     method: "POST",
//     /* fournir le clientID et le token au header pour avoir la permission d'accéder à l'api */
//     headers: {
//       Accept: "application/json",
//       "Client-ID": myClientId,
//       Authorization: `Bearer ${myToken}`,
//     },
//     body: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;",
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((err) => {
//       console.error(err);
//     });
// }

// .then((response) => {
//   console.log(JSON.stringify(response.json()));
//   $(document).ready(function () {
//     /* on hover the text shadow appears */
//     $("#test").html(JSON.stringify(response.json()));
//   });
// })

// $(document).ready(function () {
//   /* on hover the text shadow appears */
//   $("#test").html(`test`);
// });

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
  return data.access_token;
};

const fetchGames = async (token) => {
  const response = await fetch('https://api.igdb.com/v4/games',{
    method: 'POST', // IGDB utilise POST pour la plupart des requettes
    headers: {
      'Client-ID': myClientId,
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
    body: `fields name, rating, genres.name;limit 10;`
  })

  const games = await response.json();
  console.log(games);
}

// (async () => {
//   const token = await getToken();
//   await fetchGames(token);
// })();