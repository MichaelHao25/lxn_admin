// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建一个新的类型 POST /api/v1/label */
export async function LabelControllerCreate(
  body: API.CreateLabelDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/label', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
