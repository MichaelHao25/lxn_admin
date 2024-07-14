// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新产品详情 PATCH /api/v1/product/${param0} */
export async function ProductControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ProductControllerUpdateParams,
  body: API.UpdateProductDto,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/v1/product/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
