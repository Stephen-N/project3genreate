const SpotifyWebApi = require('spotify-web-api-node');

//grab url access token
var token = new URLSearchParams(window.location.search).get('access_token');
//console.log(token);

//define global variables
var userName;
var userId;
var imageUrl;

let playlistTracks = [] //holds each tracklist object for each playlist
trackArray = []
  
//new spotify web api obj
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token); //set the access token to make the calls 


//request to open a database
var clearDB = indexedDB.deleteDatabase("GenreateDB");

clearDB.onsuccess = function(event) {
  console.log("Database deleted successfully");
}

let request = window.indexedDB.open("GenreateDB", 1),
  db,
  px,
  pStore;

request.onupgradeneeded = function(e) {
  let db = request.result,
      //we store PlaylistStore in the database, this will contain all of our neccesary information for genreate
      pStore = db.createObjectStore("PlaylistStore", {keyPath: "pID"});
}

request.onerror = function(e) {
  console.log("There was an error: ", e.target.errorCode);
}

console.log(userId);
console.log(request);

//GET MY USER DATA, as well as PLAYLIST DATA and enter into db
request.onsuccess = function(e) {
  (async () => {
    //request user data
  const me = await spotifyApi.getMe();
  userId =  me.body.id;
  userName = me.body.display_name;
  imageUrl = me.body.images[0].url;

  //requests playlist data for specific user 
  const data = await spotifyApi.getUserPlaylists(userId)
  var count = 0
  for (let playlist of data.body.items) {
    count = count + 1;
    var playlistID = playlist.id;
    const lists = await spotifyApi.getPlaylistTracks(playlistID, {
      offset: 0,
      limit: 75,
      fields: 'items'
    })
    playlistTracks.push(lists.body.items); //push the list to the array that holds the tracks for each playlist 
  }
  console.log("Playlist Count: ");
  console.log(count);

  var artistID = 0;
  var artistName = 0;
  var specifiedArtist = 0;
  var currGenre = 0;
  var compare = 0;
  var z = 2
  var q = 0
  var i = 0;

  for (; i < count; i++) { //goes through each playlist 
    //console.log("Playlist number: ")
    //console.log(i+1);
    let tracks = []
    var trackcounter = 1;
    for(let track_obj of playlistTracks[q]) { //for each track in the playlist[q], add the track amd the gemre
  
      const track = track_obj.track;
      compare = String(track.artists[0].type);

      if (compare === "artist") {
        artistID = track.artists[0].id;
        artistName = track.artists[0].name;
        specifiedArtist = await spotifyApi.getArtist(artistID)
        currGenre = specifiedArtist.body.genres[0];
        //console.log(currGenre);

        if (currGenre === undefined) {
          currGenre = 'undefined';
        }

      } else {
        artistName = 'null';
        artistID = 'null';
        currGenre = 'null';
      }
      let trackData = {Title: track.name, Artist: artistName, ArtistID: artistID, Genre: currGenre};

      tracks.push(trackData);
      trackcounter = trackcounter + 1;
    }
    trackArray.push(tracks);
    q = q + 1;
    z = z + 1;
    
  }
  //console.log(trackArray)

    //instantiate the database info
  db = request.result;
  //tx = db.transaction("UserStore", "readwrite");
  px = db.transaction("PlaylistStore", "readwrite");
  //px = db.transaction("Playlist", "readwrite");
  //store = tx.objectStore("UserStore");
  pStore = px.objectStore("PlaylistStore");
  //index = px.objectStore("Playlist");

  //error handling for database
  db.onerror = function(e) {
    console.log("ERROR" + e.target.errorCode);
  }

  //fill user variables
  
  //store user info in the the database
  pStore.put({pID: 1, UserStore: userId, Name: userName, Picture: imageUrl});

  //store all playlist data obbjects into the db
  var zs = 2
  var qs = 0
  for (let playlist of data.body.items) {
    var playlistID = playlist.id;
    var playlistName = playlist.name;
    var playlistPicture = playlist.images[0];

    let PlaylistData = {pID: zs, Playlist_ID: playlistID, Name: playlistName, Picture: playlistPicture, TrackList: trackArray[qs]};
    pStore.put(PlaylistData);

    
    qs = qs + 1;
    zs = zs + 1;      
  }

  //console.log(playlists);

  px.oncomplete = function() {
    db.close();
    console.log("Database has been updated with User's Playlists -> Tracks -> Genres");
  }

  })().catch(e => {
    console.error(e);
  });

}




//getMyData();

//console.log(userId);
console.log(request);
