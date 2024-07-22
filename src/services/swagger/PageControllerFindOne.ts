// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v1/page/${param0} */
export async function PageControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PageControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { type: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/v1/page/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
