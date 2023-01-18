import firebase from 'firebase-admin'
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { config } from 'dotenv'

config()

//var serviceAccount = require('../../blog-918bc-firebase-adminsdk-xwfzg-3564d95c59.json')

const servAuth = {
  type: 'service_account',
  project_id: 'blog-918bc',
  private_key_id: '3564d95c595923bd8ad3bbe5fd1e708ca183a544',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDunR8giQHy4uoG\naAi6Z3Hbfv6sqYB1Rxi0hBXYvbUN9+zBOcwQcO+9OMUQle9+PMtN9IzcXojll09a\ngQrMg/7zwLS1mkuW39wPinTFvBKBEXNLSoTX/CiW0892A7w+PfjF9TrRyPLikkzI\nKk/esPc6/2Oz+zC7+RhZie+B3wFl8x8lzaG460Hag1T+YUIe/N4Glq+mGmvqUH6q\ncD0tAe9EGJ3MNDccLrvmi9YZT8/YZzBbPhFK8yXpNkocLVCGQKNZBw7jJZqFmhHc\nGd8IS/XppPW+u2qkzesW9UtS0FkCdKXBSklF+HnuBGzglrglkb67Vpk+33DDej+P\n3pDFQTz7AgMBAAECggEAArtoQiGwGeye1xEtmD7eIPfKvFe6BCVsyjXF/qmwwv3X\nnmL/znzx/PisXuCf+CaN7XIxWktjNAAq71TEojmtPMWalQvi9aOKF5ipJHWSZJZJ\nvjLjXnWj4WnmhN0FpUA8mVcrczhivDEvUW+kBxJWubI6DeFIGiWZX6yZlCMdq4//\n8vZEt6K3524JOc3seLNEhe0ZBxLHW0UM7zOxXnUB8WZRPA4BtXyDQ9fHYzy6EJRi\n7aEwmyEb+xKcPUXjtLeLlgbGh5u0jY+5egoNbEYtIujqDfZ7+4NIXMSISL7KlD5u\nmcxNDf74Taqy7gN/BmUHyDJY7HGZ38D+ZHOdB1dxSQKBgQD4S/4xXHvbQKueRxey\nKjBkajcm0y5Dj4kmzv+CLanCh8gjvamSi4NM8A4WqkoXvID9e5D/U4og2N1EdvbR\njEUJT28CX8Rgnbse/N9pjleUcBgQjaAHBw6FwWdyoPinoWZQVh7orKVjBsEc6/f7\nJK2NJCRWE8FF1itwjD4gId5DUwKBgQD2BDlnUaYteWey1xnJoaiAfaCjBy+kg39I\nKNjiDpMzy46sG5ZNbaODv3Jx6OMCQuyVItgpBbhZjFQZMVaPAkMrWO1HZW82nxor\nAVdeOjugCOODsisbpV4OvMAG8Xa00BYXDtETG9gbsAO93cfgOl8mKoiVLDw5hEhI\nlNtUvWZSuQKBgQD4H2C2TRhMYtTdR2frl/Nh9S6F8tUxmHdTO9njaeRRzER5Sufw\n1M/yC5XYmnWOQMaaCGg+bmoDJxP+fe9qOgUnJ6TkN3VTo2vBrKtJnX/xiw7RQ+Xd\n//RIP5wz1Z6GTWij8VvT4esoCTDjyP63jtCL0ckp53XlZv9j6hGPJKkqlwKBgQDM\nrssLuRTndMDgPLKJ3WQSM3N48DulRnqZkNKRkcrLJyr26qTsmrGWpawUNczZTtED\na9AooUe1yVkW9MOtjBZSdFRGOJCFA26EJUOJdC2zgnG4Wn4fLEDLRiMGI9O9r/sR\nCBTPLzVoI9OZHnJzjl0npe+pHPqmZ/az3JV3NXVykQKBgQCTwNmfgIApZkn2W+fM\nSUXE/q5LXFPypIGmY3jbEJFXmH2FJxkj9xThkt7716qpojgrEh4E6eyh2XDk3gCv\nyqrSdIPMg6Xk828EzBdnvwEfEGk+FsQ16pLhdKqMBIhA/XvY89uZ6AcWJYgSx9VY\nAmI8/+pYXRPcZ8ttz+irKqQPnA==\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-xwfzg@blog-918bc.iam.gserviceaccount.com',
  client_id: '114773512925693800470',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xwfzg%40blog-918bc.iam.gserviceaccount.com',
}

export const connectFireBase = async () => {
  try {
    initializeApp({
      credential: applicationDefault(),
    })

    const db = getFirestore()
    return db
  } catch (error) {
    console.log(error)
    return false
  }
}

export const disconnectFireBase = () => {
  firebase
    .app()
    .delete()
    .then(() => {
      console.log('App deleted successfully')
    })
    .catch((error) => {
      console.log('Error deleting app:', error)
    })
}
