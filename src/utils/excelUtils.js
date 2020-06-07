// excel工具类
export var createExcel = (obj, Header, FilerVal) => {
  if (obj.multipleSelection.length !== 0) {
    console.log(obj.multipleSelection.label)
    const tableObject = {
      tHeader: Header,
      filerVal: FilerVal,
      tableData: obj.multipleSelection
    }
    console.log(tableObject)
    exportExcel(obj.viewName, tableObject)
  } else {
    obj.$message({
      message: '您未选择内容，无法生成excel',
      type: 'warning'
    })
  }
  obj.$refs.tableStudentForm.clearSelection()
}

export var exportExcel = (viewName, tableObject) => {
  require.ensure([], () => {
    // eslint-disable-next-line camelcase
    const { export_json_to_excel } = require('../excel/Export2Excel')
    const tHeader = tableObject.tHeader
    // 上面设置Excel的表格第一行的标题
    const filterVal = tableObject.filerVal
    // 上面的index、nickName、name是tableData里对象的属性
    const list = tableObject.tableData // 把data里的tableData存到list
    console.log(filterVal)
    const data = formatJson(filterVal, list)
    // 文件随机字符串名
    const genRandomString = len => {
      let rdmString = ''
      while (rdmString.length < len) {
        rdmString += (Math.random() * 37 | 0).toString(36)
      }
      return rdmString
    }
    export_json_to_excel(tHeader, data, viewName + genRandomString(8))
  })
}
// 生成map集合
export var formatJson = (filterVal, jsonData) => {
  return jsonData.map(v => filterVal.map(j => v[j]))
}
