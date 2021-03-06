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
  // ??????????????????
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    const object = []
    for (let i = 0; i < obj.length; i++) {
      object.push(deepCopy(obj[i]))
    }
    return object
  }
  // ??????????????????
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    const object = {}
    for (const p in obj) {
      object[p] = obj[p]
    }
    return object
  }
}
export const tree2Array = (treeObj, rootid) => {
  const temp = [] // ???????????????????????????????????????
  const out = [] // ?????????????????????????????????????????????????????????
  temp.push(treeObj)
  // ???????????????????????????out???
  let pid = rootid
  const obj = deepCopy(treeObj)
  obj.pid = pid
  delete obj['children']
  out.push(obj)
  // ???????????????????????????????????????
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
    if (!array.includes(arr[i])) { // includes ??????????????????????????????
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
      if (arr[i][keyName] === arr[j][keyName]) { // ??????????????????????????????splice?????????????????????
        arr.splice(j, 1)
        j--
      }
    }
  }
  return arr
}
export const alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
