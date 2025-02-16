<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="用户编号" prop="userId">
        <el-input v-model="formData.userId" placeholder="请输入用户编号" />
      </el-form-item>
      <el-form-item label="店员性别" prop="staffSex">
        <el-radio-group v-model="formData.staffSex">
          <el-radio
            v-for="dict in getIntDictOptions(DICT_TYPE.SYSTEM_USER_SEX)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="服务类型编号" prop="serviceTypeId">
        <el-input v-model="formData.serviceTypeId" placeholder="请输入服务类型编号" />
      </el-form-item>
      <el-form-item label="购买数量" prop="purchaseQuantity">
        <el-input v-model="formData.purchaseQuantity" placeholder="请输入购买数量" />
      </el-form-item>
      <el-form-item label="微信号" prop="wechat">
        <el-input v-model="formData.wechat" placeholder="请输入微信号" />
      </el-form-item>
      <el-form-item label="其他要求" prop="otherRequirements">
        <el-input v-model="formData.otherRequirements" placeholder="请输入其他要求" />
      </el-form-item>
      <el-form-item label="排除下单店员" prop="excludeStaff">
        <el-input v-model="formData.excludeStaff" placeholder="请输入排除下单店员" />
      </el-form-item>
      <el-form-item label="优惠券编号" prop="coupon">
        <el-input v-model="formData.coupon" placeholder="请输入优惠券编号" />
      </el-form-item>
      <el-form-item label="支付类型" prop="paymentType">
        <el-select v-model="formData.paymentType" placeholder="请选择支付类型">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.PLAY_PAYMENT_TYPE)"
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
import { RandomOrderApi, RandomOrderVO } from '@/api/play/randomorder'

/** 陪玩随机下单 表单 */
defineOptions({ name: 'RandomOrderForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  userId: undefined,
  staffSex: undefined,
  serviceTypeId: undefined,
  purchaseQuantity: undefined,
  wechat: undefined,
  otherRequirements: undefined,
  excludeStaff: undefined,
  coupon: undefined,
  paymentType: undefined
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
      formData.value = await RandomOrderApi.getRandomOrder(id)
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
    const data = formData.value as unknown as RandomOrderVO
    if (formType.value === 'create') {
      await RandomOrderApi.createRandomOrder(data)
      message.success(t('common.createSuccess'))
    } else {
      await RandomOrderApi.updateRandomOrder(data)
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
    userId: undefined,
    staffSex: undefined,
    serviceTypeId: undefined,
    purchaseQuantity: undefined,
    wechat: undefined,
    otherRequirements: undefined,
    excludeStaff: undefined,
    coupon: undefined,
    paymentType: undefined
  }
  formRef.value?.resetFields()
}
</script>