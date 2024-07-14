// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新 PATCH /api/v1/ad/${param0} */
export async function AdControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AdControllerUpdateParams,
  body: API.UpdateAdDto,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/ad/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
