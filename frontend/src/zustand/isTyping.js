
import { create } from "zustand";

const isTyping=create((set)=>({
    userTyping:false,
    setUserTyping: (userTyping)=> set({userTyping}),
   
}))
export default isTyping