import { useEffect, useRef, useState } from "react";
import { IoPauseOutline, IoPlaySkipForwardOutline, IoPlaySkipBackOutline, IoMusicalNotes, IoVolumeMedium, IoPlay, IoVolumeOff } from "react-icons/io5";

import "./style.css";
function AudioPlayer({audioSrc, image}) {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMute, setIsMute] = useState(false);
    const[volume, setVolume] = useState("");
    const[duration, setDuration] = useState(0);
    const[currentTime, setCurrentTime] = useState(0);

    const handleDuration = (e) => {
        setCurrentTime(e.target.value);
        audioRef.current.currentTime = e.target.value;
    }

    const handleVolume = (e) => {
        setVolume(e.target.value)
        audioRef.current.volume = e.target.value;
    }
    const handleToggle = () => {
        setIsPlaying(!isPlaying);
    }
    const handleToggleMute = () => {
        setIsMute(!isMute);
    }

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);

        return() => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetafata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded)
        }
    },[])

    const handleTimeUpdate = () => {
        setCurrentTime(parseFloat(audioRef.current.currentTime));
    }

    const handleLoadedMetadata = () => {
        setDuration(parseFloat(audioRef.current.duration));
    }

    const handleEnded = () => {
        setCurrentTime(0);
        setIsPlaying(false);
    }

    useEffect(() => {
        if(isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
    },[isPlaying])

    useEffect(() => {
        if(!isMute){
            audioRef.current.volume = 1 ;
            setVolume(1);
        }else{
            audioRef.current.volume = 0
            setVolume(0);
        }
    },[isMute])

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes} : ${seconds < 10 ? "0" : ""} ${seconds}`
    }

  return (
    <div className="custom-audio-player">
        <span style={{position:"relative"}}>
            <IoMusicalNotes  className={isPlaying ? "music-icon-play icon" : "music-icon icon"}/>
            <img className="coustom-audio-player-display-image" src={image} alt="display-image"/>
        </span>
        <div className="audio-bar">
            <span className="play-icons">
                <IoPlaySkipBackOutline className="icon"/>
               <p onClick={handleToggle}> {isPlaying ? <IoPauseOutline className="icon"/> : <IoPlay className="icon"/>}</p>
                <IoPlaySkipForwardOutline className="icon"/>
            </span>
            <div className="input-bar">
                <p>{formatTime(currentTime)}</p>
                    <div className="range-slider-container">
                        <audio ref={audioRef} max={duration} value={currentTime} src={audioSrc}/>
                    <input type="range" max={duration} value={currentTime} step={0.01} onChange={handleDuration}/>
                    </div>
                <p>{formatTime(duration - currentTime)}</p>
            </div>
        </div>
        <div className="sound-bar">
            <p onClick={handleToggleMute}>{isMute ? <IoVolumeOff className="audio-icon icon"/> : <IoVolumeMedium className="audio-icon icon"/>}</p>
            <input value={volume} min={0} max={1} step={0.01} onChange={handleVolume} type="range"/>
        </div>
    </div>
  )
}

export default AudioPlayer