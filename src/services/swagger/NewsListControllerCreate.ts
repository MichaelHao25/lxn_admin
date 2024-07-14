// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建一个新的产品 POST /api/v1/news-list */
export async function NewsListControllerCreate(
  body: API.CreateNewsListDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/news-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
