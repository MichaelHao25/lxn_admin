declare namespace API {
  type CreateNewsListDto = {
    /** 类型id */
    typeId: string;
    /** 产品标题 */
    title: string;
    /** 产品主图 */
    mainPicture: string;
    /** 详情首页上的图片 */
    detailsPicture: string;
    /** 产品描述 */
    description: string;
    /** 产品详情 */
    details: string;
  };

  type CreateProductAttachmentDto = {
    /** 附件名称 */
    name: string;
    /** 附件所属产品id */
    productList_id: string;
    /** 附件下载地址 */
    url: string;
    /** 顺序(越大越靠前) */
    order?: number;
  };

  type CreateProductListDto = {
    /** 类型id */
    typeId: string;
    /** 产品标题 */
    title: string;
    /** 产品主图 */
    mainPicture: string;
    /** banner 图 */
    banner: string[];
    /** 产品描述 */
    description: string;
    /** 产品详情 */
    details: string;
    /** 顺序(越大越靠前) */
    order?: number;
  };

  type CreateProductTypeDto = {
    /** 父级id(如果为空的话就是一级分类) */
    parent?: string;
    /** 类型名称 */
    typeName: string;
  };

  type CreateSiteMessageDto = {
    nickname: string;
    tel: string;
    message: string;
  };

  type CreateUserDto = {
    username: string;
    password: string;
  };

  type NewsListControllerFindAllParams = {
    /** 类型id */
    typeId?: string;
    /** 产品标题 */
    title?: string;
    /** 当前页 */
    current: number;
    /** 每一页的数量 */
    pageSize: number;
  };

  type NewsListControllerFindOneParams = {
    _id: string;
  };

  type NewsListControllerRemoveParams = {
    _id: string;
  };

  type NewsListControllerUpdateParams = {
    _id: string;
  };

  type ProductAttachmentControllerFindAllParams = {
    /** 附件名称 */
    name?: string;
    /** 所属类型 id */
    typeId?: string;
    /** 当前页 */
    current: number;
    /** 每一页的数量 */
    pageSize: number;
  };

  type ProductAttachmentControllerRemoveParams = {
    _id: string;
  };

  type ProductListControllerFindAllParams = {
    /** 类型id */
    typeId?: string;
    /** 产品标题 */
    title?: string;
    /** 当前页 */
    current: number;
    /** 每一页的数量 */
    pageSize: number;
  };

  type ProductListControllerFindOneParams = {
    _id: string;
  };

  type ProductListControllerRemoveParams = {
    _id: string;
  };

  type ProductListControllerUpdateParams = {
    _id: string;
  };

  type ProductTypeControllerFindAllParams = {
    /** 一级分类的名称 */
    type?: 'product' | 'news';
  };

  type ProductTypeControllerFindOneParams = {
    _id: string;
  };

  type ProductTypeControllerRemoveParams = {
    _id: string;
  };

  type ProductTypeControllerUpdateParams = {
    _id: string;
  };

  type SiteMessageControllerFindOneParams = {
    _id: string;
  };

  type SiteMessageControllerRemoveParams = {
    _id: string;
  };

  type SiteMessageControllerUpdateParams = {
    _id: string;
  };

  type UpdateNewsListDto = {
    /** 类型id */
    typeId?: string;
    /** 产品标题 */
    title?: string;
    /** 产品主图 */
    mainPicture?: string;
    /** 详情首页上的图片 */
    detailsPicture?: string;
    /** 产品描述 */
    description?: string;
    /** 产品详情 */
    details?: string;
  };

  type UpdateProductListDto = {
    /** 类型id */
    typeId?: string;
    /** 产品标题 */
    title?: string;
    /** 产品主图 */
    mainPicture?: string;
    /** banner 图 */
    banner?: string[];
    /** 产品描述 */
    description?: string;
    /** 产品详情 */
    details?: string;
    /** 顺序(越大越靠前) */
    order?: number;
  };

  type UpdateProductTypeDto = {
    /** 父级id(如果为空的话就是一级分类) */
    parent?: string;
    /** 类型名称 */
    typeName?: string;
  };

  type UpdateSiteMessageDto = {
    nickname?: string;
    tel?: string;
    message?: string;
  };

  type UpdateUserDto = {
    password?: string;
    isActive?: boolean;
  };

  type UploadControllerFindOneParams = {
    download: string;
  };
}
