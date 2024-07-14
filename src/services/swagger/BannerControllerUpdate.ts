// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 PATCH /api/v1/banner/${param0} */
export async function BannerControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.BannerControllerUpdateParams,
  body: API.UpdateBannerDto,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/v1/banner/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
