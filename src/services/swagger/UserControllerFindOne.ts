// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 根据用户名查找这个用户的完整信息 GET /api/v1/user/${param0} */
export async function UserControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { username: param0, ...queryParams } = params;
  return request<any>(`/api/v1/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
