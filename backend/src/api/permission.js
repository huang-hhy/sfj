import request from '@/utils/request'

export function getSupplierList(params, data) {
  return request({
    url: '/api/base/supplier/list',
    method: 'post',
    params,
    data
  })
}

export function getSupplier(id) {
  return request({
    url: '/api/base/supplier/' + id,
    method: 'get'
  })
}

export function getSupplierInfoByToken() {
  return request({
    url: '/api/base/supplier/getSupplierInfoByToken',
    method: 'get'
  })
}

export function saveSupplier(data) {
  return request({
    url: '/api/base/supplier/add',
    method: 'post',
    data
  })
}

export function updateSupplier(data) {
  return request({
    url: '/api/base/supplier/edit',
    method: 'post',
    data
  })
}

export function deleteSupplier(id) {
  return request({
    url: '/api/base/supplier/' + id,
    method: 'delete'
  })
}

// 用户类型模块
export function getUserType(id) {
  return request({
    url: '/api/base/userType/' + id,
    method: 'get'
  })
}

export function getUserSelectList(data) {
  return request({
    url: '/api/base/userType/selectList',
    method: 'post',
    data
  })
}

export function getUserTypeList(params, data) {
  return request({
    url: '/api/base/userType/list',
    method: 'post',
    params,
    data
  })
}

export function saveUserType(data) {
  return request({
    url: '/api/base/userType/add',
    method: 'post',
    data
  })
}

export function updateUserType(data) {
  return request({
    url: '/api/base/userType/edit',
    method: 'post',
    data
  })
}

export function deleteUserType(id) {
  return request({
    url: '/api/base/userType/' + id,
    method: 'delete'
  })
}
// 用户类型模块end

// 用户列表查询
export function queryUser(params, data) {
  return request({
    url: '/api/base/user/list',
    method: 'post',
    params,
    data
  })
}

// 用户获取单个
export function getUser(id) {
  return request({
    url: '/api/base/user/getInfo/' + id,
    method: 'get'
  })
}

// 用户删除
export function deleteUser(id) {
  return request({
    url: '/api/base/user/' + id,
    method: 'delete'
  })
}

// 用户新增
export function saveUser(data) {
  return request({
    url: '/api/base/user/add',
    method: 'post',
    data
  })
}

// 修改用户状态
export function changeUserStatus(data) {
  return request({
    url: '/api/base/user/changeStatus',
    method: 'post',
    data
  })
}

// 用户更新
export function updateUser(data) {
  return request({
    url: '/api/base/user/edit',
    method: 'post',
    data
  })
}

// 用户修改密码
export function resetUserPwd(data) {
  return request({
    url: '/api/base/user/resetPwd',
    method: 'post',
    data
  })
}

// 权限列表
export function getAuthTree(params) {
  return request({
    url: '/api/base/menu/treeselect',
    method: 'get',
    params
  })
}

// 权限单个查询
export function getAuth(id) {
  return request({
    url: '/api/base/menu/' + id,
    method: 'get'
  })
}

// 权限删除
export function deleteAuth(id) {
  return request({
    url: '/api/base/menu/' + id,
    method: 'delete'
  })
}

// 权限新增
export function saveAuth(data) {
  return request({
    url: '/api/base/menu/add',
    method: 'post',
    data
  })
}

// 权限更新
export function updateAuth(data) {
  return request({
    url: '/api/base/menu/edit',
    method: 'post',
    data
  })
}

// 查询组织类型信息下拉列表

export function getOrgTypeList(params, data) {
  return request({
    url: '/api/base/orgType/list',
    method: 'post',
    params,
    data
  })
}

export function getOrgSelectList(data) {
  return request({
    url: '/api/base/orgType/selectList',
    method: 'post',
    data
  })
}

export function queryorgTypeTree(data) {
  return request({
    url: '/api/base/orgType/selectList',
    method: 'post',
    data
  })
}

// 新增组织类型
export function saveOrgType(data) {
  return request({
    url: '/api/base/orgType/add',
    method: 'post',
    data
  })
}

// 修改组织类型信息
export function updateOrgType(data) {
  return request({
    url: '/api/base/orgType/edit',
    method: 'post',
    data
  })
}

// 删除组织类型信息
export function deleteOrgType(id) {
  return request({
    url: '/api/base/orgType/' + id,
    method: 'delete'
  })
}

