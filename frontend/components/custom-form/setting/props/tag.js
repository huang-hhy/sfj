export default {
  value: {
    type: Array,
    default() {
      return []
    }
  },
  theme: {
    // type: String,
    // default: '',
    // validator (val) {
    //   return ['success', 'info', 'warning', 'danger', ''].includes(val)
    // }
    type: 'select',
    default: 'text',
    options: ['success', 'info', 'warning', 'danger']
  },
  closable: {
    type: Boolean,
    default: true
  },
  addText: {
    type: String,
    default: '+ 添加'
  },
  showInList: Boolean
}
