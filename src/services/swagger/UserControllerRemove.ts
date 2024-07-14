// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除一个用户 DELETE /api/v1/user/${param0} */
export async function UserControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { username: param0, ...queryParams } = params;
  return request<any>(`/api/v1/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
