import cred

import json
import requests  # allows you to send HTTP requests
import time
import lyricsgenius
import re
import os
import spotipy

from spotipy.oauth2 import SpotifyOAuth
from pprint import pprint
from bs4 import BeautifulSoup

GENIUS_SEARCH_URL = "https://api.genius.com/search"
GENIUS_ACCESS_TOKEN = "Gieng5Q8bVsCX-QPOK4bLS9s4zM7ZDEzVWLyH0iMVZ2s3TN3vtAV-TPY9cCdanaO"

defaults = {
    "request": {"token": GENIUS_ACCESS_TOKEN, "base_url": "https://api.genius.com"},
    "message": {
        "search_fail": "The lyrics for this song were not found!",
    },
}

genius = lyricsgenius.Genius(GENIUS_ACCESS_TOKEN)


def get_new_lyrics():
    # open file in current directory
    __location__ = os.path.realpath(
        os.path.join(os.getcwd(), os.path.dirname(__file__))
    )
    filename = "lyrics.txt"
    lyrics_file = open(os.path.join(__location__, filename), encoding="utf8")

    lyrics = lyrics_file.read()

    lyrics_file.close()

    return lyrics


def update_lyrics():
    print("Updating lyrics...")

    filename = "lyrics.html"
    old_lyrics_filename = "old_lyrics.txt"

    # Get old lyrics
    base = os.path.dirname(
        os.path.abspath(old_lyrics_filename)
    )  # Gets absolute path of file excluding filename
    # Joins filename to path, needs to be done separately bc on windows, the drive
    # letter is not reset when an absolute path component is encountered
    address = os.path.join(base, old_lyrics_filename)
    old_lyrics_file = open(address, "r+", encoding="utf8")
    old_lyrics = old_lyrics_file.read()

    # Get new lyrics
    new_lyrics_str = get_new_lyrics()
    new_songname = new_lyrics_str.partition("\n")[0]

    # update/don't update lyrics files
    if old_lyrics.find(new_songname) != -1:
        # old lyrics are new lyrics are the same
        print("No update needed")
        return
    else:
        # open lyrics.html
        base = os.path.dirname(os.path.abspath(filename))
        address = os.path.join(base, filename)
        html = open(address)

        # parse html for classid
        soup = BeautifulSoup(html, "html.parser")
        old_lyrics = soup.find("p", {"class": "lyricsTextBox"})
        old_lyrics_str = old_lyrics.get_text()

        # update lyrics.html and old_lyrics.txt
        new_lyrics = old_lyrics.find(text=re.compile(old_lyrics_str)).replace_with(
            new_lyrics_str
        )

        old_lyrics_file.seek(0)
        old_lyrics_file.write(new_lyrics_str)
        old_lyrics_file.truncate()

        # Alter HTML file to see the changes done
        with open("lyrics.html", "wb") as f_output:
            f_output.write(soup.prettify("utf-8"))
        print("Done.")


# removes characters that cause errors like brackets
def remove_trouble(lyrics):
    # creating the regex pattern & use re.sub()
    # [\([{})\]] is a RE pattern for selecting
    # '{', '}', '[', ']', '(', ')' brackets.
    lyrics_new = re.sub(r"[/?\([{})\]*]", "", lyrics)

    return lyrics_new


# writes lyrics to a file
def write_lyrics_to_file(lyrics, song, artist):
    fname = "lyrics.txt"
    with open(fname, "w", encoding="utf-8") as f:
        f.write("{} by {}\n".format(song, artist))
        lyrics = remove_trouble(lyrics)
        f.write(lyrics)

    f.close()


# scraps genius song page for lyrics
def scrap_song_url(url):
    page = requests.get(url)
    html = BeautifulSoup(page.text, "html.parser")
    html_str = html.prettify()
    # remove script tags in middle of lyrics
    # [h.extract() for h in html("script")]
    lyrics = html.find("div", class_="Lyrics__Container-sc-1ynbvzw-6 lgZgEN").get_text()
    return lyrics


# searches genius response object for song lyrics
def print_lyrics(response, song_title, artist_name):
    json = response.json()
    remote_song_info = None

    # searches for song match based on primary artist name
    for hit in json["response"]["hits"]:
        if artist_name.lower() in hit["result"]["primary_artist"]["name"].lower():
            remote_song_info = hit
            break

    # search remote song object for genius url
    if remote_song_info:
        song_url = remote_song_info["result"]["url"]
        lyrics = scrap_song_url(song_url)
        genius_song = genius.search_song(song_title, artist_name)
        write_lyrics_to_file(genius_song.lyrics, song_title, artist_name)
    else:
        print(defaults["message"]["search_fail"])


# sends request to genius api for song results
def request_song_info(song_title, artist_names, access_token):
    data = {"q": song_title + " " + artist_names}

    response = requests.get(
        GENIUS_SEARCH_URL,
        data,
        headers={"Authorization": f"Bearer {access_token}"},
    )

    print_lyrics(response, song_title, artist_names)


# returns song information in dictionary format
def get_current_track():
    # Send authentication request
    scope = "user-read-currently-playing"

    sp = spotipy.Spotify(
        auth_manager=SpotifyOAuth(
            client_id=cred.client_id,
            client_secret=cred.client_secret,
            redirect_uri=cred.redirect_url,
            scope=scope,
        )
    )

    json_resp = sp.current_user_playing_track()

    # access json data
    track_id = json_resp["item"]["id"]
    track_name = json_resp["item"]["name"]
    # array of artist objects
    artists = [artist for artist in json_resp["item"]["artists"]]
    # join takes an array of artist names and joins each one with the ", " string
    artist_names = ", ".join([artist["name"] for artist in artists])

    primary_artist = artists[0]["name"]

    current_track_info = {
        "id": track_id,
        "track_name": track_name,
        "artists": primary_artist,
    }

    return current_track_info


def main():
    old_song_title = "poop"
    while True:
        current_track_info = get_current_track()
        pprint(
            current_track_info,
            indent=4,
        )
        values = list(current_track_info.values())

        song_title = values[1]
        artist_names = values[2]

        if old_song_title != song_title:
            request_song_info(song_title, artist_names, GENIUS_ACCESS_TOKEN)
            update_lyrics()
            old_song_title = song_title
        else:
            print("No update needed")
            time.sleep(2)


if __name__ == "__main__":
    main()
