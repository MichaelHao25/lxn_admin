// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户登陆 POST /api/v1/user/login */
export async function UserControllerLogin(
  body: API.CreateUserDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
