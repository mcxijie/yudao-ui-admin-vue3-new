import request from '@/config/axios'

// 陪玩评价 VO
export interface OrderEvaluateVO {
  id: number // 编号
  serviceOrderId: number // 订单编号
  content: string // 评价内容
  score: number // 评分
  isAnonymous: number // 是否匿名评价
}

// 陪玩评价 API
export const OrderEvaluateApi = {
  // 查询陪玩评价分页
  getOrderEvaluatePage: async (params: any) => {
    return await request.get({ url: `/play/order-evaluate/page`, params })
  },

  // 查询陪玩评价详情
  getOrderEvaluate: async (id: number) => {
    return await request.get({ url: `/play/order-evaluate/get?id=` + id })
  },

  // 新增陪玩评价
  createOrderEvaluate: async (data: OrderEvaluateVO) => {
    return await request.post({ url: `/play/order-evaluate/create`, data })
  },

  // 修改陪玩评价
  updateOrderEvaluate: async (data: OrderEvaluateVO) => {
    return await request.put({ url: `/play/order-evaluate/update`, data })
  },

  // 删除陪玩评价
  deleteOrderEvaluate: async (id: number) => {
    return await request.delete({ url: `/play/order-evaluate/delete?id=` + id })
  },

  // 导出陪玩评价 Excel
  exportOrderEvaluate: async (params) => {
    return await request.download({ url: `/play/order-evaluate/export-excel`, params })
  }
}