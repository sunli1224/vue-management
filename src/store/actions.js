
export const actions = {
  changeUserImg ({ commit }, payload) {
    commit('changeUserImg', payload)
  },
  async changeUserInfo ({ commit, state }, payload) {
    if (payload.val.phone) {
      commit('changeUserPhone', payload.val.phone)
    }
    if (payload.val.email) {
      commit('changeUserEmail', payload.val.email)
    }
    commit('changeInfoTime', payload.time)
  },
  async setUserStatus ({ commit }, payload) {
    commit('setUserStatus', payload)
  },
  setViewName ({ commit }, payload) {
    // 动态修改视图名称
    commit('setViewName', payload)
  },
  getRouterList ({ commit }, payload) {
    commit('getRouterList', payload)
  },
  getTableData ({ commit }, payload) {
    commit('getTableData', payload)
  },
  deleteTableData ({ commit }, payload) {
    commit('deleteTableData', payload)
  },
  setPageData ({ commit }, payload) {
    commit('setPageData', payload)
  },
  popTableData ({ commit }, payload) {
    commit('popTableData', payload)
  },
  popAllTableData ({ commit, state }, payload) {
    payload.forEach(item => {
      for (let i = state.tableData.length - 1; i >= 0; i--) {
        if (state.tableData[i].stuNum === item) {
          commit('popAllTableData', i)
          // state.tableData.splice(i, 1)
        }
      }
    })
  },
  popFloorTableData ({ commit, state }, payload) {
    for (let i = 0; i < state.tableData.length + 1; i++) {
      if (state.tableData[i].floorId === payload) {
        commit('popAllTableData', i)
      }
    }
  },
  popAllFloorTableData ({ commit, state }, payload) {
    payload.forEach(item => {
      for (let i = state.tableData.length - 1; i >= 0; i--) {
        if (state.tableData[i].floorId === item) {
          commit('popAllTableData', i)
          // state.tableData.splice(i, 1)
        }
      }
    })
  },
  addNewFloorTableData ({ commit, state }, payload) {
    commit('addNewFloorTableData', payload)
  },
  popEmpTableData ({ commit, state }, payload) {
    for (let i = 0; i < state.tableData.length + 1; i++) {
      if (state.tableData[i].empId === payload) {
        commit('popAllTableData', i)
      }
    }
  },
  popRecordTableInfo ({ commit, state }, payload) {
    for (let i = 0; i < state.tableData.length + 1; i++) {
      if (state.tableData[i].recodId === payload) {
        commit('popAllTableData', i)
      }
    }
  },
  popUserTableInfo ({ commit, state }, payload) {
    for (let i = 0; i < state.tableData.length + 1; i++) {
      if (state.tableData[i].id === payload) {
        commit('popAllTableData', i)
      }
    }
  },
  popDorInfoTable ({ commit, state }, payload) {
    for (let i = 0; i < state.tableData.length + 1; i++) {
      if (state.tableData[i].derId === payload) {
        commit('popAllTableData', i)
      }
    }
  },
  popHosTableData ({ commit, state }, payload) {
    for (let i = 0; i < state.tableData.length + 1; i++) {
      if (state.tableData[i].hosId === payload) {
        commit('popAllTableData', i)
      }
    }
  },
  popAllEmpTableData ({ commit, state }, payload) {
    payload.forEach(item => {
      for (let i = state.tableData.length - 1; i >= 0; i--) {
        if (state.tableData[i].empId === item) {
          commit('popAllTableData', i)
          // state.tableData.splice(i, 1)
        }
      }
    })
  },
  popAllHostelTableData ({ commit, state }, payload) {
    payload.forEach(item => {
      for (let i = state.tableData.length - 1; i >= 0; i--) {
        if (state.tableData[i].hosId === item) {
          commit('popAllTableData', i)
          // state.tableData.splice(i, 1)
        }
      }
    })
  },
  popAllRecordTableData ({ commit, state }, payload) {
    payload.forEach(item => {
      for (let i = state.tableData.length - 1; i >= 0; i--) {
        if (state.tableData[i].recodId === item) {
          commit('popAllTableData', i)
          // state.tableData.splice(i, 1)
        }
      }
    })
  },
  popAllUserInfoTableData ({ commit, state }, payload) {
    payload.forEach(item => {
      for (let i = state.tableData.length - 1; i >= 0; i--) {
        if (state.tableData[i].id === item) {
          commit('popAllTableData', i)
          // state.tableData.splice(i, 1)
        }
      }
    })
  },
  popAllDorTableData ({ commit, state }, payload) {
    payload.forEach(item => {
      for (let i = state.tableData.length - 1; i >= 0; i--) {
        if (state.tableData[i].derId === item) {
          commit('popAllTableData', i)
          // state.tableData.splice(i, 1)
        }
      }
    })
  },
  setFloorInfoData ({ commit, state }, payload) {
    const floorInfoList = []
    payload.forEach(item => {
      floorInfoList.push({
        value: item.floorId,
        Label: item.floorName
      })
    })
    commit('setFloorInfoData', floorInfoList)
  },
  setHosInfoData ({ commit, state }, payload) {
    const HosInfoList = []
    payload.forEach(item => {
      HosInfoList.push({
        value: item.hosId,
        Label: item.hosNum
      })
    })
    commit('setHosInfoData', HosInfoList)
  },
  addFloorManagerInfo ({ commit, state }, payload) {
    const newEmpInfo = {
      empNum: payload.empNum,
      empName: payload.empName,
      empSex: payload.empSex,
      empAge: payload.empAge,
      empPosition: payload.empPosition,
      empPhone: payload.empPhone,
      empAddress: payload.empAddress
    }
    commit('addFloorManagerInfo', newEmpInfo)
  },
  addRecordInfo ({ commit, state }, payload) {
    const newRecord = {
      stuNum: payload.stuNum,
      stuName: payload.stuName,
      floorName: payload.floorName,
      hosName: payload.hosName,
      recordDetail: payload.recordDetail,
      recodTime: payload.recodTime.substr(0, 16)
    }
    commit('addFloorManagerInfo', newRecord)
  },
  addUserInfo ({ commit, state }, payload) {
    const newRecord = {
      username: payload.username,
      password: '****',
      email: payload.email,
      phone: payload.phone,
      name: payload.name,
      created: payload.created.substr(0, 16),
      updated: payload.created.substr(0, 16)
    }
    commit('addFloorManagerInfo', newRecord)
  },
  addDorInfo ({ commit, state }, payload) {
    const newDorInfo = {
      stuNum: payload.stuNum,
      stuName: payload.stuName,
      oldHosName: payload.oldHosName,
      oldFloorName: payload.oldFloorName,
      newHosName: payload.newHosName,
      newFloorName: payload.newFloorName,
      detail: payload.detail,
      recodTime: payload.recodTime
    }
    commit('addFloorManagerInfo', newDorInfo)
  }
}
