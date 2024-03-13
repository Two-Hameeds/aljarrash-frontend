<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" permanent theme="dark">
        <v-list nav v-model:selected="selectedItem">
          <v-list-item prepend-icon="mdi-brush-outline" title="الاسكتش" value="الاسكتش" key="sketch"></v-list-item>
          <v-list-item prepend-icon="mdi-file-find" title="تدقيق الاسكتش" value="تدقيق الاسكتش"
            key="sketch_review"></v-list-item>
          <v-list-item prepend-icon="mdi-pillar" title="الاعتماد قبل الأعمدة" value="الاعتماد قبل الأعمدة"
            key="approve_before_columns"></v-list-item>
          <v-list-item prepend-icon="mdi-clock-start" title="بانتظار موافقة العميل على الأعمدة" value="بانتظار موافقة العميل على الأعمدة"
            key="wait_client_approval"></v-list-item>
          <v-list-item prepend-icon="mdi-pencil-ruler" title="مرحلة التنفيذ" value="مرحلة التنفيذ" key="execution_stage"></v-list-item>
          <v-list-item prepend-icon="mdi-tab-search" title="مراجعة المشروع اوتوكاد" value="مراجعة المشروع اوتوكاد" key="autocad_review"></v-list-item>
          <v-list-item prepend-icon="mdi-printer" title="جاهز للطباعة بعد المراجعة" value="جاهز للطباعة بعد المراجعة"
            key="ready_to_print"></v-list-item>
          <v-list-item prepend-icon="mdi-signature-freehand" title="التدقيق والتوقيع نسخ المراجعة" value="التدقيق والتوقيع نسخ المراجعة"
            key="validate_sign_review_copy"></v-list-item>
          <v-list-item prepend-icon="mdi-tooltip-check-outline" title="جاهز لاستلام نسخة المراجعة" value="جاهز لاستلام نسخة المراجعة"
            key="reacy_to_collect"></v-list-item>
          <v-list-item prepend-icon="mdi-hand-extended-outline" title="استلم العميل نسخة المراجعة" value="استلم العميل نسخة المراجعة"
            key="client_received_copy"></v-list-item>
          <v-list-item prepend-icon="mdi-file-edit-outline" title="تعديل ملاحظات العميل" value="تعديل ملاحظات العميل"
            key="client_received_copy"></v-list-item>
          <v-list-item prepend-icon="mdi-check-outline" title="جاهز للاستلام النهائي" value="جاهز للاستلام النهائي"
            key="client_received_copy"></v-list-item>
          <v-list-item prepend-icon="mdi-check-outline" title="بانتظار اكمال المخططات" value="بانتظار اكمال المخططات"
            key="client_received_copy"></v-list-item>
          <v-list-item prepend-icon="mdi-check-outline" title="مشاريع منتهية" value="مشاريع منتهية"
            key="client_received_copy"></v-list-item>
          <v-list-item prepend-icon="mdi-check-outline" title="مشاريع غير نشطة" value="مشاريع غير نشطة"
            key="client_received_copy"></v-list-item>
        </v-list>
      </v-navigation-drawer>



      <v-main>
        <h2 style="text-align: center; padding: 5px 0;">{{ selectedItem[0] }}</h2>

        <v-table fixed-header height="80vh">
          <thead>
            <tr>
              <th class="text-left" style="width: 1%;">
                <input type="checkbox">
              </th>
              <th class="text-left">
                الاسم
              </th>
              <th class="text-left">
                المهندس المصمم
              </th>
              <th class="text-left">
                المعماري
              </th>
              <th class="text-left">
                الانشائي
              </th>
              <th class="text-left">
                الصحي
              </th>
              <th class="text-left">
                الكهربائي
              </th>
              <th class="text-left">
                المهندس المصمم
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in projects" :key="item.name">
              <td style="width: fit-content;"><input type="checkbox"></td>
              <td>{{ item.name }}</td>
              <td>{{ item.engineer }}</td>
            </tr>
          </tbody>
          
        </v-table>
        <input type="text" class="enter" placeholder="Add new...">
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const selectedItem = ref({});

const projects = ref([
  {
    name: 'مؤسسة اوتاد الخليج قطعة 11',
    engineer: "يوسف شعبان",
  },
  {
    name: 'مؤسسة أوتاد الخليج قطعة 12',
    engineer: "يوسف شعبان",
  },
  {
    name: 'مؤسسة أوتاد الخليج',
    engineer: "يوسف شعبان",
  },
  {
    name: '(الاضافة) علي أحمد علي الجراش',
    engineer: "يوسف شعبان",
  },
  {
    name: 'مؤيد طالب ال اسماعيل (جديد)',
    engineer: "يوسف شعبان",
  },
  {
    name: 'عبدالله أحمد عبدالله ال مطر',
    engineer: "يوسف شعبان",
  },
  {
    name: 'علي أحمد الجراش - اض',
    engineer: "يوسف شعبان",
  },
  {
    name: 'محمد علي جواد الحيدر (جديد)',
    engineer: "يوسف شعبان",
  },
  {
    name: 'مؤسسة أوتاد الخليج قطعة 22',
    engineer: "يوسف شعبان",
  },
  {
    name: 'مؤسسة أوتاد الخليج قطعة 21',
    engineer: "يوسف شعبان",
  },
]);

watch(selectedItem, (newValue, oldValue) => {
  console.log('Selected item:', newValue);
});
</script>

<style>
.enter{
  border: 2px black solid; 
  width: 100%;
}
</style>