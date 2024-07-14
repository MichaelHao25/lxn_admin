// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 根据id查询详情 GET /api/v1/contact-us/${param0} */
export async function ContactUsControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ContactUsControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { _id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/contact-us/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
