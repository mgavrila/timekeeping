import React, { useState } from 'react'
import { Form, Button, Input, Card, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { trpc } from '../../trpc'

const Register: React.FC = () => {
  const registerMutation = trpc.registerUser.useMutation()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  })

  const handleChange = (event: { target: { name: string; value: any } }) => {
    const { name, value } = event.target

    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = () => {
    registerMutation.mutate({
      name: formData.username,
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.confirmPassword,
    })
  }

  return (
    <Card
      title={<Typography.Title level={3}>Register</Typography.Title>}
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
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
        />

        <Input.Password
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <Input.Password
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <Input
          name="email"
          placeholder="email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <Typography>
          Already have an account? Log In <Link to="/login">here</Link>.
        </Typography>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form>
    </Card>
  )
}

export default Register
