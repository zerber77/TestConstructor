////НЕ ТРОГАТЬ!!!!!!
/////функция для GET-запросов
////запускаем лоадер $q.loading.show
////выполняем запрос, если ошибка, кидаем ее наверх
////если все норм, прячем лоадер и отдаем ответ и функцию request (в замыкании)
import {ref} from 'vue'
import api from "./api";
import {QSpinnerGears, Loading} from "quasar";
import axios from "axios";
/// с параметрами все понятно вроде, добавлен showLoader для отображения спиннера загрузки, при false не отображать.
/// Не отображать, если элемент (например select имеет свой индикатор загрузки)
export function useGet(url,options={},showLoader =true){
  const response = ref()
  if (showLoader) Loading.show({
    spinner: QSpinnerGears,
    spinnerColor: 'blue-7',
    messageColor: 'black',
    backgroundColor: 'grey',
    message: 'Получение данных'
  })
  const request = async () => {

    try {
      const res = await api.get(url)
    //const res = await api.get('http://quasar-test/'+url)
    //  const res = await axios.get('/'+url)  /////это серверный урл   spa/
      response.value = await res.data
      if (showLoader) Loading.hide()
    }catch (e) {
      Loading.hide()
      // console.log('ERROR in getApi',e.message)
      throw e.message
    }
  }
  return {response, request}
}
