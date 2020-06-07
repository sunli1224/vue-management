// 学生管理模块
export const stuHeader =
  ['序号', '姓名', '学号', '性别', '专业', '班级', '届数', '电话号码', '宿舍号', '楼号']
export const stuFilerVal =
  ['stuId', 'stuName', 'stuNum', 'stuSex', 'stuProfession',
    'stuClass', 'stuSess', 'stuPhoneNumber', 'hosNum', 'floorName']

// 楼宇管理模块
export var floorHeader = ['序号', '楼号', '备注', '楼宇管理员工号', '楼宇管理员', '楼宇管理员手机号']

export var floorFilerVal = ['floorId', 'floorName', 'floorDetail', 'empNum',
  'empName', 'empPhone']

// 楼宇管理员管理模块
export var floorManagerHeader = ['序号', '员工号', '姓名', '性别', '年龄', '职位', '手机号', '住址']

export var floorManagerFilerVal = ['empId', 'empNum', 'empName',
  'empSex', 'empAge', 'empPosition', 'empPhone', 'empAddress']

// 宿舍管理模块
export var HostelHeader = ['序号', '宿舍号', '已住人数', '可住人数', '楼号', '备注']

export var HostelFilerVal = ['hosId', 'hosNum', 'hosNewStuNum', 'hosOldStuNum',
  'floorName', 'floorDetail']

// 寝室调换记录模块
export var HostelChangeHeader = ['序号', '学号', '姓名', '原宿舍', '原楼号', '现宿舍', '现楼号', '调换原因', '记录时间']

export var HostelChangeFilerVal = ['derId', 'stuNum', 'stuName', 'oldHosName',
  'oldFloorName', 'newHosName', 'newFloorName', 'detail', 'recodTime']

// 缺勤记录模块
export var RecordHeader = ['序号', '学号', '姓名', '楼号', '宿舍号', '缺勤原因', '记录时间']

export var RecordChangeFilerVal = ['recodId', 'stuNum', 'stuName', 'floorName',
  'hosName', 'recordDetail', 'recodTime']

// 权限管理模块
export var AuthManagerHeader = ['序号', '用户名', '密码', '邮箱', '手机号', '用户updated', '用户创建时间', '用户更新时间']

export var AuthManagerFilerVal = ['id', 'username', 'password', 'email',
  'phone', 'name', 'created', 'updated']
