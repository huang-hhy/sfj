import CryptoJS from 'crypto-js/crypto-js'

export function findFirstRouterByAccess(arr, access) {
  var router = ''
  for (var i in arr) {
    if (!arr[i].meta.roles || (arr[i].meta.roles.length && access.indexOf(arr[i].meta.roles[0]) > -1)) {
      if (arr[i].children) {
        const children = arr[i].children
        for (var j in children) {
          if (!children[j].meta.roles || children[j].meta.roles && access.indexOf(children[j].meta.roles[0]) > -1) {
            router = children[j].name
            break
          }
        }
        if (router !== '') break
      }
    }
  }
  return router
}

export function plusXing(str, frontLen, endLen) {
  var len = str.length - frontLen - endLen
  var xing = ''
  for (var i = 0; i < len; i++) {
    xing += '*'
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
}

export const encrypt = (content, key) => {
  if (!key) {
    key = 'abcdef0123456789'
  }
  var sKey = CryptoJS.enc.Utf8.parse(key)
  var sContent = CryptoJS.enc.Utf8.parse(content)
  var encrypted = CryptoJS.AES.encrypt(sContent, sKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}

export const decrypt = (content, key) => {
  if (!key) {
    key = 'abcdef0123456789'
  }
  var sKey = CryptoJS.enc.Utf8.parse(key)
  var decrypt = CryptoJS.AES.decrypt(content, sKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

export const encryptCBC = (content, key) => {
  if (!key) {
    key = 'abcdef0123456789'
  }
  var sKey = CryptoJS.enc.Utf8.parse(key)
  var sContent = CryptoJS.enc.Utf8.parse(content)
  var encrypted = CryptoJS.AES.encrypt(sContent, sKey, { iv: sKey, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}

export const decryptCBC = (content, key) => {
  if (!key) {
    key = 'abcdef0123456789'
  }
  var sKey = CryptoJS.enc.Utf8.parse(key)
  var decrypt = CryptoJS.AES.decrypt(content, sKey, { iv: sKey, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

export const jsonAssgin = (source, origin) => {
  for (const key in source) {
    if (origin.hasOwnProperty(key)) {
      source[key] = origin[key]
    }
  }
  return JSON.parse(JSON.stringify(source))
}

export const listToTree = (arr, pid) => {
  arr.forEach(element => {
    const parentId = element.parentId
    if (parentId !== pid) {
      arr.forEach(ele => {
        if (ele.id === parentId) {
          if (!ele.children) {
            ele.children = []
          }
          ele.children.push(element)
        }
      })
    }
  })
  arr = arr.filter(ele => ele.parentId === pid)
  return arr
}
function deepCopy(obj) {
  // 深度复制数组
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    const object = []
    for (let i = 0; i < obj.length; i++) {
      object.push(deepCopy(obj[i]))
    }
    return object
  }
  // 深度复制对象
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    const object = {}
    for (const p in obj) {
      object[p] = obj[p]
    }
    return object
  }
}
export const tree2Array = (treeObj, rootid) => {
  const temp = [] // 设置临时数组，用来存放队列
  const out = [] // 设置输出数组，用来存放要输出的一维数组
  temp.push(treeObj)
  // 首先把根元素存放入out中
  let pid = rootid
  const obj = deepCopy(treeObj)
  obj.pid = pid
  delete obj['children']
  out.push(obj)
  // 对树对象进行广度优先的遍历
  while (temp.length > 0) {
    const first = temp.shift()
    const children = first.children
    if (children && children.length > 0) {
      pid = first.id
      const len = first.children.length
      for (let i = 0; i < len; i++) {
        temp.push(children[i])
        const obj = deepCopy(children[i])
        obj.pid = pid
        delete obj['children']
        out.push(obj)
      }
    }
  }
  return out
}

export function uniqueArr(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  var array = []
  var isRepeat = false
  for (var i = 0; i < arr.length; i++) {
    if (!array.includes(arr[i])) { // includes 检测数组是否有某个值
      array.push(arr[i])
    } else {
      isRepeat = true
    }
  }
  return { array, isRepeat }
}
export function uniqueByKey(arr, keyName) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i][keyName] === arr[j][keyName]) { // 第一个等同于第二个，splice方法删除第二个
        arr.splice(j, 1)
        j--
      }
    }
  }
  return arr
}
export const alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
