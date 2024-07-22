declare namespace API {
  type AdControllerFindAllParams = {
    /** Ad 类型 */
    type?: 'Home_Ad_1' | 'Home_Ad_2' | 'ContactUs_Ad_1' | 'ContactUs_Ad_2' | 'About_Ad_1';
    /** 当前页 */
    current?: number;
    /** 每一页的数量 */
    pageSize?: number;
  };

  type AdControllerFindOneParams = {
    _id: string;
  };

  type AdControllerRemoveParams = {
    _id: string;
  };

  type AdControllerUpdateParams = {
    _id: string;
  };

  type BannerControllerFindAllParams = {
    type?: 'Home_Banner_1' | 'Home_Banner_2';
    /** 当前页 */
    current?: number;
    /** 每一页的数量 */
    pageSize?: number;
  };

  type BannerControllerFindOneParams = {
    _id: string;
  };

  type BannerControllerRemoveParams = {
    _id: string;
  };

  type BannerControllerUpdateParams = {
    _id: string;
  };

  type ContactUsControllerFindAllParams = {
    /** id */
    _id?: string;
    /** 来源 */
    origin?: string;
    /** 公司名称 */
    companyName?: string;
    /** 姓名 */
    name?: string;
    /** 电话 */
    tel?: string;
    /** 当前页 */
    current?: number;
    /** 每一页的数量 */
    pageSize?: number;
  };

  type ContactUsControllerFindOneParams = {
    _id: string;
  };

  type ContactUsControllerRemoveParams = {
    _id: string;
  };

  type ContactUsControllerUpdateParams = {
    _id: string;
  };

  type CreateAdDto = {
    /** 类型 */
    type: 'Home_Ad_1' | 'Home_Ad_2' | 'ContactUs_Ad_1' | 'ContactUs_Ad_2' | 'About_Ad_1';
    /** 标题 */
    title: string;
    /** 描述 */
    description: string;
    /** 图片地址 */
    pictureUrl: string;
    /** 跳转地址 */
    gotoUrl: string;
    /** 背景颜色 只能是 */
    backgroundColor: string;
  };

  type CreateBannerDto = {
    /** 类型 */
    type: 'Home_Banner_1' | 'Home_Banner_2';
    title?: string;
    description?: string;
    pictureUrl: string;
    gotoUrl: string;
  };

  type CreateContactUsDto = {
    origin: string;
    companyName: string;
    name: string;
    tel: string;
    understandType: string;
    scopeOfAuthority: string;
  };

  type CreateLabelDto = {
    /** 类型名称 */
    title: string;
  };

  type CreateNewsDto = {
    /** 类型id */
    type?: string;
    label: string[];
    /** 产品标题 */
    title: string;
    /** 产品主图 */
    mainPictureUrl: string;
    /** 产品描述 */
    description: string;
    /** 产品详情 */
    details: string;
  };

  type CreatePageDto = {
    indexShowType: string[];
  };

  type CreateProductDto = {
    /** 类型id */
    type: string[];
    /** 产品标签 */
    label: string[];
    /** 产品标题 */
    title: string;
    /** 产品主图 */
    mainPictureUrl: string;
    /** 产品描述 */
    description: string;
    /** 上线时间 */
    releaseDate_start: string;
    /** 上线时间 */
    releaseDate_end: string;
    /** 总集数 */
    totalEpisodes?: number;
    /** 时长 */
    duration?: number;
    /** 视频方向 */
    videoDirection?: string;
    /** 授权信息 - 授权性质 */
    authorizationInformation_property: '独家' | '非独家' | '不限';
    /** 授权信息 -- 首发平台 */
    authorizationInformation_firstLaunchPlatform: number;
    /** 授权信息 -- 范围 */
    authorizationInformation_scope: '中国大陆' | '海外（含港澳台）' | '全球' | '不限';
    /** 授权信息 -- 变现方式 */
    authorizationInformation_monetizationMethods: '仅用于付费短剧' | '仅用于免费短剧' | '不限';
    /** 试看地址 */
    pilotVideoAddress: string;
    /** 顺序(越大越靠前) */
    order?: number;
  };

  type CreateTypeDto = {
    /** 父级id(如果为空的话就是一级分类) */
    parent?: string;
    /** 类型名称 */
    title: string;
  };

  type CreateUserDto = {
    username: string;
    password: string;
  };

  type LabelControllerFindAllParams = {
    title: string;
    /** 当前页 */
    current?: number;
    /** 每一页的数量 */
    pageSize?: number;
  };

  type LabelControllerFindOneParams = {
    _id: string;
  };

  type LabelControllerRemoveParams = {
    _id: string;
  };

  type LabelControllerUpdateParams = {
    _id: string;
  };

  type NewsControllerFindAllParams = {
    /** 类型id */
    type?: string;
    /** 产品标题 */
    title?: string;
    label?: string;
    /** 当前页 */
    current?: number;
    /** 每一页的数量 */
    pageSize?: number;
  };

  type NewsControllerFindOneParams = {
    _id: string;
  };

  type NewsControllerRemoveParams = {
    _id: string;
  };

  type NewsControllerUpdateParams = {
    _id: string;
  };

  type PageControllerFindOneParams = {
    id: string;
  };

  type PageControllerRemoveParams = {
    id: string;
  };

  type PageControllerUpdateParams = {
    id: string;
  };

  type ProductControllerFindAllParams = {
    /** 类型id */
    type?: string;
    /** 产品标题 */
    title?: string;
    /** 标签id */
    label?: string;
    /** 上线时间 */
    releaseDate?: string;
    /** 授权性质 */
    authorizationInformation_property?: '独家' | '非独家' | '不限';
    /** 授权范围 */
    authorizationInformation_scope?: '中国大陆' | '海外（含港澳台）' | '全球' | '不限';
    /** 当前页 */
    current?: number;
    /** 每一页的数量 */
    pageSize?: number;
  };

  type ProductControllerFindOneParams = {
    _id: string;
  };

  type ProductControllerRemoveParams = {
    _id: string;
  };

  type ProductControllerUpdateParams = {
    _id: string;
  };

  type TypeControllerFindAllParams = {
    /** 一级分类的名称 */
    parent?: string;
    title?: string;
    /** 当前页 */
    current?: number;
    /** 每一页的数量 */
    pageSize?: number;
  };

  type TypeControllerFindOneParams = {
    _id: string;
  };

  type TypeControllerRemoveParams = {
    _id: string;
  };

  type TypeControllerUpdateParams = {
    _id: string;
  };

  type UpdateAdDto = {
    /** 类型 */
    type?: 'Home_Ad_1' | 'Home_Ad_2' | 'ContactUs_Ad_1' | 'ContactUs_Ad_2' | 'About_Ad_1';
    /** 标题 */
    title?: string;
    /** 描述 */
    description?: string;
    /** 图片地址 */
    pictureUrl?: string;
    /** 跳转地址 */
    gotoUrl?: string;
    /** 背景颜色 只能是 */
    backgroundColor?: string;
  };

  type UpdateBannerDto = {
    /** 类型 */
    type?: 'Home_Banner_1' | 'Home_Banner_2';
    title?: string;
    description?: string;
    pictureUrl?: string;
    gotoUrl?: string;
  };

  type UpdateContactUsDto = {
    origin?: string;
    companyName?: string;
    name?: string;
    tel?: string;
    understandType?: string;
    scopeOfAuthority?: string;
  };

  type UpdateLabelDto = {
    /** 类型名称 */
    title?: string;
  };

  type UpdateNewsDto = {
    /** 类型id */
    type?: string;
    label?: string[];
    /** 产品标题 */
    title?: string;
    /** 产品主图 */
    mainPictureUrl?: string;
    /** 产品描述 */
    description?: string;
    /** 产品详情 */
    details?: string;
  };

  type UpdatePageDto = {};

  type UpdateProductDto = {
    /** 类型id */
    type?: string[];
    /** 产品标签 */
    label?: string[];
    /** 产品标题 */
    title?: string;
    /** 产品主图 */
    mainPictureUrl?: string;
    /** 产品描述 */
    description?: string;
    /** 上线时间 */
    releaseDate_start?: string;
    /** 上线时间 */
    releaseDate_end?: string;
    /** 总集数 */
    totalEpisodes?: number;
    /** 时长 */
    duration?: number;
    /** 视频方向 */
    videoDirection?: string;
    /** 授权信息 - 授权性质 */
    authorizationInformation_property?: '独家' | '非独家' | '不限';
    /** 授权信息 -- 首发平台 */
    authorizationInformation_firstLaunchPlatform?: number;
    /** 授权信息 -- 范围 */
    authorizationInformation_scope?: '中国大陆' | '海外（含港澳台）' | '全球' | '不限';
    /** 授权信息 -- 变现方式 */
    authorizationInformation_monetizationMethods?: '仅用于付费短剧' | '仅用于免费短剧' | '不限';
    /** 试看地址 */
    pilotVideoAddress?: string;
    /** 顺序(越大越靠前) */
    order?: number;
  };

  type UpdateTypeDto = {
    /** 父级id(如果为空的话就是一级分类) */
    parent?: string;
    /** 类型名称 */
    title?: string;
  };

  type UpdateUserDto = {
    password?: string;
    isActive?: boolean;
  };

  type UploadControllerFindOneParams = {
    download: string;
  };
}
