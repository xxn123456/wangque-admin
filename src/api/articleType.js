import request from '@/utils/request'

// 搜索分页
export function findAll(data) {
  return request({
    url: '/articleType/findAll',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 创建文章类别
export function create(data) {
    return request({
      url: '/articleType/create',
      // 此处admin是代理
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }
// 修改文章类别
export function updata(data) {
    return request({
      url: '/articleType/updata',
      // 此处admin是代理
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }

// 删除文章类别

export function del(data) {
    return request({
      url: '/articleType/del',
      // 此处admin是代理
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
  }

  // 批量删除文章类别

export function batchDel(data) {
  return request({
    url: '/articleType/batchDel',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}



