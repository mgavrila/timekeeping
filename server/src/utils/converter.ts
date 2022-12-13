import { isArray } from 'lodash'

const sanitize = (data: any, shouldParse = false) => {
  if (!data || data.length === 0 || Object.keys(data).length === 0) {
    return data
  }

  if (data.length) {
    const sanitizedData: any[] = []

    data.forEach((item: any) => {
      const { _id, ...otherProps } = shouldParse
        ? JSON.parse(JSON.stringify(item))
        : item

      Object.entries(otherProps).forEach(([key, value]) => {
        if (isArray(value)) {
          otherProps[key] = sanitize(value)
        }
      })

      sanitizedData.push({
        id: String(_id),
        ...otherProps,
      })
    })

    return sanitizedData
  }

  const { _id, ...otherProps } = JSON.parse(JSON.stringify(data))

  Object.entries(otherProps).forEach(([key, value]) => {
    if (isArray(value)) {
      otherProps[key] = sanitize(value)
    }
  })

  return { id: String(_id), ...otherProps }
}

export { sanitize }
