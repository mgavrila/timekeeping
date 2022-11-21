import React from "react";
import { Layout, Form, Button, Input, Card, Typography } from "antd";

const { Content } = Layout;

const AppContent: React.FC = () => {
  return (
    <Content
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        title={<Typography.Title level={3}>Log In</Typography.Title>}
        style={{ width: 400, height: 400 }}
        headStyle={{
          display: "flex",
          justifyContent: "center",
          height: "80px",
        }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: 300,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 0,
        }}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: "100%",
          }}
        >
          <Input placeholder="Username" required />

          <Input.Password placeholder="Password" required />

          <Typography>
            Don't have an account? Register <a href="/">here</a>.
          </Typography>
          <Button>Log In</Button>
        </Form>
      </Card>
    </Content>
  );
};

export default AppContent;
