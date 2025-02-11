import { useState, useEffect } from "react";
import { SendOutlined, AudioOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ChatMessageHeader from "./ChatMessageHeader";
import useMessages from "../hooks/useMessages";
import Loader from "../../../components/Loader";
import AutoResizeableTextarea from "../../../components/AutoResizeableTextarea";
import {
  setMessageText,
  setScrollToLastMessage,
  setSendMessageLoading,
} from "../../../redux/slices/chatSlice";
import { onSendMessage } from "../services";
import toast from "react-hot-toast";
import MessagesWrapper from "./MessagesWrapper";
import { useSpeechRecognition } from "react-speech-kit";

const ChatMessages = () => {
  useMessages();

  const {
    userId,
    selectedChat,
    messages,
    messagesLoading,
    messageText,
    sendMessageLoading,
  } = useSelector((state) => state.chatReducer);

  const dispatch = useDispatch();

  const [micAvailable, setMicAvailable] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      dispatch(setMessageText(messageText + " " + result));
    },
  });

  const startListening = () => {
    setIsListening(true);
    listen();
  };

  const stopListening = () => {
    setIsListening(false);
    stop();
  };

  const sendMessage = async () => {
    if (!selectedChat?._id || !messageText?.trim()) return;

    dispatch(setSendMessageLoading(true));

    try {
      const body = { text: messageText };
      const response = await onSendMessage(selectedChat._id, body);

      if (response?.success) {
        dispatch(setMessageText(""));
        dispatch(setScrollToLastMessage(true));
      } else {
        toast.error(response?.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong while sending the message.");
    }

    dispatch(setSendMessageLoading(false));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();

      // Insert a newline character at the cursor position
      const { selectionStart, selectionEnd } = e.target;
      const newText = `${messageText.substring(
        0,
        selectionStart
      )}\n${messageText.substring(selectionEnd)}`;
      dispatch(setMessageText(newText));

      // Move the cursor position after the inserted newline character
      e.target.setSelectionRange(selectionStart + 1, selectionStart + 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setMicAvailable(true))
      .catch(() => setMicAvailable(false));
  }, []);

  if (messagesLoading) {
    return (
      <div className="w-full h-full flex flex-col divide-y divide-dark-primary dark:divide-dark-secondary-200">
        <div className="flex-1 text-dark-primary dark:text-light-primary flex justify-center items-center text-sm sm:text-xl">
          <Loader iconSize={30} />
        </div>
      </div>
    );
  }

  if (!selectedChat) {
    return (
      <div className="w-full h-full flex flex-col divide-y divide-dark-primary dark:divide-dark-secondary-200">
        <div className="flex-1 text-dark-primary dark:text-light-primary flex justify-center items-center text-sm sm:text-xl">
          Please select a chat
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col divide-y divide-secondary-200">
      <ChatMessageHeader chat={selectedChat} />

      <MessagesWrapper messages={messages} userId={userId} />

      <div className="h-auto bg-light-primary dark:bg-primary p-2 mt-auto flex justify-center items-center gap-2">
        <AutoResizeableTextarea
          className="p-2 bg-transparent text-sm sm:text-[1rem] text-dark-primary dark:text-light-primary placeholder-dark-primary dark:placeholder-light-primary rounded-lg"
          placeholder="Type here..."
          maxHeight={80}
          disabled={sendMessageLoading}
          value={messageText}
          onChange={(e) => dispatch(setMessageText(e.target.value))}
          onKeyDown={handleKeyPress}
        />

        {micAvailable && (
          <button
            className={`min-w-[40px] p-2 rounded-md group ${
              isListening ? "bg-red-500" : "bg-gray-700"
            }`}
            disabled={sendMessageLoading}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? (
              "⏹"
            ) : (
              <AudioOutlined className="text-xl text-white" />
            )}
          </button>
        )}

        <button
          className="min-w-[40px] p-2 rounded-md group bg-blue-500 hover:bg-blue-600"
          disabled={sendMessageLoading}
          onClick={sendMessage}
        >
          <SendOutlined className="leading-[0] text-white text-2xl cursor-pointer translate-x-0 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default ChatMessages;
