import request from '@/config/axios'

// 陪玩员工 VO
export interface StaffVO {
  id: number // 编号
  nickname: string // 店员昵称
  sex: number // 店员性别
  age: number // 店员年龄
  wechat: string // 微信号
  mobile: string // 手机号
  area: string // 所在地
  soundRecording: string // 录音
  headImage: string // 头像
  photo: string // 照片
  personalizedSignature: string // 个性签名
  constellation: string // 星座
  label: string // 标签
  classification: string // 分类
  isResign: number // 是否离职
}

// 陪玩员工 API
export const StaffApi = {
  // 查询陪玩员工分页
  getStaffPage: async (params: any) => {
    return await request.get({ url: `/play/staff/page`, params })
  },

  // 查询陪玩员工详情
  getStaff: async (id: number) => {
    return await request.get({ url: `/play/staff/get?id=` + id })
  },

  // 新增陪玩员工
  createStaff: async (data: StaffVO) => {
    return await request.post({ url: `/play/staff/create`, data })
  },

  // 修改陪玩员工
  updateStaff: async (data: StaffVO) => {
    return await request.put({ url: `/play/staff/update`, data })
  },

  // 删除陪玩员工
  deleteStaff: async (id: number) => {
    return await request.delete({ url: `/play/staff/delete?id=` + id })
  },

  // 导出陪玩员工 Excel
  exportStaff: async (params) => {
    return await request.download({ url: `/play/staff/export-excel`, params })
  }
}