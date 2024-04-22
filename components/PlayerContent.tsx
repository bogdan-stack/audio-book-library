"use client";

import useSound from "use-sound";
import { useEffect, useState, useRef } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";


import { Chapter, Audiobook } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import MediaItemSQL from "./MediaItemSQL";
import Slider from "./Slider";


interface PlayerContentProps {
  chapter: Chapter;
  audiobook: Audiobook;
  
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  chapter,
  audiobook,
}) => {
  
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextBook = player.ids[currentIndex + 1];

    if (!nextBook) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextBook);
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousBook = player.ids[currentIndex - 1];

    if (!previousBook) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousBook);
  }

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const [play, { pause, sound }] = useSound(
    chapter.chapter_path,
    {
      volume: volume,
      onplay: () => {
        setIsPlaying(true);
        // Start the counter when the audio starts playing
        intervalRef.current = setInterval(() => {
          setCurrentTime((time) => time + 1);
        }, 1000);
      },
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
        // Stop the counter when the audio ends
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      },
      onpause: () => {
        setIsPlaying(false);
        // Stop the counter when the audio is paused
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      },
      format: ['mp3']
    }
  );
  
  useEffect(() => {
    // Stop the counter when the component is unmounted
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const [duration, setDuration] = useState(0);
  useEffect(() => {
    if (sound?._duration) {
      setDuration(sound._duration);
    }
  }, [sound, sound?._i]);

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    }
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  }

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  return (
    <>
    <div className="flex h-auto w-full bottom-0">
        <div className="flex w-full justify-start">
          <div className="flex items-center gap-x-4">
            <MediaItemSQL data={chapter} audiobookData={audiobook} />
          </div>
        </div>
      <div className="flex items-center gap-x-4">
        <div
          className="
            hidden
            col-auto
            w-full
            justify-center
            items-center
          "
        >
          <div
            onClick={handlePlay}
            className="
              h-10
              w-10
              flex
              items-center
              justify-center
              rounded-full
              bg-white
              p-1
              cursor-pointer
            "
          >
            <Icon size={30} className="text-black" />
          </div>
        </div>

        <div
          className="
            flex
            h-full
            md:flex
            justify-center
            items-center
            w-full
            max-w-[722px]
            gap-x-2
          "
        >
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="
              text-neutral-400
              cursor-pointer
              hover:text-white
              transition
            "
          />
          <div
            onClick={handlePlay}
            className="
              flex
              items-center
              justify-center
              h-10
              w-10
              rounded-full
              bg-white
              p-1
              cursor-pointer
            "
          >
            <Icon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={30}
            className="
              text-neutral-400
              cursor-pointer
              hover:text-white
              transition
            "
          />
        </div>
        </div>
        
        <div className="hidden md:flex w-full justify-end pr-2">
          <div className="flex items-center gap-x-2 w-[120px]">
            <VolumeIcon
              onClick={toggleMute}
              className="cursor-pointer"
              size={34}
            />
            <Slider
              value={volume}
              onChange={(value) => setVolume(value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full px-2">
      <h1>{formatTime(Math.floor(duration))}</h1>
      <h1>{formatTime(currentTime)}</h1>
      </div>
      </>
   );
}

export default PlayerContent;