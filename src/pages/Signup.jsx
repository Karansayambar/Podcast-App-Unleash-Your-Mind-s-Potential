import { useState } from "react";
import Header from "../components/Commen/Header";
import Login from "../components/Auth/Login/Login";
import Signup from "../components/Auth/Signup.jsx/Signup";

function SignupPage() {
  const [flag , setFlag] = useState(false);
  function handleToggle(){
    setFlag(prevFlag => !prevFlag);
  }
  return (
    <>
      <Header />
      <div className="input-wrapper">
        {flag ? <Login/> : <Signup/>}
        <p onClick={handleToggle} style={{textAlign: "center"}}>
          {flag ? "Dont have an Account ? Signup"  : "Alredy have an Accounr ? Login"}
        </p>
      </div>
    </>
  );
}

export default SignupPage;
