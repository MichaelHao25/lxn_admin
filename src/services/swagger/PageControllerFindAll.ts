// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v1/page/index */
export async function PageControllerFindAll(options?: { [key: string]: any }) {
  return request<Record<string, any>[]>('/api/v1/page/index', {
    method: 'GET',
    ...(options || {}),
  });
}
