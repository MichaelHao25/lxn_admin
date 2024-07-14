// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建一个新的附件 POST /api/v1/product-attachment */
export async function ProductAttachmentControllerCreate(
  body: API.CreateProductAttachmentDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/product-attachment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
