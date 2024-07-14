// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建 POST /api/v1/ad */
export async function AdControllerCreate(body: API.CreateAdDto, options?: { [key: string]: any }) {
  return request<any>('/api/v1/ad', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
