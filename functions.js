/* ///////////// */
/* G E N E R A L */
/* ///////////// */

var unselectedColor = "rgba(78, 78, 78, 0.705)";
var selectedColor = "rgba(30, 215, 96, 0.5)";
var unselectedSongColor = "rgba(0, 0, 0, 0.5)";
var selectedSongColor = "rgba(255, 255, 255, 0.2)";
var checkedPlaylists = {};
var checkedSongs = [];

var subgenres = {
    Contemporary: 12,
    Disco: 8,
    DooWop: 6,
    Motown: 5,
    NeoSoul: 3,
    QuietStorm: 2,
    Soul: 1,
    ArtPop: 10,
    DancePop: 8,
    Orchestral: 6,
    Country: 5,
    Indie: 2,
    Bubblegum: 1,
    OldSchool: 11,
    BoomBap: 7,
    Jazz: 5,
    Trap: 5,
    Mumble: 3,
    Rap: 2,
    Country: 1,
    Gangsta: 1,
    Hiplife: 5,
    DanceHall: 3,
    Soca: 1,
    Juju: 1,
    Highlife: 1,
    Ndombolo: 1,
    Naija: 1,
    Azonto: 1,
    Disco: 2,
    EDM: 1,
    Jungle: 1,
    House: 1
};

var selectedSubgenres = {};




function sum( obj ) {
    var sum = 0;
    for( var el in obj ) {
        if( obj.hasOwnProperty( el ) ) {
        sum += parseFloat( obj[el] );
        }
    }
    return sum;
}

/* /////////////// */
/* L A N G U A G E */
/* /////////////// */

function googleTranslateElementInit() { 
    new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');    localStorage.setItem("lang",pageLanguage);
} 

function onPageLoad(){
    document.pageLanguage = localStorage.getItem("lang");
}

window.onLoad = function(){
    onPageLoad();
}

/* ////////////// */
/* C O N N E C T */
/* ////////////// */

function connectSpotifyAcct() {
    // TODO: 
    window.location.href = "https://genreate-backend.herokuapp.com/login";
}







function toggleDarkLight() {

    var bttn = document.getElementById('lightModeIcon'); 
    bttn.name = (bttn.name == 'sunny-outline') ? 'moon-outline' : 'sunny-outline';

    var body = document.getElementById('body');
    var currentClass = body.className;
    var newClass = body.className == 'dark-mode' ? 'light-mode' : 'dark-mode';
    body.className = newClass;
    // alert("body.className " + body.className);
    var endDate = new Date();
    document.cookie = 'theme=' + (newClass == 'light-mode' ? 'light' : 'dark') + '; expires=' + endDate + ';';
    // alert('Cookies are now: ' + document.cookie);
}

function isDarkThemeSelected() {
    return document.cookie.match(/theme=dark/i) != null;
}

function setThemeFromCookie() {
    var body = document.getElementById('body');
    // alert("isDarkThemeSelected(): " + isDarkThemeSelected());
    body.className = isDarkThemeSelected() ? 'dark-mode' : 'light-mode';
    // alert('loaded cookie: ' + body.className);
}

document.addEventListener("DOMContentLoaded", function(event) {
    setThemeFromCookie();




});


















// (function() {
//     setThemeFromCookie();
//     alert("done");
// })();

// window.addEventListener('load', setThemeFromCookie())










/* ///////////////// */
/* N A V I G A T O R */
/* ///////////////// */

function sendToLyricsPage() {
    window.location.href = "lyrics.html";
}

function userProfileClicked(){
    let sModal = document.querySelector(".settings-modal")
    sModal.style.display = "block"
}

/* /////////// */
/* C R E A T E */
/* /////////// */

function create() {
    loadPlaylists();
}

function goHome() {
    window.location.href = "connect.html";
}

function selectAll() {

    var allSelected = true;
    for (var id = 0; id < Object.keys(checkedPlaylists).length; id++) {
        var p = "playlist" + (id+1);
        if (checkedPlaylists[p] == false) {
            allSelected = false;
        }
    }

    // alert("allSelected: " + allSelected);

    // var allSelected = all(value == true for value in checkedPlaylists.values());
    // var allFalse = all(value == false for value in checkedPlaylists.values());

    if (allSelected) {

        // deselect all
        for (var id = 0; id < Object.keys(checkedPlaylists).length; id++) {
            var p = "playlist" + (id+1);
            var pl = document.getElementById(p);
            pl.style.background = unselectedColor;
            checkedPlaylists[p] = false;
        }
    
    } else {

        // select all

        for (var id = 0; id < Object.keys(checkedPlaylists).length; id++) {
            var p = "playlist" + (id+1);
            var pl = document.getElementById(p);
            pl.style.background = selectedColor;
            checkedPlaylists[p] = true;
        }

    }




}

