import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
    const { loading, messages } = useGetMessages()
    useListenMessages()
    const lastMessageRef = useRef()
    console.log(messages);

    useEffect(() => {
        setTimeout(()=>{
            lastMessageRef.current?.scrollIntoView({behavior:"smooth"})
        },150)
    }, [messages])

    return (
        <div className='px-4 message_scrolling flex-1 overflow-auto'>
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};
export default Messages;