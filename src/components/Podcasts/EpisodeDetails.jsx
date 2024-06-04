import { useState } from "react";
import Button from "../Commen/Button/Button";
import "./style.css"

function EpisodeDetails({index, title, description,audioFile, onClick, displayImage}) {
  const [showDesc, setShowDesc] = useState(false)
  const handleMouseEnter = () => {
    setShowDesc(true);
  }
  const handleMouseLeave = () => {
    setShowDesc(false);
  }
  console.log("displayImage",displayImage);

  return (
    <div className="episode-details"onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="episode-details-head">
        <img src={displayImage} alt="displayImage" height={"50vh"} width={"50vh"} style={{borderRadius:"50px"}}/>
        <span style={{display:"flex" , alignItems:"center", justifyContent:"space-between", width:"15vw"}}>
          <h3>{index}</h3>
        <h4> {title}</h4>
        </span>
          <Button text={"play"} onClick={() => onClick(audioFile)} width={"small"}/>
      </div>
      <p className={`episode-description ${showDesc ? 'show' : ''}`}>{description}</p>
    </div>
  )
}

export default EpisodeDetails

