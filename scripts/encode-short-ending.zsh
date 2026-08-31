#!/bin/zsh
# Approved Aug 30 revision. Originals and approved S03 derivatives are never overwritten.
set -eu
cd "${0:A:h}/.."
FF=/opt/homebrew/bin/ffmpeg
SRC='/Users/graysonchoate/Documents/Grounded Labs/wodapalooza-mexico'
"$FF" -n -v error -ss 1.9 -t 2.1 -i "$SRC/Other B-Roll/WP Crowd.mov" -ss 39 -t 7.129417 -i "$SRC/assets/video/WZA_MX_LOGO.mp4" -filter_complex '[0:v]fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[a];[1:v]fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1:a=0[v]' -map '[v]' -an -c:v libx264 -crf 19 -pix_fmt yuv420p -movflags +faststart media/loop/s02-crowd-zocalo.mp4
"$FF" -n -v error -i media/scrub/b09_floorwork.mp4 -vf 'trim=start_frame=241:end_frame=392,setpts=PTS-STARTPTS' -an -c:v libx264 -crf 19 -g 1 -bf 0 -pix_fmt yuv420p -movflags +faststart media/scrub/s04-barbell.mp4
"$FF" -n -v error -i media/scrub/b11_face.mp4 -vf 'trim=start_frame=8:end_frame=40,setpts=PTS-STARTPTS' -an -c:v libx264 -crf 19 -g 1 -bf 0 -pix_fmt yuv420p -movflags +faststart media/scrub/s06-confetti.mp4
"$FF" -n -v error -ss 0.625625 -i media/scrub/b12_city_landmarks.mp4 -vf 'scale=1280:720,setsar=1,setpts=PTS-STARTPTS' -an -c:v libx264 -crf 19 -g 1 -bf 0 -pix_fmt yuv420p -movflags +faststart media/scrub/s07-city-close.mp4
# Stop before the source monument lights switch off and the recorded fade to black.
"$FF" -n -v error -i media/scrub/b13_close.mp4 -t 1.5 -an -c:v copy -movflags +faststart media/scrub/s08-logo-close.mp4
for clip in s04-barbell s06-confetti s07-city-close; do
  "$FF" -n -v error -i "media/scrub/$clip.mp4" -frames:v 1 "media/poster/$clip.jpg"
done
"$FF" -n -v error -i media/loop/s02-crowd-zocalo.mp4 -frames:v 1 media/poster/s02-crowd-zocalo.jpg
