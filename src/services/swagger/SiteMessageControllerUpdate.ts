// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 根据id更新某一条站内信的内容 PATCH /api/v1/site-message/${param0} */
export async function SiteMessageControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SiteMessageControllerUpdateParams,
  body: API.UpdateSiteMessageDto,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/site-message/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
