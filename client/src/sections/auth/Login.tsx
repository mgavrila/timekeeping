import React from 'react'
import { Form, Button, Input, Card, Typography } from 'antd'
import { Link } from 'react-router-dom'

const Login: React.FC = () => {
  return (
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
      >
        <Input placeholder="Username" required />

        <Input.Password placeholder="Password" required />

        <Typography>
          Don't have an account? Register <Link to="/register">here</Link>.
        </Typography>
        <Button>Sign In</Button>
      </Form>
    </Card>
  )
}

export default Login
