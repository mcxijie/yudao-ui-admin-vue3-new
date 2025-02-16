import request from '@/config/axios'

// 陪玩礼物 VO
export interface GiftVO {
  id: number // 编号
  name: string // 礼物名称
  photo: string // 礼物图片
  video: string // 礼物视频
  price: number // 礼物价格
}

// 陪玩礼物 API
export const GiftApi = {
  // 查询陪玩礼物分页
  getGiftPage: async (params: any) => {
    return await request.get({ url: `/play/gift/page`, params })
  },

  // 查询陪玩礼物详情
  getGift: async (id: number) => {
    return await request.get({ url: `/play/gift/get?id=` + id })
  },

  // 新增陪玩礼物
  createGift: async (data: GiftVO) => {
    return await request.post({ url: `/play/gift/create`, data })
  },

  // 修改陪玩礼物
  updateGift: async (data: GiftVO) => {
    return await request.put({ url: `/play/gift/update`, data })
  },

  // 删除陪玩礼物
  deleteGift: async (id: number) => {
    return await request.delete({ url: `/play/gift/delete?id=` + id })
  },

  // 导出陪玩礼物 Excel
  exportGift: async (params) => {
    return await request.download({ url: `/play/gift/export-excel`, params })
  }
}