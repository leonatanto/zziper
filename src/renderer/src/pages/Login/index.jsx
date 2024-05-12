import React from 'react'
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Link } from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

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
      bg="#36393f"
      color="white"
    >
      <Box textAlign="center">
        <Heading as="h2" size="lg" mb="4" fontWeight="bold" color="#7289da">
          Welcome back!
        </Heading>
      </Box>
      <FormControl id="email" mt="4">
        <FormLabel color="#7289da">Email</FormLabel>
        <Input
          type="email"
          bg="#2f3136"
          color="white"
          border="none"
          borderRadius="md"
          _focus={{ bg: '#40444b' }}
          placeholder="Enter your email"
          p="3"
          fontSize="sm"
        />
      </FormControl>
      <FormControl id="password" mt="4">
        <FormLabel color="#7289da">Password</FormLabel>
        <Input
          type="password"
          bg="#2f3136"
          color="white"
          border="none"
          borderRadius="md"
          _focus={{ bg: '#40444b' }}
          placeholder="Enter your password"
          p="3"
          fontSize="sm"
        />
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
        Don't have an account?{' '}
        <Link as={RouterLink} color="#7289da" to="/signup">
          Register
        </Link>
      </Text>
      <Text mt="2" textAlign="center" color="white">
        Forgot your password?{' '}
        <Link as={RouterLink} color="#7289da" to="/forgot-password">
          Reset it here
        </Link>
      </Text>
    </Box>
  )
}

export default Login
