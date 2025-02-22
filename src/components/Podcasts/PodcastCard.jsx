import { Link } from "react-router-dom";
import "./style.css";

function PodcastCard({id, title, displayImage}) {
  return (
    <Link to= {`/podcasts/${id}`}>
    <div className="podcast-card">
        <img className="display-image-podcast" src={displayImage} />
        <p className="title-podcast">{title}</p>
    </div>
    </Link>
  )
}

export default PodcastCard