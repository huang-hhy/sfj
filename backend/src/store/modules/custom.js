import commonFieldLib from '@/components/custom-form/utils/common'
export default {
  state: {
    // 组件库组件参数集合
    props: {},
    // 组件公共参数库
    common: [],
    // 当前表单的配置实体
    formModel: null,
    // 当前制作的表单字段集合
    fields: [],
    // 正在编辑的字段
    editField: null
  },
  getters: {
    /**
     * 当前制作的表单实体
     * @param state
     */
    model(state) {
      const m = {}
      state.fields.forEach(item => {
        if (!item) return
        // 分隔线组件无值
        if (item.type !== 'divider' && item.type !== 'label') {
          m[item.prop] = (item.props || {}).value || item.value
        }
      })
      return m
    },
    /**
     * 通用属性表单字段配置
     * @param state
     * @return {Array|*}
     */
    commonFields(state) {
      if (!state.editField) return []
      // 分隔线组件无表单字段通用属性
      if (state.editField.type === 'divider' || state.editField.type === 'label') {
        return []
      }

      //  公共属性设置表单的字段集合
      let fields = [...commonFieldLib]

      // 无选项的字段，不支持字典设置
      if (!state.editField.options) {
        fields = fields.filter(n => n.prop !== 'dict')
      }
      // 计算可以依赖的字段集合
      const canDependFields = state.fields.filter(n => n.prop !== state.editField.prop)

      // 把可依赖的字段集合构造成下拉选择框的选项
      const options = canDependFields.map(n => {
        return {
          label: n.prop,
          value: n.prop,
          type: n.type
        }
      })

      fields.push({
        label: '依赖字段',
        type: 'select',
        prop: 'depend',
        options: options,
        props: {
          clearable: true,
          placeholder: '请选择'
        }
      })

      // 当前编辑的字段依赖字段名称
      const dependProp = state.editField.depend
      if (dependProp) {
        // 找到依赖字段的输入框类型
        const dependType = (options.find(n => n.value === dependProp) || { type: 'text' }).type
        // 找到对应组件的参数属性集合
        const dependComponentFields = state.props[dependType]
        // 从参数集合中找到value的的配置，目的是为了找到value的数据类型，根据数据类型匹配对应的输入框
        const valueField = dependComponentFields.find(n => n.prop === 'value')
        if (valueField) {
          fields.push({
            label: '依赖值',
            prop: 'dependValue',
            type: valueField.type
          })
        }
      }
      return fields
    },
    /**
     * 扩展属性表单字段配置
     * @param state
     * @return {Array|*}
     */
    extendFields(state) {
      if (!state.editField) return []
      return state.props[state.editField.type]
    },

    /**
     * 通用属性表单实体
     * @param state
     * @param getters
     * @return {{}}
     */
    commonModel(state, getters) {
      if (!getters.commonFields) return {}
      const model = {}
      getters.commonFields.forEach(item => {
        model[item.prop] = state.editField[item.prop]
      })
      return model
    },

    /**
     * 计算默认值
     * @param state
     * @param getters
     * @return {{}}
     */
    defaultValue(state, getters) {
      if (!state.editField) return {}
      const type = state.editField.type
      const props = state.props[type] || []
      const defaultValues = {}
      props.forEach(n => {
        defaultValues[n.prop] = n.value
      })
      return defaultValues
    },

    /**
     * 扩展属性表单实体
     * @param state
     * @param getters
     * @return {{}}
     */
    extendModel(state, getters) {
      if (!getters.extendFields) return {}
      const model = {}

      getters.extendFields.forEach(item => {
        const value = state.editField.props[item.prop]
        model[item.prop] = typeof value === 'undefined' ? getters.defaultValue[item.prop] : value
      })
      return model
    }
  },
  mutations: {
    // 重置审批
    resetApproval(state) {
      state.apply = { name: '', description: '', group: '', img: '' }
      state.processList = [{ id: 0, title: '发起人', type: '0', content: '发起人自选', isShow: false }]
      state.fields = []
    },
    setProcessList(state, processList) {
      state.processList = processList
    },
    setApply(state, apply) {
      state.apply = apply
    },

    /**
     * 设置组件属性库
     * @param state
     * @param props
     */
    setProps(state, props) {
      state.props = props
    },
    /**
     * 设置表单配置实体
     * @param state
     * @param payload
     */
    setFormModel(state, payload) {
      state.formModel = payload
    },
    /**
     * 初始化表单字段
     * @param state
     * @param payload
     */
    setFields(state, payload) {
      state.fields = payload
    },

    /**
     * 设计区新增表单项组件
     * @param state
     * @param field
     * @param index
     */
    addField(state, { field, index }) {
      if (field) {
        state.fields.splice(index, 0, field)
      }
    },
    /**
     * 设计区删除表单项组件
     * @param state
     * @param field
     */
    removeField(state, field) {
      state.fields = state.fields.filter(item => field !== item)
    },
    /**
     * 设计区更新表单项组件
     * @param state
     * @param field
     */
    updateField(state, field) {
      const index = state.fields.findIndex(item => item.prop === state.editField.prop)
      state.fields.splice(index, 1, field)
      state.editField = field
    },
    /**
     * 设计区表单项排序
     * @param state
     * @param newIndex
     * @param oldIndex
     */
    sortFields(state, { newIndex, oldIndex }) {
      const item = state.fields[oldIndex]
      const newItem = state.fields[newIndex]
      if (!item || !newItem) return
      if (newIndex !== oldIndex) {
        state.fields.splice(oldIndex, 1)
        state.fields.splice(newIndex, 0, item)
      }
    },
    /**
     * 设置当前正在编辑的表单项组件
     * @param state
     * @param field
     */
    setEditField(state, field) {
      state.editField = field
    }
  },
  actions: {
  }
}
