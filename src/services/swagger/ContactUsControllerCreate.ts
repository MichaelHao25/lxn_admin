// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新增 POST /api/v1/contact-us */
export async function ContactUsControllerCreate(
  body: API.CreateContactUsDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/contact-us', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
