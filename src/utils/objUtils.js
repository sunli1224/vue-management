// 重置表单数据
export var restObj = (obj) => {
  Object.assign(obj.$data, obj.$options.data())
}
