# playlist-from-mp3

Reads metadata from all .mp3 files in a folder and parses them into .txt file using template of choice.

## Installation

```sh
npm install
```


## Configuration

Create `.env` file and update variables with correct values:
```js
INPUT_FOLDER='/Users/user/music' // folder with mp3 files to read from
OUTPUT_FOLDER='/Users/user/playlists' // folder for storing .txt files with playlists
```

## Usage 

```sh
npm run start <TEMPLATE_NAME>
```


## Predefined templates
## `rs`
Example output: 

```
Helloween	If I Could Fly	The Dark Ride
Blue Öyster Cult	Sole Survivor	Fire of Unknown Origin
Bad Company	Live for the Music	Run with the Pack
```

## `facebook`

Example output: 
```
1. Helloween - If I Could Fly
2. Blue Öyster Cult - Sole Survivor
3. Bad Company - Live for the Music
```