// 查看组织类型信息详情
export function getOrgType(id) {
  return request({
    url: '/api/base/orgType/' + id,
    method: 'get'
  })
}

// 查询所有组织类型 (分页)
export function queryOrgType(data) {
  return request({
    url: '/api/base/orgType/list',
    method: 'post',
    data
  })
}

// 查看组织列表接口（树结构）
export function queryOrgTree(data) {
  return request({
    url: '/api/base/org/treeselect',
    method: 'post',
    data
  })
}

export function queryOrgTreeByRoleId(roleId) {
  return request({
    url: '/api/base/org/roleorgTreeselect' + roleId,
    method: 'get'
  })
}

// 查看所有组织列表
export function queryOrg(data) {
  return request({
    url: '/api/base/org/list',
    method: 'post',
    data
  })
}

// 组织单个获取
export function getOrg(id) {
  return request({
    url: '/api/base/org/' + id,
    method: 'get'
  })
}

// 组织删除
export function deleteOrg(id) {
  return request({
    url: '/api/base/org/' + id,
    method: 'delete'
  })
}

// 组织新增
export function saveOrg(data) {
  return request({
    url: '/api/base/org/add',
    method: 'post',
    data
  })
}

// 组织更新
export function updateOrg(data) {
  return request({
    url: '/api/base/org/edit',
    method: 'post',
    data
  })
}

export function getDataScope(id) {
  return request({
    url: '/api/base/role/roleOrg/' + id,
    method: 'get'
  })
}

export function updateDataScope(data) {
  return request({
    url: '/api/base/role/dataScope',
    method: 'post',
    data
  })
}

// 角色权限列表查询
export function getRoleList(params, data) {
  return request({
    url: '/api/base/role/list',
    method: 'post',
    params,
    data
  })
}

// 角色权限单个获取
export function getRole(id) {
  return request({
    url: '/api/base/role/' + id,
    method: 'get'
  })
}

// 角色权限删除
export function deleteRole(id) {
  return request({
    url: '/api/base/role/' + id,
    method: 'delete'
  })
}

// 角色权限新增
export function saveRole(data) {
  return request({
    url: '/api/base/role/add',
    method: 'post',
    data
  })
}

// 角色权限更新
export function updateRole(data) {
  return request({
    url: '/api/base/role/edit',
    method: 'post',
    data
  })
}

// 套餐列表查询
export function getPackList(params, data) {
  return request({
    url: '/api/base/pack/list',
    method: 'post',
    params,
    data
  })
}

export function getPackAll(params) {
  return request({
    url: '/api/base/pack/optionSelect',
    method: 'get',
    params
  })
}

export function getPack(id) {
  return request({
    url: '/api/base/pack/' + id,
    method: 'get'
  })
}

// 套餐删除
export function deletePack(id) {
  return request({
    url: '/api/base/pack/' + id,
    method: 'delete'
  })
}

// 套餐新增
export function savePack(data) {
  return request({
    url: '/api/base/pack/add',
    method: 'post',
    data
  })
}

// 套餐更新
export function updatePack(data) {
  return request({
    url: '/api/base/pack/edit',
    method: 'post',
    data
  })
}

export function getOperlogList(params, data) {
  return request({
    url: '/api/system/operlog/list',
    method: 'post',
    params,
    data
  })
}

export function deleteOperlog(id) {
  return request({
    url: '/api/system/operlog/' + id,
    method: 'delete'
  })
}

export function cleanOperlog() {
  return request({
    url: '/api/system/operlog/clean',
    method: 'delete'
  })
}

export function exportPack(data) {
  return request({
    url: '/api/system/operlog',
    method: 'post',
    data
  })
}

export function getThesaurus(id) {
  return request({
    url: '/api/base/thesaurus/' + id,
    method: 'get'
  })
}

export function getThesaurusList(params, data) {
  return request({
    url: '/api/base/thesaurus/list',
    method: 'post',
    params,
    data
  })
}

export function saveThesaurus(data) {
  return request({
    url: '/api/base/thesaurus/add',
    method: 'post',
    data
  })
}

export function updateThesaurus(data) {
  return request({
    url: '/api/base/thesaurus/edit',
    method: 'post',
    data
  })
}

export function deleteThesaurus(id) {
  return request({
    url: '/api/base/thesaurus/' + id,
    method: 'delete'
  })
}