function findGenres() {

    var allPlaylistsUnselected = true;
    for (var id = 0; id < Object.keys(checkedPlaylists).length; id++) {
        var p = "playlist" + (id+1);
        if (checkedPlaylists[p] == true) {
            allPlaylistsUnselected = false;
        }
    }

    if (allPlaylistsUnselected) {
        alert("Please select some playlists.");
    } else {


        var p = "";
        for (var i=0; i < Object.keys(checkedPlaylists).length; i++) {
            var pl = document.getElementById("playlist" + (i+1));
            p = p + pl.id + "(" + checkedPlaylists[i] + ") ";
        }
        alert(p);




        // var p = "";
        // for (var i=0; i < Object.keys(checkedPlaylists).length; i++) {
        //     var pl = document.getElementById("playlist" + (i+1));
        //     p = p + pl.id + " ";
        // }
        // alert(p);




        // for (var i=0; i < Object.keys(checkedPlaylists).length; i++) {
        //     var pl = document.getElementById("playlist" + (i+1));
        //     if (checkedPlaylists[i]) {
        //         alert("CLICKED " +  pl.id);
        //     }
        // }



        // for each selected playlist
        // query the playlist from name?
        // query the songs in that playlist
        // query the genres of that song
        // add key:genreName -> value:songId to dict selectedSubgenres





        // add genre to 
        
        // dict genres { genreName : [song] }
        // if (d.hasOwnProperty(genreName)) {
        //     d[genreName] += 1;
        // } else {
        //     d[genreName] = 1;
        // }



        // populate dropdown with selected subgenres

        // let divElement = document.createElement('div');
        // divElement.classList.add('dropdown-content');
        // divElement.id = "genreDropdown";
    
        // let contentElement = '';
    
        // var subgenreNum = 1;
        // for (const [name, count] of Object.entries(selectedSubgenres)) {
    
        //     var id = "subgenre" + subgenreNum;
        //     // var x = pn+key;
        //     contentElement += '<li class="subgenreRow"><input type="checkbox" id="' + id + '" />' + name + ' (' + count + ')</label></li>';
        //     subgenreNum++;
        // }
    
        // divElement.insertAdjacentHTML('beforeend', contentElement);
    
        // let containerDiv = document.querySelector('.rowDropdowns');
        // containerDiv.appendChild(divElement);
    

        // make genres appear
        // var pl = document.getElementById("playlistLibrary");
        // pl.style.display = "none";
        // var gl = document.getElementById("genreLibrary");
        // gl.style.display = "block";



    }





}

function returnToPlaylists() {

    var pl = document.getElementById("playlistLibrary");
    pl.style.display = "block";

    var gl = document.getElementById("genreLibrary");
    gl.style.display = "none";

}

function createPlaylist() {

    //document.getElementById("profileIcon2").src = "photos/profileImage.png";

    // check if any clicked
    var allSubgenresUnclicked = true;
    for (var i = 0; i < Object.keys(subgenres).length; i++) {
        var checkbox = document.getElementById("subgenre" + (i+1));
        if (checkbox.checked == true) {
            allSubgenresUnclicked = false;
        } 
    }

    if (allSubgenresUnclicked) {
        alert("Please select some genres.");
    } else {
        window.location.href = "customize.html";




















    }

















   



}

window.onclick = function(e){
    let sModal = document.querySelector(".settings-modal")
    if(e.target == sModal){
        sModal.style.display = "none"
    }
}

function reportWindowSize() {
    let sModal = document.querySelector(".settings-modal")
    sModal.style.display = "none"
}
window.addEventListener('resize', reportWindowSize);




var profileImage = "photos/emptyPlaylist.png";
var userName = "...";


