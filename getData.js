let request = window.indexedDB.open("GenreateDB", 1),
  db,
  px,
  pStore;


request.onerror = function(e) {
  console.log("There was an error: ", e.target.errorCode);
}

//console.log(userId);
console.log(request);

//GET MY USER DATA, as well as PLAYLIST DATA and enter into db
request.onsuccess = function(e) {
  (async () => {



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

  let userInfo = pStore.get(1);
  let playlistData = pStore.getAll(1);

  //here is where I print out the user information
  userInfo.onsuccess = function(e) {
    console.log(userInfo.result);
  }
  playlistData.onsuccess = function(e) {
    console.log(playlistData.result);
  }
  

  //console.log(playlists);

  px.oncomplete = function() {
    db.close();
    console.log("Playlist data has been accessed")
  }

  })().catch(e => {
    console.error(e);
  });

}

