// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新产品详情 PATCH /api/v1/news/${param0} */
export async function NewsControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.NewsControllerUpdateParams,
  body: API.UpdateNewsDto,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/v1/news/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
