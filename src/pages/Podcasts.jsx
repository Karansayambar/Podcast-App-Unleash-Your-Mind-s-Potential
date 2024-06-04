import { useEffect, useState } from "react";
import Header from "../components/Commen/Header"
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../components/Commen/Input/InputComponent";
import PodcastCard from "../components/Podcasts/PodcastCard";

function PodcastsPage() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const podcasts = useSelector((state) => state.podcasts.podcasts)
  useEffect(() => {
    const unSubscribe = onSnapshot(query(collection(db, "podcasts")),
    (querySnapshot) => {
      const podcastData = [];
      querySnapshot.forEach((doc) => {
        podcastData.push({id : doc.id, ...doc.data()});
      });
      dispatch(setPodcasts(podcastData));
    },
    (error) => {
      console.error("error featchong podcast", error);
    }
  );
  return () => {
    unSubscribe();
  }
  },[dispatch]);
  console.log(podcasts);
  var filterPodcasts = podcasts.filter((item) => {
    return item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  });

  return (
    <div>
      <Header />
      <div className="wrapper" style={{marginTop : "2rem "}}>
        <h2>Discover Podcast</h2>
        <InputComponent
        type="text"
        state={search}
        setState={setSearch}
        placeholder="Search by Title"
        />
        {filterPodcasts.length > 0 ? (
           <div className="podcast-flex">
           {filterPodcasts.map((item) => {
          return <div key={item.uid}>
            <PodcastCard key={item.id} id={item.id} title={item.title} displayImage={item.displayImage}/>
            </div>
          })}
          </div>
        ) :  <p>{search ? "No Podcast Found" : "No Podcasts"}</p>}
      </div>
    </div>
  )
}

export default PodcastsPage;