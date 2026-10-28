//// Отправка данных о новой должности

import {usePost} from "../axiosPostApi";

export async function postSignUpData(personData){
  const {response:data, request} = usePost('api/auth/signup/', personData)
  try {
    await request()
  }catch (e) {
    console.log('ERROR in createRank postSignUpData',e)
    throw e
  }
  //////здесь обрабатываем результат как вам надо
  console.log(data)
  return {data}
}
