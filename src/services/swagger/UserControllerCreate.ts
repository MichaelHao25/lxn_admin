// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户注册 POST /api/v1/user/register */
export async function UserControllerCreate(
  body: API.CreateUserDto,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/v1/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
