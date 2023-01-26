import { Space, Spin } from "antd";

function Loading() {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
        height:"100%",
      }}
    >
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </Space>
  );
}

export default Loading;
