import { useContext,useEffect } from "react";
import { AuthContext } from "../services/AuthContext";
import { login,register,logout,getme,updateUser } from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context

    const handleLogin = async ({email, password}) =>{
        setLoading(true)
        try{
      const data = await login({email, password})
        setUser(data.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }
    const handleRegister = async ({username,email, password}) => {
        setLoading(true)
        try{
        const data = await register({username,email, password})
        setUser(data.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
        
     
    }
    const handleLogout = async () =>{
        setLoading(true)
        try{
             await logout()
             setUser(null)
        }catch(err){
            console.log(err)
        }finally{
             setLoading(false)
        }
    
     
    }

    const handleUpdateUser = async ({username, email}) => {
        setLoading(true)
        try{
            const data = await updateUser({username, email})
            setUser(data.user)
            return data
        }catch(err){
            console.log(err)
            throw err
        }finally{
            setLoading(false)
        }
    }

      useEffect(()=>{
        const getandSetuser = async() => {
            try{
                const data = await getme()
                if(data?.user) {
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            }catch(err){
                console.log(err)
                setUser(null)
            }finally{
                setLoading(false)
            }
        }
        getandSetuser()
    },[setUser, setLoading])
    return {user, loading,handleRegister,handleLogout,handleLogin,handleUpdateUser}
    
}