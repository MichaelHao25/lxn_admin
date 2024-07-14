// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建一个新的产品 POST /api/v1/product */
export async function ProductControllerCreate(
  body: API.CreateProductDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
