// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除一个附件 DELETE /api/v1/product-attachment/${param0} */
export async function ProductAttachmentControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ProductAttachmentControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/product-attachment/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
