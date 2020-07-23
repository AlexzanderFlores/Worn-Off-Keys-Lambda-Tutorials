const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const getObjects = async () => {
  return await new Promise((resolve, reject) => {
    const params = {
      Bucket: 'wornoffkeys',
    }

    s3.listObjects(params, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const deleteObject = async (Key) => {
  return await new Promise((resolve, reject) => {
    const params = {
      Bucket: 'wornoffkeys',
      Key,
    }

    s3.deleteObject(params, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const main = async (event) => {
  console.log('Event:', event)

  const objects = await getObjects()
  const now = new Date().getTime()
  const oneHour = 60 * 60 * 1000
  let filesDeleted = 0

  for (const file of objects.Contents) {
    const { Key, LastModified } = file
    const shouldDelete = now - new Date(LastModified).getTime() > oneHour
    if (shouldDelete) {
      await deleteObject(Key)
      ++filesDeleted
    }
  }

  return `Done! Deleted ${filesDeleted} file(s)!`
}

exports.handler = main
