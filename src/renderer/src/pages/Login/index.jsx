import React, { useEffect, useState } from 'react'
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Link } from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

let ipcRenderer
if (window.require) {
  const electron = window.require('electron')
  ipcRenderer = electron.ipcRenderer
}

const Login = () => {
  const navigate = useNavigate()
  const [downloadProgress, setDownloadProgress] = useState(0)

  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.on('downloadProgress', (event, progress) => {
        setDownloadProgress(progress)
      })
    }

    return () => {
      if (ipcRenderer) {
        ipcRenderer.removeAllListeners('downloadProgress')
      }
    }
  }, [])

  const handleQuitAndInstall = () => {
    if (ipcRenderer) {
      ipcRenderer.send('quitAndInstall')
    }
  }

  const handleLogin = () => {
    // Add your login logic here
    // For example, navigate to the home page after successful login
    navigate('/home')
  }

  return (
    <Box
      maxW="400px"
      w="100%"
      p="6"
      borderWidth="1px"
      borderRadius="8px"
      boxShadow="md"
      bg="#fff"
      color="white"
    >
      {/* Updated button for update with progress */}
      {ipcRenderer && (
        <Button mt="4" width="full" onClick={handleQuitAndInstall} variant="outline">
          {downloadProgress > 0 && downloadProgress < 100
            ? `Downloading Update: ${downloadProgress}%`
            : 'No updates ready'}
        </Button>
      )}
      <Box textAlign="center">
        <Heading as="h2" size="lg" mb="4" fontWeight="bold" color="#7289da">
          Welcome back!
        </Heading>
      </Box>
      <FormControl id="email" mt="4">
        {/* Your input fields */}
      </FormControl>
      <FormControl id="password" mt="4">
        {/* Your input fields */}
      </FormControl>
      <Button
        colorScheme="blue"
        width="full"
        mt="6"
        onClick={handleLogin}
        _hover={{ bg: '#5865f2' }}
      >
        Login
      </Button>
      <Text mt="4" textAlign="center" color="white">
        {/* Your other text and link components */}
      </Text>
      <Text mt="2" textAlign="center" color="white">
        {/* Your other text and link components */}
      </Text>
    </Box>
  )
}

export default Login
