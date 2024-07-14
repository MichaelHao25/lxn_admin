// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 根据 id 更新类型 PATCH /api/v1/label/${param0} */
export async function LabelControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelControllerUpdateParams,
  body: API.UpdateLabelDto,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/label/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
