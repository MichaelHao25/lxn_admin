// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询所有的产品 GET /api/v1/product */
export async function ProductControllerFindAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ProductControllerFindAllParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/product', {
    method: 'GET',
    params: {
      // current has a default value: 1
      current: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}
