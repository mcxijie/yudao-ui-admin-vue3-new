import request from '@/config/axios'

// 陪玩随机下单 VO
export interface RandomOrderVO {
  id: number // 编号
  userId: number // 用户编号
  staffSex: number // 店员性别
  serviceTypeId: number // 服务类型编号
  purchaseQuantity: number // 购买数量
  wechat: string // 微信号
  otherRequirements: string // 其他要求
  excludeStaff: number // 排除下单店员
  coupon: number // 优惠券编号
  paymentType: number // 支付类型
}

// 陪玩随机下单 API
export const RandomOrderApi = {
  // 查询陪玩随机下单分页
  getRandomOrderPage: async (params: any) => {
    return await request.get({ url: `/play/random-order/page`, params })
  },

  // 查询陪玩随机下单详情
  getRandomOrder: async (id: number) => {
    return await request.get({ url: `/play/random-order/get?id=` + id })
  },

  // 新增陪玩随机下单
  createRandomOrder: async (data: RandomOrderVO) => {
    return await request.post({ url: `/play/random-order/create`, data })
  },

  // 修改陪玩随机下单
  updateRandomOrder: async (data: RandomOrderVO) => {
    return await request.put({ url: `/play/random-order/update`, data })
  },

  // 删除陪玩随机下单
  deleteRandomOrder: async (id: number) => {
    return await request.delete({ url: `/play/random-order/delete?id=` + id })
  },

  // 导出陪玩随机下单 Excel
  exportRandomOrder: async (params) => {
    return await request.download({ url: `/play/random-order/export-excel`, params })
  }
}