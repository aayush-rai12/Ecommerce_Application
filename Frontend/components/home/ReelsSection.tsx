"use client";

import { useEffect, useState, useRef } from "react";
import { Icon } from "../Icon";

interface Reel {
  id: string;
  username: string;
  caption: string;
  videoUrl: string;
  thumbnail: string;
  permalink: string;
  likes: number;
}

const SAMPLE_REELS: Reel[] = [
  {
    id: "1",
    username: "shoprine.clothes",
    caption: "Sample reel 1 — demo",
    videoUrl: "/reels/reelsSample.mp4",
    thumbnail: "",
    permalink: "https://instagram.com",
    likes: 1240,
  },
  {
    id: "2",
    username: "shoprine.clothes",
    caption: "Sample reel 2 — demo",
    videoUrl: "/reels/reelsSample2.mp4",
    thumbnail: "",
    permalink: "https://instagram.com",
    likes: 982,
  },
  {
    id: "3",
    username: "shoprine.clothes",
    caption: "Sample reel 3 — demo",
    videoUrl: "/reels/reelsSample.mp4",
    thumbnail: "",
    permalink: "https://instagram.com",
    likes: 982,
  },
  {
    id: "4",
    username: "shoprine.clothes",
    caption: "Sample reel 4 — demo",
    videoUrl: "/reels/reelsSample2.mp4",
    thumbnail: "",
    permalink: "https://instagram.com",
    likes: 982,
  },
];

export default function ReelsSection() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    // fetch reels from Instagram API when available 
    // const res = await fetch("/api/reels"); 
    //const data = await res.json(); 
   // setReels(data);
    setReels(SAMPLE_REELS);
  }, []);

  const handlePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    const isSame = playingId === id;
    // pause current if same
    if (isSame) {
      video.pause();
      setPlayingId(null);
      return;
    }

    // pause previous
    if (playingId && videoRefs.current[playingId]) {
      videoRefs.current[playingId]?.pause();
    }

    // play new safely
    video
      .play()
      .then(() => {
        setPlayingId(id);
      })
      .catch(() => {
        setPlayingId(null);
      });
  };

  return (
    <section className="bg-white py-5 md:py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-5">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff3f6c]">
            Community Feed
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-zinc-900 md:text-5xl">
            Instagram Reels
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-500 md:text-base">
            Watch how our community styles the latest Shoprine drops.
          </p>
        </div>

        {/* Reels */}
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {reels.map((reel) => {
            const isPlaying = playingId === reel.id;

            return (
              <div
                key={reel.id}
                onClick={() => handlePlay(reel.id)}   // ✅ tap anywhere
                className="
                  group
                  relative
                  w-[260px]
                  sm:w-[300px]
                  md:w-[320px]
                  aspect-[9/16]
                  shrink-0
                  snap-start
                  overflow-hidden
                  rounded-3xl
                  border
                  border-zinc-200
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                {/* Video */}
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[reel.id] = el;
                    else delete videoRefs.current[reel.id];
                  }}
                  src={reel.videoUrl}
                  muted
                  loop
                  playsInline
                  onEnded={() => {
                    if (playingId === reel.id) setPlayingId(null);
                  }}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge */}
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 shadow-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-900">
                    Reel
                  </span>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(reel.id);
                    }}
                    className="
                      flex h-14 w-14 items-center justify-center
                      rounded-full bg-white/20 backdrop-blur-md
                      transition-transform duration-300
                      group-hover:scale-105
                    "
                  >
                    {isPlaying ? (
                      <Icon name="pause" className="h-5 w-5 text-white" />
                    ) : (
                      <Icon name="play" className="h-5 w-5 text-white" />
                    )}
                  </button>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-base font-semibold">
                    @{reel.username}
                  </p>

                  <p className="mt-1 line-clamp-2 text-sm text-white/80">
                    {reel.caption}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                    <span className="flex items-center gap-1.5">
                      <Icon name="heart" className="h-4 w-4 text-[#ff3f6c]" />
                      <span>{reel.likes.toLocaleString()}</span>
                    </span>

                    <span>•</span>

                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(reel.permalink, "_blank", "noopener,noreferrer");
                      }}
                      className="cursor-pointer"
                    >
                      Open Insta Page
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}