export const myPlaylist = [
  {
    sources: [
      {
        src: "/assets/videos/1_how_to_get_help.mp4",
        // type: "application/x-mpegURL",
        type: "video/mp4",
      },
    ],
    title: "How To Get Help",
    thumb: "//path-to-video-thumb-1.jpg",
    duration: "01:50",
  },
  {
    sources: [
      {
        src: "/assets/videos/3_our_first_app.mp4",
        type: "video/mp4",
        res: "240",
        label: "240",
      },
      {
        src: "/assets/videos/3_our_first_app.mp4",
        type: "video/mp4",
        res: "480",
        label: "480p",
        default: true,
      },
      {
        src: "/assets/videos/3_our_first_app.mp4",
        type: "video/mp4",
        res: "720",
        label: "720p",
      },
    ],
    title: "Our First App",
    thumb: "//path-to-video-thumb-2.jpg",
    duration: "09:00",
  },
  {
    sources: [
      {
        src: "/assets/videos/5_critical_questions.mp4",
        // type: "audio/mp3",
        type: "video/mp4",
      },
    ],
    poster: "//path-to-background-poster.jpg",
    thumb: "//path-to-audio-thumb.jpg",
    duration: "03:00",
    // audioInfo: {
    //   cover: "//path-to-audio-cover.jpg",
    //   artist: "artist name",
    //   title: "Song title",
    //   album: "Album name",
    //   genre: "Pop",
    //   year: "2021",
    // },
    title: "Critical Questions",
    thumb: "//path-to-video-thumb-2.jpg",
    duration: "09:00",
  },
  // {
  //   sources: [
  //     {
  //       src: "path-to-media-playlist.m3u8",
  //       type: "application/x-mpegURL",
  //     },
  //   ],
  //   title: "Video #3 title",
  //   thumb: "path-to-video-thumb-3.jpg",
  //   duration: "11:00",
  // },
];
