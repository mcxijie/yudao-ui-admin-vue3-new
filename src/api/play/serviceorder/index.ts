import request from '@/config/axios'

// 陪玩订单 VO
export interface ServiceOrderVO {
  id: number // 编号
  userId: number // 用户编号
  staffId: number // 店员编号
  giftId: number // 礼物编号
  staffSex: number // 店员性别
  orderType: number // 订单类型
  staffLevel: number // 店员等级
  purchaseQuantity: number // 购买数量
  wechat: string // 微信号
  otherRequirements: string // 其他要求
  excludeStaff: number // 排除下单店员
  coupon: number // 优惠券编号
  paymentType: number // 支付类型
  totalAmount: number // 总金额
  orderState: number // 订单状态
}

// 陪玩订单 API
export const ServiceOrderApi = {
  // 查询陪玩订单分页
  getServiceOrderPage: async (params: any) => {
    return await request.get({ url: `/play/service-order/page`, params })
  },

  // 查询陪玩订单详情
  getServiceOrder: async (id: number) => {
    return await request.get({ url: `/play/service-order/get?id=` + id })
  },

  // 新增陪玩订单
  createServiceOrder: async (data: ServiceOrderVO) => {
    return await request.post({ url: `/play/service-order/create`, data })
  },

  // 修改陪玩订单
  updateServiceOrder: async (data: ServiceOrderVO) => {
    return await request.put({ url: `/play/service-order/update`, data })
  },

  // 删除陪玩订单
  deleteServiceOrder: async (id: number) => {
    return await request.delete({ url: `/play/service-order/delete?id=` + id })
  },

  // 导出陪玩订单 Excel
  exportServiceOrder: async (params) => {
    return await request.download({ url: `/play/service-order/export-excel`, params })
  }
}