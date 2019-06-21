import React, {Component} from 'react'
import {Launcher} from '../react-chat-window'
import {baseConnect} from "../../base/features/base-redux-react-connect";
import ChatActions from '../../redux/chat';


class Chat extends Component {
    _onMessageWasSent(message) {
        const {sendMessage} = this.props;

        sendMessage(message);
    }

    render() {
        const {messageList} = this.props;

        return (
            <div>
                <Launcher
                    agentProfile={{
                        teamName: 'Board Games',
                        imageUrl: 'https://files-cloud.enjin.com/smiley/13332_image014.gif?0'
                    }}
                    onMessageWasSent={this._onMessageWasSent.bind(this)}
                    messageList={messageList}
                    showEmoji
                />
            </div>
        );
    }
}

export default baseConnect(Chat,
    (state) => {
        console.log(state.chat);
        return {
            messageList: state.chat.messageList
        }
    },
    {
        sendMessage: ChatActions.sendMessage
    }
);