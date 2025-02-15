import request from '@/config/axios'

// 陪玩店员申请 VO
export interface ClerkApplyVO {
  id: number // 编号
  nickname: string // 店员昵称
  sex: number // 店员性别
  age: number // 店员年龄
  wechat: string // 微信号
  mobile: string // 手机号
  area: string // 所在地
  experience: number // 是否有其他店铺经验
  soundRecording: string // 录音
  photo: string // 照片
}

// 陪玩店员申请 API
export const ClerkApplyApi = {
  // 查询陪玩店员申请分页
  getClerkApplyPage: async (params: any) => {
    return await request.get({ url: `/play/clerk-apply/page`, params })
  },

  // 查询陪玩店员申请详情
  getClerkApply: async (id: number) => {
    return await request.get({ url: `/play/clerk-apply/get?id=` + id })
  },

  // 新增陪玩店员申请
  createClerkApply: async (data: ClerkApplyVO) => {
    return await request.post({ url: `/play/clerk-apply/create`, data })
  },

  // 修改陪玩店员申请
  updateClerkApply: async (data: ClerkApplyVO) => {
    return await request.put({ url: `/play/clerk-apply/update`, data })
  },

  // 删除陪玩店员申请
  deleteClerkApply: async (id: number) => {
    return await request.delete({ url: `/play/clerk-apply/delete?id=` + id })
  },

  // 导出陪玩店员申请 Excel
  exportClerkApply: async (params) => {
    return await request.download({ url: `/play/clerk-apply/export-excel`, params })
  },

  // 同意店员申请
  agreeClerkApply: async (id: number) => {
    return await request.get({ url: `/play/clerk-apply/agree?id=` + id })
  }
}
