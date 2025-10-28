import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import LoadingSpinner from '../assets/loading-spinner.gif';
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessages);
    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading-spinner" src={LoadingSpinner} alt="loading" />,
        sender: 'robot',
        id: crypto.randomUUID
      }
    ])

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button
        className="send-button"
        onClick={sendMessage}
      >Send</button>
    </div>
  );
}