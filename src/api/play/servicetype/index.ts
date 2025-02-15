import request from '@/config/axios'

// 陪玩服务类型 VO
export interface ServiceTypeVO {
  id: number // 编号
  name: string // 名字
  parentId: number // 父级编号
}

// 陪玩服务类型 API
export const ServiceTypeApi = {
  // 查询陪玩服务类型列表
  getServiceTypeList: async (params) => {
    return await request.get({ url: `/play/service-type/list`, params })
  },

  // 查询陪玩服务类型详情
  getServiceType: async (id: number) => {
    return await request.get({ url: `/play/service-type/get?id=` + id })
  },

  // 新增陪玩服务类型
  createServiceType: async (data: ServiceTypeVO) => {
    return await request.post({ url: `/play/service-type/create`, data })
  },

  // 修改陪玩服务类型
  updateServiceType: async (data: ServiceTypeVO) => {
    return await request.put({ url: `/play/service-type/update`, data })
  },

  // 删除陪玩服务类型
  deleteServiceType: async (id: number) => {
    return await request.delete({ url: `/play/service-type/delete?id=` + id })
  },

  // 导出陪玩服务类型 Excel
  exportServiceType: async (params) => {
    return await request.download({ url: `/play/service-type/export-excel`, params })
  }
}