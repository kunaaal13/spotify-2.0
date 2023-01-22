
# Spotify Redesign

A spotify redesign using Next.js and TailwindCSS, with a focus on accessibility, performance and learning. User can get the playlists, top tracks, fav artists, playback(only premium users) functionality.


## Tech Stack

NextJs, Spotify web node API, Tailwind CSS, next auth, react icons(box icons mostly), Zustand, react-hot-toast.




## Features

- Get all playlist
- Get top tracks
- User's music library
- Playback (limited to spotify premium users only)
- Top tracks from fav artist.


## Screenshots

### Home Component

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

### Library Component

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

### Playlist Component

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXTAUTH_URL`

Sign up to a spotify developer account, create an app and fetch these variables.

`NEXT_PUBLIC_CLIENT_ID`

`NEXT_PUBLIC_CLIENT_SECRET`

This variable is for next auth.

`JWT_SECRET`


## Run Locally

Clone the project

```bash
  git clone https://github.com/kunaaal13/spotify-2.0.git
```

Go to the project directory

```bash
  cd spotify-2.0
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

