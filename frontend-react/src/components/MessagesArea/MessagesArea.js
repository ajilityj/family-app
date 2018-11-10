import React from 'react';
import NewMessageForm from '../NewMessageForm/NewMessageForm';

const MessagesArea = ({ conversation: { id, title, messages } }) => {
  return (
    <div className="ui messagesArea">
      <h2>{title}</h2>
      {orderedMessages(messages)}
      <NewMessageForm conversation_id={id} />
    </div>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map(message => {
    return (
      <div className="ui card">
        <div className="content">
          <div className="summary" key={message.id}>
            {message.text}
          </div>
        </div>
      </div>
    );
  });
};
