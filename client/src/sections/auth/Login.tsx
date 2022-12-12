import React, { useState, useEffect } from 'react'
import { Form, Button, Input, Card, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { trpc } from '../../trpc'
import MainContainer from '../../styled-components/MainContainer'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const loginMutation = trpc.loginUser.useMutation()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event: { target: { name: string; value: any } }) => {
    const { name, value } = event.target

    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = () => {
    loginMutation.mutate({
      email: formData.email,
      password: formData.password,
    })
  }

  useEffect(() => {
    if (loginMutation.data?.access_token) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginMutation])

  return (
    <MainContainer>
      <Card
        title={<Typography.Title level={3}>Log In</Typography.Title>}
        style={{ width: 400, height: 400 }}
        headStyle={{
          display: 'flex',
          justifyContent: 'center',
          height: '80px',
        }}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 0,
        }}
      >
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            width: '100%',
          }}
          onFinish={onSubmit}
        >
          <Input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input.Password
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Typography>
            Don't have an account? Register <Link to="/register">here</Link>.
          </Typography>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form>
      </Card>
    </MainContainer>
  )
}

export default Login
