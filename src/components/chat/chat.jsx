import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Container,
  FormControl,
  IconButton,
  Input,
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

export const Chat = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [userName, setUserName] = useState(''); // todo: save in context
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(''); // todo: save in context
  const [isChatPopoverOpen, setIsChatPopoverOpen] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  function toggleFullscreen() {
    setFullscreen(!fullscreen);
  }

  function fetchChats() {
    fetch(`https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
          console.log(data);
          setMessages(data.Items);
        });
    },
    1000, // fast polling
    // 60000, // slow polling
    currentChatId
  );

  function onChatChange(event) {
    setCurrentChatId(event.target.value);
  }

  function onChatMenuOpen() {
    fetchChats();
  }

  function onClickNewChat() {
    setIsChatPopoverOpen(true);
  }

  function onInputChange(event) {
    setInputText(event.target.value);
  }

  function onInputKeyUp(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  function sendMessage() {
    fetch('https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // tells REST that we will send the body data in JSON format
      },
      body: JSON.stringify({
        chatId: currentChatId,
        username: userName,
        text: inputText,
      }),
    });
    setInputText('');
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
        console.log(data);
        setChats([...chats, data.Item]);
        setCurrentChatId(data.Item.id);
      });
    setNewChatName('');
    setIsChatPopoverOpen(false);
  }

  return (
    <div>
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
                  value={currentChatId}
                  onChange={onChatChange}
                  onOpen={onChatMenuOpen}
                >
                  {chats.map((chat) => (
                    <MenuItem value={chat.id}>{chat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton
                aria-label="add"
                color="primary"
                id="create-new-chat-button"
                onClick={onClickNewChat}
                sx={{ alignSelf: 'end' }}
              >
                <AddIcon />
              </IconButton>
              <Popover
                open={isChatPopoverOpen}
                onClose={() => setIsChatPopoverOpen(false)}
                anchorEl={() =>
                  document.getElementById('create-new-chat-button')
                }
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <TextField
                  variant="standard"
                  label="New Chat"
                  placeholder="enter chat name"
                  onChange={(event) => setNewChatName(event.target.value)}
                  value={newChatName}
                  onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                      createNewChat();
                    }
                  }}
                  sx={{ margin: '1rem' }}
                />
              </Popover>
            </div>
            <div style={{ flexGrow: 1 }}></div>

            <div style={{ display: 'flex' }}>
              <TextField
                variant="standard"
                label="User"
                placeholder="username"
                onChange={(event) => setUserName(event.target.value)}
                value={userName}
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
                    isCurrentUser={userName === message.username}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
          <TextField
            variant="filled"
            disabled={userName === ''}
            placeholder={
              userName === ''
                ? 'enter a user name above to enable chat'
                : 'type to chat!'
            }
            onChange={onInputChange}
            value={inputText}
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