import React from 'react';
import moment from 'moment'
import nzh from 'nzh/cn'
import { parse, stringify } from 'qs'
import list from '@/mock/json'
export function getDataSource(d) {
  console.log(list)
  return JSON.parse(window.localStorage.getItem(d))
}

export function addDataSource(d, obj) {
  let data = []
  let array = []
  data = JSON.parse(window.localStorage.getItem(d))
  console.log(data, obj, '1')
  console.log(data, obj, array, '2', JSON.stringify(data))
  if (stringify(data) === '') {
    let objects = {
      ...obj,
      key: 0
    }
    array.unshift(objects)
    console.log(array, 'if ', JSON.stringify(array))
    window.localStorage.setItem(d, JSON.stringify(array))
  } else {
    let objects = {
      ...obj,
      key: data.length
    }
    data.unshift(objects)
    window.localStorage.setItem(d, JSON.stringify(data))
  }
  console.log(data, '3', array)
}
export function delData(d, i) {
  let data = JSON.parse(window.localStorage.getItem(d))
  data.splice(i, 1)
  console.log(data, 'data', i);
  let array = [];
  data.map((v, i) => {
    array.push({
      ...v,
      key: i
    })
    return null
  })
  console.log(array, 'array')
  window.localStorage.setItem(d, JSON.stringify(array))
}

export function editData(d, obj) {
  let data = JSON.parse(window.localStorage.getItem(d))
  // data.splice(obj.key, 1, obj)
  data.map(v => {
    if (v.key === obj.key) {
      v.name = obj.name
      v.age = obj.age
      v.address = obj.address
    }
    return null
  })
  window.localStorage.setItem(d, JSON.stringify(data))
  console.log(data, obj.key, obj)
}



export function fixedZero (val) {
  return val * 1 < 10 ? `0${val}` : val
}

export function getTimeDistance (type) {
  const now = new Date()
  const oneDay = 1000 * 60 * 60 * 24

  if (type === 'today') {
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return [moment(now), moment(now.getTime() + (oneDay - 1000))]
  }

  if (type === 'week') {
    let day = now.getDay()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    if (day === 0) {
      day = 6
    } else {
      day -= 1
    }

    const beginTime = now.getTime() - day * oneDay

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))]
  }

  if (type === 'month') {
    const year = now.getFullYear()
    const month = now.getMonth()
    const nextDate = moment(now).add(1, 'months')
    const nextYear = nextDate.year()
    const nextMonth = nextDate.month()

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`)
        .valueOf() - 1000),
    ]
  }

  if (type === 'year') {
    const year = now.getFullYear()

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)]
  }
}

export function getPlainNode (nodeList, parentPath = '') {
  const arr = []
  nodeList.forEach(node => {
    const item = node
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/')
    item.exact = true
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path))
    } else {
      if (item.children && item.component) {
        item.exact = false
      }
      arr.push(item)
    }
  })
  return arr
}

export function digitUppercase (n) {
  return nzh.toMoney(n)
}

function getRelation (str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!') // eslint-disable-line
  }
  const arr1 = str1.split('/')
  const arr2 = str2.split('/')
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2
  }
  return 3
}

function getRenderArr (routes) {
  let renderArr = []
  renderArr.push(routes[0])
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1)
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3)
    if (isAdd) {
      renderArr.push(routes[i])
    }
  }
  return renderArr
}

export function getRoutes (path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path,
  )
  routes = routes.map(item => item.replace(path, ''))

  const renderArr = getRenderArr(routes)
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(
      route => route !== item && getRelation(route, item) === 1)
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    }
  })
  return renderRoutes
}

export function getPageQuery () {
  return parse(window.location.href.split('?')[1])
}

export function getQueryPath (path = '', query = {}) {
  const search = stringify(query)
  if (search.length) {
    return `${path}?${search}`
  }
  return path
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export function isUrl (path) {
  return reg.test(path)
}

// /userInfo/2144/id => ['/userInfo','/userInfo/2144,'/userIndo/2144/id']
export function urlToList (url) {
  const urllist = url.split('/').filter(i => i)
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`
  })
}

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          style={{
            position: 'absolute',
            bottom: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}




