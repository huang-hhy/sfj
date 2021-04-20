<template>
  <el-form
    ref="form"
    v-bind="$attrs"
    class="xdh-form"
    :class="formClasses"
    :model="currentModel"
    @submit.native.prevent.stop="preventSubmit"
  >
    <div ref="body" class="xdh-form__body">
      <slot>
        <xdh-form-item v-for="item in fields" :key="item.prop" v-bind="item" />
      </slot>
      <el-form-item v-if="footer && isFooterInline" class="xdh-form__footer">
        <slot v-if="footer" name="footer">
          <el-button v-if="submitText" type="primary" :size="footerSize" @click="submit">{{ submitText }}</el-button>
          <el-button v-if="resetText" :size="footerSize" @click="reset">{{ resetText }}</el-button>
        </slot>
      </el-form-item>
    </div>
    <el-form-item
      v-if="footer && !isFooterInline"
      class="xdh-form__footer"
      :class="footerClasses"
      :label="footerAlignLabel"
    >
      <slot v-if="footer" name="footer">
        <el-button v-if="submitText" type="primary" :size="footerSize" @click="submit">{{ submitText }}</el-button>
        <el-button v-if="resetText" :size="footerSize" @click="reset">{{ resetText }}</el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script>
import XdhFormItem from './xdh-form-item'
import { clean } from '@/components/custom-form/utils/utils'
import { isEqual, debounce } from '@/components/custom-form/utils/util'

