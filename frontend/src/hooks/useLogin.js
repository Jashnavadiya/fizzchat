import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useLogin = () => {
    const {setAuthUser}=useAuthContext()
    const [loading,setLoading]=useState(false)
    const login =async(username,password)=>{
        const success=handleInputErrors(username,password)
    if(!success) return;
        setLoading(true)
        try {
            const res=await fetch('/api/auth/login',{
                method:"POST",
                headers:{"Content-Type":"Application/json"},
                body:JSON.stringify({username,password})
            })
            const data=await res.json()

            if(data.error){
                throw new Error(data.error) 
            }

            localStorage.setItem('chat-user',JSON.stringify(data))

            setAuthUser(data)

        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }
    return {loading,login}
}

export default useLogin

function handleInputErrors(username,password){
    if(!password||!username){
        toast.error('Please Fill all fields')
        return false;
    }
    return true
}
