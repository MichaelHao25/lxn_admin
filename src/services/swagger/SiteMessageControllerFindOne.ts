// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 根据id查询站内信 GET /api/v1/site-message/${param0} */
export async function SiteMessageControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SiteMessageControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/site-message/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
