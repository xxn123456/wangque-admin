import request from '@/utils/request'

// login/login.vue 执行逻辑
export function login(data) {
  return request({
    url: '/manage/user/login',
    // 此处admin是代理
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/manage/pc/pcMenu/getPcMenuByRoleId',
    // 此处admin是代理
    method: 'get',
    // baseURL: 'https://some-domain.com/api/',配置基本url
    params: { token }
  })
}

export function logout(data) {
  return request({
    url: '/manage/out/logout',
    // 此处admin是代理
    method: 'post',
    // baseURL: 'https://some-domain.com/api/',配置基本url
    data
  })
}

// 查询用户菜单下面新发布的应用
export function queryUserMenuApply(data) {
  return request({
    url: '/manage/pc/user/getUserSubscription',
    // 此处admin是代理
    method: 'post',
    data
    // baseURL: 'https://some-domain.com/api/',配置基本url

  })
}

export function queryUserMenuApplyNum(data) {
  return request({
    url: '/manage/pc/user/getSubscriptionCount',
    // 此处admin是代理
    method: 'post',
    data
    // baseURL: 'https://some-domain.com/api/',配置基本url

  })
}

// 保存用户相应模板
export function saveUserMenuApply(data) {
  return request({
    url: '/manage/pc/user/userSubscription',
    // 此处admin是代理
    method: 'post',
    data
    // baseURL: 'https://some-domain.com/api/',配置基本url

  })
}

export function changeUserModeMenu(data) {
  return request({
    url: '/manage/pc/user/getSubscriptionPack',
    // 此处admin是代理
    method: 'post',
    data
  })
}

// 根据菜单id 查询菜单对应信息
export function queryMenuAbout(data) {
  return request({
    url: '/manage/pc/pcMenu/getPcMenuById',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 查询用户订阅应用(用户布局)

export function getUserLayout(data) {
  return request({
    url: '/manage/pc/user/getSubscriptionPacks',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 获取用户资料
export function getUserAbout(data) {
  return request({
    url: '/manage/pc/user/getPcUserById',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 修改用户资料

export function editUserAbout(data) {
  return request({
    url: '/manage/pc/user/changeUserInfo',
    // 此处admin是代理
    method: 'post',
    data
  })
}

// 校验密码
export function updataPassWord(data) {
  return request({
    url: '/manage/pc/user/editPassword',
    // 此处admin是代理
    method: 'post',
    data
  })
}

// 获取列表信息
export function getList(data) {
  return request({
    url: '/manage/api/user/getUserList',
    // 此处admin是代理
    method: 'post',
    // baseURL: 'https://some-domain.com/api/',配置基本url
    data
  })
}
// 添加用户
export function addUser(data) {
  return request({
    url: '/manage/api/user/insertUser',
    // 此处admin是代理
    method: 'post',
    // baseURL: 'https://some-domain.com/api/',配置基本url
    data
  })
}
// 编辑用户
export function editUser(data) {
  return request({
    url: '/manage/api/user/updatetUser',
    // 此处admin是代理
    method: 'post',
    // baseURL: 'https://some-domain.com/api/',配置基本url
    data
  })
}
// 删除接口
export function deleteUser(data) {
  return request({
    url: '/manage/api/user/deetetUser',
    // 此处admin是代理
    method: 'post',
    data
  })
}
// 获取权限接口
export function getRole() {
  return request({
    url: '/manage/api/role/all',
    // 此处admin是代理
    method: 'get'
  })
}
// 修改密码
export function changePwd(data) {
  return request({
    url: '/manage/api/user/updatePassword',
    // 此处admin是代理
    method: 'post',
    data
  })
}