function loadPlaylists() {





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

        //here is where I print out the user information
        userInfo.onsuccess = function(e) {
            console.log(userInfo.result);
        }

        px.oncomplete = function() { //using this function to access all the user and playlist data
            db.close();
            console.log("Playlist data has been accessed")
            console.log(userInfo.result.Name);
                // get user info
            console.log("hello");
            profileImage = userInfo.result.Picture;
            var x = document.getElementsByClassName('profileIcon');
            for (var i = 0; i < x.length; ++i) {
                var item = x[i];  
                item.src = profileImage;
                // alert(item.name);
            }
            userName = userInfo.result.Name;
            var y = document.getElementsByClassName('username');
            for (var i = 0; i < y.length; ++i) {
                var item = y[i];  
                item.textContent = userName;
                // alert(item.name);
            }

        }

        })().catch(e => {
        console.error(e);
        });

    }

    






    // IF THAT DOESN'T WORK

    // // get user info
    // profileImage = "photos/profileImage.png";
    // var x = document.getElementsByClassName('profileIcon');
    // for (var i = 0; i < x.length; ++i) {
    //     var item = x[i];  
    //     item.src = profileImage;
    //     // alert(item.name);
    // }
    // userName = "seazhurr";
    // var y = document.getElementsByClassName('username');
    // for (var i = 0; i < y.length; ++i) {
    //     var item = y[i];  
    //     item.textContent = userName;
    //     // alert(item.name);
    // }










    // TODO: load playlistInfo into array x = [playlistInfo]


    

    // var x = document.getElementsByClassName("profileIcon");

    // document.getElementById("profileIcon1").src = profileImage;
    // document.getElementById("profileIcon2").src = profileImage;

    // // alert("profileImage set to: " + profileImage);

    // userName = "seazhurr";
    // document.getElementById("username1").textContent = userName;
    // document.getElementById("username2").textContent = userName;


    // get playlist info
    var playlistTitles = ["Liked Songs", "TikTok", "Afrobeats", "Mother", "Indie Pop", "Pfizer", "Blue", "Golden", "Chill", "Female Rap"];
    var playlistSongs = ["photos/liked.jpg", "photos/tiktok.jpg", "photos/afrobeats.jpg", "photos/mother.jpg", "photos/indiepop.jpg", "photos/pfizer.jpg", "photos/blue.jpg", "photos/golden.jpg", "photos/chill.jpg", "photos/femalerap.jpg"];
    // dict { songIDOrName : Playlist(Name,Pic,Genre) }

    for (var i = 0; i < playlistTitles.length; i++) {
        
        // var playlistNum = 1;
        var playlistTitle  = playlistTitles[i]; // 'photos/liked.jpg';
        var imageSource = playlistSongs[i]; // 'Liked Songs';
        
        let aElement = document.createElement('a');
        aElement.classList.add('playlist');
        var pn = "playlist" + (i+1);
        aElement.id = pn;

        aElement.onclick = function () {
            selectPlaylist(this)
        }
    
        let numberElement = '<p class="playlistNumber">' + (i+1) + '</p>'
        aElement.insertAdjacentHTML('beforeend', numberElement);
    
        let imageElement = '<img class="playlistCover" src="' + imageSource + '">'
        aElement.insertAdjacentHTML('beforeend', imageElement);
    
        let titleElement = '<p class="playlistTitle">' + playlistTitle + '</p>'
        aElement.insertAdjacentHTML('beforeend', titleElement);
    
        let containerDiv = document.querySelector('.rowPlaylists');
        containerDiv.appendChild(aElement);



        // add genre to 
        
        // dict genres { genreName : [song] }
        // if (d.hasOwnProperty(genreName)) {
        //     d[genreName] += 1;
        // } else {
        //     d[genreName] = 1;
        // }











        

        checkedPlaylists[pn] = false;

    }

    VanillaTilt.init(document.querySelectorAll(".playlist"), {
        // querySelectorAll
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });

    // TODO: change bio modal text

    // TODO: Make keys into strings when doing

    // get subgenre array or wtv






}



// function selectSubgenre(divObj) {

//     alert(divObj.attr("checked"));

// }

function selectAllGenres() {

    // check if all clicked
    var allSubgenresClicked = true;
    for (var i = 0; i < Object.keys(subgenres).length; i++) {
        var checkbox = document.getElementById("subgenre" + (i+1));
        if (checkbox.checked == false) {
            allSubgenresClicked = false;
        } 
    }

    if (allSubgenresClicked) {
        // uncheck all of the subgrenes in that dict
        for (var i = 0; i < Object.keys(subgenres).length; i++) {
            var checkbox = document.getElementById("subgenre" + (i+1));
            checkbox.checked = false;
            checkbox.style.checked = false;
            checkbox.setAttribute("checked", "false");
        }

    } else {

        for (var i = 0; i < Object.keys(subgenres).length; i++) {
            var checkbox = document.getElementById("subgenre" + (i+1));
            // alert("subgenre" + (i+1));
            checkbox.checked = true;
            checkbox.style.checked = true;
            checkbox.setAttribute("checked", "true");
        }

    }

}






