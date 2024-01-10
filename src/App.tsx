import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Order, generateMessages, getAllCoolOrders } from '@likissdmd/warframe-market-prime-trash-buyer';
import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';



function App() {
  const [messages, setMessages] = useState<undefined | Array<string>>(undefined)
  const [isLoading, setIsLoading] = useState<undefined | boolean>(undefined)

  async function buttonClickerHandler() {
    setIsLoading(true)

    const allCoolOrders = await getAllCoolOrders({
      // filterOrder: (order) => {
      //   return order.platinum == 4 &&
      //     order.user.status == "ingame"
      // }
    })
    const messages = generateMessages(allCoolOrders)
    setMessages(messages)
    setIsLoading(false)

  }
  // isLoading ? (компонент загрузки) : (то что показывалось как обычно)
  return <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh' }}
  >
    <Grid item xs={3}>
      {
        isLoading ? <CircularProgress /> : (
          <div className="App">


            <Button
              onClick={buttonClickerHandler}
            >
              Click me
            </Button>
            {
              !messages ? null : (
                messages.length !== 0 ? (
                  <Stack>
                    <Typography>
                      {messages[0]}
                    </Typography>
                    <Typography>
                      {messages[1]}
                    </Typography>
                  </Stack>
                ) : (
                  <Typography>
                    No cool orders
                  </Typography>
                )
              )

            }

          </div>
        )
      }
    </Grid>
  </Grid>
}

export default App;
