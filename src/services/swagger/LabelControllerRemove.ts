// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 根据 id 删除类型 DELETE /api/v1/label/${param0} */
export async function LabelControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/label/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
