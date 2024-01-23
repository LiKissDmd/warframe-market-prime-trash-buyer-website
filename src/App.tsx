import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Order, generateMessages, getAllCoolOrders } from '@likissdmd/warframe-market-prime-trash-buyer';
import { Alert, BottomNavigation, BottomNavigationAction, Box, Button, Chip, CircularProgress, Container, Grid, Link, Stack, Typography } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


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
 


  return (
    <Container>
      
      <Grid
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


                <Button variant='outlined'
                  onClick={buttonClickerHandler}
                >
                  Click me
                </Button>

                <Box marginTop={"16px"}>
                  {
                    !messages ? null : (
                      messages.length !== 0 ? (
                        <Stack spacing={1.5}>
                          {
                            messages.map(function (message) {
                              return <Chip  icon={<ContentCopyIcon fontSize="small" />} label={message} variant="outlined" onClick={function () {
                                navigator.clipboard.writeText(message)
                              }} />
                            })
                          }
                        </Stack>
                      ) : (
                        <Typography>
                          No cool orders
                        </Typography>
                      )
                    )

                  }
                </Box>

              </div>
            )
          }
        </Grid>
      </Grid>
      {/* BottomNavigation component */}
      <Box
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <Alert severity="warning" sx={{ maxWidth: '600px', margin: 'auto' }}><Link href="https://mybrowseraddon.com/access-control-allow-origin.html" target="_blank" rel="noopener noreferrer">
      This
    </Link> or similar browser extension is required because warframe market has strict CORS which does not let this website to make requests to it. We guess it is a bug, not intented configuration.</Alert>
      </Box>
    </Container>
  )
}

export default App;
