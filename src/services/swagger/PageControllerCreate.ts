// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/v1/page */
export async function PageControllerCreate(
  body: API.CreatePageDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