function selectPlaylist(divObj) {

    var id = divObj.id;
    if (checkedPlaylists[id] == false) {
        // alert(checkedPlaylists[id]);
        divObj.style.background = selectedColor;
        checkedPlaylists[id] = true;
    } else {
        // alert(checkedPlaylists[id]);
        divObj.style.background = unselectedColor;
        checkedPlaylists[id] = false;
    }

}



/* ///////////////// */
/* C U S T O M I Z E */
/* ///////////////// */

function customize() {

    // use call to get user info again

    // // profileImage = "photos/profileImage.png";
    // var x = document.getElementsByClassName('profileIcon');
    // for (var i = 0; i < x.length; ++i) {
    //     var item = x[i];  
    //     item.src = profileImage;
    //     alert(item.name);
    // }
    // // userName = "seazhurr";
    // var y = document.getElementsByClassName('username');
    // for (var i = 0; i < y.length; ++i) {
    //     var item = y[i];  
    //     item.textContent = userName;
    //     alert(item.name);
    // }





    



    loadSongs();
}

function newPlaylist() {
    window.location.href = "create.html";
}

function addPlaylist() {
    alert("Adding to Your Spotify");
}

function loadSongs() {

    VanillaTilt.init(document.querySelector(".newPlaylistCover"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });

    var songTitles = ["Me, Myself and I", "BUENOS AIRES", "Show Me How", "Drive and Disconnect", "Saturn", "Savage Remix (feat. Beyoncé)", "Hold On", "Buttercup"];
    var songArtists = ["Beyoncé", "Nathy Peluso", "Men I Trust", "Nao", "RIZ LA VIE", "Beyoncé, Megan Thee Stallion", "Justin Beiber", "Jack Stauber"];
    var songDurations = ["5:01", "4:00", "3:35", "3:30", "3:28", "4:02", "2:50", "3:28"];
    var songImages = ["photos/IMG_7045.jpg", "photos/IMG_7046.jpg", "photos/IMG_7047.jpg", "photos/IMG_7044 2.jpg", "photos/IMG_7043.jpg", "photos/IMG_7041.jpg", "photos/IMG_7048.jpg", "photos/IMG_7040.jpg"];

    for (var i = 0; i < songTitles.length; i++) {

        var songTitle = songTitles[i];
        var songArtist = songArtists[i];
        var songDuration  = songDurations[i];
        var imageSource = songImages[i];
    
        let aElement = document.createElement('a');
        aElement.classList.add('song');
        aElement.id = i+1;

        aElement.onclick = function () {
            selectSong(this)
        }

        let numberElement = '<p class="songNumber">' + (i+1) + '</p>';
        aElement.insertAdjacentHTML('beforeend', numberElement);

        let imageElement = '<img class="songCover" src="' + imageSource + '">';
        aElement.insertAdjacentHTML('beforeend', imageElement);

        let infoElement = '<div class=songInfo><p class="songTitle">' + songTitle + '</p><p class="songArtist">' + songArtist + '</p></div>';
        aElement.insertAdjacentHTML('beforeend', infoElement);
            
        let timeElement = '<p class="songDuration">' + songDuration + '</p>';
        aElement.insertAdjacentHTML('beforeend', timeElement);

        let containerDiv = document.querySelector('.columnSongs');
        containerDiv.appendChild(aElement);

        checkedSongs.push(true);

    }

    // adjust time

    // adjust numPlaylists array vars for select all and others

    VanillaTilt.init(document.querySelectorAll(".song"), {
        // querySelectorAll
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });

}

function selectSong(divObj) {

    var id = divObj.id;
    if (checkedSongs[id] == false) {
        divObj.style.opacity = "1";
        checkedSongs[id] = true;
    } else {
        divObj.style.opacity = "0.1";
        checkedSongs[id] = false;
    }

}

/* /////////// */
/* L Y R I C S */
/* /////////// */

function returnHome() {
    window.history.back();
}

function playButtonPressed() {
    var icon = document.getElementById("playButton");
    if (icon.name == "play-outline") {
        icon.name = "pause-outline";
    } else {
        icon.name = "play-outline";
    }
}
