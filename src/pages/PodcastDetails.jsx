import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Commen/Header"
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import EpisodeDetails from "../components/Podcasts/EpisodeDetails";
import Button from "../components/Commen/Button/Button";
import AudioPlayer from "../components/Podcasts/AudioPlayer";

function PodcastDetails() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [podcast, setPodcast] = useState({});
    const [episodes, setEpisodes] = useState([]);
    const [playingFile, setPlayeingFile] = useState("");

    useEffect(() => {
        if(id){
            getData();
        }
        console.log(id);
    },[id,navigate])

    const getData = async() => {
        try{
            const docRef = doc(db, "podcasts", id);
            const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setPodcast({id : id, ...docSnap.data()})
        } else {
            console.log("No such document!");
            toast.error("No Such Document!")
            navigate("/Podcasts")
        }
        }catch(error){
            toast.error(error.message);
        }
    }
    useEffect(() => {
        const unSubscribe = onSnapshot(
            query(collection(db,"podcasts",id,"episodes")),
            (querySnapshot) => {
                const episodeData = [];
                querySnapshot.forEach((doc) => {
                    episodeData.push({id:doc.id, ...doc.data()})
                });
                setEpisodes(episodeData);
            },
            (error)=>{
                console.log("error fetching episode",error);
            }
        );
        return () => {
            unSubscribe();
        }
    },[id,navigate])
  return (
    <div>
        <Header/>
        <div className="wrapper no-margin">
            {podcast.id && ( 
            <div className="podcast-details-wrapper">
                <div className="poadcast-details-title">
                    <h2 className="podcast-details-heading">{podcast.title}</h2>
                    {podcast.createdBy === auth.currentUser.uid && <Button text={"Create Episode"} width={"small"} onClick={() => {navigate(`/podcasts/${id}/create-episode`)}}/>}
                </div>           
                 <div className="banner-podcast-detail">
                    <img src={podcast.bannerImage} alt={podcast.title}/>
                </div>
                <p className="podcast-details-description">{podcast.description}</p>
                <h2>Episodes</h2>
                {episodes.length > 0 ? (
                    <ol className="podcast-episodes">
                        {episodes.map((episode,index) => (
                            <EpisodeDetails
                                key={index}
                                index={index + 1}
                                title={episode.title}
                                description={episode.description}
                                audioFile={episode.audioFile}
                                displayImage={podcast.displayImage}
                                onClick={(file) => setPlayeingFile(file)}
                            />
                        ))}
                     </ol>
                ) : (
                    <p>No Episodes</p>
                )}
            </div> 
            )}
            {playingFile && <AudioPlayer audioSrc={playingFile} image={podcast.displayImage}/>}
        </div>
    </div>
  )
}

export default PodcastDetails