// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 上传文件 POST /api/v1/upload */
export async function UploadControllerUpload(options?: { [key: string]: any }) {
  return request<any>('/api/v1/upload', {
    method: 'POST',
    ...(options || {}),
  });
}
