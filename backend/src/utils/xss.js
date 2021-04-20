import xss from 'xss'
export function xssParse(html) {
  const options = {
    whiteList: {
      h1: ['style'],
      h2: ['style'],
      h3: ['style'],
      h4: ['style'],
      h5: ['style'],
      h6: ['style'],
      p: ['style'],
      span: ['style'],
      div: ['style'],
      strong: [],
      em: [],
      br: [],
      s: [],
      u: [],
      blockquote: [],
      a: ['href'],
      ol: [],
      ul: ['style'],
      li: ['style'],
      img: ['src', 'alt', 'style'],
      table: ['style'],
      tbody: ['style'],
      thead: ['style'],
      td: ['colspan', 'rowspan', 'align'],
      th: ['colspan', 'rowspan', 'align'],
      tr: ['style'],
      pre: [],
      code: []
    },
    css: {
      whiteList: {
        color: /^#[a-f0-9]{3,6}$/
      }
    },
    stripIgnoreTag: true,
    onTagAttr: function(tag, name, value, isWhiteAttr) {
      if (name === 'style') {
        value = value.trim()
        value = value.replace(RegExp('x-small', 'g'), '1.2vh;line-height:2.6vh')
        value = value.replace(RegExp('small', 'g'), '1.6vh;line-height:2.8vh')
        value = value.replace(RegExp('medium', 'g'), '2vh;line-height:3.2vh')
        value = value.replace(RegExp('xx-large', 'g'), '3vh;line-height:4.8vh')
        value = value.replace(RegExp('x-large', 'g'), '2.6vh;;line-height:4vh')
        value = value.replace(RegExp('large', 'g'), '2.2vh;line-height:3.6vh')
        return 'style="' + value + '"'
      }
      if (tag === 'img' && name === 'src') {
        value = value.trim()
        if (value.substr(0, 23) === 'data:image/jpeg;base64,' || value.substr(0, 22) === 'data:image/gif;base64,' || value.substr(0, 22) === 'data:image/png;base64,') {
          return 'src="' + value + '"'
        }
      }
    }
  }
  const myxss = new xss.FilterXSS(options)
  return myxss.process(html)
  // else{
  //     return myxss.process(html)
  // }
}
