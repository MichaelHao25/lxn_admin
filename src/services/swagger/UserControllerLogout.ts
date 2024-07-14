// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户退出 GET /api/v1/user/logout */
export async function UserControllerLogout(options?: { [key: string]: any }) {
  return request<any>('/api/v1/user/logout', {
    method: 'GET',
    ...(options || {}),
  });
}
