import { useState } from "react"
import Header from "../components/Commen/Header"
import InputComponent from "../components/Commen/Input/InputComponent"
import FileInput from "../components/Commen/Input/FileInput";
import Button from "../components/Commen/Button/Button";
import Loading from "../Loading";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import TextArea from "../components/Commen/Input/TextArea";

function CreateAEpisode() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const audioFileHandle = (file) => {
    setAudioFile(file);
    console.log("audioFile", audioFile);
  }
  const HandleSubmit = async() => {
    setLoading(true)
    if(title && desc && audioFile && id){
      try{
        const audioRef = ref(storage, `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`);

        await uploadBytes(audioRef, audioFile);

        const audioUrl = await getDownloadURL(audioRef);
        const episodeData = {
          title : title,
          description : desc,
          audioFile : audioUrl,
        }
        await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
        toast.success("Episode Created Successfully");
        console.log("episode data",episodeData);
          console.log("audio file",audioFile.type);
        setLoading(false);
        navigate(`/podcasts/${id}`);
        setTitle("");
        setDesc("");
        setAudioFile("");
      }catch(error){
        toast.error(error.message);
        setLoading(false);
      }
    }else{
      toast.error("All Fields Are Required");
      setLoading(false);
    }
  }
  return (
    <div>
      <Header/>
      <div className="wrapper">
        <InputComponent type="text" placeholder={"Enter Title"} state={title} setState={setTitle} required={true}/>
        <TextArea type="text" placeholder={"Enter Description"} state={desc} setState={setDesc} required={true}/>
        <FileInput accept="audio/*" id="audio-file-input" fileHandleFunc={audioFileHandle}  text="Upload Audio File"/>
        <Button text={loading ? <Loading color={"grey"} type={"spin"}/> : "Create Episode"} width="large" onClick={HandleSubmit} disabled={loading}/>
      </div>
    </div>
  )
}

export default CreateAEpisode