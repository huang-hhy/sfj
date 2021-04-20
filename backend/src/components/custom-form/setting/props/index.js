import input from './input'
import radio from './radio'
import checkbox from './checkbox'
import switchItem from './switch'
import select from './select'
import date from './date'
import time from './time'
import datetime from './datetime'
import cascader from './cascader'
import divider from './divider'
import number from './number'
import number2 from './number2'
import rate from './rate'
import slider from './slider'
import upload from './upload'
import range from './range'
import tag from './tag'
import inputTag from './input-tag'
import color from './color'
import editor from './editor'
import tree from './tree'
import label from './label'
const map = {
  input,
  radio,
  checkbox,
  switch: switchItem,
  select,
  date,
  time,
  datetime,
  cascader,
  divider,
  number,
  number2,
  rate,
  slider,
  upload,
  range,
  tag,
  inputTag,
  color,
  editor,
  tree,
  label
}

function getConfig(props) {
  const result = []
  Object.keys(props).forEach(key => {
    let prop = props[key]
    // {}
    // {required:true}
    // {type: Number}
    // {type: [Number]}
    // [Number]
    // Number
    if (!prop.type) {
      const types = [Number, String, Boolean, Object, Function, Array]
      prop = {
        type: Array.isArray(prop) ? prop : (types.includes(prop) ? prop : String)
      }
    }
    prop.type = Array.isArray(prop.type) ? prop.type : [prop.type]
    if (prop.type.includes(String)) {
      let label = key
      if (key === 'value') {
        label = '值'
      } else if (key === 'type') {
        label = '类型'
      } else if (key === 'placeholder') {
        label = '提示内容'
      } else if (key === 'minPlaceholder') {
        label = '最小提示内容'
      } else if (key === 'maxPlaceholder') {
        label = '最大提示内容'
      } else if (key === 'addText') {
        label = '按钮文字'
      } else if (key === 'start') {
        label = '开始时间'
      } else if (key === 'end') {
        label = '结束时间'
      } else if (key === 'step') {
        label = '间隔时间'
      } else if (key === 'minTime') {
        label = '最小时间'
      } else if (key === 'maxTime') {
        label = '最大时间'
      } else if (key === 'selectableRange') {
        label = '可选时间段'
      } else if (key === 'content') {
        label = '值'
      }
      result.push({
        label: label,
        prop: key,
        type: 'input'
      })
    } else if (prop.type.includes(Number)) {
      let label = key
      if (key === 'rows') {
        label = '行数'
      } else if (key === 'value') {
        label = '值'
      } else if (key === 'step') {
        label = '步长'
      } else if (key === 'min') {
        label = '最小值'
      } else if (key === 'max') {
        label = '最大值'
      } else if (key === 'limit') {
        label = '最大可上传个数'
      }
      result.push({
        label: label,
        prop: key,
        type: 'number',
        props: {
          controlsPosition: 'right'
        }
      })
    } else if (prop.type.includes(Boolean)) {
      let label = key
      if (key === 'disabled') {
        label = '是否禁用'
      } else if (key === 'readonly') {
        label = '只读'
      } else if (key === 'showInList') {
        label = '显示在摘要列'
      } else if (key === 'value') {
        label = '开关'
      } else if (key === 'showText') {
        label = '显示分数文字'
      } else if (key === 'showScore') {
        label = '显示分数'
      } else if (key === 'showStops') {
        label = '点显示'
      } else if (key === 'range') {
        label = '是否为范围选择'
      } else if (key === 'multiple') {
        label = '是否可多选文件'
      } else if (key === 'closable') {
        label = '显示关闭'
      } else if (key === 'picker') {
        label = '显示时分秒'
      }
      result.push({
        label: label,
        prop: key,
        type: 'switch',
        props: {}
      })
    } else if (prop.type.includes('select')) {
      let label = key
      if (key === 'binding') {
        label = '绑定字段'
      } else if (key === 'dataType') {
        label = '数据类型'
      } else if (key === 'theme') {
        label = '主题颜色'
      } else if (key === 'contentPosition') {
        label = '文本对齐方式'
      }
      result.push({
        label: label,
        prop: key,
        type: 'select',
        props: { placeholder: '请选择' },
        options: prop.options
      })
    } else if (prop.type.includes('cascader')) {
      result.push({
        label: key,
        prop: key,
        props: { placeholder: '请选择' },
        type: 'cascader',
        options: prop.options
      })
    } else if (key === 'value' && prop.type.includes(Array)) {
      let label = key
      if (key === 'value') {
        label = '值'
      }
      result.push({
        label: label,
        prop: key,
        type: 'inputTag',
        props: {}
      })
    }
  })
  return result
}

function transform(map) {
  const result = {}
  Object.keys(map).forEach(key => {
    result[key] = getConfig(map[key])
  })
  return result
}

export default transform(map)
