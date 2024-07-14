// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建一个新的类型 POST /api/v1/type */
export async function TypeControllerCreate(
  body: API.CreateTypeDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/type', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
