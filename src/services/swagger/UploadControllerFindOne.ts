// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 显示单个文件 GET /api/v1/upload/${param0} */
export async function UploadControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UploadControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/upload/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
