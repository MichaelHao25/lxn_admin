// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 只显示用户名和账户是否被激活的状态 GET /api/v1/user */
export async function UserControllerFindAll(options?: { [key: string]: any }) {
  return request<any>('/api/v1/user', {
    method: 'GET',
    ...(options || {}),
  });
}
