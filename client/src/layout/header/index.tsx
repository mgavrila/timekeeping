import React from "react";
import { Layout, Typography } from "antd";

const { Header } = Layout;

const AppHeader: React.FC = () => (
  <Header
    style={{
      backgroundColor: "#474E68",
      display: "flex",
      alignItems: "center",
    }}
  >
    <Typography style={{ color: "white" }}>TimeTrack</Typography>
  </Header>
);

export default AppHeader;
