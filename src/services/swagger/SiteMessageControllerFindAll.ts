// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取所有的站内信 GET /api/v1/site-message */
export async function SiteMessageControllerFindAll(options?: { [key: string]: any }) {
  return request<any>('/api/v1/site-message', {
    method: 'GET',
    ...(options || {}),
  });
}
