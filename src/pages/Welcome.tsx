import { companyName } from "@/runtime";
import { PageContainer } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Card, theme } from "antd";
import React from "react";

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel("@@initialState");
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === "realDark"
              ? "background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)"
              : "background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)",
        }}
      >
        <div
          style={{
            backgroundPosition: "100% -30%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "274px auto",
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 {companyName} 后台管理系统
          </div>
          <p
            style={{
              fontSize: "14px",
              color: token.colorTextSecondary,
              lineHeight: "22px",
              marginTop: 16,
              marginBottom: 32,
              width: "65%",
            }}
          >
            现在的时间是:{new Date().toLocaleString()}
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
