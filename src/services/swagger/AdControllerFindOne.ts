// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询详情 GET /api/v1/ad/${param0} */
export async function AdControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AdControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/ad/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
