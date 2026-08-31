# Historical reproduction recipe. Run from V3 root only when explicitly rebuilding derivatives.
# Existing outputs are not overwritten automatically. Requires original external MOVs.
#!/bin/zsh
set -e
ff=/opt/homebrew/bin/ffmpeg
src='/Users/graysonchoate/Documents/Grounded Labs/wodapalooza-mexico'
"$ff" -hide_banner -loglevel error -i "$src/Other B-Roll/WP Crowd.mov" -i media/scrub/mosaic-crowd-wza.mp4 -i "$src/Other B-Roll/Screen Recording 2026-08-25 at 12.33.43 AM.mov" -filter_complex '
[0:v]trim=start=1.9:duration=2.1,setpts=PTS-STARTPTS,fps=30,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p,split=2[c][head];
[head]trim=duration=0.133333,setpts=PTS-STARTPTS[h];
[1:v]trim=start=2.17:duration=0.766667,setpts=PTS-STARTPTS,fps=30,scale=1280:720,setsar=1,format=yuv420p[a];
[2:v]trim=start=5:duration=5.533333,setpts=PTS-STARTPTS,fps=30,crop=3420:1568:0:154,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p[b];
[c][a]xfade=transition=fade:duration=0.133333:offset=1.966667[ca];
[ca][b]xfade=transition=fade:duration=0.133333:offset=2.6[cab];
[cab][h]xfade=transition=fade:duration=0.133333:offset=8.0,trim=start=0.133333,setpts=PTS-STARTPTS[out]' -map '[out]' -an -frames:v 240 -c:v libx264 -crf 19 -preset fast -movflags +faststart media/loop/s02-crowd-city-08s.mp4
"$ff" -hide_banner -loglevel error -i media/loop/s02-crowd-city-08s.mp4 -frames:v 1 media/poster/s02-crowd-city-08s.jpg
"$ff" -hide_banner -loglevel error -i "$src/assets/video/guerrilla/STICKERS_03_V1.mov" -vf 'scale=720:1280,setsar=1' -an -frames:v 245 -r 30 -c:v libx264 -g 1 -crf 19 -preset fast -pix_fmt yuv420p -movflags +faststart media/scrub/s03-stickers-08s.mp4
"$ff" -hide_banner -loglevel error -i media/scrub/s03-stickers-08s.mp4 -frames:v 1 media/poster/s03-stickers-start.jpg
"$ff" -hide_banner -loglevel error -i media/scrub/s03-stickers-08s.mp4 -vf "select=eq(n\,244)" -frames:v 1 media/poster/s03-stickers-end.jpg
