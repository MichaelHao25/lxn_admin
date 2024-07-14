// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询所有的产品 GET /api/v1/product-list */
export async function ProductListControllerFindAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ProductListControllerFindAllParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/product-list', {
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
