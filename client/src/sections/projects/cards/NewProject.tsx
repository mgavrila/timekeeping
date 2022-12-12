import React from 'react'
import { Button, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const StyledAddProjectBtn = styled(Button)`
  width: 100%;
  height: 100%;
`

const StyledAddProjectCard = styled(Card)`
  width: 350px;
  height: 200px;
`

const NewProject: React.FC = () => {
  return (
    <StyledAddProjectCard title={null} bodyStyle={{ height: '100%' }}>
      <StyledAddProjectBtn>
        <PlusOutlined />
      </StyledAddProjectBtn>
    </StyledAddProjectCard>
  )
}

export default NewProject
