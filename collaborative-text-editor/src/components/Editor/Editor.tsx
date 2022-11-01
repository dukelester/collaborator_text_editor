import React, { ChangeEvent, useState, useEffect } from 'react'
import { Box,Grid, Paper,Snackbar } from '@mui/material';

import { useSocket } from '../../hooks/useSocket';

const Editor = () => {
  const [text, setText] = useState("")
  const [users, setUsers] = useState([]);

const socket  = useSocket('https://realtimetexteditor.herokuapp.com/',
{ reconnectionAttempts: 5, reconnectionDelay: 5 , autoConnect: false})

  useEffect(() => {
   /** Start socket connection  */
    socket.connect()
   /** start socket event listeners  */
    startEventListeners()

  }, []);

const startEventListeners = () => {
  /** User connected event  */
  socket.on("user_connected", (users: string[]) => {
    console.log("User connected ... " + users);
  })

  /** Reconnect event */
  socket.io.on("reconnect", (attempt) =>{
    console.log("Reconnected on attempt: " + attempt)
  });
  /** Reconnect attempt event  */
  socket.io.on("reconnect_attempt",(attempt) =>{
    console.log("Reconnection on attempt: " + attempt)
  });
  /** Reconnection error event  */
  socket.io.on("reconnect_error",(error) =>{
    console.log("Reconnection error: " + error)
  });
  /** Reconnection fail event  */
  socket.io.on("reconnect_failed",() =>{
    console.log("Reconnection Failed: ");
    alert("We are not able to connect at the moment to the socket!")
  });
}
const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
  const target = event.target as typeof event.target & {
    text: { value: string };
  };
  setText(target.value)
}

useEffect(() =>{
  socket.emit("editor-state", text)
},[text])

useEffect(() =>{
  socket.on("editor-state", (data) => {
    setText(data)
    console.log(text)
  })
},[text])

  useEffect(() => {
    socket.on('user-list', (userlist) => {
      setUsers(userlist);
    });
  }, [users]);

  return (
    <React.Fragment>
      <Box >
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Paper className=''>
              <h3> {users.length} Online users</h3>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <div>
              <textarea
                rows={40}
                cols={100}
                id="editor"
                style={{
                  backgroundColor: '',
                  color: 'black',
                  fontSize: '15px',
                  marginTop: '40px'
                }}
                placeholder="Type Your Text..."
                onChange={onTextChange}
                value={text}
                name="text"
              ></textarea>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      />
    </React.Fragment>
  )
}

export default Editor
