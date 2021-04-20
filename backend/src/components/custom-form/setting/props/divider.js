// import Divider from '@/components/custom-form/setting/items/divider'

export default {
  // ...Divider.props,
  content: String,
  showInList: Boolean,
  contentPosition: {
    type: 'select',
    options: [
      {
        label: 'left',
        value: 'left'
      },
      {
        label: 'center',
        value: 'center'
      },
      {
        label: 'right',
        value: 'right'
      }
    ]
  }
}
