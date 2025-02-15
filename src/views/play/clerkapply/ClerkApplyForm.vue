<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="店员昵称" prop="nickname">
        <el-input v-model="formData.nickname" placeholder="请输入店员昵称" />
      </el-form-item>
      <el-form-item label="店员性别" prop="sex">
        <el-select v-model="formData.sex" placeholder="请选择店员性别">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.SYSTEM_USER_SEX)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="店员年龄" prop="age">
        <el-input v-model="formData.age" placeholder="请输入店员年龄" />
      </el-form-item>
      <el-form-item label="微信号" prop="wechat">
        <el-input v-model="formData.wechat" placeholder="请输入微信号" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="所在地" prop="area">
        <el-input v-model="formData.area" placeholder="请输入所在地" />
      </el-form-item>
      <el-form-item label="是否有其他店铺经验" prop="experience">
        <el-radio-group v-model="formData.experience">
          <el-radio
            v-for="dict in getIntDictOptions(DICT_TYPE.PLAY_IS_NOT)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="录音" prop="soundRecording">
        <UploadFile v-model="formData.soundRecording" />
      </el-form-item>
      <el-form-item label="照片" prop="photo">
        <UploadImg v-model="formData.photo" />
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
import { ClerkApplyApi, ClerkApplyVO } from '@/api/play/clerkapply'

/** 陪玩店员申请 表单 */
defineOptions({ name: 'ClerkApplyForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  nickname: undefined,
  sex: undefined,
  age: undefined,
  wechat: undefined,
  mobile: undefined,
  area: undefined,
  experience: undefined,
  soundRecording: undefined,
  photo: undefined
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
      formData.value = await ClerkApplyApi.getClerkApply(id)
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
    const data = formData.value as unknown as ClerkApplyVO
    if (formType.value === 'create') {
      await ClerkApplyApi.createClerkApply(data)
      message.success(t('common.createSuccess'))
    } else {
      await ClerkApplyApi.updateClerkApply(data)
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
    nickname: undefined,
    sex: undefined,
    age: undefined,
    wechat: undefined,
    mobile: undefined,
    area: undefined,
    experience: undefined,
    soundRecording: undefined,
    photo: undefined
  }
  formRef.value?.resetFields()
}
</script>
