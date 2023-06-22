/**
 * @license
 * Copyright (c) 2022 The Nuevodebel Team. All rights reserved.
 * Version 9.6.4
 */
import videojs from "video.js";
import document from "global/document";
const defaults = {
  infoSize: 18,
  zoomMenu: !0,
  rate: 1,
  pipButton: !0,
  relatedMenu: !0,
  settingsButton: !0,
  rateMenu: !0,
  hdicon: !0,
  shareMenu: !0,
  zoomInfo: !0,
  chapterMarkers: !0,
  contextMenu: !0,
  timetooltip: !1,
  captionsSettings: "undefined",
  mousedisplay: !0,
  errordisplay: !0,
  related: {},
  logoposition: "LT",
  logooffsetX: 10,
  logooffsetY: 10,
  logourl: "",
  url: "",
  title: "",
  description: "",
  embed: "",
  endAction: "",
  pubid: "",
  slideImage: "undefined",
  slideWidth: 160,
  slideHeight: 90,
  slideType: "vertical",
  limit: 0,
  limitmessage: "Watch full video on",
  resume: !1,
  video_id: "",
  playlistID: "undefined",
  playlistMaxH: "undefined",
  playlistUI: !0,
  playlistShow: !0,
  playlistAutoHide: !0,
  playlist: !1,
  contextText: "",
  contextUrl: "",
  currentSlide: "",
  infoIcon: "",
  target: "_blank",
  buttonRewind: !0,
  metatitle: "",
  metasubtitle: "",
  qualityMenu: !1,
  captionsSize: 1.25,
  tooltips: !0,
  singlePlay: !1,
  rewindforward: 10,
  snapshot: !1,
  snapshotType: "jpg",
  snapshotWatermark: "",
  ghostThumb: !1,
  minhd: 720,
  liveReconnect: !1,
  paused: !1,
  contextHTML: "",
  controlbar: !0,
  log: !1,
  iosFullscreen: "native",
  androidLock: !1,
};
var browser = videojs.browser;
if (browser.IS_ANDROID) {
  try {
    videojs.options.html5.vhs.overrideNative = !0;
  } catch (e) {}
  try {
    videojs.options.html5.hls.overrideNative = !0;
  } catch (e) {}
  videojs.options.html5.nativeAudioTracks = !1;
  videojs.options.html5.nativeTextTracks = !1;
}
function setSkin(e) {
  var s = "progressControl",
    t = "playToggle",
    i = "liveDisplay",
    n = "seekToLive",
    a = "currentTimeDisplay",
    o = "timeDivider",
    l = "durationDisplay",
    r = "customControlSpacer",
    d = "volumePanel",
    v = "chaptersButton",
    c = "descriptionsButton",
    u = "subsCapsButton",
    f = "audioTrackButton",
    h = "pictureInPictureToggle",
    j = "fullscreenToggle",
    p = null;
  "treso" === e
    ? (p = { children: [s, t, i, n, a, l, d, r, v, c, u, f, h, j] })
    : "chrome" === e
    ? (p = { children: [t, i, n, a, o, l, r, s, d, v, c, u, f, h, j] })
    : "party" === e
    ? (videojs.options.controlBar = {
        children: [t, i, n, s, a, o, l, r, d, v, c, u, f, h, j],
      })
    : "roundal" === e || "pinko" === e
    ? (p = {
        volumePanel: { inline: !1, vertical: !0 },
        children: [t, i, n, a, s, o, l, r, d, v, c, u, f, h, j],
      })
    : "shaka" === e
    ? (p = { children: [t, i, n, a, o, l, s, r, d, v, c, u, f, h, j] })
    : "flow" === e
    ? (p = { children: [t, i, n, a, s, l, r, v, c, u, f, h, d, j] })
    : "jwlike" === e
    ? (p = {
        volumePanel: { inline: !1, vertical: !0 },
        children: [s, t, i, n, d, a, o, l, r, v, c, u, f, h, j],
      })
    : "mockup" === e
    ? (p = { children: [s, t, d, i, n, a, o, l, r, v, c, u, f, h, j] })
    : "nuevo" === e &&
      (p = {
        volumePanel: { inline: !1, vertical: !0 },
        children: [t, i, n, a, o, s, l, r, d, v, c, u, f, h, j],
      });
  null !== p && (videojs.options.controlBar = p);
}
var sortByKey = function (e, s) {
    return e.sort(function (e, t) {
      var i = e[s],
        n = t[s];
      return i < n ? -1 : i > n ? 1 : 0;
    });
  },
  vjs_find = function (e, s) {
    try {
      return e.querySelector(s);
    } catch (e) {
      return !1;
    }
  },
  vjs_mfind = function (e, s) {
    try {
      return e.querySelectorAll(s);
    } catch (e) {
      return !1;
    }
  },
  vjs_El = function (e, s, t) {
    var i = document.createElement(e);
    void 0 !== s && "" !== s && (i.className = s);
    void 0 !== t && "" !== t && (i.innerHTML = t);
    return i;
  };
