import React, { Component } from "react";
// import "video.js/dist/video-js.css";
// import "./videojs/skins/treso/videojs.css";
// import "../../../../../../helpers/videojs/skins/shaka/videojs.css";

import videojs from "video.js";
import { myPlaylist } from "./dataplayer.js";
import "../../../../../../helpers/videojs/components/nuevo.js";
import "../../../../../../helpers/videojs/components/playlist.js";

export default class VideoJs extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // video properties

    const videoJsOptions = {
      controls: true,
      preload: "auto",
      playsinline: "true",
      crossorigin: "anonymous",
    };

    // initialize Video.js

    this.player = videojs(
      this.videoNode,
      videoJsOptions,
      function onPlayerReady() {
        
      }
    );

    // Nuevo plugin options

    const nuevoOptions = {
      logo: "//url-to-logo-image.png",
      logourl: "//url-to go on logo-click.com",
      contextMenu: false,
    };

    // Initialize Nuevo plugin

    this.player.nuevo(nuevoOptions);

    // Initialize playlist

    this.player.playlist(myPlaylist);
     
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div data-vjs-player>
        <video
          ref={(node) => (this.videoNode = node)}
          className="video-js vjs-fluid"
        />
      </div>
    );
  }
}
