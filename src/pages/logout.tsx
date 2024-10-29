    import { Routes } from "@/config/routes";
import { useLogoutMutation } from "@/data/user";
import { useRouter } from "next/router";
import { useEffect } from "react"

function SignOut(){
    const { mutate:logout,isSuccess } = useLogoutMutation();
    const router = useRouter();

    useEffect(()=>{
        logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=>{
        if(isSuccess) {
            router.push(Routes.login);
        }
    },[isSuccess,router]);

    return null 

}

export default SignOut;
