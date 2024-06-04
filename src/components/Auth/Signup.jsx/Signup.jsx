import { useState } from "react";
import Button from "../../Commen/Button/Button"
import InputComponent from "../../Commen/Input/InputComponent"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../../firebase"
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {setUser} from "../../../slices/userSlice"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../Loading";

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async() =>{
    setLoading(true);
    console.log("handling signup");
    if(password === confirmPassword && password.length >= 6){
        try{
            const userCrediantials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCrediantials.user;
            await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
        });
            dispatch(setUser({
                name : fullName,
                email : user.email,
                uid : user.uid,
            }))
            navigate("/profile")
            console.log(user);
            toast.success("Signup Successfully");
            setLoading(false);
        }catch(error){
            console.log(error)
            toast.error(error.message);
        }
    }else{
        if(password != confirmPassword){
            toast.error("Password Should Be Match");
        }else if(!email || !password || !fullName){
            toast.error("All Fields Are Required");
        }
        else if(password.length <= 6){
            toast.error("Password Should Be Greater Than 6 Characters");
        }
    }
    setLoading(false);
  }
  return (
    <>
    <h2>signup</h2>
    <InputComponent type="text" state={fullName} placeholder="Full Name" setState={setFullName} required={true}/>
        <InputComponent type="email" state={email} placeholder="Email" setState={setEmail} required={true}/>
        <InputComponent type="password" state={password} placeholder="Password" setState={setPassword} required={true}/>
        <InputComponent type="password" state={confirmPassword} placeholder="Confirm Password" setState={setConfirmPassword} required={true}/>
        <Button text={loading ? <Loading type={"bubbles"} color={"grey"}/> : "signup"} disabled={loading} onClick={handleClick} width={"large"}/>
    </>
  )
}

export default Signup