videojs.options.skin = "";
try {
  var vjs_skin = vjs_El("div"),
    doc = document.body;
  doc.appendChild(vjs_skin);
  var vjs_skins = [
    "nuevo",
    "chrome",
    "party",
    "treso",
    "roundal",
    "pinko",
    "jwlike",
    "shaka",
    "flow",
    "mockup",
  ];
  for (var k in vjs_skins) {
    vjs_skin.className = "vjs-" + vjs_skins[k];
    if (13 === vjs_skin.offsetWidth) {
      videojs.options.skin = vjs_skins[k];
      setSkin(vjs_skins[k]);
    }
  }
  doc.removeChild(vjs_skin);
} catch (e) {}
videojs.skin = function (e) {
  "" === videojs.options.skin && setSkin(e);
};
String.prototype.dg13 = function () {
  return this.replace(/[a-zA-Z]/g, function (e) {
    return String.fromCharCode(
      (e <= "Z" ? 90 : 122) >= (e = e.charCodeAt(0) + 13) ? e : e - 26
    );
  });
};
var doms = [
    "zbp.nybbpfq",
    "gfbuynpby",
    "rupnp",
    "bv.acqp",
    "zbp.avofw",
    "gra.yyrufw",
    "ccn.ofp",
    "kboqanfrqbp",
  ],
  initPlugin = function (e, s) {
    var t = videojs.dom,
      i = e.el(),
      n = videojs.mergeOptions(defaults, s);
    n.skin = videojs.options.skin;
    !1 === n.log && videojs.log.level("off");
    var a = function () {
      if (matchMedia("(pointer:fine)").matches) {
        i.classList.add("has-mouse");
        return !0;
      }
      return !1;
    };
    a();
    var o,
      l,
      r,
      d,
      v = 0,
      c = 0,
      u = 0,
      f = 0,
      h = 0,
      p = 1;
    e.shadowSlide = n.ghostThumb;
    var m,
      g,
      y,
      b,
      C,
      _,
      x = ">vid/<deretsiger ton tcudorP>'ncl-sjv'=ssalc vid<",
      k = !1,
      w = !1,
      A = !1,
      I = e.$(".vjs-tech"),
      T = [],
      M = vjs_find(i, ".vjs-big-play-button"),
      E = vjs_find(e.el_, ".vjs-loading-spinner"),
      H = vjs_find(i, ".vjs-control-bar");
    if (!0 === videojs.dispose) {
      e.qualities = [];
      e.qualityIndex = -1;
      if (
        "pseudo" === n.iosFullscreen &&
        videojs.browser.IS_IOS &&
        videojs.browser.IOS_VERSION > 9 &&
        !e.el_.ownerDocument.querySelector(".bc-iframe")
      ) {
        e.tech_.el_.setAttribute("playsinline", "playsinline");
        e.tech_.supportsFullScreen = function () {
          return !1;
        };
      }
      e.on("fullscreenchange", (s) => {
        videojs.browser.IS_ANDROID &&
          n.androidLock &&
          e.isFullscreen() &&
          s.lockOrientationUniversal("landscape");
      });
      e.setQuality = function (s, t) {
        if (e.qualities.length && "boolean" == typeof t) {
          e.qualities[s].enabled = t;
          if (e.tech_.vhs) {
            e.tech_.vhs.representations()[s].enabled(t);
          }
        }
      };
      if (!0 !== n.controlbar) {
        t.addClass(i, "vjs-controls-none");
        I.addEventListener("touchstart", function (s) {
          s.stopPropagation();
          e.paused() ? e.play() : e.pause();
        });
      }
      if (!0 !== n.errordisplay) {
        var S = vjs_find(i, ".vjs-error-display");
        t.addClass(S, "abs-hidden");
      }
      e.video_id = function () {
        for (var s = e.currentSources(), t = 0; t < s.length; t++)
          if (void 0 !== s[t].video_id) {
            n.video_id = s[t].video_id;
            break;
          }
        return n.video_id || null;
      };
      e.forward = function () {
        var s = e.duration(),
          t = e.currentTime();
        if (s > 0) {
          var i = t + n.rewindforward;
          i > s ? e.currentTime(s) : e.currentTime(i);
        }
      };
      e.rewind = function () {
        if (e.duration() > 0) {
          var s = e.currentTime() - n.rewindforward;
          s < 0 && (s = 0);
          e.currentTime(s);
        }
      };
      e.related = function () {
        if (
          n.settingsButton &&
          n.related.length > 1 &&
          n.relatedMenu &&
          !0 !== e.seeking()
        ) {
          g && t.addClass(g, "vjs-hidden");
          t.removeClass(vjs_find(i, ".vjs-menu-settings"), "vjs-lock-showing");
          t.addClass(M, "vjs-hidden");
          t.removeClass(y, "vjs-hidden");
          Ae();
          try {
            t.addClass(i, "vjs-def");
          } catch (e) {}
          e.pause();
        }
      };
      e.snapshot = function () {
        var e = i.querySelector("video"),
          s = e.videoWidth,
          t = e.videoHeight,
          a = t / s;
        if (document.getElementById("snap")) {
          var o = document.getElementById("snap");
          o.parentNode.removeChild(o);
        }
        var l = document.createElement("canvas");
        l.id = "snap";
        l.style.position = "absolute";
        l.style.left = "-10000px";
        l.style.top = "0";
        document.body.appendChild(l);
        var r,
          d = l.getContext("2d");
        if (
          (browser.IS_ANDROID ||
            browser.IS_IPAD ||
            browser.IS_IPHONE ||
            browser.IS_IPD) &&
          s > 640
        ) {
          t = parseInt(640 * a, 10);
          s = 640;
        }
        l.width = s;
        l.height = t;
        d.fillRect(0, 0, s, t);
        d.drawImage(e, 0, 0, s, t);
        if ("" !== n.snapshotWatermark && n.snapshotWatermark.length > 2) {
          var v = n.snapshotWatermark;
          d.font = s < 641 ? "16px verdana" : "24px verdana";
          var c = d.measureText(v).width;
          d.globalAlpha = 0.5;
          d.fillStyle = "white";
          d.fillText(v, s - c - 10, t - 20);
          d.fillStyle = "black";
          d.fillText(v, s - c - 10 + 2, t - 20 + 2);
        }
        var u = "snapshot.jpg";
        if ("png" === n.snapshotType) {
          u = "snapshot.png";
          r = l.toDataURL("image/png");
        } else r = l.toDataURL("image/jpeg", 0.9);
        var f = document.createElement("a");
        f.href = r;
        f.download = u;
        document.body.appendChild(f);
        window.setTimeout(function () {
          f.click();
        }, 200);
      };
      e.share = function () {
        if (n.settingsButton && n.shareMenu && !0 !== e.seeking()) {
          y && t.addClass(y, "vjs-hidden");
          t.removeClass(vjs_find(i, ".vjs-menu-settings"), "vjs-lock-showing");
          var s = n.url || document.location.href,
            a = n.embed || "N/A";
          vjs_find(i, ".embed-code").value = a;
          vjs_find(i, ".perma").value = s;
          g && t.removeClass(g, "vjs-hidden");
          t.addClass(M, "vjs-hidden");
          try {
            t.addClass(i, "vjs-def");
          } catch (e) {}
          e.pause();
        }
      };
      !0 !== n.contextMenu &&
        i.addEventListener(
          "contextmenu",
          function (e) {
            e.preventDefault();
          },
          !1
        );
      try {
        vjs_find(i, ".vjs-custom-control-spacer").innerHTML = "";
      } catch (e) {}
      var L = e.addChild("button", {
        el: t.createEl(
          "button",
          { className: "vjs-replay-button" },
          {
            type: "button",
            title: e.localize("Replay"),
            "aria-disabled": "false",
          }
        ),
      });
      i.insertBefore(L.el_, M);
      L.el_.onclick = function () {
        e.play();
      };
      L.el_.ontouchstart = function (s) {
        s.stopImmediatePropagation();
        e.play();
      };
      var B = "pictureInPictureToggle",
        z = !0,
        q = vjs_find(i, ".vjs-picture-in-picture-control");
      if ("undefined" === q || null === q) {
        z = !1;
        B = "fullscreenToggle";
      }
      if (!document.pictureInPictureEnabled && z) {
        t.addClass(q, "vjs-hidden");
        B = "fullscreenToggle";
      }
      if (!0 !== n.pipButton && q) {
        t.addClass(q, "vjs-hidden");
        B = "flow" === n.skin ? "volumePanel" : "fullscreenToggle";
      }
      !0 !== n.pipButton && (I.disablePictureInPicture = !0);
      var P = e.controlBar.addChild("button", {
          el: t.createEl(
            "div",
            {
              className:
                "vjs-quality-button vjs-menu-button vjs-control vjs-button vjs-hidden",
            },
            {
              role: "button",
              "aria-haspopup": "true",
              "aria-expanded": "false",
            }
          ),
        }),
        D = e.controlBar.addChild("button", {
          el: t.createEl("div", {
            className: "vjs-control vjs-button vjs-cog-menu-button vjs-hidden",
          }),
        });
      H.insertBefore(P.el_, e.controlBar.getChild(B).el_);
      B = "flow" === n.skin ? P.el_ : e.controlBar.getChild(B).el_;
      H.insertBefore(D.el_, B);
      _ = D.el_;
      if (n.snapshot) {
        var N = e.controlBar.addChild("button", {
          el: t.createEl(
            "button",
            { className: "vjs-snap-control vjs-control vjs-button" },
            { type: "button" }
          ),
        });
        N.el_.innerHTML =
          '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text" aria-live="polite">' +
          e.localize("Snapshot") +
          "</span>";
        e.controlBar.el_.insertBefore(N.el_, D.el_);
        N.el_.onclick = function () {
          e.snapshot();
        };
        N.el_.ontouchstar = function (s) {
          s.stopImmediatePropagation();
          e.snapshot();
        };
      }
      if (n.controlbar) {
        var W = t.createEl("div", { className: "vjs-background-bar" });
        e.el_.insertBefore(W, H);
      }
      b = P.el_;
      var O =
        '<span class="quality-span vjs-no-pointer"></span><span class="vjs-control-text" aria-live="polite">' +
        e.localize("Quality") +
        '</span><div class="vjs-menu"><ul class="vjs-menu-content vjs-qlist" role="menu"></ul></div>';
      b.innerHTML = O;
      if (n.buttonForward) {
        n.buttonRewind && be(!0);
        var R = "vjs-forward-control";
        10 !== n.rewindforward && (R = "vjs-forward-control vjs-eforward");
        var U = e.controlBar.addChild("button", {
          el: t.createEl(
            "button",
            { className: R + " vjs-control vjs-button" },
            {
              title: e.localize("Forward"),
              type: "button",
              "aria-disabled": "false",
            }
          ),
        });
        U.el_.innerHTML =
          '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text" aria-live="polite">' +
          e.localize("Forward") +
          "</span>";
        "party" === n.skin && n.buttonRewind
          ? e.controlBar.el_.insertBefore(
              U.el_,
              vjs_find(i, ".vjs-rewind-control").nextSibling
            )
          : e.controlBar.el_.insertBefore(
              U.el_,
              e.controlBar.getChild("playToggle").el_.nextSibling
            );
        U.el_.onclick = function () {
          e.forward();
        };
        U.el_.ontouchstart = function () {
          e.forward();
        };
      } else n.buttonRewind && be();
      var F = t.createEl("div", { className: "vjs-vast-label" });
      F.innerHTML = e.localize("Advertisement");
      var K = "playToggle";
      "party" === n.skin && (K = "progressControl");
      "treso" === n.skin && (K = "volumePanel");
      H.insertBefore(F, e.controlBar.getChild(K).el_.nextSibling);
      if (n.theaterButton) {
        var Q = e.controlBar.addChild("button", {
          el: t.createEl(
            "div",
            {
              className:
                "vjs-control vjs-button vjs-control-button vjs-mode-control",
            },
            { "aria-live": "polite", "aria-disabled": "false" }
          ),
        });
        Q.el_.innerHTML =
          '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text" aria-live="polite">' +
          e.localize("Theater mode") +
          "</span>";
        H.insertBefore(Q.el_, e.controlBar.getChild("fullscreenToggle").el_);
        Q.el_.onclick = function (s) {
          s.preventDefault();
          var i = Q.el_;
          if (t.hasClass(i, "vjs-mode")) {
            t.removeClass(i, "vjs-mode");
            e.trigger("mode", "normal");
          } else {
            t.addClass(i, "vjs-mode");
            e.trigger("mode", "large");
          }
        };
      }
      var Y = vjs_El("div", "vjs-menu-settings"),
        Z = vjs_El("div", "vjs-menu-div vjs-settings-div");
      Y.appendChild(Z);
      var X = vjs_El("div", "vjs-submenu vjs-settings-home");
      Z.appendChild(X);
      var J = vjs_El("ul", "vjs-menu-content vjs-settings-list");
      X.appendChild(J);
      (C = t.createEl(
        "button",
        { className: "vjs-cog-button vjs-menu-button vjs-button" },
        {
          "aria-live": "polite",
          "aria-disabled": "false",
          "aria-expanded": "false",
        }
      )).innerHTML =
        '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-hd vjs-hidden">HD</span><span class="vjs-control-text" aria-live="polite">' +
        e.localize("Settings") +
        "</span>";
      _.appendChild(C);
      _.appendChild(Y);
      if (n.downloadButton) {
        var G = e.controlBar.addChild("button", {
          el: videojs.dom.createEl(
            "button",
            {
              className: "vjs-download-control vjs-control vjs-button",
              title: e.localize("Download"),
            },
            { type: "button", "aria-disabled": "false" }
          ),
        });
        H.insertBefore(G.el_, e.controlBar.getChild("fullscreenToggle").el_);
        G.el_.innerHTML =
          '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text" aria-live="polite">' +
          e.localize("Download") +
          "</span>";
        G.el_.onclick = function () {
          var s = e.video_id();
          e.trigger("downloadVideo", { source: e.currentSrc(), id: s });
        };
      }
      _e();
      var V = vjs_mfind(i, ".vjs-control"),
        $ = 0;
      for ($ = 0; $ < V.length; $++) V[$].removeAttribute("title");
      var ee = H.querySelectorAll(".vjs-button");
      for ($ = 0; $ < ee.length; $++) ee[$].removeAttribute("title");
      window.onresize = function (e) {
        _e();
        Ae();
        Ie();
        Ce("");
      };
      "" === n.title && (n.title = n.metatitle = document.title);
      "" === n.infoText && (n.infoText = n.metatitle);
      if (!n.timetooltip) {
        var se = vjs_find(i, ".vjs-play-progress"),
          te = vjs_find(se, ".vjs-time-tooltip");
        se && te && t.addClass(te, "vjs-abs-hidden");
      }
      try {
        n.mousedisplay ||
          t.addClass(vjs_find(i, ".vjs-mouse-display"), "vjs-abs-hidden");
      } catch (e) {}
      if (n.logocontrolbar) {
        var ie = vjs_El("img"),
          ne = !1;
        ie.src = n.logocontrolbar;
        ie.onload = (s) => {
          let t = s.target;
          t.width + t.height === 0 && (ne = !0);
          if (!0 !== ne) {
            var i = vjs_El("div", "vjs-logo-bar");
            if ("" !== n.logourl) {
              var a = vjs_El("a");
              a.href = n.logourl;
              a.target = n.target;
              n.logotitle && (a.title = n.logotitle);
              a.appendChild(ie);
              i.appendChild(a);
              i.style.cursor = "pointer";
            } else i.appendChild(ie);
            H.insertBefore(i, e.controlBar.getChild("fullscreenToggle").el_);
          }
        };
      }
      if (n.contextMenu) {
        var ae = vjs_El("div", "vjs-context-menu vjs-hidden"),
          oe = "";
        if ("" === n.contextText && "" === n.contextHTML) {
          n.contextText = "Cbjrerq ol Ahribqriry.pbz".dg13();
          n.contextUrl = "uggcf://jjj.ahribqriry.pbz/ahrib".dg13();
          oe =
            '<img src="data:image/gif;base64,R0lGODlhJwASAOZrAPr6+vb29vT09PX19ff39/Ly8ra2tv///+Hh4ebm5tPT09TU1Nzc3Nra2tnZ2dvb2+3t7cHBwX5+fmdnZzc3N0NDQzo6Oq+vr/z8/PDw8GRkZNLS0v39/ZmZmcXFxe7u7srKysjIyPPz83h4eP7+/vj4+Lu7u9/f39HR0XFxcfQAAMQAAHp6euvr6+np6dDQ0GxsbPwAAK0AAHl5eX9/f+fn5/gAAPkAAOIAAIEAALKysjY2Nry8vPHx8Z2dnejo6G5ubvsAAPUAAKIAAPn5+Xt7e7W1tYyMjGtra/oAANYAAGUAAOTk5P0AAOAAAIwAADQAAL0AAD0AAMPDw7GxsW9vb3JycpycnPv7+5qamuXl5U5OTvb396qqqrS0tLe3txQUFJ6enpGRkWVlZaGhoaampkhISJubm42NjXx8fE9PT////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAHoA2sALAAAAAAnABIAAAf/gAABAoSFhoQDh4WJhAEEAZAEBQZrlWsHmJmam5ydnQiWCQoLDKWmpwwNDg2oracPEJgRlhITlre3FBUWuL29FxgZGmsbHAEdvpYeHyCVICHJvSIEI2skmCUm0ScHKJWYKZYqK8kCJSxrHAcYmC3JLgcv3wcwljExKjK95jPpBxsgriWg0atGvHn1KsWwcSMGjhy3zKFTp2MHD3U9fOD6cfDSASD2bIgMImSIJQFEivgzUulID0websGT5xFJyCRClCyJWKKfOpaVWDA5wGGDpaE0MSVc0ySIkydQcPFbiYvbAReVFHRUailIFCm+JFLFNaXEgQFUHGw9UCXarRIDWKyMxXWlwAEsANZmcVsJAgktW+biksAOkzePBTIQ4DJgQInHkPMe6FKJAwYvbhdg4PClMpbPoEODJlCjC5hKYcSM4UumjJlKZ9AcmU279hE0adTw3c3bVyAAOw==" />';
          oe += "<span>" + n.contextText + "</span>";
          oe =
            '<ul><li><a class="ctxt" target="' +
            n.target +
            '" href="' +
            n.contextUrl +
            '">' +
            oe +
            "</a></li></ul>";
          re();
        } else if (n.contextHTML) {
          oe = n.contextHTML;
          re();
        } else if (n.contextIcon) {
          var le = vjs_El("img");
          le.src = n.contextIcon;
          le.onload = (e) => {
            let s = e.target;
            if (s.width + s.height > 0) {
              oe = '<img src="' + n.contextIcon + '" />';
              oe += "<span>" + n.contextText + "</span>";
              "" !== n.contextUrl &&
                (oe =
                  '<ul><li><a class="ctxt" target="' +
                  n.target +
                  '" href="' +
                  n.contextUrl +
                  '">' +
                  oe +
                  "</a></li>");
              if (n.contextItem)
                for (var t = 0; t < n.contextItem.length; t++)
                  oe += "<li>" + n.contextItem[t] + "</li>";
              oe += "</ul>";
              re();
            }
          };
          le.onerror = function () {
            oe = "<span>" + n.contextText + "</span>";
            "" !== n.contextUrl &&
              (oe =
                '<ul><li><a class="ctxt" target="' +
                n.target +
                '" href="' +
                n.contextUrl +
                '">' +
                oe +
                "</a></li>");
            if (n.contextItem)
              for (var e = 0; e < n.contextItem.length; e++)
                oe += "<li>" + n.contextItem[e] + "</li>";
            oe += "</ul>";
            re();
          };
        }
        function re() {
          ae.innerHTML = oe;
          e.el().appendChild(ae);
          var s;
          i.addEventListener("contextmenu", function (e) {
            clearTimeout(s);
            e.preventDefault();
            t.removeClass(ae, "vjs-hidden");
            var n = ae.offsetWidth,
              a = ae.offsetHeight,
              o = null,
              l = null;
            e.clientY && (o = e.clientY);
            e.clientX && (l = e.clientX);
            if (null !== o && null !== l) {
              var r = i.getBoundingClientRect(),
                d = o - r.top,
                v = l - r.left;
              d + a > i.offsetHeight && (d = i.offsetTop + i.offsetHeight - a);
              v + n > i.offsetWidth && (v = i.offsetWidth - n);
              ae.style.top = d + "px";
              ae.style.left = v + "px";
              s = setTimeout(function () {
                t.addClass(ae, "vjs-hidden");
              }, 3e3);
              window.onscroll = function (e) {
                t.addClass(ae, "vjs-hidden");
              };
              window.onclick = function (e) {
                t.addClass(ae, "vjs-hidden");
              };
            }
          });
        }
      }
      if (n.logo) {
        var de = vjs_El("img");
        de.src = n.logo;
        var ve = vjs_El("div", "vjs-logo");
        n.logomin && (ve.className = "vjs-logo vjs-logo-min");
        i.appendChild(ve);
        de.onload = (e) => {
          var s = e.target;
          if (s.width + s.height !== 0) {
            var t = n.logooffsetX,
              a = n.logooffsetY;
            if ("RT" === n.logoposition) {
              ve.style.right = t + "px";
              ve.style.top = a + "px";
            } else if ("LB" === n.logoposition) {
              ve.style.left = t + "px";
              ve.className += " vjs-logo-bottom";
            } else {
              ve.style.left = t + "px";
              ve.style.top = a + "px";
            }
            if ("" !== n.logourl) {
              var o = vjs_El("a");
              o.href = n.logourl;
              o.target = n.target;
              n.logotitle && (o.title = n.logotitle);
              o.appendChild(de);
              ve.appendChild(o);
            } else ve.appendChild(de);
          } else i.removeChild(ve);
        };
        de.onerror = function () {
          i.removeChild(ve);
        };
      }
      if ("treso" === n.skin) {
        var ce = vjs_find(i, ".vjs-current-time"),
          ue = vjs_find(i, ".vjs-duration");
        H.removeChild(ce);
        var fe = vjs_find(i, ".vjs-progress-control");
        fe.insertBefore(ce, fe.childNodes[0]);
        H.removeChild(ue);
        fe.appendChild(ue);
      }
      e.resetNuevo = function (s) {
        var a,
          o,
          l = [],
          r = [];
        xe();
        Ie();
        e.options_.sources.length > 0 && (r = l = e.options_.sources);
        try {
          vjs_find(
            i,
            ".vjs-quality-button .vjs-menu .vjs-menu-content"
          ).innerHTML = "";
          t.addClass(b, "vjs-hidden");
        } catch (e) {}
        var d = I;
        if (
          !0 !== browser.IS_IPHONE &&
          !0 !== browser.IS_ANDROID &&
          !0 !== browser.IS_IPOD
        )
          for (; d.firstChild; ) d.removeChild(d.firstChild);
        1 === l.length && e.src(l);
        if (l.length > 1) {
          var v = 0,
            c = 0,
            u = [],
            f = [],
            j = [],
            p = "",
            m = 0,
            g = 0,
            y = 0,
            _ = 0,
            x = 0,
            k = !1;
          for (v = 0; v < l.length; v++) (l[v].res || l[v].label) && c++;
          if (l.length >= 1) {
            n.dash = !1;
            n.hls = !1;
            var w = "MediaSource" in window,
              A = !1;
            (browser.IS_IPHONE || browser.IS_IPOD || browser.IS_IPAD) &&
              (A = !0);
            for (m = 0; m < r.length; m++) {
              var T = "";
              try {
                T = r[m].type;
              } catch (e) {}
              if (void 0 !== T) {
                if (
                  -1 !== T.indexOf("x-mpegURL") ||
                  -1 !== T.indexOf("apple")
                ) {
                  u[g] = r[m];
                  g++;
                }
                if (-1 !== T.indexOf("dash")) {
                  f[y] = r[m];
                  y++;
                }
              }
              if (r[m].res && r[m].label) {
                if (!0 !== k) {
                  k = !0;
                  o = {
                    res: r[m].res,
                    type: r[m].type,
                    src: r[m].src,
                    label: r[m].label,
                  };
                }
                let e = r[m].type;
                void 0 === e && (e = "");
                if (
                  -1 !== e.indexOf("mpeg") ||
                  -1 !== e.indexOf("apple") ||
                  -1 !== e.indexOf("dash")
                );
                else {
                  j[_] = r[m];
                  _++;
                }
              }
            }
          }
          var M = [];
          if ((u.length > 0 && (w || A)) || (f.length > 0 && w)) return;
          if (c < 2) return;
          M = (M = j).sort(Me);
          var E = "",
            H = " vjs-checked";
          E = ' class="item-quality"';
          H = ' class="item-quality vjs-checked"';
          for (m = 0; m < M.length; m++) {
            var S = M[m].res,
              L = parseInt(S, 10),
              B = "";
            if (n.hdicon && L > n.minhd - 1) {
              var z = "HD";
              L > 1079 && n.minhd < 1080 && (z = "FullHD");
              L > 2159 && (z = "4K");
              B = '<i class="vjs-hd-icon">' + z + "</i>";
            }
            if (M[m].default) {
              a = M[m];
              p +=
                "<li" +
                H +
                ' data-height="' +
                m +
                '">' +
                M[m].label +
                B +
                "</li>";
            } else
              p +=
                "<li" +
                E +
                ' data-height="' +
                m +
                '">' +
                M[m].label +
                B +
                "</li>";
            x++;
          }
          if (x > 1) {
            h = x;
            if (n.qualityMenu) {
              Ue();
              var q = vjs_find(i, ".vjs-menu-quality .vjs-menu-content");
              q.innerHTML = q.innerHTML + p;
              t.removeClass(vjs_find(i, ".vjs-extend-quality"), "vjs-hidden");
              t.removeClass(C, "vjs-hidden");
            } else {
              vjs_find(
                i,
                ".vjs-quality-button .vjs-menu .vjs-menu-content"
              ).innerHTML = p;
              t.removeClass(b, "vjs-hidden");
            }
            var P = vjs_mfind(i, ".item-quality");
            Ie();
            for (m = 0; m < P.length; m++) {
              var D = P[m],
                N = function (s) {
                  s.stopPropagation();
                  for (var i, n = 0; n < P.length; n++) {
                    t.removeClass(P[n], "vjs-checked");
                    P[n] === s.target && (i = n);
                  }
                  t.addClass(P[i], "vjs-checked");
                  var a = s.target.getAttribute("data-height");
                  Te(M[a].res, M[a].label);
                  var o = e.video_id();
                  e.trigger("resolutionchange", { id: o, res: M[a].res });
                  var l = M[a];
                  Se();
                  O(l);
                },
                W = !1;
              D.onclick = function (e) {
                N(e);
              };
              D.ontouchend = function (e) {
                !0 !== W && N(e);
              };
              D.ontouchstart = function (e) {
                W = !1;
              };
              D.ontouchmove = function (e) {
                W = !0;
              };
            }
            we();
            if (void 0 !== a || void 0 !== o)
              if (void 0 !== a && a !== o) {
                Te(a.res, a.label);
                e.src(a);
                e.load();
              } else if (void 0 !== o) {
                Te(o.res, o.label);
                e.src(o);
                e.load();
              }
            function O(s) {
              var t = e.currentTime(),
                i = e.paused();
              e.src(s);
              e.load();
              e.play();
              e.setRate(1);
              e.one("loadeddata", function () {
                t > 0 && e.currentTime(t);
                i && e.pause();
                1 !== n.rate && e.setRate(n.rate);
              });
              e.handleTechSeeked_();
              if (i) {
                var a = !0;
                e.one("playing", function () {
                  if (a) {
                    e.pause();
                    e.handleTechSeeked_();
                    a = !1;
                  }
                });
              }
            }
          }
        }
      };
      e.on("loadeddata", function () {
        if (t.hasClass(i, "vjs-ad-playing") || t.hasClass(i, "vjs-dai"))
          return !1;
        if (m) m = !1;
        else {
          f = 0;
          Le();
          qe();
          "AUDIO" === I.nodeName &&
            browser.IS_IOS &&
            t.addClass(vjs_find(i, ".vjs-subs-caps-button"), "vjs-hidden");
          n.is_audio = !1;
          if (e.currentType().indexOf("audio") > -1 || "AUDIO" === I.nodeName) {
            t.addClass(i, "vjs-audio");
            n.is_audio = !0;
          }
          Re();
          e.trigger("medialoaded");
          A = t.hasClass(i, "vjs-live");
          var s = [
              vjs_find(i, ".vjs-play-control"),
              vjs_find(i, ".vjs-fullscreen-control"),
              vjs_find(i, ".vjs-mute-control"),
            ],
            a = 0;
          for (a = 0; a < s.length; a++)
            s[a].onmouseover = function (e) {
              e.target.removeAttribute("title");
            };
          if (!0 !== n.tooltips) {
            var o = vjs_mfind(i, ".vjs-control-text");
            for (a = 0; a < o.length; a++) t.addClass(o[a], "vjs-hidden");
          }
          var l = vjs_mfind(i, ".vjs-menu-button-popup");
          for (a = 0; a < l.length; a++) {
            l[a].onclick = function (e) {
              r(e);
            };
            l[a].ontouchstart = function (e) {
              r(e);
            };
            l[a].onmousemove = function (e) {
              var s =
                vjs_find(e.target, ".vjs-menu") ||
                vjs_find(e.target.parentNode, ".vjs-menu");
              if (s)
                if (t.hasClass(s, "vjs-lock-showing"));
                else {
                  var i =
                    e.target.querySelector(".vjs-control-text") ||
                    e.target.parentNode.querySelector(".vjs-control-text");
                  i && i.removeAttribute("style");
                }
            };
            function r(e) {
              for (
                var s = i.querySelectorAll(".vjs-control-text"), t = 0;
                t < s.length;
                t++
              )
                s[t].removeAttribute("style");
              var a = vjs_find(e.target, ".vjs-control-text");
              "true" === e.target.getAttribute("aria-expanded")
                ? (a.style.opacity = "0")
                : a.removeAttribute("style");
              Ce(e.target);
              var o =
                  vjs_find(e.target, ".vjs-menu-content") ||
                  vjs_find(e.target.parentNode, ".vjs-menu-content"),
                l = 0;
              "treso" === n.skin && (l = -10);
              "shaka" === n.skin && (l = -5);
              "mockup" === n.skin && (l = 5);
              var r = i.offsetHeight - H.offsetHeight - 10 - l;
              o.style.maxHeight = r + "px";
            }
          }
          Ne();
          h = 0;
          e.qualities = [];
          e.currentIndex = -1;
          e.one("playing", c);
          e.on("levelsLoaded", c);
        }
        function d() {
          if (e.tech_.vhs) {
            var s = e.tech_.vhs,
              t = s.representations();
            if (t.length > 0) {
              for (a = 0; a < t.length; a++) {
                var i = t[a],
                  n = "vjs_" + a,
                  o = {
                    id: n,
                    index: n,
                    label: n,
                    width: i.width,
                    height: i.height,
                    bandwidth: i.bandwidth,
                    bitrate: i.bandwidth,
                    enabled: !1,
                  };
                o.enabled = v.bind(this, a);
                e.qualities.push(o);
              }
              e.on("mediachange", function () {
                if (e.tech_.vhs) {
                  var i = (s = e.tech_.vhs).playlists.media();
                  if (i) {
                    for (
                      var n = i.attributes.BANDWIDTH,
                        a = i.attributes.HEIGHT,
                        o = 0;
                      o < t.length && n !== t[o].bandwidth && a !== t[o].height;
                      o++
                    );
                    e.qualityIndex = o;
                    e.trigger("qualityChange");
                  }
                }
              });
            }
          }
        }
        function v(s, t) {
          if (e.qualities) {
            var i = e.tech_.vhs.representations();
            if ("boolean" == typeof t) {
              e.qualities[s].enabled = t;
              i[s].enabled(t);
            }
            return e.qualities[s].enabled;
          }
          return !1;
        }
        function c() {
          d();
          if (e.qualities.length > 0) {
            Ue();
            h = e.qualities.length;
            He(e.qualities);
            e.trigger("mediachange");
          }
        }
      });
      if (n.timetooltip) {
        var he = vjs_find(i, ".vjs-play-progress"),
          je = vjs_find(he, ".vjs-time-tooltip");
        je && (je.className = "vjs-time-tooltip");
      }
      if (n.mousedisplay) {
        var pe = vjs_find(i, ".vjs-mouse-display");
        pe && (pe.className = "vjs-mouse-display");
      }
      var me = vjs_find(i, ".vjs-info");
      me && i.removeChild(me);
      var ge = vjs_find(i, ".vjs-audio-info");
      ge && i.removeChild(ge);
      e.audioInfo = function () {
        return (
          !(!n.audioInfo || (!n.audioInfo.artist && !n.audioInfo.title)) &&
          n.audioInfo
        );
      };
      Be();
      ze();
      if (e.options_.sources.length > 0) {
        e.resetNuevo(!1);
        qe();
        Ne();
      }
      e.setRate = function (s) {
        try {
          if (parseFloat(s) > 0) {
            var a = s + "x";
            e.playbackRate(s);
            n.rate = s;
            for (
              var o = i.querySelectorAll(".vjs-speed"), l = 0;
              l < o.length;
              l++
            ) {
              t.removeClass(o[l], "vjs-checked");
              a === o[l].innerHTML && t.addClass(o[l], "vjs-checked");
            }
            "1" === s && (a = e.localize("Normal"));
            vjs_find(i, ".vjs-extend-speed span").innerHTML = a;
          }
        } catch (e) {}
      };
      e.setSource = function (s) {
        e.changeSource(s);
      };
      e.changeSource = function (s) {
        if (
          !t.hasClass(i, "vjs-ad-playing") &&
          !t.hasClass(i, "vjs-dai") &&
          !e.adPlaying &&
          s
        ) {
          "string" == typeof s && (s = { sources: [{ src: s }] });
          s.src && (s = { sources: [s] });
          if (s.sources) {
            var n = 1;
            e.paused() && (n = 2);
            e.changeSrc(s);
            if (2 === n) e.pause();
            else {
              e.load();
              e.one("canplay", function () {
                e.play();
              });
            }
          }
        }
      };
      e.changeSrc = function (s) {
        if (!t.hasClass(i, "vjs-ad-playing") && !t.hasClass(i, "vjs-dai")) {
          n.title = "";
          n.infoTitle = null;
          n.infoDescription = null;
          n.description = "";
          n.metatitle = "";
          n.metasubtitle = "";
          for (var a = e.remoteTextTracks(), o = a.length || 0; o--; )
            e.removeRemoteTextTrack(a[o]);
          var l = e.videoTracks();
          for (o = l.length - 1; o >= 0; o--) e.videoTracks().removeTrack(l[o]);
          var r = e.audioTracks();
          for (o = r.length - 1; o >= 0; o--) e.videoTracks().removeTrack(r[o]);
          if (s) {
            "string" == typeof s && (s = { sources: [{ src: s }] });
            s.src && (s = { sources: [s] });
            if (s.sources) {
              n.rate = 1;
              e.setRate(1);
              n.video_id = void 0;
              void 0 !== s.video_id && (n.video_id = s.video_id);
              void 0 !== s.audioInfo
                ? (n.audioInfo = s.audioInfo)
                : (n.audioInfo = null);
              void 0 !== s.slideImage
                ? (n.slideImage = s.slideImage)
                : (n.slideImage = "undefined");
              void 0 !== s.slideWidth && (n.slideWidth = s.slideWidth);
              void 0 !== s.slideHeight && (n.slideHeight = s.slideHeight);
              void 0 !== s.thumbnails
                ? (n.thumbnails = s.thumbnails)
                : (n.thumbnails = null);
              void 0 !== s.title && (n.metatitle = n.title = s.title);
              void 0 !== s.description &&
                (n.description = s.infoDescription = s.description);
              void 0 !== s.embed && (n.embed = s.embed);
              void 0 !== s.metatitle && (n.metatitle = s.metatitle);
              void 0 !== s.infoTitle && (n.infoTitle = s.infoTitle);
              void 0 !== s.infoDescription &&
                (n.infoDescription = s.infoDescription);
              void 0 !== s.infoUrl && (n.infoUrl = s.infoUrl);
              void 0 !== s.infoIcon && (n.infoIcon = s.infoIcon);
              void 0 !== s.subtitle && (n.metasubtitle = s.subtitle);
              void 0 !== s.metasubtitle && (n.metasubtitle = s.metasubtitle);
              void 0 !== s.url && (n.url = s.url);
              for (o = 0; o < s.sources.length; o++) {
                s.sources[o].metatitle ||
                  s.sources[o].title ||
                  (s.sources[o].metatitle = n.metatitle);
                !s.sources[o].metatitle &&
                  s.sources[o].title &&
                  (s.sources[o].metatitle = s.sources[o].title);
                s.sources[o].metasubtitle ||
                  s.sources[o].subtitle ||
                  (s.sources[o].metasubtitle = n.metasubtitle);
                !s.sources[o].metasubtitle &&
                  s.sources[o].subtitle &&
                  (s.sources[o].metasubtitle = s.sources[o].subtitle);
              }
              e.options_.sources = s.sources;
              e.captions = null;
              if (void 0 !== s.tracks) {
                a = s.tracks;
                for (o = 0; o < a.length; o++)
                  if (void 0 !== a[o].src && "captions" === a[o].kind) {
                    a[o].default && (a[o].mode = "showing");
                    a[o].language = a[o].srclang;
                  }
                a.length > 0 && (e.captions = a);
              }
              I = e.$(".vjs-tech");
              !0 !== n.pipButton && (I.disablePictureInPicture = !0);
              e.src(s.sources);
              setTimeout(function () {
                var a = vjs_find(i, ".vjs-poster"),
                  o = t.hasClass(i, "vjs-has-started");
                void 0 !== s.poster &&
                  (e.poster() && !0 !== o
                    ? e.poster(s.poster)
                    : e.poster() !== s.poster && e.poster(s.poster));
                t.removeClass(a, "vjs-hidden");
                n.firstplay = !0;
              }, 200);
              e.resetNuevo(!0, s);
              ze();
              Be();
              setTimeout(function () {
                if (void 0 !== s.tracks) {
                  for (var t = s.tracks, i = 0; i < t.length; i++)
                    if (void 0 !== t[i].src) {
                      if (t[i].default && "captions" === t[i].kind) {
                        t[i].mode = "showing";
                        e.currentTrack = t[i].src;
                      }
                      e.addRemoteTextTrack(t[i], !0).onload = (s) => {
                        "chapters" === s.target.kind && Ne();
                        if ("metadata" === s.target.kind) {
                          var n = e.textTracks().length;
                          e.textTracks()[n - 1].src = t[i].src;
                          Pe();
                        }
                      };
                    }
                } else if (void 0 !== s.track && void 0 !== s.track.src) {
                  "captions" === s.track.kind && (s.track.mode = "showing");
                  e.addRemoteTextTrack(s.track, !0).onload = (s) => {
                    "chapters" === s.target.kind && Ne();
                    if ("metadata" === s.target.kind) {
                      var n = e.textTracks().length;
                      e.textTracks()[n - 1].src = t[i].src;
                      Pe();
                    }
                  };
                }
              }, 200);
            }
          }
        }
      };
      e.loadTracks = function (s) {
        var t;
        Array.isArray(s) ? (t = s) : ((t = [])[0] = s);
        for (var i = !1, n = !1, a = e.textTracks(), o = 0; o < t.length; o++) {
          var l = t[o];
          if ("chapters" === l.kind)
            for (let s = 0; s < a.length; s++)
              if ("chapters" === a[s].kind) {
                e.remoteTextTracks().removeTrack(a[s]);
                break;
              }
          if (l.kind && l.src) {
            e.addRemoteTextTrack(l, !0).onload = (s) => {
              var t = s.target;
              if ("chapters" === t.kind && !0 !== i) {
                i = !0;
                Ne();
              }
              if ("metadata" === t.kind && !0 !== n) {
                n = !0;
                let s = e.textTracks().length;
                e.textTracks()[s - 1].src = t.src;
                Pe();
              }
            };
          }
        }
      };
      e.newPlaylist = function (s) {
        for (
          var t = vjs_find(i, ".vjs-vlist"),
            a = vjs_mfind(t, ".vjs-item"),
            o = 0;
          o < a.length;
          o++
        ) {
          a[o].onclick = null;
          a[o].ontouchstart = null;
          a[o].ontouchmove = null;
          a[o].ontouchend = null;
          t.removeChild(a[o]);
        }
        t.innerHTML = "";
        for ($ = 0; $ < s.length; $++) {
          var l = We(s[$], $);
          t.appendChild(l);
        }
        if ("undefined" === n.playlistID) {
          var r = vjs_El("div", "vjs-last");
          t.appendChild(r);
        }
        e.playlist.currentItem(0);
        e.changeSrc(s[0]);
        e.paused() ||
          e.one("canplay", function () {
            e.play();
          });
      };
      e.removeFromPlaylist = function (e) {
        if (n.playlist && n.playlistUI) {
          var s = vjs_find(i, ".vjs-vlist"),
            t = s.childNodes[e];
          s.removeChild(t);
          for (var a = 0; a < s.childNodes.length; a++)
            s.childNodes[a].setAttribute("data-id", a);
        }
      };
      e.addToPlaylist = function (e, s, t) {
        if (n.playlist && n.playlistUI) {
          var a,
            o = vjs_find(i, ".vjs-vlist"),
            l = o.childNodes.length;
          if ("number" == typeof t && "string" == typeof s) {
            if ("after" === s) {
              a = We(e, t + 1);
              o.insertBefore(a, o.childNodes[t].nextSibling);
            } else if ("before" === s) {
              a = We(e, t);
              o.insertBefore(a, o.childNodes[t]);
            }
            for (var r = 0; r < o.childNodes.length; r++)
              o.childNodes[r].setAttribute("data-id", r);
          } else {
            a = We(e, l - 1);
            o.insertBefore(a, o.childNodes[l - 2].nextSibling);
          }
        }
      };
      e.on("playlistready", function () {
        n.playlistRepeat && e.playlist.repeat(!0);
        Oe();
      });
      e.ready(function () {
        w = !1;
        e.on("dispose", function () {
          w = !0;
        });
        function s(e) {
          e.stopImmediatePropagation();
          Ce(e.target);
        }
        window.onclick = function (e) {
          s(e);
        };
        var o = {
          backgroundColor: "#000",
          backgroundOpacity: "0",
          edgeStyle: "raised",
          fontPercent: 1.25,
        };
        "undefined" !== n.captionsSettings && (o = n.captionsSettings);
        var l = e.textTrackSettings;
        l.setValues(o);
        l.updateDisplay();
        vjs_find(i, ".vjs-text-track-display").style.zIndex = "1";
        var r = vjs_find(i, ".vjs-progress-holder"),
          d = vjs_find(r, ".vjs-play-progress"),
          u = vjs_find(i, ".vjs-progress-control");
        function j(s) {
          if (A);
          else {
            s.preventDefault();
            s.stopPropagation();
            t.addClass(M, "vjs-hidden");
            t.addClass(E, "vjs-hidden");
            var i = r.getBoundingClientRect(),
              n = (s.pageX - i.left) / r.offsetWidth;
            videojs.holderdown = !0;
            d.style.width = (100 * n).toFixed(2) + "%";
            document.addEventListener("mousemove", b, !1);
            document.addEventListener("mouseup", x, !1);
            e.trigger("progressdown");
          }
        }
        function m(e) {
          e = e < 0 ? 0 : e;
          let s = Math.floor(e % 60),
            t = Math.floor((e / 60) % 60),
            i = Math.floor(e / 3600);
          if (isNaN(e) || e === 1 / 0) return "";
          t < 10 && (t = "0" + t);
          s < 10 && (s = "0" + s);
          return (i = i > 0 ? i + ":" : "") + t + ":" + s;
        }
        function b(s) {
          s.preventDefault();
          s.stopPropagation();
          var t = r.getBoundingClientRect(),
            i = s.pageX - t.left,
            n = i / r.offsetWidth;
          n < 0 && (n = 0);
          n > 1 && (n = 1);
          d.style.width = (100 * n).toFixed(2) + "%";
          var a = e.duration() * n;
          e.currentTime(a);
          var o = vjs_find(r, ".vjs-mouse-display");
          if (o) {
            i < 0 && (i = 0);
            i > r.offsetWidth && (i = r.offsetWidth);
            o.style.left = i + "px";
            var l = m(a);
            vjs_find(o, ".vjs-time-tooltip").innerHTML = l;
          }
          var v = new Event("mousemove", { bubbles: !1, cancelable: !1 });
          r.dispatchEvent(v);
          u.dispatchEvent(v);
        }
        function x(s) {
          videojs.holderdown = !1;
          document.removeEventListener("mousemove", b);
          document.removeEventListener("mouseup", x);
          var i = r.getBoundingClientRect(),
            n = (s.pageX - i.left) / r.offsetWidth;
          n < 0 && (n = 0);
          n > 1 && (n = 1);
          d.style.width = (100 * n).toFixed(2) + "%";
          var a = e.duration() * n;
          e.currentTime(a);
          var o = new Event("mouseout", { bubbles: !1, cancelable: !1 });
          r.dispatchEvent(o);
          u.dispatchEvent(o);
          e.trigger("progressup");
          t.removeClass(M, "vjs-hidden");
          t.removeClass(E, "vjs-hidden");
        }
        r.addEventListener("mousedown", j, !1);
        e.on("timeupdate", function () {
          if (t.hasClass(i, "vjs-ad-playing") || t.hasClass(i, "vjs-dai"))
            return !1;
          var s = e.video_id(),
            a = e.currentTime(),
            o = e.duration();
          if (0 !== o && o !== 1 / 0 && n.resume && null != s) {
            a = a.toFixed(2);
            var l = String("vjs_resume-" + s);
            a > 10 && a < o - 30 && a - f > 10 && Ye(l, a);
            if (a > o - 10)
              try {
                localStorage.removeItem("vjs_resume-" + s);
              } catch (e) {}
          }
        });
        e.on("volumechange", function () {
          e.volume() > 0 && Ye("volume", e.volume());
        });
        e.on("seeked", function () {
          if (t.hasClass(i, "vjs-ad-playing") || t.hasClass(i, "vjs-dai"))
            return !1;
          f = e.currentTime();
        });
        e.on("ended", function () {
          if (
            t.hasClass(i, "vjs-ad-playing") ||
            t.hasClass(i, "vjs-dai") ||
            t.hasClass(i, "vjs-up-next")
          )
            return !1;
          var s = !0;
          t.addClass(M, "vjs-hidden");
          if (n.playlist) {
            s = !1;
            e.playlist.currentIndex() === e.playlist.lastIndex() &&
              !0 !== e.playlist.repeat &&
              (s = !0);
          }
          if (s) {
            var a = e.video_id();
            if (n.resume && null != a)
              try {
                localStorage.removeItem(String("vjs_resume-" + a));
              } catch (e) {}
            "" !== n.endAction
              ? n.settingsButton && "share" === n.endAction && n.shareMenu
                ? e.share()
                : n.settingsButton &&
                  "related" === n.endAction &&
                  n.relatedMenu &&
                  n.related.length > 1 &&
                  e.related()
              : t.removeClass(L.el_, "vjs-hidden");
          }
        });
        e.on("playing", function () {
          !0 !== a() && t.addClass(M, "vjs-abs-hidden");
          if (t.hasClass(i, "vjs-ad-playing") || t.hasClass(i, "vjs-dai"))
            return !1;
          y && t.addClass(y, "vjs-hidden");
          g && t.addClass(g, "vjs-hidden");
          t.removeClass(M, "vjs-hidden");
          t.removeClass(M, "vjs-abs-hidden");
          t.removeClass(E, "vjs-hidden");
          t.removeClass(E, "vjs-abs-hidden");
          (e.remoteTextTracks ? e.remoteTextTracks() : []).length < 1 &&
            browser.IS_IOS &&
            t.addClass(vjs_find(i, ".vjs-subs-caps-button"), "vjs-hidden");
        });
        e.on("pause", function (e) {
          n.paused = !0;
          t.removeClass(M, "vjs-no-pointer");
          var s = vjs_find(i, ".vjs-tech-chromecast");
          browser.IS_ANDROID ||
            browser.IS_IOS ||
            (s
              ? t.addClass(M, "vjs-abs-hidden")
              : t.removeClass(M, "vjs-abs-hidden"));
        });
        e.on("userinactive", function () {
          !0 !== e.paused() && Ce("");
        });
        e.on("contentupdate", function () {
          var e = I;
          e.style.top = "0";
          e.style.left = "0";
          e.style.transform = "scale(1)";
          e.style.webkitTransform = "scale(1)";
          e.style.msTransform = "scale(1)";
          p = 1;
        });
        e.on("canplaythrough", function () {
          if (videojs.ima) return !1;
          browser.IS_IOS && Le();
        });
        e.reconnect = function () {
          var s = e.currentSource();
          e.poster("");
          e.src(s);
          e.play();
        };
        e.on("play", function () {
          if (t.hasClass(i, "vjs-ad-playing") || t.hasClass(i, "vjs-dai"))
            return !1;
          var s = t.hasClass(i, "vjs-live");
          n.paused && s && n.liveReconnect && e.reconnect();
          n.paused = !1;
          if (n.singlePlay) {
            var o = vjs_mfind(document, "video");
            if (o.length > 1)
              for (var l = 0; l < o.length; l++) {
                var r = e.$(".vjs-tech");
                o[l] !== r && o[l].pause();
              }
          }
          Re();
          t.addClass(M, "vjs-no-pointer");
          if (!k) {
            _e();
            k = !0;
            var d = vjs_find(i, ".vjs-info");
            if (d) {
              t.removeClass(d, "vjs-info-bottom");
              t.addClass(d, "vjs-info-top");
            }
            !0 !== n.is_audio &&
              t.addClass(vjs_find(i, ".vjs-poster"), "vjs-no-pointer");
            if (n.limit > 0 && (n.limiturl || "" !== n.url)) {
              var u = !1;
              e.on("timeupdate", function () {
                if (e.currentTime() > n.limit) {
                  e.pause();
                  t.addClass(M, "vjs-abs-hidden");
                  if (!0 !== u) {
                    n.limiturl || (n.limiturl = n.url);
                    u = !0;
                    var s = vjs_El("div", "vjs-limit-overlay"),
                      i = vjs_El("a", "vjs-limit");
                    i.href = n.limiturl;
                    i.target = n.target;
                    i.style.textDecoration = "none";
                    s.appendChild(i);
                    if (n.limitimage) {
                      var a = vjs_El("img");
                      a.src = n.limitimage;
                      a.onload = function () {
                        i.innerHTML = '<img src="' + n.limitimage + '" />';
                      };
                    } else o();
                    function o() {
                      var e = vjs_El("span");
                      e.innerHTML =
                        n.limitmessage + "<span>" + n.limiturl + "</span>";
                      i.appendChild(e);
                    }
                    e.el().appendChild(s);
                  }
                }
              });
            }
            localStorage &&
              localStorage.volume &&
              !0 !== e.muted() &&
              localStorage.volume > 0 &&
              e.volume(localStorage.volume);
            var f = !1;
            n.settingsButton &&
              (n.relatedMenu || n.shareMenu || n.rateMenu || n.zoomMenu) &&
              (f = !0);
            !0 !== f &&
              h > 1 &&
              n.qualityMenu &&
              t.removeClass(C, "vjs-hidden");
            if (f) {
              var j = "",
                m = !1,
                b = !1;
              n.shareMenu &&
                (j =
                  j +
                  '<li class="vjs-settings-item vjs-share-button">' +
                  e.localize("Share") +
                  '<span class="vjs-share-icon"></span></li>');
              n.relatedMenu &&
                n.related.length > 1 &&
                (j =
                  j +
                  '<li class="vjs-settings-item vjs-related-button">' +
                  e.localize("Related") +
                  '<span class="vjs-related-icon"></span></li>');
              if (n.zoomMenu) {
                j =
                  j +
                  '<li class="vjs-settings-item vjs-extend-zoom vjs-menu-forward">' +
                  e.localize("Zoom") +
                  '<span class="zoom-label">100%</span></li>';
                b = vjs_El(
                  "div",
                  "vjs-submenu vjs-zoom-menu vjs-hidden",
                  '<div class="vjs-settings-back vjs-zoom-return"><span>' +
                    e.localize("Zoom") +
                    '</span></div><div class="vjs-zoom-slider"><div class="vjs-zoom-back"></div><div class="vjs-zoom-level"></div></div><div class="vjs-zoom-reset">RESET</div>'
                );
              }
              if (n.rateMenu) {
                j =
                  j +
                  '<li class="vjs-settings-item vjs-extend-speed vjs-menu-forward">' +
                  e.localize("Speed") +
                  "<span>" +
                  e.localize("Normal") +
                  "</span></li>";
                m = vjs_El("div", "vjs-submenu vjs-menu-speed vjs-hidden");
                var x =
                    '<ul class="vjs-menu-content"><li class="vjs-settings-back">' +
                    e.localize("Speed") +
                    "</li>",
                  w = [0.25, 0.5, 1, 1.25, 1.5, 2];
                try {
                  e.playbackRates().length > 0 && (w = e.playbackRates());
                } catch (e) {}
                for (var A = 0; A < w.length; A++) {
                  var T = "vjs-speed";
                  1 === w[A] && (T = "vjs-speed vjs-checked");
                  x += '<li class="' + T + '">' + w[A] + "x</li>";
                }
                m = vjs_El(
                  "div",
                  "vjs-submenu vjs-menu-speed vjs-hidden",
                  (x += "</ul>")
                );
              }
              var E = vjs_find(i, ".vjs-settings-list");
              if ("" !== j) {
                E.innerHTML = j + E.innerHTML;
                var H = vjs_find(i, ".vjs-settings-div");
                m && H.appendChild(m);
                b && H.appendChild(b);
                t.removeClass(_, "vjs-hidden");
                we();
                Ie();
                var S = function (s) {
                    s.stopPropagation();
                    var t = s.target.innerHTML;
                    t = t.replace("x", "");
                    e.setRate(t);
                    Ce("");
                  },
                  L = i.querySelectorAll(".vjs-speed");
                for (A = 0; A < L.length; A++) {
                  let e = !1;
                  L[A].onclick = function (e) {
                    S(e);
                  };
                  L[A].ontouchmove = function (s) {
                    e = !0;
                  };
                  L[A].ontouchend = function (s) {
                    if (e) e = !1;
                    else {
                      S(s);
                      Ce("");
                    }
                  };
                }
              }
              if (n.related.length > 1 && n.relatedMenu) {
                var B = n.related.length;
                y = vjs_El("div");
                var z = '<div class="vjs-close-btn"></div>';
                a() &&
                  (z +=
                    '<div class="vjs-arrow vjs-arrow-prev vjs-disabled"><div class="vjs-prev"></div></div><div class="vjs-arrow vjs-arrow-next"><div class="vjs-next"></div></div>');
                y.innerHTML = z;
                y.className = "vjs-grid vjs-hidden";
                var q = vjs_El("p");
                q.innerHTML = e.localize("Related");
                var P = vjs_El("div", "vjs-related");
                !0 !== a() && (P.className = "vjs-related vjs-scroll");
                var D = i.offsetWidth,
                  N = 0.8 * D;
                !0 !== a() && (N = 0.9 * D);
                y.appendChild(q);
                y.appendChild(P);
                i.appendChild(y);
                var W = vjs_find(y, ".vjs-arrow-prev"),
                  O = vjs_find(y, ".vjs-arrow-next");
                if (a()) {
                  var R =
                    parseInt(vjs_find(i, ".vjs-prev").offsetWidth, 10) + 5;
                  W && (W.style.left = parseInt(P.style.left, 10) - R + "px");
                  O && (O.style.left = N + parseInt(P.style.left, 10) + "px");
                }
                var U = vjs_El("div", "rel-block rel-anim");
                P.appendChild(U);
                var F = n.related;
                v = 1;
                for (A = 0; A < B; A++) {
                  var K = vjs_El("div", "rel-parent"),
                    Q = vjs_El("div", "rel-item");
                  K.appendChild(Q);
                  U.appendChild(K);
                  Q.innerHTML =
                    '<a class="rel-url" target="' +
                    n.target +
                    '" href="' +
                    F[A].url +
                    '" alt="' +
                    F[A].title +
                    '"><span class="rel-bg" style="background-image:url(' +
                    F[A].thumb +
                    ');"></span><label>' +
                    F[A].title +
                    "</label><i>" +
                    F[A].duration +
                    "</i></a>";
                }
                if (B < 7 && a()) {
                  W && t.addClass(W, "vjs-hidden");
                  O && t.addClass(O, "vjs-hidden");
                }
                var Y = function (e) {
                  e.stopPropagation();
                  if (!t.hasClass(O, "vjs-disabled")) {
                    var s = P.offsetWidth;
                    v++;
                    t.removeClass(O, "vjs-disabled");
                    var i = (v - 1) * s;
                    U.style.left = "-" + i + "px";
                    v === c && t.addClass(O, "vjs-disabled");
                    t.removeClass(W, "vjs-disabled");
                  }
                };
                O &&
                  (O.onclick = function (e) {
                    Y(e);
                  });
                var Z = function (e) {
                  e.stopPropagation();
                  if (!t.hasClass(W, "vjs-disabled")) {
                    var s = vjs_find(i, ".vjs-related").offsetWidth,
                      n = ((v -= 1) - 1) * s;
                    vjs_find(i, ".rel-block").style.left = "-" + n + "px";
                    if (W && O) {
                      1 === v && t.addClass(W, "vjs-disabled");
                      t.removeClass(O, "vjs-disabled");
                    }
                  }
                };
                W &&
                  (W.onclick = function (e) {
                    Z(e);
                  });
                var X,
                  J = vjs_find(i, ".vjs-related-button");
                J.onclick = function (s) {
                  X = e.paused();
                  e.related();
                };
                J.ontouchstart = function (s) {
                  s.stopImmediatePropagation();
                  X = e.paused();
                  e.related();
                };
                y.onclick = function (s) {
                  t.addClass(y, "vjs-hidden");
                  t.removeClass(M, "vjs-hidden");
                  !0 !== X && e.play();
                };
              }
              if (n.shareMenu) {
                g = vjs_El("div", "vjs-sharing-overlay vjs-hidden");
                var G = vjs_El("div", "vjs-sharing-container"),
                  V = vjs_El("div", "vjs-sharing-body"),
                  $ = vjs_El("div", "vjs-close-btn vjs-share-close"),
                  ee =
                    '<div class="vjs-inputs-body"><h2>' +
                    e.localize("Link") +
                    '</h2><input type="text" readonly class="perma"><h2>' +
                    e.localize("Embed") +
                    '</h2><input class="embed-code" readonly type="text"></div>';
                ee +=
                  '<div class="vjs-inputs-body"><h2>' +
                  e.localize("Social") +
                  "</h2></div>";
                ee +=
                  '<div class="vjs-share-block"><i title="Facebook" id="share_facebook" class="vjs-share-icon nv vjs-facebook-square" role="button" aria-live="polite" tabindex="0"></i>';
                ee +=
                  '<i title="Twitter" id="share_twitter" class="vjs-share-icon nv vjs-twitter-square" role="button" aria-live="polite" tabindex="0"></i>';
                ee +=
                  '<i title="Pinterest" id="share_pinterest" class="vjs-share-icon nv vjs-pinterest-square" role="button" aria-live="polite" tabindex="0"></i>';
                ee +=
                  '<i title="LinkedIn" id="share_linkedin" class="vjs-share-icon nv vjs-linkedin-square" role="button" aria-live="polite" tabindex="0"></i></div>';
                V.innerHTML = ee;
                G.appendChild(V);
                g.appendChild($);
                g.appendChild(G);
                var se = n.url || document.location.href,
                  te = !1;
                e.el().appendChild(g);
                vjs_find(i, ".vjs-share-button").onclick = function (s) {
                  te = e.paused();
                  e.share();
                };
                var ie = [],
                  ne = function (e) {
                    var s = [];
                    for (var t in e)
                      s.push(
                        encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
                      );
                    return s.join("&");
                  },
                  ae = function (s) {
                    s.stopPropagation();
                    ie = {
                      url: se,
                      title: n.title || n.metatitle || document.title,
                      description:
                        e.localize("Check out this cool video on") +
                        " " +
                        n.url,
                      pubid: n.pubid || null,
                    };
                    var t = "";
                    switch (s.target.id.split("_")[1]) {
                      case "facebook":
                        t = "facebook";
                        break;
                      case "twitter":
                        t = "twitter";
                        break;
                      case "pinterest":
                        t = "pinterest";
                        break;
                      case "linkedin":
                        t = "linkedin";
                    }
                    window.open(
                      "http://api.addthis.com/oexchange/0.8/forward/" +
                        t +
                        "/offer?" +
                        ne(ie),
                      "AddThis",
                      "height=450,width=550,modal=yes,alwaysRaised=yes"
                    );
                  },
                  oe = i.querySelectorAll(".vjs-share-icon");
                for (A = 0; A < oe.length; A++)
                  oe[A].addEventListener("click", ae, !1);
                vjs_find(g, ".embed-code").onclick = function (e) {
                  e.stopImmediatePropagation();
                  this.select();
                };
                vjs_find(g, ".perma").onclick = function (e) {
                  e.stopImmediatePropagation();
                  this.select();
                };
                g.onclick = function (s) {
                  t.addClass(g, "vjs-hidden");
                  t.removeClass(M, "vjs-hidden");
                  !0 !== te && e.play();
                };
              }
              !0 !== a() && (n.zoomMenu = !1);
              if (n.zoomMenu) {
                var le,
                  re,
                  de,
                  ve,
                  ce = vjs_find(i, ".vjs-poster");
                if (n.zoomInfo) {
                  var ue = vjs_El("div", "vjs-zoom-parent vjs-hidden"),
                    fe = vjs_El("div", "vjs-reset-zoom");
                  fe.innerHTML = "100%";
                  ue.appendChild(fe);
                  var he = vjs_El("div", "vjs-reset-center"),
                    je = vjs_El("div", "vjs-reset-cancel");
                  ue.appendChild(he);
                  ue.appendChild(je);
                  var pe = vjs_El("div", "vjs-reset-info");
                  ue.appendChild(pe);
                  var me = vjs_El("div", "vjs-zoom-help vjs-hidden");
                  n.zoomWheel
                    ? (me.innerHTML =
                        '<div class="zoom-close">x</div><div>' +
                        e.localize("ZOOM HELP") +
                        "</div>" +
                        e.localize(
                          "Use ZOOM slider or mouse wheel to ZOOM in video."
                        ) +
                        "<div>" +
                        e.localize(
                          "Drag zoomed area using your mouse or a finger."
                        ) +
                        "</div>")
                    : (me.innerHTML =
                        '<div class="zoom-close">x</div><div>' +
                        e.localize("ZOOM HELP") +
                        "</div>" +
                        e.localize(
                          "Drag zoomed area using your mouse or a finger."
                        ) +
                        "</div>");
                  ue.appendChild(pe);
                  pe.onclick = function (e) {
                    ge(e);
                  };
                  function ge(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (t.hasClass(me, "vjs-hidden")) {
                      t.removeClass(me, "vjs-hidden");
                      t.addClass(M, "vjs-hidden");
                    }
                  }
                  vjs_find(me, ".zoom-close").onclick = function () {
                    ye();
                  };
                  function ye() {
                    t.addClass(me, "vjs-hidden");
                    t.addClass(me, "vjs-hidden");
                    t.removeClass(M, "vjs-hidden");
                  }
                  i.appendChild(me);
                  je.onmouseup = function () {
                    Ke();
                  };
                  he.onmouseup = function () {
                    Fe();
                  };
                  i.appendChild(ue);
                }
                var be = vjs_find(i, ".vjs-zoom-reset");
                be && be.addEventListener("mouseup", Ke, !1);
                var xe = e.el();
                xe.hasAttribute("tabIndex") ||
                  xe.setAttribute("tabIndex", "-1");
                if (n.zoomWheel) {
                  ce.style.pointerEvents = "auto";
                  ce.addEventListener("mousewheel", Ae, { passive: !1 });
                  ce.addEventListener("DOMMouseScroll", Ae, { passive: !1 });
                  function Ae(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var s = Math.max(
                      -1,
                      Math.min(1, e.wheelDelta || -e.detail)
                    );
                    (p = (100 * p + 20 * s) / 100) < 1 && (p = 1);
                    p > 5 && (p = 5);
                    if (1 === p) {
                      Ke();
                      n.zoomInfo && t.addClass(ue, "vjs-hidden");
                      t.removeClass(M, "vjs-hidden");
                    } else {
                      n.zoomInfo && t.removeClass(ue, "vjs-hidden");
                      Ze(I, p);
                      t.addClass(M, "vjs-hidden");
                    }
                    var a = vjs_find(i, ".vjs-zoom-menu");
                    if (!0 !== t.hasClass(a, "vjs-hidden")) {
                      var o = ((p - 1) / 4) * 100;
                      vjs_find(i, ".vjs-zoom-level").style.height = o + "%";
                      ke(100 * p);
                    }
                    return !1;
                  }
                }
                function Te(s) {
                  if (p > 1) {
                    s.preventDefault();
                    s.stopPropagation();
                    le = !0;
                    ve = e.$(".vjs-tech");
                    try {
                      de = [I.offsetLeft - s.clientX, I.offsetTop - s.clientY];
                    } catch (s) {}
                    try {
                      de = [
                        I.offsetLeft - s.touches[0].clientX,
                        I.offsetTop - s.touches[0].clientY,
                      ];
                    } catch (s) {}
                    ce.style.pointerEvents = "none";
                    document.addEventListener("mouseup", Ee, !0);
                    document.addEventListener("mousemove", Me, !0);
                  }
                }
                function Me(e) {
                  e.preventDefault();
                  if (le) {
                    try {
                      re = { x: e.clientX, y: e.clientY };
                    } catch (e) {}
                    var s = ve,
                      t = re.x + de[0],
                      n = re.y + de[1],
                      a = (i.offsetWidth / 2) * (p - 1),
                      o = (i.offsetHeight / 2) * (p - 1);
                    t > a && (t = a);
                    t < -1 * a && (t = -1 * a);
                    n > o && (n = o);
                    n < -1 * o && (n = -1 * o);
                    s.style.left = t + "px";
                    s.style.top = n + "px";
                  }
                }
                function Ee(e) {
                  ce.style.pointerEvents = "auto";
                  le = !1;
                  document.removeEventListener("mouseup", Ee, !0);
                  document.removeEventListener("mousemove", Me, !0);
                  e.preventDefault();
                  e.stopPropagation();
                }
                ce.onmousedown = function (e) {
                  Te(e);
                };
                function He(e, s) {
                  ce.style.pointerEvents = "auto";
                  var n = !1;
                  try {
                    n = e.pageY;
                  } catch (e) {}
                  if (!1 !== n) {
                    var a = s.offsetHeight,
                      o = n - Xe(s);
                    o > a && (o = a);
                    o < 0 && (o = 0);
                    var l = parseInt(100 - (o / a) * 100, 10);
                    l < 0 && (l = 0);
                    l > 100 && (l = 100);
                    try {
                      vjs_find(i, ".vjs-zoom-level").style.height = l + "%";
                    } catch (e) {}
                    try {
                      vjs_find(i, ".zoom-thumb").style.height = l + "%";
                    } catch (e) {}
                    var r = 1 + (4 * l) / 100;
                    p = r;
                    Ze(I, r);
                    ke(100 * r);
                    if (r > 1) {
                      videojs.options.blockKeys = !0;
                      t.removeClass(
                        vjs_find(i, ".vjs-zoom-parent"),
                        "vjs-hidden"
                      );
                      t.addClass(M, "vjs-hidden");
                    } else {
                      Ke();
                      videojs.options.blockKeys = !1;
                      t.addClass(vjs_find(i, ".vjs-zoom-parent"), "vjs-hidden");
                      t.removeClass(M, "vjs-hidden");
                    }
                  }
                }
                var Se = vjs_find(i, ".vjs-zoom-slider");
                Se.onclick = function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  e.stopImmediatePropagation();
                };
                Se.addEventListener("mousedown", Le, !1);
                function Le(e) {
                  e.preventDefault();
                  e.stopImmediatePropagation();
                  Je(!0);
                  var s = vjs_find(i, ".vjs-zoom-slider");
                  He(e, s);
                  document.addEventListener("mousemove", t, !1);
                  document.addEventListener("mouseup", n, !1);
                  function t(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    He(e, s);
                  }
                  function n(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    Je(!1);
                    document.removeEventListener("mouseup", n);
                    document.removeEventListener("mousemove", t);
                  }
                }
              }
            }
          }
        });
        e.trigger("nuevoReady");
      });
      if (n.mirrorButton) {
        e.controlBar.mirrorButton = e.controlBar.addChild("button", {
          el: t.createEl(
            "div",
            {
              text: "Mirror view",
              className: "vjs-mirror-button vjs-control vjs-button",
            },
            { role: "button", "aria-live": "polite", "aria-disabled": "false" }
          ),
        });
        e.controlBar.mirrorButton.el_.innerHTML =
          '<span class="vjs-control-text" aria-live="polite">' +
          e.localize("Mirror View") +
          "</span>";
        e.controlBar.el_.insertBefore(e.controlBar.mirrorButton.el_, D.el_);
        var ye = function (e) {
          e.preventDefault();
          var s = i.className,
            n = !1;
          s.indexOf("vjs-has-started") > 0 && (n = !0);
          s.indexOf("vjs-ended") > 0 && (n = !1);
          if (n)
            if (t.hasClass(e.target, "vjs-mirrored")) {
              t.removeClass(e.target, "vjs-mirrored");
              var a = "rotateY(0)";
              I.style.transform = a;
              I.style.webkitTransform = a;
              I.style.msTransform = a;
            } else {
              t.addClass(e.target, "vjs-mirrored");
              var o = "rotateY(180deg)";
              I.style.transform = o;
              I.style.webkitTransform = o;
              I.style.msTransform = o;
            }
        };
        vjs_find(i, ".vjs-mirror-button").onclick = function (e) {
          ye(e);
        };
      }
      i.style.visibility = "visible";
      !0 !== videojs.nuevo && e.el_.parentNode.removeChild(e.el_);
    } else i.innerHTML = x.split("").reverse().join("");
    function be(s) {
      var i = "vjs-rewind-control";
      s && (i = "vjs-rewind-control vjs-rewind-first");
      10 !== n.rewindforward &&
        (i = "vjs-rewind-control vjs-erewind vjs-rewind-first");
      var a = e.controlBar.addChild("button", {
        el: t.createEl(
          "button",
          { className: i + " vjs-control vjs-button" },
          {
            title: e.localize("Rewind"),
            type: "button",
            "aria-disabled": "false",
          }
        ),
      });
      a.el_.innerHTML =
        '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text" aria-live="polite">' +
        e.localize("Rewind") +
        "</span>";
      s
        ? "party" === n.skin
          ? H.insertBefore(
              a.el_,
              e.controlBar.getChild("playToggle").el_.nextSibling
            )
          : H.insertBefore(a.el_, e.controlBar.getChild("playToggle").el_)
        : e.controlBar.el_.insertBefore(
            a.el_,
            e.controlBar.getChild("playToggle").el_.nextSibling
          );
      a.el_.onclick = function () {
        e.rewind();
      };
      a.el_.ontouchstart = function () {
        e.rewind();
      };
    }
    function Ce(s) {
      try {
        if (e.isDisposed()) return;
      } catch (e) {}
      if (!w) {
        "" === s && (s = vjs_find(i, ".vjs-play-control"));
        var n = s.className;
        if ("string" == typeof n || n instanceof String) {
          if (n.indexOf("vjs-menu-item") > -1) return;
          n.indexOf("vjs-chapters-button") < 0 &&
            e.controlBar.getChild("chaptersButton").unpressButton();
          n.indexOf("vjs-descriptions-button") < 0 &&
            e.controlBar.getChild("descriptionsButton").unpressButton();
          if (n.indexOf("vjs-subs-caps-button") < 0)
            try {
              e.controlBar.getChild("subsCapsButton").unpressButton();
            } catch (e) {}
          n.indexOf("vjs-audio-button") < 0 &&
            e.controlBar.getChild("audioTrackButton").unpressButton();
          if (n.indexOf("vjs-quality-button") < 0)
            try {
              var a = vjs_find(b, ".vjs-menu");
              t.hasClass(a, "vjs-lock-showing") &&
                t.removeClass(a, "vjs-lock-showing");
            } catch (e) {}
          if (t.hasClass(s, "vjs-cast")) return !1;
          if (n.indexOf("vjs-cog-button") < 0)
            try {
              var o = vjs_find(i, ".vjs-menu-settings"),
                l = vjs_find(i, ".vjs-zoom-menu"),
                r = vjs_find(i, ".vjs-menu-speed"),
                d = vjs_find(i, ".vjs-quality-menu"),
                v = vjs_find(i, ".vjs-settings-home"),
                c = vjs_find(i, ".vjs-cog-button");
              l && t.addClass(l, "vjs-hidden");
              d && t.addClass(d, "vjs-hidden");
              r && t.addClass(r, "vjs-hidden");
              v && t.removeClass(v, "vjs-hidden");
              t.removeClass(o, "vjs-lock-showing");
              c.setAttribute("aria-expanded", "false");
              t.removeClass(c, "vjs-cog-active");
            } catch (e) {}
        }
      }
    }
    function _e() {
      for (
        var e = i.offsetWidth,
          s = [
            "vjs-1600",
            "vjs-1280",
            "vjs-920",
            "vjs-600",
            "vjs-640",
            "vjs-480",
            "vjs-360",
            "vjs-320",
          ],
          n = 0;
        n < s.length;
        n++
      )
        t.removeClass(i, s[n]);
      if (e < 360) {
        t.addClass(i, "vjs-480");
        t.addClass(i, "vjs-360");
        e < 320 && t.addClass(i, "vjs-320");
      } else if (e < 480) t.addClass(i, "vjs-480");
      else if (e < 640) {
        t.addClass(i, "vjs-640");
        e < 600 && t.addClass(i, "vjs-600");
      } else
        e < 920
          ? t.addClass(i, "vjs-920")
          : e < 1280
          ? t.addClass(i, "vjs-1280")
          : t.addClass(i, "vjs-1600");
    }
    function xe() {
      var e = 0;
      try {
        var s = vjs_mfind(i, ".item-quality");
        for (e = 0; e < s.length; e++) {
          s[e].ontouchstart = null;
          s[e].onclick = null;
        }
      } catch (e) {}
      var n = vjs_find(i, ".vjs-menu-quality"),
        a = vjs_mfind(n, ".item-quality");
      for (e = 0; e < a.length; e++) a[e].parentNode.removeChild(a[e]);
      var o = vjs_find("nv,vjs-extend-quality");
      o && t.addClass(o, "vjs-hidden");
      vjs_find(i, ".vjs-quality-button .vjs-menu .vjs-menu-content").innerHTML =
        "";
      t.addClass(b, "vjs-hidden");
    }
    function ke(e) {
      try {
        vjs_find(i, ".vjs-reset-zoom").innerHTML = parseInt(e, 10) + "%";
        vjs_find(i, ".zoom-label").innerHTML = parseInt(e, 10) + "%";
      } catch (e) {}
    }
    function we() {
      var e = b,
        s = vjs_find(e, ".vjs-menu"),
        a = vjs_find(s, ".vjs-menu-content");
      if (h > 1) {
        var o = function (e) {
          if (t.hasClass(e.target, "vjs-cast")) return !1;
          var s = vjs_find(e.target, ".vjs-control-text");
          if (!0 !== t.hasClass(e.target, "vjs-quality-button")) return !1;
          e.stopPropagation();
          Ce(e.target);
          var n = vjs_find(e.target, ".vjs-menu");
          if (t.hasClass(n, "vjs-lock-showing")) {
            e.target.setAttribute("aria-expanded", "false");
            t.removeClass(n, "vjs-lock-showing");
            s.removeAttribute("style");
          } else {
            var o = H,
              l = i.offsetHeight - o.offsetHeight - 10;
            a.style.maxHeight = l + "px";
            t.addClass(n, "vjs-lock-showing");
            e.target.setAttribute("aria-expanded", "true");
            s.style.opacity = "0";
          }
        };
        e.onclick = function (e) {
          o(e);
        };
        e.onmousemove = function (e) {
          t.removeClass(s, "vjs-hidden");
        };
        e.ontouchstart = function (e) {
          o(e);
        };
        e.onmouseover = function (e) {
          var s =
            vjs_find(e.target, ".vjs-menu") ||
            vjs_find(e.target.parent, ".vjs-menu");
          if (s && !0 !== t.hasClass(s, "vjs-lock-showing")) {
            var i = vjs_find(e.target, ".vjs-control-text");
            i && i.removeAttribute("style");
          }
        };
      }
      var l = vjs_find(i, ".vjs-settings-div"),
        r = vjs_find(i, ".vjs-menu-speed"),
        d = vjs_find(i, ".vjs-zoom-menu"),
        v = vjs_find(i, ".vjs-menu-quality"),
        c = vjs_find(i, ".vjs-settings-home"),
        u = function (e, s, i) {
          e.preventDefault();
          e.stopPropagation();
          t.addClass(c, "vjs-hidden");
          t.removeClass(s, "vjs-hidden");
          d && d !== s && t.addClass(d, "vjs-hidden");
          v && v !== s && t.addClass(v, "vjs-hidden");
          l.style.width = T[i].width + "px";
          l.style.height = T[i].height + "px";
        },
        f = function (e) {
          e.preventDefault();
          e.stopPropagation();
          d && t.addClass(d, "vjs-hidden");
          r && t.addClass(r, "vjs-hidden");
          v && t.addClass(v, "vjs-hidden");
          t.removeClass(c, "vjs-hidden");
          l.style.width = T.cogMenu.width + "px";
          l.style.height = T.cogMenu.height + "px";
          ke(100 * p);
        };
      let j = !1;
      if (r) {
        var m = vjs_find(i, ".vjs-extend-speed");
        m.onclick = function (e) {
          u(e, r, "speedMenu");
        };
        m.ontouchmove = function () {
          j = !0;
        };
        m.ontouchend = function (e) {
          j ? (j = !1) : u(e, r, "speedMenu");
        };
        var g = vjs_find(r, ".vjs-settings-back");
        if (g) {
          g.onclick = function (e) {
            f(e);
          };
          g.ontoucmove = function (e) {
            j = !1;
          };
          g.ontouchend = function (e) {
            j ? (j = !1) : f(e);
          };
        }
      }
      if (v && n.qualityMenu && h > 1) {
        t.removeClass(vjs_find(i, ".vjs-cog-menu-button"), "vjs-hidden");
        v.onclick = function (e) {
          e.preventDefault();
          e.stopPropagation();
        };
        var y = vjs_find(i, ".vjs-extend-quality");
        y.onclick = function (e) {
          u(e, v, "qualityMenu");
        };
        y.ontoucmove = function (e) {
          j = !1;
        };
        y.ontouchstart = function (e) {
          j ? (j = !1) : u(e, v, "qualityMenu");
        };
        var _ = vjs_find(v, ".vjs-settings-back");
        if (_) {
          _.onclick = function (e) {
            f(e);
          };
          _.ontoucmove = function (e) {
            j = !1;
          };
          _.ontouchend = function (e) {
            j ? (j = !1) : f(e);
          };
        }
      }
      if (d) {
        var x = vjs_find(i, ".vjs-extend-zoom");
        x.onclick = function (e) {
          u(e, d, "zoomMenu");
        };
        x.ontouchmove = function (e) {
          j = !0;
        };
        x.ontouchstart = function (e) {
          j ? (j = !1) : u(e, d, "zoomMenu");
        };
        var k = vjs_find(d, ".vjs-settings-back");
        if (k) {
          k.onclick = function (e) {
            f(e);
          };
          k.ontouchmove = function (e) {
            j = !1;
          };
          k.ontouchstart = function (e) {
            j ? (j = !1) : f(e);
          };
        }
      }
      var w = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!vjs_find(i, ".vjs-tech-chromecast")) {
          Ie();
          var s = i.querySelector(".vjs-menu-settings");
          d && t.addClass(d, "vjs-hidden");
          r && t.addClass(r, "vjs-hidden");
          if (!0 !== t.hasClass(s, "vjs-lock-showing")) {
            e.target.setAttribute("aria-expanded", "true");
            Ce(e.target);
            t.addClass(s, "vjs-lock-showing");
            vjs_find(C, ".vjs-control-text").style.opacity = 0;
            t.addClass(e.target, "vjs-cog-active");
            t.removeClass(c, "vjs-hidden");
            l.style.width = T.cogMenu.width + "px";
            l.style.height = T.cogMenu.height + "px";
            ke(100 * p);
          } else {
            e.target.setAttribute("aria-expanded", "false");
            t.removeClass(e.target, "vjs-cog-active");
            A();
          }
        }
      };
      function A() {
        d && t.addClass(d, "vjs-hidden");
        r && t.addClass(r, "vjs-hidden");
        t.removeClass(X, "vjs-hidden");
        t.removeClass(Y, "vjs-lock-showing");
        vjs_find(C, ".vjs-control-text").removeAttribute("style");
      }
      C.ontouchstart = function (e) {
        w(e);
      };
      C.onclick = function (e) {
        w(e);
      };
      C.onmouseover = function (e) {
        !0 !== t.hasClass(Y, "vjs-lock-showing") &&
          vjs_find(C, ".vjs-control-text").removeAttribute("style");
      };
    }
    function Ae() {
      var e = n.related.length,
        s = 0.8,
        o = 800;
      if (vjs_find(i, ".rel-block")) {
        t.removeClass(vjs_find(i, ".rel-block"), "rel-anim");
        var l = i.offsetWidth,
          r = l * s;
        r > o && (r = o);
        var d = parseInt(vjs_find(i, ".vjs-related").style.maxWidth, 10);
        isNaN(d) && (d = 0);
        parseInt(d, 10) < 100 && (d = o);
        r > d && (r = d);
        var u = vjs_find(i, ".vjs-related");
        u.style.maxWidth = o < d ? o + "px" : "800px";
        u.style.width = 100 * s + "%";
        var f = 3,
          h = 2;
        e < 5 && 3 !== e && (f = 2);
        e < 4 && (h = 1);
        if (r < 480) {
          f = 2;
          h = 1;
        }
        var j = (r / f) * 0.5625,
          p = r / f,
          m = Math.ceil(e / 6);
        v > m && (v = m);
        c = m;
        2 === f && 2 === h && (c = Math.ceil(e / 4));
        2 === f && 1 === h && (c = Math.ceil(e / 2));
        var g = j * h;
        u.style.height = g + "px";
        var y = l / 2 - r / 2;
        u.style.top = 0.55 * i.offsetHeight - g / 2 + "px";
        u.style.left = l / 2 - r / 2 + "px";
        if (a()) {
          var b = vjs_find(i, ".vjs-arrow-prev"),
            C = vjs_find(i, ".vjs-arrow-next"),
            _ = parseInt(vjs_find(i, ".vjs-prev").offsetWidth + 5, 10);
          b.style.left = y - _ + "px";
          C.style.left = r + y + "px";
          t.removeClass(C, "vjs-disabled");
          t.removeClass(b, "vjs-disabled");
          v === c && t.addClass(C, "vjs-disabled");
          1 === v && t.addClass(b, "vjs-disabled");
        }
        if (v > 1) {
          var x = u.offsetWidth,
            k = (v - 1) * x;
          vjs_find(i, ".rel-block").style.left = "-" + k + "px";
        }
        for (
          var w = 0, A = 0, I = i.querySelectorAll(".rel-parent"), T = 0;
          T < I.length;
          T++
        ) {
          var M = I[T];
          M.style.left = w + "px";
          if (1 === A && h > 1) {
            M.style.top = j + "px";
            w += p;
          } else M.style.top = 0;
          1 === h && (w += p);
          M.style.width = p + "px";
          M.style.height = j + "px";
          h > 1 ? 2 === ++A && (A = 0) : (A = 0);
        }
        t.addClass(vjs_find(i, ".rel-block"), "rel-anim");
      }
    }
    function Ie() {
      var e = vjs_find(i, ".vjs-settings-home"),
        s = vjs_find(i, ".vjs-menu-speed"),
        a = vjs_find(i, ".vjs-zoom-menu"),
        o = vjs_find(i, ".vjs-menu-quality"),
        l = vjs_find(i, ".vjs-settings-div");
      t.addClass(H, "vjs-block");
      l.style.width = "auto";
      l.style.height = "auto";
      var r = 10;
      ("shaka" !== n.skin && "pinko" !== n.skin) || (r = 5);
      "party" === n.skin && (r = 0);
      var d = i.offsetHeight - H.offsetHeight - r;
      d > 300 && (d = 300);
      l.style.maxHeight = d + "px";
      s && t.addClass(s, "vjs-hidden");
      a && t.addClass(a, "vjs-hidden");
      o && t.addClass(o, "vjs-hidden");
      var v = vjs_find(i, ".vjs-menu-settings");
      t.removeClass(v, "vjs-hidden");
      t.addClass(v, "vjs-invisible");
      T.cogMenu = { width: v.clientWidth, height: v.clientHeight };
      if (s) {
        t.addClass(e, "vjs-hidden");
        a && t.addClass(a, "vjs-hidden");
        o && t.addClass(o, "vjs-hidden");
        t.removeClass(s, "vjs-hidden");
        t.addClass(s, "vjs-invisible");
        T.speedMenu = { width: s.clientWidth, height: s.clientHeight };
        t.removeClass(s, "vjs-invisible");
        t.addClass(s, "vjs-hidden");
      }
      if (o && n.qualityMenu) {
        t.addClass(e, "vjs-hidden");
        a && t.addClass(a, "vjs-hidden");
        s && t.addClass(s, "vjs-hidden");
        t.removeClass(o, "vjs-hidden");
        t.addClass(o, "vjs-invisible");
        T.qualityMenu = { width: o.offsetWidth + 10, height: o.offsetHeight };
        t.removeClass(o, "vjs-invisible");
        t.addClass(o, "vjs-hidden");
        t.removeClass(vjs_find(i, ".vjs-cog-menu-button"), "vjs-hidden");
      }
      if (a) {
        t.addClass(e, "vjs-hidden");
        s && t.addClass(s, "vjs-hidden");
        o && t.addClass(o, "vjs-hidden");
        t.removeClass(a, "vjs-hidden");
        t.addClass(a, "vjs-invisible");
        a.style.width = "auto";
        T.zoomMenu = { width: a.clientWidth, height: a.clientHeight + 1 };
        t.removeClass(a, "vjs-invisible");
        t.addClass(a, "vjs-hidden");
      }
      t.removeClass(H, "vjs-block");
      t.addClass(vjs_mfind(i, ".vjs-submenu"), "vjs-hidden");
      t.removeClass(e, "vjs-hidden");
      t.removeClass(v, "vjs-invisible");
      t.removeClass(e, "vjs-hidden");
      (n.speedMenu || n.zoomMenu || n.relatedMenu || n.shareMenu) &&
        n.settingsButton &&
        t.removeClass(vjs_find(i, ".vjs-cog-menu-button"), "vjs-hidden");
    }
    function Te(e, s) {
      var a = parseInt(e, 10),
        o = '<i class="vjs-hd-icon vjs-hd-home vjs-hidden"></i>',
        l = "";
      if (n.hdicon) {
        l = "HD";
        a > 2159 && (l = "4K");
        a > n.minhd - 1 &&
          (o = '<i class="vjs-hd-icon vjs-hd-home">' + l + "</i>");
      }
      if (n.qualityMenu) {
        vjs_find(i, ".quality-label").innerHTML = s + o;
        a > n.minhd - 1
          ? t.removeClass(vjs_find(i, ".vjs-hd"), "vjs-hidden")
          : t.addClass(vjs_find(i, ".vjs-hd"), "vjs-hidden");
      } else vjs_find(i, ".vjs-quality-button .quality-span").innerHTML = s + o;
    }
    function Me(e, s) {
      return e.res && s.res ? +s.res - +e.res : 0;
    }
    function Ee(e) {
      if (n.hdicon && n.qualityMenu) {
        var s = vjs_find(i, ".vjs-hd");
        if (e > n.minhd - 1) {
          var a = "HD";
          e > 2159 && (a = "4K");
          s.innerHTML = a;
          t.removeClass(s, "vjs-hidden");
        } else t.addClass(s, "vjs-hidden");
      }
    }
    function He(s) {
      var a = null,
        o = null;
      try {
        a = e.dash.mediaPlayer || null;
      } catch (e) {}
      var l = e.options().html5.hlsjsConfig || null,
        r = !0;
      l && !1 === l.smoothQualityChange && (r = !1);
      xe();
      Ie();
      if (!(s.length < 2)) {
        n.is_auto = !0;
        for (
          var d = 0, v = 0, c = !1, u = !1, f = [], j = 0;
          j < s.length;
          j++
        ) {
          u = !1;
          for (var p = 0; p < f.length; p++)
            s[j].height === f[p].height &&
              s[j].bitrate === f[p].bitrate &&
              (u = !0);
          !0 !== u && f.push(s[j]);
        }
        for (var g = 0; g < f.length; g++) {
          var y = f[g];
          y.height > 0 && d++;
          y.bitrate > 0 && v++;
          for (var _ = 0, x = 0; x < f.length; x++)
            y.height === f[x].height && _++;
          _ > 1 && (c = !0);
        }
        var k = "bitrate";
        d > v && (k = "height");
        f = (f = sortByKey(f, k)).reverse();
        h = f.length + 1;
        var w = "vjs-menu-item item-quality",
          A = "vjs-menu-item item-quality vjs-checked",
          I = "";
        for (g = 0; g < f.length; g++) {
          var T = "",
            M = "",
            H = parseInt(f[g].height, 10);
          if (n.hdicon && H > n.minhd - 1) {
            var S = "HD";
            H > 1079 && n.minhd < 1080 && (S = "FullHD");
            H > 2159 && (S = "4K");
            M = '<i class="vjs-hd-icon">' + S + "</i>";
            Ee(H);
          }
          var L = f[g].bitrate,
            B = f[g].height,
            z = parseInt(L / 1e3, 10);
          if (f[g].height > 0 || f[g].bitrate > 0) {
            var q = w;
            c
              ? (I +=
                  d === v
                    ? '<li data-id="' +
                      f[g].index +
                      '" class="' +
                      q +
                      '" data-bitrate="' +
                      L +
                      '" data-height="' +
                      B +
                      '"' +
                      T +
                      ' role="menuitem" aria-live="polite" aria-disabled="false">' +
                      B +
                      "p (" +
                      z +
                      " kbps)</li>"
                    : d > v
                    ? '<li data-id="' +
                      f[g].index +
                      '" class="' +
                      q +
                      '" data-bitrate="' +
                      L +
                      '" data-height="' +
                      B +
                      '"' +
                      T +
                      ' role="menuitem" aria-live="polite" aria-disabled="false">' +
                      B +
                      "p" +
                      M +
                      "</li>"
                    : '<li data-id="' +
                      f[g].index +
                      '" class="' +
                      q +
                      '" data-bitrate="' +
                      L +
                      '" data-height="' +
                      B +
                      '"' +
                      T +
                      ' role="menuitem" aria-live="polite" aria-disabled="false">' +
                      z +
                      " kbps</li>")
              : f[g].bitrate > 0 && v > d
              ? (I +=
                  '<li data-id="' +
                  f[g].index +
                  '" class="' +
                  q +
                  '" data-bitrate="' +
                  L +
                  '" data-height="' +
                  B +
                  '"' +
                  T +
                  ' role="menuitem" aria-live="polite" aria-disabled="false">' +
                  B +
                  "p (" +
                  z +
                  " kbps)</li>")
              : (I +=
                  '<li data-id="' +
                  f[g].id +
                  '" class="' +
                  q +
                  '" data-bitrate="' +
                  L +
                  '" data-height="' +
                  B +
                  '"' +
                  T +
                  ' role="menuitem" aria-live="polite" aria-disabled="false">' +
                  B +
                  "p" +
                  M +
                  "</li>");
          }
        }
        I +=
          '<li id="auto" class="vjs-menu-item item-quality auto-res" data-height="Autores"' +
          A +
          ' role="menuitem" aria-live="polite" aria-disabled="false">Auto<i class="autores"></i></li>';
        vjs_find(i, ".quality-span").innerHTML = "Auto";
        if (n.qualityMenu) {
          Ue();
          var P = vjs_find(i, ".vjs-menu-quality .vjs-menu-content");
          P.innerHTML = P.innerHTML + I;
          t.removeClass(vjs_find(i, ".vjs-extend-quality"), "vjs-hidden");
          t.removeClass(C, "vjs-hidden");
        } else {
          vjs_find(
            i,
            ".vjs-quality-button .vjs-menu .vjs-menu-content"
          ).innerHTML = I;
          t.removeClass(b, "vjs-hidden");
        }
        var D = vjs_mfind(i, ".item-quality");
        we();
        Ie();
        e.qualities.length > 1 &&
          e.on("qualityChange", function (e, s) {
            if (a) {
              var t = s.height,
                n = s.bitrate;
              o = { height: t, bitrate: n };
            }
            var l = vjs_find(i, ".auto-res");
            if (l) {
              l.className.indexOf("vjs-checked") > -1 && Y();
            }
          });
        for (g = 0; g < D.length; g++) {
          var N = D[g],
            W = function (e) {
              e.stopPropagation();
              m = !0;
              for (var s = 0; s < D.length; s++)
                t.removeClass(D[s], "vjs-checked");
              t.removeClass(vjs_find(i, ".auto-res"), "vjs-checked");
              t.addClass(e.target, "vjs-checked");
              var n = e.target.getAttribute("id");
              Se();
              "auto" === n ? Y(!0) : X(e.target);
            };
          if (N.className.indexOf("vjs-hidden") < 0) {
            var O = !1;
            N.ontouchend = function (e) {
              !0 !== O && W(e);
            };
            N.ontouchstart = function (e) {
              O = !1;
            };
            N.ontouchmove = function (e) {
              O = !0;
            };
            N.onclick = function (e) {
              W(e);
            };
          }
        }
        var U = e.currentSource(),
          F = e.options(),
          K = F.html5.vhs || F.html5.hls,
          Q = null;
        (F.html5.hlsjsConfig || null) &&
          void 0 !== F.html5.hlsjsConfig.startQuality &&
          (Q = F.html5.hlsjsConfig.startQuality);
        Q
          ? Z(Q)
          : void 0 !== K && void 0 !== K.startQuality
          ? Z(K.startQuality)
          : void 0 !== U.startLevel
          ? Z(U.startQuality)
          : Y(!1);
      }
      function Y(s) {
        t.hasClass(i, "vjs-has-started") && t.addClass(E, "vjs-hidden");
        if (a) {
          a.updateSettings({
            streaming: { abr: { autoSwitchBitrate: { video: !0 } } },
          });
          var l = vjs_find(i, ".auto-res");
          l &&
            (l.className = "vjs-menu-item item-quality auto-res vjs-checked");
          vjs_find(i, ".quality-span").innerHTML = "Auto";
        }
        if (s && !a)
          if (e.hlsjs)
            r ? (e.hlsjs.nextLevel = -1) : (e.hlsjs.currentLevel = -1);
          else for (var d = 0; d < e.qualities.length; d++) e.setQuality(d, !0);
        (l = vjs_find(i, ".auto-res")) &&
          (l.className = "vjs-menu-item item-quality auto-res vjs-checked");
        var v = null,
          c = "",
          u = "",
          f = 0;
        if ((v = a ? o : e.qualities[e.qualityIndex])) {
          v.height && (f = parseInt(v.height, 10));
          u = f > 0 ? v.height + "p" : parseInt(v.bitrate / 1e3, 10) + "kbps";
          l && (l.innerHTML = 'Auto<i class="autores">' + u + "</i>");
          if (n.hdicon) {
            f >= n.minhd - 1 && (c = "HD");
            f > 2159 && (c = "4K");
            Ee(f);
          }
        }
        R =
          "" === c
            ? "vjs-hd-icon vjs-hd-home vjs-hidden"
            : "vjs-hd-icon vjs-hd-home";
        vjs_find(i, ".quality-span").innerHTML =
          'Auto<i class="' + R + '">' + c + "</i>";
      }
      function Z(s) {
        var i = !1;
        s = parseInt(s, 10);
        for (g = 0; g < D.length; g++) {
          var n = parseInt(D[g].getAttribute("data-bitrate"), 10),
            a = parseInt(D[g].getAttribute("data-height"), 10);
          if (n === s || s === a) {
            i = !0;
            X(D[g]);
            e.paused() && t.addClass(E, "vjs-hidden");
            break;
          }
        }
        !0 !== i && Y(!1);
      }
      function X(s) {
        t.hasClass(i, "vjs-has-started") && t.addClass(E, "vjs-hidden");
        vjs_find(i, ".auto-res").innerHTML = 'Auto<i class="autores"></i>';
        var o = parseInt(s.getAttribute("data-height"), 10),
          l = o,
          d = parseInt(s.getAttribute("data-bitrate"), 10),
          v = e.qualities;
        t.addClass(s, "vjs-checked");
        var c = e.video_id();
        0 === l && (l = d);
        e.trigger("resolutionchange", { id: c, res: l });
        for (var u = 0; u < v.length; u++) {
          e.hlsjs || e.setQuality(u, !1);
          if (v[u].height === o || v[u].bitrate === d)
            if (e.hlsjs)
              r ? (e.hlsjs.nextLevel = u) : (e.hlsjs.currentLevel = u);
            else if (a) {
              a.updateSettings({
                streaming: { abr: { autoSwitchBitrate: { video: !1 } } },
              });
              a.setQualityFor("video", v[u].id);
            } else e.setQuality(u, !0);
        }
        var f = "",
          h = "",
          j = vjs_find(i, ".quality-span");
        if (o > 0) {
          f = "HD";
          o > 2159 && (f = "4K");
          h =
            o > n.minhd - 1
              ? '<i class="vjs-hd-icon vjs-hd-home">' + f + "</i>"
              : '<i class="vjs-hd-icon vjs-hd-home vjs-hidden">' + f + "</i>";
          j.innerHTML = o + "p" + h;
        } else d > 0 && (j.innerHTML = parseInt(d / 1e3, 10) + "kB");
        Ee(o);
      }
    }
    function Se() {
      if (n.qualityMenu) {
        t.addClass(vjs_find(i, ".vjs-menu-quality"), "vjs-hidden");
        t.removeClass(vjs_find(i, ".vjs-settings-home"), "vjs-hidden");
        t.removeClass(vjs_find(i, ".vjs-menu-settings"), "vjs-lock-showing");
      } else {
        var e = vjs_find(i, ".vjs-quality-button");
        if (e) {
          var s = vjs_find(e, ".vjs-menu"),
            a = vjs_find(e, ".vjs-control-text");
          if (s) {
            s.style.display = "none";
            t.removeClass(s, "vjs-lock-showing");
            a && a.removeAttribute("style");
          }
        }
      }
    }
    function Le() {
      if (
        !(
          t.hasClass(i, "vjs-ad-playing") ||
          t.hasClass(i, "vjs-dai") ||
          t.hasClass(i, "vjs-up-next") ||
          e.duration() === 1 / 0 ||
          ("8" === browser.IOS_VERSION && 0 === e.duration()) ||
          videojs.ima ||
          videojs.vroll ||
          e.vastAds ||
          e.isPreroll ||
          e.resumed
        )
      ) {
        var s = e.video_id();
        if (n.resume && null != s) {
          var a = String("vjs_resume-" + s);
          if (localStorage && localStorage.key) {
            var o = Number(localStorage.getItem(a));
            o > 0 &&
              o < e.duration() - 20 &&
              setTimeout(function () {
                e.currentTime(o);
              }, 500);
          }
        }
      }
    }
    function Be() {
      var e = vjs_find(i, ".vjs-audio-info");
      e && i.removeChild(e);
      if (n.audioInfo && (n.audioInfo.artist || n.audioInfo.title)) {
        var s = vjs_El("span", "vjs-audio-info"),
          t = "";
        n.audioInfo.url
          ? (t =
              '<a href="' +
              n.audioInfo.url +
              '" rel="nofollow" target="' +
              n.target +
              '">')
          : (s.style.pointerEvents = "none");
        n.audioInfo.cover &&
          (t +=
            '<span class="vjs-cover"><img src="' +
            n.audioInfo.cover +
            '"/></span>');
        t += '<span class="vjs-audio-item vjs-text">';
        n.audioInfo.artist &&
          (t += '<span class="audio-artist">' + n.audioInfo.artist + "</span>");
        n.audioInfo.title &&
          (t +=
            '<span class="vjs-audio-item vjs-song">' +
            n.audioInfo.title +
            "</span>");
        if (n.audioInfo.genre || n.audioInfo.album || n.audioInfo.year) {
          t += '<span class="vjs-audio-item audio-id">';
          n.audioInfo.genre &&
            (t += "<span>Genre: " + n.audioInfo.genre + "</span>");
          n.audioInfo.album &&
            (t += "<span>Album: " + n.audioInfo.album + "</span>");
          n.audioInfo.year &&
            (t += "<span>Year: " + n.audioInfo.year + "</span>");
          t += "</span>";
        }
        t += "</span>";
        n.audioInfo.url && (t += "</a>");
        s.innerHTML = t;
        i.appendChild(s);
        s.onclick = function () {
          window.open(n.audioInfo.url, n.target);
        };
      }
    }
    function ze() {
      var e = vjs_find(i, ".vjs-info");
      e && i.removeChild(e);
      if (
        !n.audioInfo &&
        n.videoInfo &&
        (n.infoText || n.infoTitle || "" !== n.title)
      ) {
        var s = vjs_El("span", "vjs-info vjs-info-top");
        n.infoBottom && (s = vjs_El("span", "vjs-info vjs-info-bottom"));
        var t = n.infoSize,
          a = "",
          o = "";
        (parseInt(n.infoSize, 10) < 15 || parseInt(n.infoSize, 10) > 24) &&
          (t = 18);
        18 !== t && (a = "font-size:" + t + "px;");
        n.infoBold && (a += "font-weight:bold;");
        n.infoFont && (a += "font-family:" + n.infoFont);
        "" !== a && (s.style = a);
        i.appendChild(s);
        n.infoUrl
          ? (o = '<a href="' + n.infoUrl + '" target="' + n.target + '">')
          : (s.style.pointerEvents = "none");
        var l = "";
        n.infoText
          ? (l = n.infoText)
          : n.infoTitle
          ? (l = n.infoTitle)
          : "" !== n.title && (l = n.title);
        var r = "";
        "" !== n.infoIcon &&
          (r = '<span class="vjs-icon"><img src="' + n.infoIcon + '"/></span>');
        o += r;
        o += '<span class="vjs-text"><span class="vjs-ttl">' + l + "</span>";
        n.infoDescription &&
          (o += '<span class="vjs-dsc">' + n.infoDescription + "</span>");
        n.infoUrl ? (o += "</span></a></span>") : (o += "</span>");
        s.innerHTML = o;
        s.onclick = function () {
          window.open(n.infoUrl, n.target);
        };
      }
    }
    function qe() {
      var s,
        t = [];
      if (e.textTracks().length > 0) {
        s = e.textTracks();
        for (var i = 0; i < s.length; i++) {
          var n = {},
            a = s[i];
          if ("captions" === a.kind) {
            n.kind = a.kind;
            n.src = a.src;
            n.language = a.language;
            n.label = a.label;
            "showing" === a.mode && (n.mode = "showing");
            t.push(n);
          }
        }
      }
      t.length > 0 && (e.captions = t);
    }
    function Pe() {
      var s = !1,
        t = e.textTracks();
      if (t.length > 0)
        for (var i = 0; i < t.length; i++)
          "metadata" === t[i].kind &&
            t[i].src &&
            !0 !== s &&
            e.trigger("medialoaded");
    }
    function De(e) {
      var s = vjs_find(i, ".vjs-thumbnail-holder"),
        a = vjs_find(i, ".vjs-progress-slide .vjs-thumb");
      if (s) {
        if ("shaka" === n.skin) {
          var o = Number(s.style.height.replace(/px$/, "")),
            l = s.computedStyleMap().get("bottom").value + o + 5;
          e.style.bottom = l + "px";
        } else t.addClass(s, "vjs-vtt");
        t.addClass(e, "vjs-chapter-mix");
      } else if (a) {
        if ("shaka" === n.skin) {
          var r = Number(a.style.height.replace(/px$/, ""));
          e.style.bottom = r + 32 + "px";
        } else t.addClass(a, "vjs-sld");
        t.addClass(e, "vjs-chapter-mix");
      }
      return 0;
    }
    function Ne() {
      var s = e.textTracks(),
        a = vjs_find(i, ".vjs-chapter");
      a && a.parentNode.removeChild(a);
      if (n.chapterMarkers) {
        var o = i.getElementsByClassName("vjs-marker");
        if (o) for (; o.length > 0; ) o[0].parentNode.removeChild(o[0]);
        var l = !1;
        if (s.length > 0)
          for (var r = 0; r < s.length; r++)
            if ("chapters" === s[r].kind && s[r].cues && !0 !== l) {
              l = !0;
              var d = s[r];
            }
        if (d) {
          var v = d.cues;
          if (v) {
            let s = vjs_find(i, ".vjs-progress-control");
            var c = vjs_find(s, ".vjs-mouse-display");
            try {
              t.addClass(c, "vjs-abs-hidden");
            } catch (e) {}
            var u = [],
              f = vjs_find(i, ".vjs-progress-holder"),
              h = e.duration(),
              j = vjs_El("div");
            j.className = "vjs-chapter";
            f.appendChild(j);
            vjs_find(i, ".vjs-progress-control").onmousemove = function () {
              var e = Number(c.style.left.replace(/px$/, "")),
                s = (e / f.offsetWidth) * h;
              De(j);
              j.style.left = c.style.left;
              for (var t = v.length - 1; t >= 0; t--)
                if (s >= v[t].startTime) {
                  if (j.innerHTML !== v[t].text) {
                    j.innerHTML = v[t].text;
                    j.style.maxWidth = 0.98 * f.offsetWidth + "px";
                  }
                  var i = j.offsetWidth / 2,
                    n = f.offsetWidth - j.offsetWidth / 2;
                  i > e && (j.style.left = i + "px");
                  n < e && (j.style.left = n + "px");
                  j.style.opacity = "1";
                  j.style.visibility = "visible";
                  break;
                }
            };
            vjs_find(i, ".vjs-progress-control").onmouseout = function () {
              if (!videojs.holderdown) {
                j.style.opacity = "0";
                j.style.visibility = "visible";
              }
            };
            for (r = 0; r < v.length; r++)
              if (h > 0 && v[r].startTime > 0) {
                u[r] = v[r].startTime;
                var p = vjs_El("div", "vjs-marker"),
                  m = vjs_El("div", "vjs-marker-inn");
                p.appendChild(m);
                p.style.left = (u[r] / h) * 100 + "%";
                f.appendChild(p);
              }
          }
        }
      }
    }
    function We(s, t) {
      var i = vjs_El("div", "vjs-item");
      i.setAttribute("data-id", t);
      var a = vjs_El("div", "vjs-tmb");
      s.thumb
        ? (a.style.backgroundImage = "url(" + s.thumb + ")")
        : s.poster && (a.style.backgroundImage = "url(" + s.poster + ")");
      i.appendChild(a);
      var o = vjs_El("p");
      if (s.title) o.innerHTML = s.title;
      else {
        var l = "";
        if (s.audioInfo && void 0 !== typeof s.audioInfo.title) {
          l = s.audioInfo.title;
          void 0 !== typeof s.audioInfo.artist &&
            (l = s.audioInfo.artist + " - " + l);
        }
        if ("" !== l) o.innerHTML = l;
        else {
          var r = s.sources[0].src,
            d = r.substring(r.lastIndexOf("/") + 1);
          if (s.sources.length > 0)
            for (j = 0; j < s.sources.length; j++)
              s.sources[j].default &&
                (d = (r = s.sources[j].src).substring(r.lastIndexOf("/") + 1));
          d = d.replace(/(\.[^/.]+)+$/, "");
          o.innerHTML = d;
        }
      }
      i.appendChild(o);
      if ("undefined" !== n.playlistID)
        var v = document.getElementById(n.playlistID);
      if (v) {
        var c = vjs_El("p", "vjs-desc");
        s.description && (c.innerHTML = s.description);
        i.appendChild(c);
      }
      if (s.duration) {
        var u = vjs_El("span");
        u.innerHTML = s.duration;
        i.appendChild(u);
      }
      var f = !1;
      i.onclick = function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        h(e);
      };
      i.ontouchstart = function (e) {
        f = !1;
      };
      i.ontouchmove = function (e) {
        f = !0;
      };
      i.ontouchend = function (e) {
        if (!0 !== f) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          h(e);
        }
      };
      function h(s) {
        if (!e.adPlaying) {
          var t = s.target.getAttribute("data-id");
          e.playlist.currentItem(parseInt(t, 10));
          if (e.paused()) {
            var i = e.play();
            void 0 !== i &&
              "function" == typeof i.then &&
              i.then(null, function (e) {});
          }
        }
      }
      return i;
    }
    function Oe() {
      var s = e.playlist.list();
      if (!(s.length < 2)) {
        e.on("error", function () {
          e.playlist.next(!0);
        });
        if (!0 !== n.playlist) {
          n.playlist = !0;
          if (n.playlistNavigation) {
            var a = vjs_El(
                "div",
                "vjs-playlist-nav vjs-nav-prev",
                '<div class="vjs-prev vjs-disabled"></div>'
              ),
              o = vjs_El(
                "div",
                "vjs-playlist-nav vjs-nav-next",
                '<div class="vjs-next"></div>'
              );
            i.appendChild(a);
            i.appendChild(o);
            o.onclick = function (s) {
              e.adPlaying ||
                (s.target.className.indexOf("disabled") < 0 &&
                  e.playlist.next());
            };
            a.onclick = function (s) {
              e.adPlaying ||
                (s.target.className.indexOf("disabled") < 0 &&
                  e.playlist.previous());
            };
          }
          if (n.playlistUI) {
            var l = null,
              r = null;
            "undefined" !== n.playlistID &&
              (l = document.getElementById(n.playlistID));
            r = vjs_El(
              "div",
              l
                ? "vjs-vplaylist vjs-vplaylist-horizontal"
                : "vjs-vplaylist vjs-vplaylist-show"
            );
            if (!l) {
              var d = t.createEl(
                "div",
                { className: "vjs-playlist-button" },
                { title: "Playlist" }
              );
              i.appendChild(d);
              d.onclick = function (e) {
                t.addClass(r, "vjs-vplaylist-show");
                n.playlistFirst && t.addClass(r, "vjs-vplaylist-first");
              };
              r.style.visibility = "hidden";
            }
            var v = vjs_El("div", "vjs-head", "<span>PLAYLIST</span>"),
              c = vjs_El("div", "vjs-back", "<i></i>");
            l && (c.innerHTML = '<i class="vdown"></i>');
            v.appendChild(c);
            r.appendChild(v);
            c.onclick = function (e) {
              if (l)
                if (u.offsetHeight > 0) {
                  c.innerHTML = '<i class="vup"></i>';
                  t.addClass(u, "vjs-list-min");
                } else {
                  c.innerHTML = '<i class="vdown"></i>';
                  t.removeClass(u, "vjs-list-min");
                }
              else t.removeClass(r, "vjs-vplaylist-show");
            };
            l ? l.appendChild(r) : i.appendChild(r);
            var u = vjs_El("div", "vjs-vlist");
            if (l) {
              t.addClass(u, "vjs-list-max");
              if (n.playlistMaxH) {
                var f = parseInt(n.playlistMaxH, 10);
                u.style.height = 0 === f ? "auto" : f + "px";
              }
            }
            r.appendChild(u);
            s = e.playlist.list();
            for ($ = 0; $ < s.length; $++) {
              var h = We(s[$], $);
              u.appendChild(h);
            }
            if (!l) {
              var j = vjs_El("div", "vjs-last");
              u.appendChild(j);
              if (!0 !== n.playlistShow) {
                r.className = "vjs-vplaylist";
                setTimeout(function () {
                  r.style.visibility = "visible";
                }, 500);
              } else r.style.visibility = "visible";
            }
          }
        }
        e.on("playlist_newitem", function (s, a) {
          if (n.playlistUI)
            for (var o = vjs_mfind(u, ".vjs-item"), d = 0; d < o.length; d++)
              t.removeClass(o[d], "vjs-active-item");
          e.on("play", function () {
            if (n.playlistUI) {
              for (
                var s = e.playlist.currentIndex(),
                  a = vjs_mfind(u, ".vjs-item"),
                  o = 0;
                o < a.length;
                o++
              ) {
                t.removeClass(a[o], "vjs-active-item");
                o === s && t.addClass(a[o], "vjs-active-item");
              }
              n.playlistAutoHide &&
                !l &&
                t.removeClass(r, "vjs-vplaylist-show");
            }
            if (n.playlistNavigation) {
              var d = vjs_find(i, ".vjs-nav-prev"),
                v = vjs_find(i, ".vjs-nav-next"),
                c = vjs_find(d, ".vjs-prev"),
                f = vjs_find(v, ".vjs-next");
              0 === e.playlist.currentIndex()
                ? t.addClass(c, "vjs-disabled")
                : t.removeClass(c, "vjs-disabled");
              e.playlist.currentIndex() === e.playlist.lastIndex()
                ? t.addClass(f, "vjs-disabled")
                : t.removeClass(f, "vjs-disabled");
            }
          });
        });
      }
    }
    function Re() {
      e.sprite = !1;
      if ("" === n.slideImage || n.currentSlide !== n.slideImage) {
        var s = vjs_find(i, ".vjs-progress-slide");
        s && s.parentNode.removeChild(s);
        var v = vjs_find(i, ".vjs-thumb-poster");
        v && i.removeChild(v);
        if (!0 !== n.is_audio && "undefined" !== n.slideImage && a()) {
          if ("" === n.slideImage) return;
          n.currentSlide = n.slideImage;
          var c = vjs_find(i, ".vjs-progress-holder"),
            f = vjs_find(c, ".vjs-mouse-display");
          if (e.shadowSlide) {
            var h = vjs_El("div", "vjs-thumb-poster"),
              j = vjs_El("canvas");
            h.appendChild(j);
            i.insertBefore(h, vjs_find(i, ".vjs-poster"));
          }
          var p = vjs_find(i, ".vjs-play-progress"),
            m = vjs_find(p, ".vjs-time-tooltip");
          t.addClass(m, "vjs-abs-hidden");
          t.addClass(f, "vjs-abs-hidden");
          e.sprite = !0;
          o = vjs_El("div", "vjs-progress-slide");
          l = vjs_El("div", "vjs-thumb");
          d = vjs_El("div", "vjs-thumb-duration");
          r = vjs_El("img");
          if ("horizontal" === n.slideType) {
            r.style.width = "auto";
            r.style.height = n.slideHeight + "px";
          } else {
            r.style.height = "auto";
            r.style.width = n.slideWidth + "px";
          }
          l.appendChild(r);
          l.appendChild(d);
          o.appendChild(l);
          l.style.left = "-" + parseInt(n.slideWidth / 2, 10) + "px";
          vjs_find(i, ".vjs-progress-holder").appendChild(o);
          o.style.left = "-1000px";
          t.addClass(m, "vjs-abs-hidden");
          t.addClass(f, "vjs-abs-hidden");
          var g = 0,
            y = 0,
            b = function (s) {
              var a = vjs_find(i, ".vjs-progress-holder"),
                v = vjs_find(a, ".vjs-mouse-display"),
                c = a.offsetWidth,
                f = parseFloat(v.style.left),
                p = Number(f) / Number(c),
                m = vjs_find(v, ".vjs-time-tooltip"),
                b = "";
              m && (b = m.innerHTML);
              var C = parseInt(p * u, 10);
              l.style.width = n.slideWidth + "px";
              l.style.height = n.slideHeight + "px";
              var _ = 0;
              if ("horizontal" === n.slideType) {
                _ = C * n.slideWidth;
                r.style.left = "-" + _ + "px";
                g = _;
                y = 0;
              } else {
                _ = C * n.slideHeight;
                r.style.top = "-" + _ + "px";
                g = 0;
                y = _;
              }
              "" !== b && (d.innerHTML = b);
              var x = vjs_find(i, ".vjs-progress-holder");
              f = Number(v.style.left.replace(/px$/, ""));
              var k = n.slideWidth / 2,
                w = x.offsetWidth - n.slideWidth / 2;
              f > w && (f = w);
              f < k && (f = k);
              o.style.left = parseInt(f, 10) + "px";
              if (videojs.holderdown && e.shadowSlide) {
                var A = j.getContext("2d");
                j.width = i.offsetWidth;
                j.height = i.offsetHeight;
                h.style.width = i.offsetWidth + "px";
                h.style.height = i.offsetHeight + "px";
                A.drawImage(
                  r,
                  g,
                  y,
                  n.slideWidth,
                  n.slideHeight,
                  0,
                  0,
                  j.width,
                  j.height
                );
              }
              t.addClass(l, "vjs-thumb-show");
            };
          c.onmousedown = function (s) {
            if (e.shadowSlide) {
              var t = j.getContext("2d");
              j.width = i.offsetWidth;
              j.height = i.offsetHeight;
              h.style.width = i.offsetWidth + "px";
              h.style.height = i.offsetHeight + "px";
              t.drawImage(
                r,
                g,
                y,
                n.slideWidth,
                n.slideHeight,
                0,
                0,
                j.width,
                j.height
              );
            }
          };
          c.onmousemove = function (e) {
            vjs_find(i, ".vjs-tech-chromecast") || (o && "" !== r.src && b(e));
          };
          c.onmouseout = function (s) {
            if (
              !videojs.holderdown &&
              !vjs_find(i, ".vjs-tech-chromecast") &&
              o
            ) {
              t.removeClass(l, "vjs-thumb-show");
              o.style.left = "-1000px";
              if (e.shadowSlide) {
                j.width = 0;
                j.height = 0;
                h.removeAttribute("style");
              }
            }
          };
          var C = new Image();
          r.src = n.slideImage;
          C.src = n.slideImage;
          C.onload = (e) => {
            let s = e.target;
            var i = s.width,
              a = s.height;
            u = i / n.slideWidth;
            "horizontal" !== n.slideType && (u = a / n.slideHeight);
            t.removeClass(o, "vjs-hidden");
          };
        }
      }
    }
    function Ue() {
      if (!vjs_find(i, ".vjs-extend-quality")) {
        var s = e.localize("Quality") + '<span class="quality-label"></span>',
          t = vjs_El(
            "li",
            "vjs-settings-item vjs-extend-quality vjs-menu-forward vjs-hidden",
            s
          );
        vjs_find(i, ".vjs-settings-list").appendChild(t);
        var n = vjs_El(
          "div",
          "vjs-submenu vjs-menu-quality vjs-hidden",
          '<ul class="vjs-menu-content"><li class="vjs-settings-back">' +
            e.localize("Quality") +
            "</li></ul>"
        );
        vjs_find(i, ".vjs-settings-div").appendChild(n);
      }
    }
    function Fe(e) {
      try {
        e.preventDefault();
        e.stopPropagation();
      } catch (e) {}
      I.style.left = I.offsetWidth / 2 - i.offsetWidth / 2 + "px";
      I.style.top = I.offsetHeight / 2 - i.offsetHeight / 2 + "px";
    }
    function Ke() {
      Qe();
      p = 1;
      t.removeClass(M, "vjs-hidden");
      try {
        vjs_find(i, ".vjs-zoom-level").style.height = "0";
      } catch (e) {}
      Ze(I, 1);
      I.style.top = 0;
      I.style.left = 0;
      ke(100);
      var e = vjs_find(i, ".vjs-zoom-parent");
      !0 !== t.hasClass(e, "vjs-hidden") && t.addClass(e, "vjs-hidden");
      videojs.options.blockKeys = !1;
      return !1;
    }
    function Qe() {
      var e = ((p - 1) / 4) * 100,
        s = vjs_find(i, ".zoom-thumb");
      s && (s.style.height = e + "%");
    }
    function Ye(e, s) {
      if (localStorage)
        try {
          localStorage[e] = s;
        } catch (e) {}
    }
    function Ze(e, s) {
      Qe();
      var n = "scale(" + s + ")";
      e.style.transform = n;
      e.style.webkitTransform = n;
      e.style.msTransform = n;
      t.removeClass(vjs_find(i, ".vjs-poster"), "vjs-hidden");
    }
    function Xe(e) {
      var s = 0;
      if (e.offsetParent)
        for (;;) {
          s += e.offsetTop;
          if (!e.offsetParent) break;
          e = e.offsetParent;
        }
      else e.y && (s += e.y);
      return s;
    }
    function Je(e) {
      e
        ? t.addClass(document.body, "no-select")
        : t.removeClass(document.body, "no-select");
      if (e) {
        document.body.focus();
        document.onselectstart = function () {
          return !1;
        };
      } else
        document.onselectstart = function () {
          return !0;
        };
    }
  };
if ("undefined" != typeof window)
  for (
    var _0x9f9c = [
        "length",
        "dg13",
        "",
        "join",
        "reverse",
        "split",
        "indexOf",
        "toLowerCase",
        "hostname",
        "location",
        "dispose",
        "nuevo",
      ],
      j = 0;
    j < doms[_0x9f9c[0]];
    j++
  ) {
    var dom = doms[j][_0x9f9c[1]]();
    dom = dom[_0x9f9c[5]](_0x9f9c[2])[_0x9f9c[4]]()[_0x9f9c[3]](_0x9f9c[2]);
    if (window[_0x9f9c[9]][_0x9f9c[8]][_0x9f9c[7]]()[_0x9f9c[6]](dom) > -1) {
      videojs[_0x9f9c[10]] = !0;
      videojs[_0x9f9c[11]] = !0;
      break;
    }
  }
var nuevo = function (e) {
  return initPlugin(this, videojs.mergeOptions({}, e));
};
nuevo.VERSION = "9.6.4";
var registerPlugin = videojs.registerPlugin || videojs.plugin;
registerPlugin("nuevo", nuevo);
export default nuevo;
