<template>
  <q-dialog
    v-model="modal"
  >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Medium</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-pa-md" style="max-width: 300px">
          <q-input
            filled
            v-model="date"
            :input-style="{ fontSize: '26px' }"
          >
            <template #before>Дата</template>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="date"
                    mask="DD.MM.YYYY"
                    :locale="myLocale"
                    :options="options"
                    dark
                    bordered
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {ref} from "vue";

export default {
  props:{
    boundary:{type:String}
  },
  setup (props) {
    const modal = ref(false)
    const date = ref('12.12.2024')

    return {
      date,modal,
      myLocale: {
        /* starting with Sunday */
        days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
        daysShort: 'ВС_ПН_ВТ_СР_ЧТ_ПТ_СБ'.split('_'),
        months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
        monthsShort: 'Янв_Фев_Март_Апр_Mай_Июнь_Июль_Авг_Сент_Окт_Ноя_Дек'.split('_'),
        firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
        format24h: true,
        pluralDay: 'dias'
      },
      options (date) {
        return date >= props.boundary.split('.').reverse().join('/')
      },

    }
  }
}


</script>

<style scoped>

</style>
