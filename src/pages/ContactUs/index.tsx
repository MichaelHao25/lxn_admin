import { PageContainer } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Card, Popconfirm, message, theme } from "antd";
import React from "react";

import { ContactUsControllerFindAll } from "@/services/swagger/ContactUsControllerFindAll";
import { ContactUsControllerRemove } from "@/services/swagger/ContactUsControllerRemove";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useRef } from "react";
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
  const { token } = theme.useToken();

  const columns: ProColumns[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "来源",
      dataIndex: "origin",
    },
    {
      title: "公司名称",
      dataIndex: "companyName",
    },
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "电话",
      dataIndex: "tel",
    },
    {
      title: "了解类型",
      dataIndex: "understandType",
      search: false,
    },
    {
      title: "授权范围",
      dataIndex: "scopeOfAuthority",
      search: false,
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      valueType: "dateTime",
      search: false,
    },
    {
      title: "id",
      dataIndex: "_id",
      width: 30,
      search: false,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      render: (text, record, _, action) => {
        const { url, _id } = record;
        return [
          //   <Add
          //     _id={record._id}
          //     onFinishCallBack={async () => {
          //       actionRef.current?.reload();
          //     }}
          //     trigger={<a type="link">编辑</a>}
          //   ></Add>,
          <Popconfirm
            key={"delete"}
            title="确认是否删除？"
            onConfirm={async () => {
              const res = await ContactUsControllerRemove({ _id });
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
          return ContactUsControllerFindAll(params).then((res) => {
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
        // toolBarRender={() => [
        //   <Add
        //     onFinishCallBack={async () => {
        //       actionRef.current?.reload();
        //     }}
        //     trigger={
        //       <Button type="primary">
        //         <PlusOutlined />
        //         添加Ad
        //       </Button>
        //     }
        //   ></Add>,
        // ]}
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
