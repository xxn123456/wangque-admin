import request from '@/utils/request'

// 登录接口
export function login(data) {
  return request({
    url: '/user/login',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
