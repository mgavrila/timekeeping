import React, { useEffect, useState } from 'react'
import { Form, Button, Input, Card, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { trpc } from '../../trpc'
import { AuthHelper } from '../../helpers/AuthHelper'
import { toast } from 'react-toastify'
import { ToastTypes } from '../../constants/enums'
import MainContainer from '../../styled-components/MainContainer'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const registerMutation = trpc.registerUser.useMutation()
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
  })

  useEffect(() => {
    if (registerMutation.status === 'error') {
      toast(registerMutation.error.message, { type: ToastTypes.ERROR })
      registerMutation.reset()
      return
    }

    if (registerMutation.status === 'success') {
      setFormData({
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
      })

      toast('Account successfully created', { type: ToastTypes.SUCCESS })
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerMutation])

  const handleChange = (event: { target: { name: string; value: any } }) => {
    const { name, value } = event.target

    let error = AuthHelper.validateInput(name, value)

    if (name === 'confirmPassword') {
      error = AuthHelper.validateConfirmPassword(value, formData.password)
    }

    setFormData((prevState) => ({ ...prevState, [name]: value }))
    setErrors((prevState) => ({ ...prevState, [name]: error }))
  }

  const onSubmit = () => {
    let submitErrors = {}

    Object.entries(formData).forEach(([key, value]) => {
      submitErrors = {
        ...submitErrors,
        [key]: AuthHelper.validateInput(key, value),
      }
    })

    setErrors((prevState) => {
      return { ...prevState, ...submitErrors }
    })

    if (Object.values(submitErrors).some((value) => value !== '')) {
      return
    }

    registerMutation.mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.confirmPassword,
    })
  }

  return (
    <MainContainer>
      <Card
        title={<Typography.Title level={3}>Register</Typography.Title>}
        style={{ width: 400, height: 500 }}
        headStyle={{
          display: 'flex',
          justifyContent: 'center',
          height: '80px',
        }}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: 400,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 0,
        }}
      >
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            width: '100%',
          }}
          onFinish={onSubmit}
        >
          <div>
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <Typography.Paragraph style={{ margin: 0, color: 'red' }}>
                {errors.name}
              </Typography.Paragraph>
            )}
          </div>

          <div>
            <Input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <Typography.Paragraph style={{ margin: 0, color: 'red' }}>
                {errors.email}
              </Typography.Paragraph>
            )}
          </div>

          <div>
            <Input.Password
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            {errors.password && (
              <Typography.Paragraph style={{ margin: 0, color: 'red' }}>
                {errors.password}
              </Typography.Paragraph>
            )}
          </div>

          <div>
            <Input.Password
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {errors.confirmPassword && (
              <Typography.Paragraph style={{ margin: 0, color: 'red' }}>
                {errors.confirmPassword}
              </Typography.Paragraph>
            )}
          </div>

          <Typography>
            Already have an account? Log In <Link to="/login">here</Link>.
          </Typography>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form>
      </Card>
    </MainContainer>
  )
}

export default Register
