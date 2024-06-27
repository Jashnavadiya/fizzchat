import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import isTyping from "../../zustand/isTyping";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
const [message,setMessage]=useState('')
const {isTyping,setIsTyping}=useConversation()

const {loading,sendMessage}=useSendMessage()
const handleSubmit=async(e)=>{
	e.preventDefault();
	if(!message) return
	await sendMessage(message);
	setMessage('')
}
const valueOfMessage=(e)=>{
	
	console.log(e.target.value.length);
	if(e.target.value.length>0){
		setIsTyping(true)
	}
	else{
		setIsTyping(false)
	}
	setMessage(e.target.value)
}

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={valueOfMessage}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
				{loading ? <span className="loading loading-spinner"></span> :<BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;