import { options, tree } from './defaultOptions'

export default [
  {
    type: 'input',
    title: '单行输入框',
    props: { showInList: true },
    icon: 'singleLine'
  },
  {
    type: 'input',
    title: '多行输入框',
    props: {
      type: 'textarea',
      rows: 3,
      showInList: true
    },
    icon: 'multiLine'
  },
  {
    type: 'radio',
    title: '单选框',
    props: { showInList: true },
    options: options,
    icon: 'singleChoice'
  },
  {
    type: 'checkbox',
    title: '多选框',
    props: { showInList: true },
    options: options,
    icon: 'multipleChoice'
  },
  {
    type: 'switch',
    title: '开关',
    props: {
      value: true,
      showInList: true
    },
    icon: 'switch'
  },
  {
    type: 'rate',
    title: '评分',
    props: { showInList: true },
    value: 3,
    icon: 'rate'
  },
  {
    type: 'number',
    title: '数字',
    props: { showInList: true },
    icon: 'number'
  },
  {
    type: 'number2',
    title: '金额',
    props: { showInList: true },
    icon: 'number'
  },
  {
    type: 'select',
    title: '下拉框',
    props: { placeholder: '请选择', showInList: true },
    options: options,
    icon: 'select'
  },
  {
    type: 'cascader',
    title: '级联',
    props: { placeholder: '请选择', showInList: true },
    options: tree,
    value: [],
    icon: 'cascader'
  },
  {
    type: 'date',
    title: '日期',
    props: { showInList: true },
    icon: 'date'
  },
  {
    type: 'time',
    title: '时间',
    props: { showInList: true },
    icon: 'time'
  },
  {
    type: 'datetime',
    title: '日期时间',
    props: { showInList: true },
    icon: 'time'
  },
  {
    type: 'slider',
    title: '滑块',
    props: { showInList: true },
    value: 1,
    icon: 'slider'
  },
  {
    type: 'upload',
    title: '上传',
    props: {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      showInList: true
    },
    icon: 'upload'
  },
  {
    type: 'range',
    title: '范围',
    props: { showInList: true },
    icon: 'range'
  },
  {
    type: 'tag',
    title: '标签',
    props: { showInList: true },
    icon: 'tag'
  },
  // {
  //   type: 'inputTag',
  //   title: '标签框',
  //   props: { showInList: true },
  //   icon: 'inputTag'
  // },
  {
    type: 'label',
    title: '文本标签',
    helper: true,
    props: { showInList: false, value: '文本标签' },
    icon: 'tag'
  },
  {
    type: 'divider',
    title: '分隔线',
    helper: true,
    props: {
      showInList: false,
      content: '分割线'
    },
    icon: 'divider'
  }
]
