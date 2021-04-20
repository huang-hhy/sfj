<template>
  <component :is="components[type]" v-if="isDivider" v-bind="props">
    <div v-if="$slots.body" slot="body" ref="body" class="xdh-form-item__body">
      <slot name="body" />
    </div>
  </component>
  <el-form-item
    v-else-if="isShowField"
    class="xdh-form-item"
    :class="itemClasses"
    v-bind="mergeAttrs"
    :prop="prop.toString()"
    :label-width="labelWidth"
    :rules="checkRules"
  >
    <component
      :is="components[type]"
      v-model="fieldValue"
      :options="optionsList"
      :prop="prop"
      v-bind="props"
      v-on="$listeners"
    >
      <slot name="inner" />
    </component>
    <slot />
    <div v-if="$slots.body" ref="body" class="xdh-form-item__body">
      <slot name="body" />
    </div>
  </el-form-item>
</template>

<script>
/**
   * 表单项组件
   * @module widgets/xdh-form-item
   *
   */
import Label from './../setting/items/label'
import input from './../setting/items/input'
import radio from './../setting/items/radio'
import checkbox from './../setting/items/checkbox'
import Switch from './../setting/items/switch'
import select from './../setting/items/select'
import cascader from './../setting/items/cascader'
import date from './../setting/items/date'
import time from './../setting/items/time'
import datetime from '../setting/items/datetime'
import number from './../setting/items/number'
import number2 from './../setting/items/number2'
import rate from './../setting/items/rate'
import slider from './../setting/items/slider'
import upload from './../setting/items/upload'
import range from './../setting/items/range'
import tag from './../setting/items/tag'
import tree from './../setting/items/tree'
import inputTag from './../setting/items/input-tag'
import divider from './../setting/items/divider'
import { getParent, getExtendAttrs, normalOptions } from '@/components/custom-form/utils/utils'
import { getPropByPath } from 'element-ui/src/utils/util'

const components = {
  label: Label,
  input,
  radio,
  checkbox,
  switch: Switch,
  select,
  cascader,
  date,
  time,
  datetime,
  divider,
  number,
  number2,
  rate,
  slider,
  upload,
  range,
  tag,
  inputTag,
  tree
  // color
}
/**
   * 插槽
   * @member slots
   * @property {string} - 定义组件附加内容，内容在输入框的下方
   * @property {string} inner 定义输入框内部内容
   */

