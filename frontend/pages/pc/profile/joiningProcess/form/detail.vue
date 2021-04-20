<template>
  <el-dialog
    :title="list.partyStepName"
    :visible.sync="dialogFormVisible"
    :show-close="false"
    :close-on-click-modal="false"
    width="700px"
  >
    <div class="body">
      <el-form
        ref="flowForm"
        :model="list"
        label-width="110px"
      >
        <el-form-item
          v-for="(item, index) in list.customForm"
          :key="index"
          :label="item.label"
          :rules="item.rules"
        >
          <el-input
            v-if="item.type === 'input' && !item.props.type"
            v-model="item.props.value"
            :prop="item.prop"
            :placeholder="item.props.placeholder"
            :readonly="list.readonly"
          />
          <el-input
            v-else-if="item.type === 'input' && item.props.type && item.props.type === 'textarea'"
            type="textarea"
            :rows="item.props.rows"
            v-model="item.props.value"
            :readonly="list.readonly"
          />
          <el-select
            v-else-if="item.type === 'select'"
            v-model="item.props.value"
            :disabled="list.readonly"
          >
            <el-option
              v-for="i in item.options"
              :key="i.value"
              :label="i.label"
              :value="i.value"
            />
          </el-select>
          <el-radio-group
            v-else-if="item.type === 'radio'"
            v-model="item.props.value"
            v-for="(i, index) in item.options"
            :key="index"
            style="margin: 0 10px"
            :disabled="list.readonly"
          >
            <el-radio :label="i.value">{{ i.label }}</el-radio>
          </el-radio-group>
          <el-checkbox-group
            v-else-if="item.type === 'checkbox'"
            v-model="item.props.value"
            v-for="(i, index) in item.options"
            :key="index"
            :disabled="list.readonly"
          >
            <el-checkbox :label="i.value">{{ i.label }}</el-checkbox>
          </el-checkbox-group>
          <el-upload
            v-else-if="item.type === 'upload'"
            action="#"
            list-type="picture-card"
            :disabled="list.readonly"
          >
            <i class="el-icon-plus"/>
          </el-upload>
        </el-form-item>
      </el-form>
      <div v-if="list.readonly" class="else">
        <span>已审核</span>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <div v-if="!list.readonly">
        <el-button size="small" @click="cancel('flowForm')">取 消</el-button>
        <el-button size="small" type="primary" @click="submit('flowForm')">确定</el-button>
      </div>
      <el-button v-else size="small" type="primary" @click="cancel('flowForm')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "detail",
    props: {
      value: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        list: {}
      }
    },
    watch: {
      value: {
        handler(val) {
          this.list = JSON.parse(JSON.stringify(val))
          this.list.customForm = JSON.parse(this.list.customForm)
          this.list.readonly = this.list.status * 1 === 1
          this.list.customForm.forEach(item => {
            if (item.type === 'checkbox' && !item.props.value) {
              item.props.value = []
            }
          })
          this.dialogFormVisible = true
        },
        deep: true
      }
    },
    methods: {
      cancel(name) {
        this.dialogFormVisible = false
        this.$refs[name].resetFields()
      },
      submit(name) {
        if (this.list.status * 1 === 0) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              const data = JSON.parse(JSON.stringify(this.list))
              this.$emit('doSubmit', data)
            }
          })
        }
        this.cancel(name)
      }
    }
  }
</script>

<style scoped lang="less">
  .body {
    max-height: 500px;
    overflow: auto;
    position: relative;

    .else {
      position: absolute;
      top: 30px;
      right: 50px;
      width: 100px;
      height: 100px;
      border: #e33a3c 3px solid;
      border-radius: 50%;
      color: #e33a3c;
      text-align: center;
      line-height: 95px;
      font-size: 26px;
      font-weight: bold;
      transform: rotate(35deg);
    }
  }
  .body::-webkit-scrollbar {
    width: 2px;
  }
</style>
