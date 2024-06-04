import { useState } from "react";
import Button from "../../Commen/Button/Button";
import InputComponent from "../../Commen/Input/InputComponent";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../Loading";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async() =>{
    console.log("handling signup");
    setLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch(setUser({
          name: userData.name,
          email: user.email,
          uid: user.uid,
        }));
        navigate("/profile");
        setLoading(false);
        toast.success("User Successfully Login");
      } else {
        console.error("No such document!");
         toast.error("No Such User Exist")
      }
    } catch (error) {
      console.error(error);
       toast.error("No Such User Found")
    }
    setLoading(false);
  }
  return (
    <>
    <h2>login</h2>
        <InputComponent type="email" state={email} placeholder="Email" setState={setEmail} required={true}/>
        <InputComponent type="password" state={password} placeholder="Password" setState={setPassword} required={true}/>
        <Button text={loading ? <Loading type={"bubbles"} color={"grey"}/> : "login"} onClick={handleClick} width={"large"}/>
    </>
  )
}

export default Login