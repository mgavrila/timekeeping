const sanitize = (data: any) => {
  if (!data || data.length === 0 || Object.keys(data).length === 0) {
    return data
  }

  if (data.length) {
    const sanitizedData: any[] = []

    data.forEach((item: any) => {
      const { _id, ...otherProps } = item

      sanitizedData.push({
        id: String(_id),
        ...otherProps,
      })
    })

    return sanitizedData
  }

  const { _id, ...otherProps } = JSON.parse(JSON.stringify(data))

  return { id: String(_id), ...otherProps }
}

export { sanitize }
