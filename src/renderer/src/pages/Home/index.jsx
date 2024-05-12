import React, { useState, useEffect } from 'react'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import axios from 'axios'

// Conditionally import ipcRenderer for Electron environment
let ipcRenderer
if (window.require) {
  const electron = window.require('electron')
  ipcRenderer = electron.ipcRenderer
}

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })

    // Listen for updateReady event and update button text
    if (ipcRenderer) {
      ipcRenderer.on('updateReady', () => {
        const container = document.getElementById('ready')
        container.innerHTML = 'New version ready!'
      })
    }

    // Cleanup listener when component unmounts
    return () => {
      if (ipcRenderer) {
        ipcRenderer.removeAllListeners('updateReady')
      }
    }
  }, [])

  // Function to send quitAndInstall message to Electron main process
  const handleQuitAndInstall = () => {
    if (ipcRenderer) {
      ipcRenderer.send('quitAndInstall')
    }
  }

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt="50px"
      p="20px"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      bg="gray.800"
      color="white"
    >
      <Heading as="h1" size="xl" mb="4" textAlign="center">
        Welcome to Discord
      </Heading>
      <Text fontSize="lg" textAlign="center">
        Your all-in-one voice, video, and text chat for gamers.
      </Text>
      <Text fontSize="lg" mt="8" textAlign="center">
        Join servers, find your friends, and explore communities.
      </Text>
      <Button colorScheme="blue" mt="8" width="full" as={RouterLink} to="/">
        Back to Login
      </Button>

      {/* New button for update */}
      {ipcRenderer && (
        <Button id="ready" mt="4" width="full" onClick={handleQuitAndInstall} variant="outline">
          No updates ready
        </Button>
      )}

      {/* Scrollable list of posts */}
      <Box mt="8" maxHeight="400px" overflowY="auto">
        <Heading as="h2" size="lg" mb="4" textAlign="center">
          Latest Posts
        </Heading>
        {posts.map((post) => (
          <Box key={post.id} bg="gray.700" p="4" borderRadius="md" mb="4">
            <Heading as="h3" size="md" mb="2">
              {post.title}
            </Heading>
            <Text>{post.body}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Home
