/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useOptimistic, useState, useRef } from "react";
const MessageForm = ({ addOptimisticMessage, sendMessage }) => {
  // Create a reference to the form
  const formRef = useRef();

  // This function is called when the form is submitted
  const formAction = async (formData) => {
    addOptimisticMessage(formData.get("message"));

    // Clear the form
    formRef.current.reset();

    await sendMessage(formData);
  };

  return (
    <form action={formAction} ref={formRef} className="wrapper">
      <input type="text" name="message" placeholder="Hello!" />
      <button type="submit">Send</button>
    </form>
  );
};

const Thread = ({ messages, sendMessage }) => {
  // The useOptimistic hook is used to add an optimistic message to the list of messages
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  return (
    <div>
      <MessageForm
        addOptimisticMessage={addOptimisticMessage}
        sendMessage={sendMessage}
      />
      {optimisticMessages.map((message, index) => (
        <div key={index} className="message">
          <span>{message.text}</span>
          {message.sending && <small>(Sending...)</small>}
        </div>
      ))}
    </div>
  );
};

const deliverMessage = async (message) => {
  // Simulate a delay
  await new Promise((res) => setTimeout(res, 1000));
  return message;
};

const MessageBox = () => {
  const [messages, setMessages] = useState([]);

  async function sendMessage(formData) {
    const sentMessage = await deliverMessage(formData.get("message"));

    setMessages((messages) => [...messages, { text: sentMessage }]);
  }

  return (
    <div className="screen wrapper">
      <div>
        <h1 className="header">useOptimistic hook</h1>
        <p className="para-text">
          Another common UI pattern when performing a data mutation is to show
          the final state optimistically while the async request is underway.
          React 19 is adding a new hook called useOptimistic to make this
          easier:
        </p>
        <div>
          <h2 className="subheader">Message sending example</h2>
          <p className="example-text">
            The below example depicts how we can use the useOptimistic hook to
            make optimistic (real-time stuff that's gonna happen in majority of
            the cases unless you have done black magic in your code) updates to
            the UI when the actual method is still processing. This can be
            helpful in the case of sending messages, likes and comments.
          </p>
        </div>
      </div>
      <Thread messages={messages} sendMessage={sendMessage} />
    </div>
  );
};

export { MessageBox as UseOptimisticExample };
