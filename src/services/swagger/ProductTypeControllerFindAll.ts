// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查找类型 GET /api/v1/product-type */
export async function ProductTypeControllerFindAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ProductTypeControllerFindAllParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/product-type', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
