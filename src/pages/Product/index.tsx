import { PageContainer } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Card, Popconfirm, Tag, message, theme } from "antd";
import React, { useState } from "react";

import { ProductControllerFindAll } from "@/services/swagger/ProductControllerFindAll";
import { ProductControllerRemove } from "@/services/swagger/ProductControllerRemove";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useRef } from "react";
import Add from "./Add";
// const columns: ColumnsType<{ a: 1 }> = [
//     {
//       title: "id",
//     },
//     {
//       title: "资源路径",
//     },
//     {
//       title: "操作",
//     },
//   ];

const TableWrap = () => {
  const actionRef = useRef<ActionType>();
  const [typeList, setTypeList] = useState<{ _id: string; typeName: string }[]>(
    []
  );
  const { token } = theme.useToken();

  const columns: ProColumns[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "类型",
      dataIndex: "type",
      render(text) {
        if (text) {
          return text.map((item) => <Tag>{item.title}</Tag>);
        }
        return "-";
      },
      search: false,
    },
    {
      title: "描述",
      dataIndex: "description",
      search: false,
    },
    {
      title: "标签",
      dataIndex: "label",
      render(text) {
        if (text) {
          return text.map((item) => <Tag>{item.title}</Tag>);
        }
        return "-";
      },
      search: false,
    },
    {
      title: "主图",
      dataIndex: "mainPictureUrl",
      valueType: "image",
      search: false,
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      valueType: "dateTime",
      search: false,
    },
    {
      title: "order",
      dataIndex: "order",
      width: 10,
      search: false,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      render: (text, record, _, action) => {
        const { _id } = record;
        return [
          <Add
            typeList={typeList}
            key="look"
            readonly={true}
            _id={record._id}
            onFinishCallBack={async () => {
              actionRef.current?.reload();
            }}
            trigger={<a type="link">查看</a>}
          ></Add>,
          <Add
            typeList={typeList}
            key="editor"
            _id={record._id}
            onFinishCallBack={async () => {
              actionRef.current?.reload();
            }}
            trigger={<a type="link">编辑</a>}
          ></Add>,
          <Popconfirm
            key={"delete"}
            title="确认是否删除？"
            onConfirm={async () => {
              const res = await ProductControllerRemove({ _id });
              if (res.success) {
                actionRef.current?.reload();
                message.success(res.data);
                return;
              }
              message.success(res.errorMessage);
            }}
          >
            <a style={{ color: token.colorErrorText }}>删除</a>
          </Popconfirm>,
          // <TableDropdown
          //   key="actionGroup"
          //   onSelect={() => action?.reload()}
          //   menus={[
          //     { key: "copy", name: "复制" },
          //     { key: "delete", name: "删除" },
          //   ]}
          // />,
        ];
      },
    },
  ];
  return (
    <>
      <ProTable
        rowKey={"_id"}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          return ProductControllerFindAll(params).then((res) => {
            return {
              success: res?.success,
              data: res?.data?.list,
              total: res?.data?.page?.total,
            };
          });
        }}
        columnsState={{
          persistenceKey: "pro-table-singe-demos",
          persistenceType: "localStorage",
          defaultValue: {
            option: { fixed: "right", disable: true },
          },
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          density: false,
          setting: {
            listsHeight: 400,
          },
        }}
        // pagination={{
        //   pageSize: 10,
        // }}
        dateFormatter="string"
        toolBarRender={() => [
          <Add
            typeList={typeList}
            onFinishCallBack={async () => {
              actionRef.current?.reload();
            }}
            trigger={
              <Button type="primary">
                <PlusOutlined />
                添加产品
              </Button>
            }
          ></Add>,
        ]}
      />
    </>
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
        <TableWrap />
      </Card>
    </PageContainer>
  );
};

export default Welcome;
