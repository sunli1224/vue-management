// 前端表单验证的数据
import
{
  validateName, validateStudentNumber,
  validateStudentName, validateHostelNum,
  validateDetail, validateDeatail,
  MannagerNameValidate, validatePhone,
  MannagerNumValidate, MannagerAgeValidate,
  MannagerAddressValidate, validateHostelOldNum,
  validateEmail, validatePass, userNameValidate,
  validateRecord, validateSameType
} from 'utils/validateData'

export var StuInfoRule = {
  stuName: [
    {
      validator: validateStudentName,
      trigger: 'blur'
    }
  ],
  stuNum: [
    {
      validator: validateStudentNumber,
      trigger: 'blur'
    }
  ],
  stuProfession: [
    {
      validator: validateStudentNumber,
      trigger: 'blur'
    }
  ],
  stuClass: [
    {
      validator: validateSameType,
      trigger: 'blur'
    }
  ],
  stuSess: [
    {
      validator: validateSameType,
      trigger: 'blur'
    }
  ],
  stuPhoneNumber: [
    {
      validator: validateSameType,
      trigger: 'blur'
    }
  ]
}

export var PersonalUserInfoRule = {
  phone: [
    {
      validator: validatePhone,
      trigger: 'blur'
    }
  ],
  email: [
    {
      validator: validateEmail,
      trigger: 'blur'
    }
  ]
}

export var RecordChangeRule = {
  stuNum: [
    {
      validator: validateStudentNumber,
      trigger: 'blur'
    }
  ],
  stuName: [
    {
      validator: validateStudentName,
      trigger: 'blur'
    }
  ],
  recordDetail: [
    {
      validator: validateRecord,
      trigger: 'blur'
    }
  ]
}

export var HostelOtherChangeRule = {
  hosNum: [
    {
      validator: validateHostelNum,
      trigger: 'blur'
    }
  ],
  hosOldStuNum: [
    {
      validator: validateHostelOldNum,
      trigger: 'blur'
    }
  ]
}

export var UserInfoRule = {
  username: [
    {
      validator: userNameValidate,
      trigger: 'blur'
    }
  ],
  password: [
    {
      validator: validatePass,
      trigger: 'blur'
    }
  ],
  phone: [
    {
      validator: validatePhone,
      trigger: 'blur'
    }
  ],
  email: [
    {
      validator: validateEmail,
      trigger: 'blur'
    }
  ]
}

export var FloorMannagerChangeRule = {
  empName: [
    {
      validator: MannagerNameValidate,
      trigger: 'blur'
    }
  ],
  empPhone: [
    {
      validator: validatePhone,
      trigger: 'blur'
    }
  ],
  empNum: [
    {
      validator: MannagerNumValidate,
      trigger: 'blur'
    }
  ],
  empAge: [
    {
      validator: MannagerAgeValidate,
      trigger: 'blur'
    }
  ],
  empAddress: [
    {
      validator: MannagerAddressValidate,
      trigger: 'blur'
    }
  ]
}

export var FloorChangeRule = {
  floorName: [
    {
      validator: validateName,
      trigger: 'blur'
    }
  ],
  floorDetail: [
    {
      validator: validateDeatail,
      trigger: 'blur'
    }
  ]
}

export var HostelChangeRule = {
  detail: [
    {
      validator: validateDetail,
      trigger: 'blur'
    }
  ]
}
