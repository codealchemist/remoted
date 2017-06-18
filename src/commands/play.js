const request = require('request')
const Speaker = require('speaker')
const lame = require('lame')
const stream = require('youtube-audio-stream')

const url = process.argv.slice(2)[0]
if (!url) process.exit()

function mp3 () {
  console.log('Streaming MP3...')
  request.get(url)
    .pipe(new lame.Decoder())
    .pipe(new Speaker())
}

function youtube (url) {
  console.log('Streaming YouTube...')
  stream(url)
    .pipe(new lame.Decoder())
    .pipe(new Speaker())
}

function play (url) {
  if (url.match(/^https?:\/\/[www]*.?[youtube.com|youtu.be].*/)) {
    return youtube(url)
  }

  mp3()
}

play(url)