export default {
  name: 'XdhFormItem',
  inject: {
    xdhForm: {
      default: null
    }
  },
  /**
     * 属性参数, 在支持el-form-item的基础扩展以下参数
     * @member props
     * @property {String} [type=text] 输入类型，可选 input number radio checkbox select cascader switch date range color divider number rate slider upload range tag color editor inputTag tree
     * @property {String} [dict] 字典值编码，xdh-form需要设置 load 或 dictMap 才有效
     * @property {Array} [options] 选项数组，项目对象 {id, parentId, label, value}, 树结构必须要与id和parentId
     * @property {Object} [props] 输入框组件实例化参数对象，详细要看对应type的组件
     * @property {Number|String} [contentWidth] 内容区宽度，不指定即自适应
     * @property {String} [depend] 依赖字段名称
     * @property {*} [dependValue] 依赖字段的值，依赖字段的值如果与设置的一致即显示
     * @property {Boolean} [block=false] 是否独占行显示
     * @property {Object|Array} [rules] 验证规则, 继承el-form-item
     * @property {string} [size] 内部表单项尺寸，可选值 medium / small / mini
     * @property {string} [labelPosition] 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
     * @property {string} [labelWidth] 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
     * @property {string} [labelSuffix]  表单域标签的后缀
     * @property {string} [label-width] 标签宽度，继承el-form-item
     * @property {string|number} prop 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的，继承el-form-item
     * @property {string} [label] 标签文本, 继承el-form-item
     * @property {*} [value] 字段值，支持双向绑定
     *
     */
  props: {
    type: {
      type: String,
      default: 'input',
      validator(val) {
        return !!components[val]
      }
    },
    prop: {
      type: [String, Number],
      required: true
    },
    // 字典值编码
    dict: {
      type: String,
      default: ''
    },

    // 选项数组
    options: {
      type: Array,
      default() {
        return []
      }
    },
    // 输入框组件实例化参数
    props: {
      type: Object,
      default() {
        return {}
      }
    },
    // 内容区宽度，不指定即自适应
    contentWidth: {
      type: [Number, String],
      default: ''
    },
    // 依赖字段
    depend: {
      type: String,
      default: ''
    },
    // 依赖字段值
    dependValue: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否换行block的方式展现
    block: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    rules: {
      type: [Array, Object]
    },
    // eslint-disable-next-line vue/require-prop-types,vue/require-default-prop
    value: {}
  },
  data() {
    return {
      optionsList: normalOptions(this.options)
    }
  },
  computed: {
    parent() {
      return getParent.call(this)
    },
    extendAttrs() {
      return getExtendAttrs.call(this)
    },
    labelWidth() {
      return this.extendAttrs.labelWidth || ''
    },
    fieldValue: {
      get() {
        const model = this.parent.currentModel
        if (model) {
          return getPropByPath(model, this.prop.toString(), true).v
        }
        return null
      },
      set(val) {
        const model = this.parent.currentModel
        const prop = getPropByPath(model, this.prop.toString())
        this.$set(prop.o, prop.k, val)
      }
    },
    itemClasses() {
      return [
        this.extendAttrs.validateMsg ? `xdh-validate--${this.extendAttrs.validateMsg}` : '',
        {
          'is-custom-width': !!this.contentWidth,
          'is-depend': !!this.depend,
          'is-block': this.block,
          'is-label-width': !!this.labelWidth
        }
      ]
    },
    isDivider() {
      return false
      // return this.type === 'divider'
    },
    isShowField() {
      // 排除无依赖、依赖是自身或设计模式时的设置
      if (!this.depend || this.depend === this.prop || this.xdhForm.designMode) return true
      const dependValue = this.parent.currentModel[this.depend]
      return dependValue === this.dependValue
    },
    checkRules() {
      if (!this.rules) return null
      const rules = Array.isArray(this.rules) ? this.rules : [].concat(this.rules)
      return rules.map(r => {
        if (r.pattern && typeof r.pattern === 'string') {
          r.pattern = new RegExp(r.pattern)
        }
        return r
      })
    },
    mergeAttrs() {
      const keys = ['label', 'labelWidth', 'size']
      const attrs = {}
      keys.forEach(k => {
        if (this.extendAttrs[k]) {
          if (this.extendAttrs[k] !== '文本标签' && this.extendAttrs[k] !== '分隔线') {
            attrs[k] = this.extendAttrs[k]
          }
        }
      })
      return attrs
    }
  },
  watch: {
    options(val) {
      // 字典优先
      if (this.dict) return
      this.optionsList = normalOptions(val)
    },
    dict() {
      this.loadOptions()
    },
    isShowField(val) {
      this.$nextTick(() => {
        val && this.init()
      })
    },
    fieldValue(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.fieldValue = val
    }
  },
  mounted() {
    this.init()
    if (this.$refs.body) {
      this.$el.appendChild(this.$refs.body)
    }
  },
  created() {
    this.components = components
    this.loadOptions()
    if (typeof this.value !== 'undefined') {
      this.fieldValue = this.value
    }
  },
  updated() {
    this.delaySetContentWidth(this.contentEl)
  },
  beforeDestroy() {
    this.contentEl = null
    if (this.$refs.body) {
      this.$refs.body.parentNode.removeChild(this.$refs.body)
    }
    this.clearValue()
  },
  methods: {
    init() {
      if (!this.isDivider && this.$el && this.$el.querySelector) {
        this.contentEl = this.$el.querySelector('.el-form-item__content')
        this.setContentWidth(this.contentEl)
      }
    },
    loadOptions() {
      // 未设置字典编码，不做任何处理
      if (!this.dict) return

      // 先检测是否有字典减值对配置，如有，优先取配置的数据
      const list = this.xdhForm.dictMap[this.dict]
      if (list) {
        this.optionsList = list
        return
      }

      // 是否有配置获取字典值方法，如有，执行方法获取数据
      if (this.xdhForm.load) {
        this.xdhForm.load(this).then(list => {
          this.optionsList = list
        })
      }
    },
    getLabelWidth() {
      return Math.max(
        Number.parseInt(this.mergeAttrs.labelWidth || 0),
        0
      )
    },
    setContentWidth(el) {
      if (!el) return

      // 换行模式
      if (this.block) {
        const labelWidth = this.getLabelWidth()
        el.style.width = `calc(100% - ${labelWidth}px)`
        return
      }

      // 只对inline模式有效
      if (!('inline' in this.extendAttrs)) return

      // 默认inlineSize
      if (!this.extendAttrs.inlineSize) {
        el.style.width = `auto`
        return
      }
      // 有设置 inlineSize
      const map = {
        large: 600,
        medium: 500,
        small: 300
      }
      const labelWidth = this.getLabelWidth()

      const width = Number.parseInt(this.contentWidth) || (map[this.extendAttrs.inlineSize] - labelWidth)
      el.style.width = `${width}px`
    },
    delaySetContentWidth(el) {
      this.$nextTick(() => {
        this.setContentWidth(el)
      })
    },
    clearValue() {
      this.fieldValue = undefined
      const model = this.parent.currentModel
      if (model && this.prop) {
        delete model[this.prop]
      }
      if (Array.isArray(model) && Number.isInteger(this.prop)) {
        model.splice(this.prop, 1)
      }
    }
  }
}
</script>
