import React, { useState, useRef, useEffect } from "react";
import { MdAttachFile } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import Google_Gemini from "../assets/Google_Gemini_Logo.png";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Prompt = ({ sidebarOpen, setSidebarOpen }) => {
  const token = localStorage.getItem("token");
  const [InputValue, SetInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // ✅ Load old messages
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const saved = localStorage.getItem(`promptHistory_${user._id}`);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        console.warn("Error parsing promptHistory");
      }
    }
  }, []);

  //  Save messages
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (messages.length > 0) {
      localStorage.setItem(
        `promptHistory_${user._id}`,
        JSON.stringify(messages)
      );
    }
  }, [messages]);

  //  Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendPromptoBackend = async (text) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/deepseek/prompt`,
        { content: text },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return res.data.Message;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    const val = InputValue.trim();
    if (!val || loading) return; //  block user if AI responding

    const userMsg = { role: "user", content: val };
    setMessages((prev) => [...prev, userMsg]);
    SetInputValue("");

    const aiResponse = await sendPromptoBackend(val);
    const aiMsg = { role: "ai", content: aiResponse };
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    //  outer div scrollable banaya
    <div className="flex flex-col items-center w-full min-h-screen bg-[#1a1a1a] relative pb-28 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
      {/* Sidebar toggle button */}
      <div className="fixed top-4 left-4 md:hidden z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg"
        >
          ☰
        </button>
      </div>

      {/* Header */}
      <div className="mt-[90px] text-center">
        <div className="flex justify-center items-center gap-2">
          <img src={Google_Gemini} alt="Gemini" className="h-10 w-10" />
          <h1 className="text-3xl font-semibold text-white">Hi, I'm Gemini</h1>
        </div>
        <p className="text-gray-400 text-base mt-1">
          How can I help you today?
        </p>
      </div>

      {/*  Messages Area (Scrollable) */}
      <div className="flex flex-col w-full  items-center mt-8 px-4 space-y-3  max-h-[70vh] ">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full md:max-w-2xl ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                msg.role === "user"
                  ? "bg-blue-900 text-right"
                  : "bg-[#3535359b] text-left"
              } text-white w-fit max-w-[95%] md:max-w-[90%] p-3 md:p-4 rounded-2xl break-words whitespace-pre-wrap leading-relaxed shadow-lg `}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => (
                    <p
                      className="whitespace-pre-wrap break-words"
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                        lineHeight: "1.6",
                      }}
                      {...props}
                    />
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      className="block bg-[#2f2f2f] text-gray-200 rounded-md p-2 my-2 overflow-x-auto"
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all",
                      }}
                      {...props}
                    />
                  ),
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex w-full md:max-w-2xl justify-start">
            <div className="bg-gray-700 text-white px-4 py-2 rounded-2xl">
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>

      {/* Input Box (Fixed Bottom) */}
      <div className="fixed bottom-0 w-full flex justify-center py-4 px-8">
        <div className="w-full md:max-w-2xl bg-[#2f2f2f] rounded-[2rem] px-4 md:px-6 py-3 md:py-4 shadow-md flex flex-col gap-3">
          <input
            type="text"
            placeholder={loading ? "Wait for response..." : "Message Gemini..."}
            value={InputValue}
            onChange={(e) => SetInputValue(e.target.value)}
            onKeyDown={handleDown}
            className={`bg-transparent w-full text-white placeholder-gray-400 text-lg outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} //  disable during AI response
          />

          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                disabled={loading}
                className={`border border-gray-500 text-white text-sm px-3 py-1 rounded-full transition ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
                }`}
              >
                DeepThink
              </button>
              <button
                disabled={loading}
                className={`border border-gray-500 text-white text-sm px-3 py-1 rounded-full transition ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
                }`}
              >
                Search
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                className={`text-gray-400 transition ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:text-white"
                }`}
                disabled={loading}
              >
                <MdAttachFile />
              </button>
              <button
                onClick={handleSend}
                disabled={loading}
                className={`transition rounded-full p-2 text-white ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gray-500 hover:bg-blue-900"
                }`}
              >
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
