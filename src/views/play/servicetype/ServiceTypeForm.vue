<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="名字" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名字" />
      </el-form-item>
      <el-form-item label="父级编号" prop="parentId">
        <el-tree-select
          v-model="formData.parentId"
          :data="serviceTypeTree"
          :props="defaultProps"
          check-strictly
          default-expand-all
          placeholder="请选择父级编号"
        />
      </el-form-item>
      <el-form-item label="普通等级价格" prop="ordinaryLevelPrice">
        <el-input v-model="formData.ordinaryLevelPrice" placeholder="请输入普通等级价格" />
      </el-form-item>
      <el-form-item label="金牌等级价格" prop="goldmedalLevelPrice">
        <el-input v-model="formData.goldmedalLevelPrice" placeholder="请输入金牌等级价格" />
      </el-form-item>
      <el-form-item label="镇店等级价格" prop="zhendianLevelPrice">
        <el-input v-model="formData.zhendianLevelPrice" placeholder="请输入镇店等级价格" />
      </el-form-item>
      <el-form-item label="首席等级价格" prop="chiefLevelPrice">
        <el-input v-model="formData.chiefLevelPrice" placeholder="请输入首席等级价格" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { ServiceTypeApi, ServiceTypeVO } from '@/api/play/servicetype'
import { defaultProps, handleTree } from '@/utils/tree'

/** 陪玩服务类型 表单 */
defineOptions({ name: 'ServiceTypeForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  name: undefined,
  parentId: undefined,
  ordinaryLevelPrice: undefined,
  goldmedalLevelPrice: undefined,
  zhendianLevelPrice: undefined,
  chiefLevelPrice: undefined
})
const formRules = reactive({
  name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
  parentId: [{ required: true, message: '父级编号不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref
const serviceTypeTree = ref() // 树形结构

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await ServiceTypeApi.getServiceType(id)
    } finally {
      formLoading.value = false
    }
  }
  await getServiceTypeTree()
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as ServiceTypeVO
    if (formType.value === 'create') {
      await ServiceTypeApi.createServiceType(data)
      message.success(t('common.createSuccess'))
    } else {
      await ServiceTypeApi.updateServiceType(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    name: undefined,
    parentId: undefined,
    ordinaryLevelPrice: undefined,
    goldmedalLevelPrice: undefined,
    zhendianLevelPrice: undefined,
    chiefLevelPrice: undefined
  }
  formRef.value?.resetFields()
}

/** 获得陪玩服务类型树 */
const getServiceTypeTree = async () => {
  serviceTypeTree.value = []
  const data = await ServiceTypeApi.getServiceTypeList()
  const root: Tree = { id: 0, name: '顶级陪玩服务类型', children: [] }
  root.children = handleTree(data, 'id', 'parentId')
  serviceTypeTree.value.push(root)
}
</script>