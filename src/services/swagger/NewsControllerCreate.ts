// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建一个新的产品 POST /api/v1/news */
export async function NewsControllerCreate(
  body: API.CreateNewsDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
