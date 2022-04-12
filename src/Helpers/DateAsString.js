function getDateAsString(date) {
    if (!date) return "not defined"
    if (date instanceof Date) return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    if (!date.seconds) return "wrong object"
    let _date = new Date(date.seconds)
    return _date.getDate() + "." + (_date.getMonth() + 1) + "." + _date.getFullYear()
}

export default getDateAsString