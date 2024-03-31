import moment from 'moment'

export  const ShowTableFormatDate = (date) => {
    let datePlusOneDay = moment(date).add(1, 'day')
    let formatDate = moment(datePlusOneDay).format('DD-MM-YYYY')
    return formatDate
  }

export  const ShowInputFormatDate = (date) => {
    let datePlusOneDay = moment(date).add(1, 'day')
    let formatDate = moment(datePlusOneDay).format('YYYY-MM-DD')
    return formatDate
  }

export const formatStatus = (status) => {
    let statusNew = status ? "Active" : "Inactive"
    return statusNew
  }