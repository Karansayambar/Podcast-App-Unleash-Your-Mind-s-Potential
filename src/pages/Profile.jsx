import { useSelector } from "react-redux";
import Header from "../components/Commen/Header";
import Loading from "../Loading";
import Button from "../components/Commen/Button/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

function Profile() {
  const user = useSelector((state) => state.user.user);

  const handlelogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logout Successfully")
      })
      .catch((error) => {
        toast.error(error.message);
      })
  }
  return (
    <>
      <Header />
      <div className="wrapper">
        <h2>Profile</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <Button onClick={handlelogout} text={"Logout"}/>
        </div>
      ) : (
        <Loading type={"spin"} color={"grey"}/>
      )}
      </div>
    </>
  );
}

export default Profile;
