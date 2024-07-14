// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建一条站内信 POST /api/v1/site-message */
export async function SiteMessageControllerCreate(
  body: API.CreateSiteMessageDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/site-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
