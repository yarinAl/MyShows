import User from '../models/user'

export const newUser = async (userData: any) => {
  let user = new User(userData)
  let registeredUser = await user.save()
  return registeredUser
  // mail
  // send sms
}
