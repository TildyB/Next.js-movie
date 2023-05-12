// import axios from "axios";
import { useEffect,useContext } from "react";
import { UserContext } from "../context/UserContext";
import sendCode from "../utils/sendCode";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import Lottie from "lottie-react"
import loadingAnimation from "../public/65556-movies-title-animation.json"
import styles from "./callbackpage.module.css"



const CallbackPage = () => {

    const {setIsLoggedIn} = useContext(UserContext)

    const router = useRouter()
    useEffect(() => {

        const urlSearchParams = new URLSearchParams(window.location.search)
        const code = urlSearchParams.get("code")
        console.log(code)
        const init = async () => {
            const data = await sendCode(code)
            localStorage.setItem("token", data.sessionToken) // sub-ot, name-et ebbol kiszedni decode-utan
            localStorage.setItem("user", data.username) // ez nem kell
            setIsLoggedIn(true)
            if(process.env.NODE_ENV === "development"){
                setTimeout(() => {
                    router.push("/")
                }, 1700);
            } 
        }
        init()
    }, []);


    return (
       <div className={styles.mainDiv}>
           <Lottie animationData={loadingAnimation} loop={false} style={{ width: "50%" }} />
       </div>
      
    );
}

export default CallbackPage;