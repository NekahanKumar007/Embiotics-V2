import { useState } from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

function ChatBox() {
    // Modal part
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  //chatbox logic

  const API_KEY = "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";

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello There",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    // old +new messages
    //update

    setMessages(newMessages);

    // User is typing

    setTyping(true);
    //process
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    //Chat Messages { sender: "user" or "ChatGPT" , message: "The message content here"}
    // apiMessages {role : "user" or "assistant": content : "The ,message content here" }

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });
    // role "user" => a message from the user, "assistant" => a response from CHATGPT
    // "system" => generally one initial message  defining how we want CHATGPT to talk

    const systemMessage = {
      role: "system",
      content: "Explain like a experienced person ",
    };
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages, // [message1,messasge2,message3 etc]
      ],
    };
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // console.log(data);
        // console.log(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setTyping(false);
      });
  }

  return (
    <>
      <button
        onClick={handleModalOpen}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full py-4 px-6  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <BsFillChatLeftTextFill size={30} />
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-md">
            <div className="flex justify-end">
              <button className="text-gray-500" onClick={handleModalClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold mb-6">Chat With Us</h2>
              <div className="relative  h-[600px] w-[600px] ">
                <MainContainer>
                  <ChatContainer>
                    <MessageList
                      scrollBehavior="smooth"
                      typingIndicator={
                        typing ? <TypingIndicator content="Typing" /> : null
                      }>
                      {messages.map((message, i) => {
                        return <Message key={i} model={message} />;
                      })}
                    </MessageList>
                    <MessageInput
                      placeholder="Type message here"
                      onSend={handleSend}
                    />
                  </ChatContainer>
                </MainContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;
