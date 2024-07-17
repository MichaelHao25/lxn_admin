import { LabelControllerFindAll } from "@/services/swagger/LabelControllerFindAll";
import { PageControllerCreate } from "@/services/swagger/PageControllerCreate";
import { PageControllerFindConfig } from "@/services/swagger/PageControllerFindConfig";
import {
  PageContainer,
  ProForm,
  ProFormSelect,
} from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Card } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";

const SortComponent = () => {
  const [initialState, setInitialState] = useState();
  useEffect(() => {
    PageControllerFindConfig().then((res) => {
      if (res?.data?.indexShowLabel) {
        setInitialState({
          indexShowLabel: res?.data?.indexShowLabel.map((item) => {
            return { label: item.title, value: item._id };
          }),
        });
      }
    });
  }, []);
  useEffect(() => {
    form.resetFields();
  }, [initialState]);
  const [form] = useForm();
  const handleOnFinish = async (data) => {
    const { indexShowLabel } = data;
    if (indexShowLabel) {
      return PageControllerCreate({
        indexShowLabel: indexShowLabel.map((item) => {
          if (typeof item === "string") {
            return item;
          } else {
            return item.value;
          }
        }),
      }).then((res) => {
        setInitialState({
          indexShowLabel: res.data.indexShowLabel.map((item) => {
            return { label: item.title, value: item._id };
          }),
        });
      });
    }
  };
  return (
    <div>
      <ProForm
        onFinish={handleOnFinish}
        form={form}
        initialValues={initialState}
      >
        <ProFormSelect
          rules={[{ required: true }]}
          label={"首页展示的标签顺序"}
          name={"indexShowLabel"}
          showSearch
          debounceTime={400}
          fieldProps={{
            mode: "multiple",
          }}
          request={(params) => {
            const { keyWords } = params;
            return LabelControllerFindAll({ title: keyWords }).then((res) => {
              return res?.data?.list?.map((item) => {
                return {
                  label: item.title,
                  value: item._id,
                };
              });
            });
          }}
        />
      </ProForm>
    </div>
  );
};

const Welcome: React.FC = () => {
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
        <SortComponent />
      </Card>
    </PageContainer>
  );
};

export default Welcome;
