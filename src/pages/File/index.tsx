import { PageContainer } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Card, Popconfirm, message, theme } from "antd";
import React, { useEffect, useState } from "react";

import { ProductAttachmentControllerFindAll } from "@/services/swagger/ProductAttachmentControllerFindAll";
import { ProductAttachmentControllerRemove } from "@/services/swagger/ProductAttachmentControllerRemove";
import { ProductTypeControllerFindAll } from "@/services/swagger/ProductTypeControllerFindAll";
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

  useEffect(() => {
    ProductTypeControllerFindAll({ type: "product" }).then((res) => {
      if (res.success) {
        setTypeList(res.data);
      }
    });
  }, []);
  const valueEnum: Record<string, string> = {};
  typeList.map((item) => {
    valueEnum[item._id] = {
      text: item.typeName,
    };
  });
  const columns: ProColumns[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "文件名称",
      dataIndex: "name",
    },
    {
      title: "类别筛选",
      dataIndex: "typeId",
      hideInTable: true,
      valueType: "select",
      valueEnum,
    },
    {
      title: "所属类别",
      dataIndex: "typeName",
      search: false,
      render(selectText, record) {
        const { productTitle } = record;
        return `${selectText}${" "}>${" "}${productTitle}`;
      },
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      valueType: "dateTime",
      search: false,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      render: (text, record, _, action) => {
        const { url, _id } = record;
        return [
          <a
            type="link"
            onClick={() => {
              window.open(url);
            }}
          >
            下载
          </a>,
          <Popconfirm
            key={"delete"}
            title="确认是否删除？"
            onConfirm={async () => {
              const res = await ProductAttachmentControllerRemove({ _id });
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
          return ProductAttachmentControllerFindAll(params).then((res) => {
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
            onFinishCallBack={async () => {
              actionRef.current?.reload();
            }}
            trigger={
              <Button type="primary">
                <PlusOutlined />
                上传新的资料
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
