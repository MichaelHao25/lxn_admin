// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新产品详情 PATCH /api/v1/product-list/${param0} */
export async function ProductListControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ProductListControllerUpdateParams,
  body: API.UpdateProductListDto,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/v1/product-list/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
