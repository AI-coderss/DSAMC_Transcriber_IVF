import React, { useEffect, useState, useRef } from "react";
import useTranscriptStore from "../store/useTranscriptStore";
import useChatVisibilityStore from "../store/useChatVisibilityStore"; 
import ChatInputWidget from "../components/ChatInputWidget";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";
import PDFDownloader from "../components/PdfDownloader";
import AudioPlayer from "../components/AudioPlayer"; 
import "../styles/Chat.css"; 

const AISecondOpinion = () => {
  const { transcript, setTranscript } = useTranscriptStore(); 
  const { isChatVisible, setChatVisible } = useChatVisibilityStore(); 
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("aiSecondOpinionMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesStartRef = useRef(null);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, 
    dangerouslyAllowBrowser: true,
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToRevealLastMessage = () => {
    if (messagesEndRef.current && messagesEndRef.current.previousElementSibling) {
      messagesEndRef.current.previousElementSibling.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => alert("Copied to clipboard!"),
      (err) => console.error("Could not copy text: ", err)
    );
  };

  useEffect(() => {
    const isFirstLoad = sessionStorage.getItem("aiSecondOpinionFirstLoad");
    if (!isFirstLoad) {
      localStorage.removeItem("aiSecondOpinionMessages");
      sessionStorage.setItem("aiSecondOpinionFirstLoad", "true");
      setMessages([]); 
    }
  }, []);

  useEffect(() => {
    if (transcript) {
      setMessages([]); 
      setTranscript(null); 
      processAIResponse(transcript); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, setTranscript]);

  useEffect(() => {
    localStorage.setItem("aiSecondOpinionMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isTyping) {
      scrollToRevealLastMessage();
    }
  }, [isTyping]);

  const handleNewMessage = async (userMessage) => {
    const userText = userMessage.text || "";

    setMessages((prevMessages) => [
      ...prevMessages,
      { msg: userText, who: "me" },
    ]);

    setChatVisible(true); 
    await processAIResponse(userText);
  };

  const processAIResponse = async (userText) => {
    setIsTyping(true);

    const promptTemplate = `You are a doctor AI assistant you produce well-detailed report based on the transcript input. Your main task is to provide medical diagnosis, recommend lab tests and investigations,
                            and prescribe the appropriate drugs based on the user's input reply in English only  you must use medical terminologies when you reply, You must reply in English regardless of the input Transcript language.
                            **The diagnosis** : 
                            **Differential diagnosis**:
                            **The recommended lab test and investigation**: list them 
                            **Drug prescriptions**: prescribe the appropriate drugs based on the diagnosis
                            **Prognosis** :
                            **Recommendations to The Doctor**: recommend the doctor with regards to case what they supposed to do ?
                            **Treatment plan** : set the appropriate treatment plan for the doctor including the steps to treat the Patient;`
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: promptTemplate },
          ...messages.map((message) => ({
            role: message.who === "me" ? "user" : "assistant",
            content: message.msg,
          })),
          { role: "user", content: userText },
        ],
        stream: true,
      });

      let assistantMessage = "";

      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || "";
        assistantMessage += content;

        updateMessages(assistantMessage);
        scrollToBottom();
      }

      setIsTyping(false);
    } catch (error) {
      console.error("Error streaming AI response:", error);
      setIsTyping(false);
    }
  };

  const updateMessages = (assistantMessage) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      const lastMessage = updatedMessages[updatedMessages.length - 1];

      if (lastMessage?.who === "bot") {
        lastMessage.msg = assistantMessage;
      } else {
        updatedMessages.push({
          msg: assistantMessage,
          who: "bot",
        });
      }

      return updatedMessages;
    });
  };

  const toggleChatVisibility = () => {
    setChatVisible(!isChatVisible); 
  };

  return (
    <>
      {isChatVisible && (
        <div className="chat-content">
          <div ref={messagesStartRef}></div>
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.who}`}>
              {message.who === "bot" && (
                <>
                  <figure className="avatar">
                    <img src="./img2.gif" alt="Assistant Avatar" />
                  </figure>
                  <div className="message-text">
                    <ReactMarkdown>{message.msg}</ReactMarkdown>
                    <div className="message-actions">
                      <PDFDownloader
                        content={message.msg}
                        fileName={`AI_Response_${index + 1}.pdf`}
                      />
                      <span
                        className="copy-icons"
                        onClick={() => copyToClipboard(message.msg)}
                        title="Copy to clipboard"
                      >
                        <i className="fas fa-copy"></i>
                      </span>
                      {/* Moved the AudioPlayer to the bottom-right */}
                      <div className="audio-player-bottom-right">
                        <AudioPlayer text={message.msg} />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {message.who === "me" && (
                <>
                  <div className="message-text">{message.msg}</div>
                  <figure className="user-avatar">
                    <img src="./img.gif" alt="User Avatar" />
                  </figure>
                </>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="chat-message bot loading">
              <div
                style={{
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <lottie-player
                  src="https://lottie.host/47000d95-a3cd-43b8-ba63-fc7b3216f1cf/6gPsoPB6JM.json"
                  style={{ width: "130px", height: "130px" }}
                  loop
                  autoplay
                  speed="1"
                  direction="1"
                  mode="normal"
                ></lottie-player>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
      )}
      <button className="toggle-button" onClick={toggleChatVisibility}>
        {isChatVisible ? "-" : "+"}
      </button>
      <ChatInputWidget onSendMessage={handleNewMessage} />
    </>
  );
};

export default AISecondOpinion;












