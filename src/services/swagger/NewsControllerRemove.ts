// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除产品 DELETE /api/v1/news/${param0} */
export async function NewsControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.NewsControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/news/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
