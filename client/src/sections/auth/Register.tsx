import React from 'react'
import { Form, Button, Input, Card, Typography } from 'antd'
import { Link } from 'react-router-dom'

const Register: React.FC = () => {
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
      >
        <Input placeholder="Username" required />

        <Input.Password placeholder="Password" required />

        <Input.Password placeholder="Confirm Password" required />

        <Input placeholder="email" required />

        <Typography>
          Already have an account? Log In <Link to="/login">here</Link>.
        </Typography>
        <Button>Sign Up</Button>
      </Form>
    </Card>
  )
}

export default Register
