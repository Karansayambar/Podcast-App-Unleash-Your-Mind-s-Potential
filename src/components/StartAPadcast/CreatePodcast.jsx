import { useState } from "react";
import InputComponent from "../Commen/Input/InputComponent";
import Button from "../Commen/Button/Button";
import Loading from "../../Loading";
import { toast } from "react-toastify";
import FileInput from "../Commen/Input/FileInput";
import TextArea from "../Commen/Input/TextArea";
import Header from "../Commen/Header";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

function CreatePodcast() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [displayImage, setDisplayImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        console.log("submitted");
        if (title && desc && displayImage && bannerImage) {
            setLoading(true);
            try {
                const bannerImageRef = ref(storage, `podcasts/${auth.currentUser.uid}_${Date.now()}`);
                await uploadBytes(bannerImageRef, bannerImage);
                const bannerImageUrl = await getDownloadURL(bannerImageRef);

                const displayImageRef = ref(storage, `podcasts/${auth.currentUser.uid}_${Date.now()}`);
                await uploadBytes(displayImageRef, displayImage);
                const displayImageUrl = await getDownloadURL(displayImageRef);

                const podcastData = {
                    title: title,
                    description: desc,
                    bannerImage: bannerImageUrl,
                    displayImage: displayImageUrl,
                    createdBy: auth.currentUser.uid,
                };

                await addDoc(collection(db, "podcasts"), podcastData);
                setTitle("");
                setDesc("");
                setBannerImage(null);
                setDisplayImage(null);

                toast.success("Podcast Submitted");
                setLoading(false);
            } catch (error) {
                toast.error(error.message);
                setLoading(false);
            }
        } else {
            toast.error("All Fields Are Required");
            setLoading(false);
        }
    };

    const displayImageHandle = (file) => {
        setDisplayImage(file);
    };

    const bannerImageHandle = (file) => {
        setBannerImage(file);
    };

    return (
        <>
            <Header />
            <div className="podcast-container">
                <div className="podcast">
                    <InputComponent type="text" state={title} placeholder="Title" setState={setTitle} required={true} />
                    <TextArea type="text" state={desc} placeholder="Description" setState={setDesc} required={true} />
                    <FileInput accept="image/*" id="display-image-input" fileHandleFunc={displayImageHandle} text="Upload Display Image" />
                    <FileInput accept="image/*" id="banner-image-input" fileHandleFunc={bannerImageHandle} text="Upload Banner Image" />
                    <Button text={loading ? <Loading color="grey" type="bars" /> : "Create Podcast"} onClick={handleSubmit} width={"large"}/>
                </div>
            </div>
        </>
    );
}

export default CreatePodcast;
