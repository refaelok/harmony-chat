import React, {Component} from 'react'
import {Launcher} from '../react-chat-window'
import {harmonyConnect} from "../../base/features/harmony-redux-react-connect";
import { sendMessage } from '../../actions/posts/actions_posts';

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

export default harmonyConnect(Chat,
    (state) => {
        console.log(state.chat);
        return {
            messageList: state.chat.messageList
        }
    },
    {
        sendMessage
    }
);