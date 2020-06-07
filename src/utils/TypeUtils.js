// 类型检测工具类

/**
 * String类型检测
 * @return {boolean}
 */
export function StringUtils (obj) {
  return obj instanceof String
}

/**
 * Array类型检测
 * @return {boolean}
 */
export function ArrayUtils (obj) {
  return obj instanceof Array
}

/**
 * Number类型检测
 * @return {boolean}
 */
export function NumberUtils (obj) {
  return obj instanceof Number
}

/**
 * 布尔类型检测
 * @return {boolean}
 */
export function BooleanUtils (obj) {
  return obj instanceof Boolean
}
