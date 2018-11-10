import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../../constants';
import NewConversationForm from '../NewConversationForm/NewConversationForm';
import MessagesArea from '../MessagesArea/MessagesArea';
import Cable from '../Cables/Cables';
import './ConversationsList.css';

class ConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
      .then(res => res.json())
      .then(conversations => this.setState({ conversations }));
  };

  handleClick = id => {
    console.log(this);
    this.setState({ activeConversation: id });
    // this.addClass('active');
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  };

  render = () => {
    const { conversations, activeConversation } = this.state;

    return (
      <div className="ui grid conversationsList">
        <ActionCable
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}

        <div className="three wide column">
          <h2>Conversations</h2>
          <div className="ui secondary vertical menu">
            {mapConversations(conversations, this.handleClick)}
          </div>
          <NewConversationForm />
        </div>
        <div className="twelve wide stretched column">
          {activeConversation ? (
            <MessagesArea
              conversation={findActiveConversation(
                conversations,
                activeConversation
              )}
            />
          ) : null}
        </div>
      </div>
    );
  };
}

export default ConversationsList;

// helpers

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <span
        className="item"
        key={conversation.id}
        onClick={() => handleClick(conversation.id)}
      >
        {conversation.title}
      </span>
    );
  });
};
