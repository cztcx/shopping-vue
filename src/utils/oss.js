const OSS = require('ali-oss')
/* export function client () {
  var client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI5tCVRd6gWtUJTcsrGsnb',
    accessKeySecret: 'UY6y77HNqDzcBn97i1kL1VADXE5FAl',
    bucket: 'czt-first-bucket'
  }) // 后端提供数据
  return client
} */
export function client () {
  let client = new OSS({
    region: 'oss-cn-beijing',
    endpoint: 'oss-cn-beijing.aliyuncs.com', // 外网域名
    accessKeyId: 'LTAI5t5w2yjX1J5LCgcx56zC',
    accessKeySecret: 'r3j1aoQ4OJt7douatAegtgbYzNWW0M',
    bucket: 'czt-first-bucket'
  })
  return client
}
/* 用户登录名称 chenzt@1410119405728116.onaliyun.com
AccessKey ID LTAI5t5w2yjX1J5LCgcx56zC
AccessKey Secret r3j1aoQ4OJt7douatAegtgbYzNWW0M */
// 上传
export async function put (filePath, file) {
  try {
    return await client.put(filePath, file)
  } catch (err) {
    console.log(err)
  }
}
// 删除
export async function remove (filePath) {
  try {
    return await client.delete(filePath)
  } catch (err) {
    console.log(err)
  }
}
// blog.csdn.net/besttoby01/article/details/88699484
/* export async function put (name, url) {
  try {
    // 填写Object完整路径和本地文件的完整路径。Object完整路径中不能包含Bucket名称。
    // 如果未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    let result = await client.put(name, url)
    console.log(result)
  } catch (e) {
    console.log(e)
  }
} */

/*
 用户登录名称 chenzt@1410119405728116.onaliyun.com
AccessKey ID LTAI5tCVRd6gWtUJTcsrGsnb
AccessKey Secret UY6y77HNqDzcBn97i1kL1VADXE5FAl */
