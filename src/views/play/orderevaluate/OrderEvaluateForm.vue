<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="订单编号" prop="serviceOrderId">
        <el-input v-model="formData.serviceOrderId" placeholder="请输入订单编号" />
      </el-form-item>
      <el-form-item label="评价内容" prop="content">
        <el-input v-model="formData.content" placeholder="请输入评价内容" />
      </el-form-item>
      <el-form-item label="评分" prop="score">
        <el-select v-model="formData.score" placeholder="请选择评分">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.PLAY_ORDER_SCORE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否匿名评价" prop="isAnonymous">
        <el-select v-model="formData.isAnonymous" placeholder="请选择是否匿名评价">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.PLAY_IS_NOT)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import { OrderEvaluateApi, OrderEvaluateVO } from '@/api/play/orderevaluate'

/** 陪玩评价 表单 */
defineOptions({ name: 'OrderEvaluateForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  serviceOrderId: undefined,
  content: undefined,
  score: undefined,
  isAnonymous: undefined
})
const formRules = reactive({
})
const formRef = ref() // 表单 Ref

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
      formData.value = await OrderEvaluateApi.getOrderEvaluate(id)
    } finally {
      formLoading.value = false
    }
  }
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
    const data = formData.value as unknown as OrderEvaluateVO
    if (formType.value === 'create') {
      await OrderEvaluateApi.createOrderEvaluate(data)
      message.success(t('common.createSuccess'))
    } else {
      await OrderEvaluateApi.updateOrderEvaluate(data)
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
    serviceOrderId: undefined,
    content: undefined,
    score: undefined,
    isAnonymous: undefined
  }
  formRef.value?.resetFields()
}
</script>