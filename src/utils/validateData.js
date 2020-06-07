// 自定义校验规则封装

export var validateSameType = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('字段不能为空'))
  }
  return callback()
}

export var validatePass = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('密码不能为空'))
  }
  return callback()
}

export var validateOldPass = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('旧密码不能为空'))
  }
  return callback()
}

export var validateNewPass = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('新密码不能为空'))
  }
  return callback()
}

export var validateHostelOldNum = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('可住人数不能为空'))
  }
  return callback()
}

export var validateRecord = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('缺勤原因不能为空'))
  }
  return callback()
}

export var validateDetail = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('调换原因不能为空'))
  }
  return callback()
}

export var validateStudentName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('学生姓名不能为空'))
  }
  return callback()
}

export var validateStudentNumber = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('学生学号不能为空'))
  }
  return callback()
}

export var validateHostelNum = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('宿舍号不能为空'))
  }
  return callback()
}

export var MannagerAddressValidate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('员工地址不能为空'))
  }
  return callback()
}

export var MannagerAgeValidate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('员工年龄不能为空'))
  }
  if (!/^([1-9]\d?|100)$/.test(value)) {
    return callback(new Error('年龄只能在0-100以内'))
  }
  return callback()
}

export var MannagerNumValidate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('员工编号不能为空'))
  }
  return callback()
}

export var MannagerNameValidate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('管理员姓名不能为空'))
  }
  return callback()
}

export var userNameValidate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('用户名不能为空'))
  }
  return callback()
}

export var passWordValidate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('密码不能为空'))
  }
  return callback()
}

export var validateName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('楼宇不能为空'))
  }
  return callback()
}

export var validateDeatail = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('备注不能为空'))
  }
  return callback()
}

export var validatePhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'))
  }
  if (!(/^1[3-578]\d{9}$/).test(value)) {
    return callback(new Error('输入内容不符合手机号规则'))
  }
  return callback()
}

export var validateEmail = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('邮箱不能为空'))
  }
  if (!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/).test(value)) {
    return callback(new Error('输入内容不符合邮箱号规则'))
  }
  return callback()
}
