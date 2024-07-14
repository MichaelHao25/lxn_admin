// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取单个产品 GET /api/v1/product/${param0} */
export async function ProductControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ProductControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/product/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
