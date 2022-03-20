import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Popover,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import { FooterS, TitleS } from '../common/common.styles';
import { useInterval } from '../../hooks/use-interval';
import { ChatContext } from '../../state/chat/context';
import { ChatActions } from '../../state/chat/reducer';

export const Chat = () => {
  const { username, chatId, dispatch: chatDispatch } = useContext(ChatContext);
  const [fullscreen, setFullscreen] = useState(false);
  const [chats, setChats] = useState([]);
  const newChatButtonEl = useRef(null);
  const [isChatPopoverOpen, setIsChatPopoverOpen] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [messageInputText, setMessageInputText] = useState('');
  const [messages, setMessages] = useState([]);

  function toggleFullscreen() {
    setFullscreen(!fullscreen);
  }

  function fetchChats() {
    fetch(`https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats`)
      .then((response) => response.json())
      .then((data) => {
        setChats(data.Items);
      });
  }

  useEffect(() => {
    fetchChats();
  }, []);

  useInterval(
    (params) => {
      const chatId = params[0];
      fetch(
        `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${chatId}/messages`
      )
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.Items);
        });
    },
    1000, // fast polling
    // 60000, // slow polling
    chatId
  );

  function setChatId(chatId) {
    chatDispatch({
      type: ChatActions.UPDATE_CHATID,
      chatId,
    });
  }

  function setUsername(username) {
    chatDispatch({
      type: ChatActions.UPDATE_USERNAME,
      username,
    });
  }

  function onChatMenuOpen() {
    fetchChats();
  }

  function onClickNewChat() {
    setIsChatPopoverOpen(true);
  }

  function onInputChange(event) {
    setMessageInputText(event.target.value);
  }

  function onInputKeyUp(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  function sendMessage() {
    const message = {
      chatId,
      username,
      text: messageInputText,
    };
    fetch('https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // tells REST that we will send the body data in JSON format
      },
      body: JSON.stringify({
        chatId,
        username,
        text: messageInputText,
      }),
    });
    setMessageInputText('');
  }

  function createNewChat() {
    fetch('https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // tells REST that we will send the body data in JSON format
      },
      body: JSON.stringify({
        name: newChatName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setChats([...chats, data.Item]);
        setChatId(data.Item.id);
      });
    setNewChatName('');
    setIsChatPopoverOpen(false);
  }

  return (
    <div data-testid="chat-page">
      <Container maxWidth="lg" className="page-content">
        {!fullscreen && (
          <TitleS
            variant="h2"
            sx={{
              typography: 'h2',
              marginTop: '2rem',
            }}
          >
            Chat
          </TitleS>
        )}

        <Paper elevation={4} sx={{ margin: fullscreen ? '1rem 0' : undefined }}>
          <Box
            sx={{
              display: 'flex',
              padding: '1rem',
            }}
          >
            <div style={{ display: 'flex' }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="chat-select-label">Chat</InputLabel>
                <Select
                  labelId="chat-select-label"
                  id="chat-select"
                  label="Chat"
                  value={chatId}
                  onChange={(event) => setChatId(event.target.value)}
                  onOpen={onChatMenuOpen}
                >
                  {chats.map((chat) => (
                    <MenuItem key={chat.id} value={chat.id}>
                      {chat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton
                aria-label="add"
                color="primary"
                aria-label="new-chat"
                onClick={onClickNewChat}
                sx={{ alignSelf: 'end' }}
                ref={newChatButtonEl}
              >
                <AddIcon />
              </IconButton>
              <Popover
                open={isChatPopoverOpen}
                onClose={() => setIsChatPopoverOpen(false)}
                anchorEl={newChatButtonEl.current}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div>
                  <TextField
                    variant="standard"
                    label="New Chat"
                    placeholder="enter chat name"
                    onChange={(event) => setNewChatName(event.target.value)}
                    value={newChatName}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        createNewChat();
                      }
                    }}
                    sx={{ margin: '1rem' }}
                  />
                </div>
              </Popover>
            </div>
            <div style={{ flexGrow: 1 }}></div>

            <div style={{ display: 'flex' }}>
              <TextField
                variant="standard"
                label="Username"
                placeholder="enter username"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
              />
              <IconButton
                aria-label="fullscreen"
                color="primary"
                onClick={toggleFullscreen}
              >
                {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            </div>
          </Box>

          <Box
            sx={{
              height: fullscreen
                ? 'calc(100vh - 15.8rem )'
                : 'calc(100vh - 35.3rem )',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column-reverse', // keep scroll at bottom
            }}
          >
            <Box sx={{ flexGrow: '1', background: '#C9E7F5', padding: '1rem' }}>
              <Stack spacing={2} direction="column-reverse">
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    user={message.username}
                    text={message.text}
                    isCurrentUser={username === message.username}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
          <TextField
            variant="filled"
            disabled={username === ''}
            placeholder={
              username === ''
                ? 'enter a user name above to enable chat'
                : 'type to chat!'
            }
            onChange={onInputChange}
            value={messageInputText}
            onKeyUp={onInputKeyUp}
            fullWidth
          />
        </Paper>
      </Container>
      {!fullscreen && <FooterS sx={{ marginTop: '6rem' }} />}
    </div>
  );
};

const Message = ({ user, text, isCurrentUser }) => {
  return (
    <div
      data-testid="chat__message"
      style={{
        display: 'flex',
        alignSelf: isCurrentUser ? 'end' : undefined,
        marginLeft: isCurrentUser ? '20%' : '0',
        marginRight: isCurrentUser ? '0' : '20%',
      }}
    >
      <Paper
        sx={{
          padding: '0.5rem',
          display: 'inline-block',
          background: isCurrentUser ? '#FCDDC7' : undefined,
        }}
      >
        {isCurrentUser ? text : `${user}: ${text}`}
      </Paper>
    </div>
  );
};
