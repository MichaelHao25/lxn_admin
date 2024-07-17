// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v1/page */
export async function PageControllerFindConfig(options?: { [key: string]: any }) {
  return request<any>('/api/v1/page', {
    method: 'GET',
    ...(options || {}),
  });
}
