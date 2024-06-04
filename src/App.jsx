import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import SignupPage from './pages/Signup'
import Profile from './pages/Profile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { setUser } from './slices/userSlice'
import PrivateRoutes from './components/Commen/PrivateRoutes'
import CreateAPodcast from './pages/CreateAPodcast'
import PodcastsPage from './pages/Podcasts'
import PodcastDetails from './pages/PodcastDetails'
import CreateAEpisode from './pages/CreateAEpisode'

function App() {
  const dispatch = useDispatch();
   useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unSubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: user.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.log(error);
          }
        );
        return () => {
          unSubscribeSnapshot();
        };
      }
    });

    return () => {
      unSubscribeAuth();
    };
  }, [dispatch]);

  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path='/' element={<SignupPage/>}/>
        <Route element={<PrivateRoutes/>}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/start-a-podcast' element={<CreateAPodcast/>}/>
            <Route path='/podcasts' element={<PodcastsPage/>}/>
            <Route path='/podcasts/:id' element={<PodcastDetails/>}/>
            <Route path='/podcasts/:id/create-episode' element={<CreateAEpisode/>}/>
        </Route>
      </Routes>
    </Router>
    </>
  )
}
export default App;
