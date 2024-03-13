/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import { createI18n } from 'vue-i18n'

// Types
import type { App } from 'vue'

const messages = {
  en: {
      toolbar_title: 'AL Jarrash Engineering Consultants',
      sketch: 'Sketch',
      sketch_review: 'Sketch Review',
      approve_before_columns: 'Approve Before Columns',
      awaiting_client_approval: 'Awaiting Client Approval',
      execution_stage: 'Execution Stage',
      autocad_review: 'AutoCAD Review',
      ready_to_print: 'Ready To Print',
      validate_sign_review_copy: 'Validate & Sign Review Copy',
      ready_to_collect: 'Ready To Collect Review Copy',
      client_received_copy: 'Client Received Review Copy',
      edit_client_notes: 'Edit Client Notes',
      ready_for_final_receipt: 'Ready For Final Receipt',
      awaiting_completion_of_plans: 'Awaiting Completion Of Plans',
      completed_projects: 'Completed Projects',
      inactive_projects: 'Inactive Projects',

      project_name: 'Project Name',
      comments: '📩',
      design_eng_name: 'Design Engineer',
      architectural_status: 'Architectural Status',
      structural_status: 'Structural Status',
      plumbing_status: 'Plumbing Status',
      electrical_status: 'Electrical Status',
      client_phone: 'Client Number',
      sketch_approval_date: 'Sketch Approval Date',
      columns_approval_date: 'Columns Approval Date',
      typeof_follow_up: 'Type Of Follow Up',
      investor_affiliation: 'Investor Affiliation',
      project_receipt_date: 'Project Receipt Date',
      project_type: 'Project Type',
      land_number: 'Land Number',
      land_area: 'Land Area',
      project_location: 'Project Location',
      project_number: 'Project Number',
      sketch_design_progress_status: 'Sketch Design Progress Status',
      structural_eng_name: 'Structural Eng Name',
      structural_design_start_date: 'Structural Design Start Date',
      structural_review: 'Structural Review',
      structural_delivery_date: 'Structural Delivery Date',
      electrical_eng_name: 'Electrical Eng Name',
      electrical_design_start_date: 'Electrical Design Start Date',
      electrical_delivery_date: 'Electrical Delivery Date',
      architectural_drawing_start_date: 'Architectural Drawing Start Date',
      architectural_delivery_date: 'Architectural Delivery Date',
      plumbing_design_start_date: 'Plumbing Design Start Date',
      plan_delivery_date: 'Plan Delivery Date',
      modification_price: 'Modification Price',
      deed: 'Deed',
      identity: 'Identity',
      land_survey: 'Land Survey',
      soil_test: 'Soil Test',
      client_form: 'Client Form',
      old_license: 'Old License',
      civil_defense: 'Civil Defense',
      water_authority: 'Water Authority',

      new: 'New',
      addition: 'Addition',
      restoration: 'Restoration',
      destruction: 'Destruction',

      moveTo: 'Move To...',
      copyTo: 'Copy To...',
      delete: 'Delete',
      addAttachment: 'Add Attachment',
      projectStage: 'Project Stage',


      close: 'Close',
      ok: 'Ok',
      login: 'Login',
      fileType: 'File Type',
      fileInput: 'Choose File',
      comment: 'Comment',

      requiredFiles: 'Required Files',
      uploadedFiles: 'Uploaded Files',
      chooseFile: 'Please choose a file',
      chooseStage: 'Please choose a stage',
      chooseName: 'Please choose a name',
      chooseType: 'Please choose a type',


      attachments: '📁',

  },
  ar: {
      toolbar_title: 'الجراش للاستشارات الهندسية',
      sketch: 'الاسكتش',
      sketch_review: 'مراجعة الاسكتش',
      approve_before_columns: 'الموافقة قبل الاعمدة',
      awaiting_client_approval: 'انتظار موافقة العميل',
      execution_stage: 'مرحلة التنفيذ',
      autocad_review: 'مراجعة الاوتوكاد',
      ready_to_print: 'جاهز للطباعة بعد المراجعة',
      validate_sign_review_copy: 'التدقيق والتوقيع نسخ المراجعة',
      ready_to_collect: 'جاهز للاستلام نسخة المراجعة',
      client_received_copy: 'استلام العميل نسخة المراجعة',
      edit_client_notes: 'تعديل ملاحظات العميل',
      ready_for_final_receipt: 'جاهز للاستلام النهائي',
      awaiting_completion_of_plans: 'بانتظار اكمال المخططات',
      completed_projects: 'مشاريع منتهية',
      inactive_projects: 'مشاريع غير نشطة',



      project_name: 'اسم المشروع',
      comments: '📩',
      design_eng_name: 'مهندس التصميم',
      architectural_status: 'المعماري',
      structural_status: 'الانشائي',
      plumbing_status: 'الصحي',
      electrical_status: 'الكهربائي',
      client_phone: 'رقم العميل',
      sketch_approval_date: 'تاريخ اعتماد الاسكتش',
      columns_approval_date: 'تاريخ اعتماد الاعمدة',
      typeof_follow_up: 'نوع التعقيب',
      investor_affiliation: 'تابع مستثمر',
      project_receipt_date: 'تاريخ استلام المشروع',
      project_type: 'نوع المشروع',
      land_number: 'رقم الارض',
      land_area: 'مساحة الارض',
      project_location: 'موقع المشروع',
      project_number: 'رقم المشروع',
      sketch_design_progress_status: 'حالة تقدم التصميم الاسكتش',
      structural_eng_name: 'اسم المهندس الانشائي',
      structural_design_start_date: 'تاريخ بدء التصميم الانشائي',
      structural_review: 'مراجعة انشائية',
      structural_delivery_date: 'تاريخ تسليم الانشائي',
      electrical_eng_name: 'اسم المهندس الكهربائي',
      electrical_design_start_date: 'تاريخ بدء التصميم الكهربائي',
      electrical_delivery_date: 'تاريخ تسليم الكهربائي',
      architectural_drawing_start_date: 'تاريخ بدء الرسم المعماري',
      architectural_delivery_date: 'تاريخ تسليم المعماري',
      plumbing_design_start_date: 'تاريخ بدء التصميم الصحي',
      plan_delivery_date: 'تاريخ تسليم المخطط',
      modification_price: 'قيمة التعديل',
      deed: 'صك الارض',
      identity: 'هوية المالك',
      land_survey: 'الرفع المساحي',
      soil_test: 'اختبار التربة',
      client_form: 'استمارة العميل',
      old_license: 'رخصة قديمة',
      civil_defense: 'الدفاع المدني',
      water_authority: 'المياه',

      new: 'جديد',
      addition: 'اضافة',
      restoration: 'ترميم',
      destruction: 'هدم',

      moveTo: 'نقل الى...',
      copyTo: 'نسخ الى...',
      delete: 'حذف',
      addAttachment: 'اضافة مرفق',
      projectStage: 'مرحلة المشروع',

      close: 'اغلاق',
      ok: 'موافق',
      login: 'تسجيل الدخول',
      fileType: 'نوع الملف',
      fileInput: 'اختر ملفاً',
      comment: 'تعليق',
      
      requiredFiles: 'الملفات المطلوبة',
      uploadedFiles: 'الملفات المرفوعة',
      chooseFile: 'يرجى اختيار الملف',
      chooseStage: 'يرجى اختيار المرحلة',
      chooseName: 'يرجى اختيار الاسم',
      chooseType: 'يرجى اختيار النوع',


      attachments: '📁',
  }
}

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'ar', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(i18n)
}