export default {
  name: 'XdhForm',
  components: {
    XdhFormItem
  },
  provide() {
    return {
      xdhForm: this
    }
  },
  props: {
    // 表单实体默认值
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    // 字典数据构造方法，必须返回Promise
    load: {
      type: Function,
      default() {
        return function() {}
      }
    },
    // 静态字典数据配置对象
    dictMap: {
      type: Object,
      default() {
        return {}
      }
    },
    // 验证信息显示方式
    validateMsg: {
      type: String,
      default: '',
      validator(val) {
        return ['top', 'right', 'bottom', ''].includes(val)
      }
    },
    // 是否显示footer
    footer: {
      type: Boolean,
      default: true
    },
    // 底部对齐方式
    footerAlign: {
      type: String,
      default: 'right',
      validator(val) {
        return ['label', 'left', 'right', 'center', 'inline', ''].includes(val)
      }
    },
    // 底部是否加边框, 设置了footerAlign才有效
    footerBorder: {
      type: Boolean,
      default: true
    },
    // 提交按钮文本
    submitText: {
      type: String,
      default: '保存'
    },
    // 重置按钮文本
    resetText: {
      type: String,
      default: '重置'
    },
    // inline模式的字段域尺寸
    inlineSize: {
      type: String,
      validator(val) {
        return ['large', 'medium', 'small', ''].includes(val)
      },
      default: ''
    },
    // 底部按钮尺寸
    footerSize: {
      type: String,
      validator(val) {
        return ['large', 'medium', 'small', 'mini', ''].includes(val)
      },
      default: 'small'
    },
    // 回车键提交表单
    enterSubmit: {
      type: Boolean,
      default: true
    },
    // 设计模式，仅在可视化制作工具中实用
    designMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentModel: { ...this.model },
      id: '',
      type: ''
    }
  },
  computed: {
    extendAttrs() {
      return {
        ...clean(this.$attrs),
        validateMsg: this.validateMsg,
        inlineSize: this.inlineSize

      }
    },
    formClasses() {
      return [this.$attrs.inline ? `is-inline-size is-inline-${this.inlineSize}` : '']
    },
    footerClasses() {
      return [
        `is-${this.footerAlign}`,
        {
          'is-border': (this.footerBorder && this.footerAlign && this.footerAlign !== 'label')
        }
      ]
    },
    footerAlignLabel() {
      return this.footerAlign === 'label' ? ' ' : null
    },
    isFooterInline() {
      return this.footerAlign === 'inline'
    }
  },
  watch: {
    model: {
      deep: true,
      handler(val) {
        if (!isEqual(val, this.currentModel)) {
          this.currentModel = { ...val }
        }
      }
    },
    currentModel: {
      deep: true,
      handler(val, old) {
        /**
           * 表单值发生改变时触发
           * @event change
           * @param {Object} val 新实体
           * @param {Object} old 旧实体
           */
        this.proxyHandleChange(val, old)
      }
    }
  },
  created() {
    this.proxyHandleChange = debounce(this.handleChange, 300, false, this)
  },
  methods: {
    // 提交表单
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', this.currentModel)
        }
      })
    },
    // 重置表单
    reset() {
      this.$refs.form.resetFields()
      this.currentModel = { ...this.model }
      this.$emit('reset', this.currentModel)
    },
    preventSubmit() {
      return false
    },
    handelEnterSubmit() {
      this.enterSubmit && this.submit()
    },
    // 表单值改变时触发
    handleChange(val, old) {
      this.$emit('change', val, old)
    }
  }
}
</script>
<style scoped lang="less">
  .process /deep/ .ivu-timeline-item-content {
    padding: 1px 1px 1px 24px;
  }

  .xdh-form__footer {
    text-align: right;
  }

  .person_list {
    display: inline-block;
  }

  .person_approval_list {
    line-height: 26px;
  }

  .circle {
    width: 40px;
    height: 40px;
    border: 1px solid #bebebe;
    display: inline-block;
    font-size: 10px;
    text-align: center;
    margin-top: 5px;
    margin-right: 10px;
    border-radius: 50%;
    position: relative;
  }

  .circle_add {
    font-size: 30px;
    /*margin-top: -2px;*/
    vertical-align: top;
    cursor: pointer;
  }

  .delete {
    font-size: 16px;
    position: absolute;
    /*top: 28px;*/
    margin-left: -22px;
    margin-top: -9px;
    cursor: pointer;
  }

  .set_person {
    .setPerson {
      display: flex;
      margin: 0 100px 20px 100px;
      /*position: fixed; // 浮动*/
      /*z-index: 999999;*/

      .item1 {
        width: 350px;
        border: 1px solid #dddddd;
        margin-right: 50px;
        font-size: 14px;

        .item1_head {
          padding-left: 10px;
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #dddddd;
          z-index: 2;
        }

        .search {
          margin: 10px;
          display: flex;
          z-index: 2;

          .search_input {
            margin-right: 3px;
          }
        }

        .item1_content {

          overflow-y: auto;
          max-height: 450px;

          .dept_select {
            padding-left: 10px;
            padding-top: 10px;

            .dept_select_name {
              display: inline-block;
              padding: 5px 10px;
              border: 1px solid #dddddd;
              margin-right: 2px;
              border-radius: 5px;
              cursor: pointer;
            }

            .dept_select_name2 {
              margin-left: 2px;
              border: 1px solid #80C6FE;
              color: #008DFD;
            }

            .dept_select_name:hover {
              border: 1px solid #80C6FE;
              color: #008DFD;
            }
          }

          .dept {
            margin: 20px 10px;

            .up_dept {
              margin: 10px 0;
              font-size: 13px;
            }

            .no_dept {
              margin: 10px;
              font-size: 12px;
            }

            .dept_name {
              width: 90px;
              height: 30px;
              display: inline-block;
              text-align: center;
              margin: 0 15px 10px 0;
              line-height: 30px;
              border: 1px solid #dddddd;
              cursor: pointer;
              border-radius: 5px;
            }

            .dept_name:hover {
              border: 1px solid #80C6FE;
              color: #008DFD;
            }
          }

          .person {
            margin: 10px;

            .select_person {
              display: block;
              font-size: 14px;
              margin: 5px 0;

              .icon {
                margin: 0 5px;
                font-size: 14px;
              }
            }
          }
        }
      }

      .item2 {
        width: 350px;
        border: 1px solid #dddddd;
        font-size: 14px;

        .item2_head {
          padding-left: 10px;
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #dddddd;
        }

        .item2_content {
          overflow-y: auto;
          padding-top: 5px;
          max-height: 450px;

          .item2_content_u {
            .item2_content_name {
              padding: 0 15px;
              height: 30px;
              width: 350px;
              display: table-cell;

              .item2_content_fl {
                float: left;
                font-size: 14px;
              }

              .item2_content_fr {
                padding-right: 5px;
                float: right;
                font-size: 14px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .footer {
      /*float: right;*/
      margin-left: 700px;
    }
  }
</style>
