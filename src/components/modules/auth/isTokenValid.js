import {useGet} from "../axiosGet";

export async function isTokenValid(){
  const {response, request} = useGet('api/auth/istokenvalid/')
  try {
    await request()
  }catch (e) {
    console.log('ERROR in isTokenValid',e)
    throw e
  }
  //////здесь обрабатываем результат как вам надо
  return {response}
}
