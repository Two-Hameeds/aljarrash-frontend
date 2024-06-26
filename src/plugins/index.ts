/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";
import { createI18n } from "vue-i18n";

// Types
import type { App } from "vue";

const messages = {
  en: {
    toolbar_title: "AL Jarrash Engineering Consultants",
    stage: {
      sketch: "Sketch",
      sketch_review: "Sketch Review",
      awaiting_client_approval: "Awaiting Client Approval",
      execution_stage: "Execution Stage",
      autocad_review: "AutoCAD Review",
      ready_to_print: "Ready To Print",
      validate_sign_review_copy: "Validate & Sign Review Copy",
      ready_to_collect: "Ready To Collect Review Copy",
      client_received_copy: "Client Received Review Copy",
      edit_client_notes: "Edit Client Notes",
      license_issuance: "License issuance procedures",
      ready_for_final_receipt: "Ready For Final Receipt",
      completed_projects: "Completed Projects",
      inactive_projects: "Inactive Projects",
    },

    project_name: "Project Name",
    project_number: "Project Number",
    comments: "📩",
    design_eng_name: "Design Engineer",
    client_phone: "Client Phone",
    contract_sign_date: "Contract Sign Date",
    project_type: "Project Type",
    use_type: "Use Type",
    land_number: "Land Number",
    plan_number: "Plan Number",
    land_area: "Land Area",
    project_location: "Project Location",
    floor_numbers: "Floor Numbers",
    facades_numbers: "Facades Numbers",
    project_receipt_date: "Project Receipt Date",
    sketch_approval_date: "Sketch Approval Date",
    investor_affiliation: "Investor Affiliation",
    typeof_follow_up: "Type Of Follow Up",
    columns_approval_date: "Columns Approval Date",
    modification_price: "Modification Price",
    obstacles: "Obstacles",
    project_value: "Project Value",
    first_payment: "First Payment",
    first_payment_date: "First Payment Date",
    second_payment: "Second Payment",
    second_payment_date: "Second Payment Date",
    third_payment: "Third Payment",
    third_payment_date: "Third Payment Date",
    first_payment_stage: "First Payment Stage",
    second_payment_stage: "Second Payment Stage",
    third_payment_stage: "Third Payment Stage",
    architecture_status: "Architecture Status",
    architect_name: "Architect Name",
    architect_start_date: "Architect Start Date",
    architect_delivery_date: "Architect Delivery Date",
    architect_stop_reason: "Architect Stop Reason",
    construction_status: "Construction Status",
    construction_eng: "Construction Engineer",
    construction_start_date: "Construction Start Date",
    construction_delivery_date: "Construction Delivery Date",
    construction_stop_reason: "Construction Stop Reason",
    plumbing_status: "Plumbing Status",
    plumbing_eng:  "Plumbing Engineer",
    plumbing_start_date: "Plumbing Start Date",
    plumbing_delivery_date: "Plumbing Delivery Date",
    plumbing_stop_reason: "Plumbing Stop Reason",
    electrical_status: "Electrical Status",
    electrical_eng: "Electrical Engineer",
    electrical_start_date: "Electrical Start Date",
    electrical_delivery_date: "Electrical Delivery Date",
    electrical_stop_reason: "Electrical Stop Reason",
    receive_final_copy_date: "Receive Final Copy Date",
    architecture_review: "architecture review",
    architecture_reviewer: "architecture reviewer",
    construction_review: "construction review",
    construction_reviewer: "construction reviewer",
    plumbing_review: "plumbing review",
    plumbing_reviewer: "plumbing reviewer",
    electrical_review: "electrical review",
    electrical_reviewer: "electrical reviewer",
    client_received_review_copy_date: "Client Received Review Copy Date",
    received_review_copy_from_client_date: "Received Review Copy From Client Date",
    corrector_name: "corrector name",
    corrector_date: "corrector date",

    contract: "contract",
    deed: "deed",
    report: "report",
    identity: "identity",
    container_contract: "container contract",
    license: "license",
    plan: "plan",
    load_bearing_certificate: "Load Bearing Certificate",
    location_certificate: "Location Certificate",
    land_survey: "Land Survey",
    soil_test: "Soil Test",
    coordinate_certificate: "Coordinate Certificate",
    technical_report: "Technical Report",
    demolition_letters: "Demolition Letters",
    autocad: "AutoCAD",
    client_form: "Client Form",
    old_license: "Old License",
    civil_defense: "Civil Defense",
    water_authority: "Water Authority",

    // Project types
    new: "new",
    addition: "addition",
    add_floors: "add floors",
    restoration: "restoration",
    destruction: "destruction",

    // Use types
    entertaining: "Entertaining",
    agricultural: "Agricultural",
    residential_commercial: "Residential & Commercial",
    commercial: "Commercial",
    residential:  "Residential",

    moveTo: "Move To...",
    copyTo: "Copy To...",
    delete: "Delete",
    addAttachment: "Add Attachment",
    projectStage: "Project Stage",

    close: "Close",
    ok: "Ok",
    login: "Login",
    fileType: "File Type",
    fileInput: "Choose File",
    comment: "Comment",

    requiredFiles: "Required Files",
    uploadedFiles: "Uploaded Files",
    administrative_attachments: "Administrative Attachments",
    engineering_attachments: "Engineering Attachments",
    chooseFile: "Please choose a file",
    chooseStage: "Please choose a stage",
    chooseName: "Please choose a name",
    chooseType: "Please choose a type",

    attachments: "📁",
  },
  ar: {
    toolbar_title: "الجراش للاستشارات الهندسية",
    stage:{
      sketch: "الاسكتش",
      sketch_review: "مراجعة الاسكتش",
      awaiting_client_approval: "انتظار موافقة العميل",
      execution_stage: "مرحلة التنفيذ",
      autocad_review: "مراجعة الاوتوكاد",
      ready_to_print: "جاهز للطباعة بعد المراجعة",
      validate_sign_review_copy: "التدقيق والتوقيع نسخ المراجعة",
      ready_to_collect: "جاهز للاستلام نسخة المراجعة",
      client_received_copy: "استلام العميل نسخة المراجعة",
      edit_client_notes: "تعديل ملاحظات العميل",
      license_issuance: "اجراءات اصدار الرخصة",
      ready_for_final_receipt: "جاهز للاستلام النهائي",
      completed_projects: "مشاريع منتهية",
      inactive_projects: "مشاريع غير نشطة",
    },

    project_name: "اسم المشروع",
    project_number: "رقم المشروع",
    comments: "📩",
    design_eng_name: "مهندس التصميم",
    client_phone: "رقم العميل",
    contract_sign_date: "تاريخ توقيع العقد",
    project_type: "نوع المشروع",
    use_type: "نوع الاستخدام",
    land_number: "رقم الارض",
    plan_number: "رقم المخطط",
    land_area: "مساحة الارض",
    project_location: "موقع المشروع",
    floor_numbers: "عدد الطوابق",
    facades_numbers: "عدد الشوارع",
    project_receipt_date: "تاريخ استلام المشروع",
    sketch_approval_date: "تاريخ اعتماد الاسكتش",
    investor_affiliation: "تابع مستثمر",
    typeof_follow_up: "نوع التعقيب",
    columns_approval_date: "تاريخ اعتماد الاعمدة والتكييف والخزانات",
    modification_price: "قيمة التعديل",
    obstacles: "عوائق",
    project_value: "قيمة المشروع",
    first_payment: "الدفعة الاولى",
    first_payment_date: "تاريخ الدفعة الاولى",
    second_payment: "الدفعة الثانية",
    second_payment_date: "تاريخ الدفعة الثانية",
    third_payment: "الدفعة الثالثة",
    third_payment_date: "تاريخ الدفعة الثالثة",
    first_payment_stage: "مرحلة الدفعة الاولى",
    second_payment_stage: "مرحلة الدفعة الثانية",
    third_payment_stage: "مرحلة الدفعة الثالثة",
    architecture_status: "المعماري",
    architect_name: "اسم الرسام",
    architect_start_date: "تاريخ بدء المعماري",
    architect_delivery_date: "تاريخ تسليم المعماري",
    architect_stop_reason: "سبب توقف المعماري",
    construction_status: "الانشائي",
    construction_eng: "المهندس الانشائي",
    construction_start_date: "تاريخ بدء الانشائي",
    construction_delivery_date: "تاريخ تسليم الانشائي",
    construction_stop_reason: "سبب توقف الانشائي",
    plumbing_status: "الصحي",
    plumbing_eng: "اسم الرسام الصحي",
    plumbing_start_date: "تاريخ بدء التصميم الصحي",
    plumbing_delivery_date: "تاريخ تسليم الصحي",
    plumbing_stop_reason: "سبب توقف الصحي",
    electrical_status: "الكهربائي",
    electrical_eng: "المهندس الكهربائي",
    electrical_start_date: "تاريخ بدء الكهربائي",
    electrical_delivery_date: "تاريخ تسليم الكهربائي",
    electrical_stop_reason: "سبب توقف الكهربائي",
    receive_final_copy_date: "تاريخ استلام النسخ النهائية ",
    architecture_review: "مراجعة المعماري",
    architecture_reviewer: "اسم المراجع المعماري",
    construction_review: "مراجعة الانشائي",
    construction_reviewer: "اسم المراجع الانشائي",
    plumbing_review: "مراجعة الصحي",
    plumbing_reviewer: "اسم المراجع الصحي",
    electrical_review: "مراجعة الكهربائي",
    electrical_reviewer: "اسم المراجع الكهربائي",
    client_received_review_copy_date: "تاريخ استلام العميل لنسخة المراجعة",
    received_review_copy_from_client_date: "تاريخ استلام نسخة المراجعة من العميل",
    corrector_name: "اسم المصحح",
    corrector_date: "تاريخ التصحيح",

    contract: "العقد",
    deed: "صك الارض",
    report: "تقرير",
    identity: "هوية المالك",
    container_contract: "عقد الحاوية",
    license: "الرخصة",
    plan: "المخطط",
    load_bearing_certificate: "شهادة التحمل",
    location_certificate: "شهادة التحديد",
    land_survey: "الرفع المساحي",
    soil_test: "فحص التربة",
    coordinate_certificate: "شهادة التحديد بالاحدثيات ",
    technical_report: "التقرير الفني",
    demolition_letters: "خطابات الهدم",
    autocad: "AutoCAD",
    client_form: "استمارة العميل",
    old_license: "رخصة قديمة",
    civil_defense: "الدفاع المدني",
    water_authority: "المياه",

    // Project types
    new: "جديد",
    addition: "اضافة",
    add_floors: "اضافة طوابق",
    restoration: "ترميم",
    destruction: "هدم",

    // Use types
    entertaining: "ترفيه",
    agricultural: "زراعي",
    residential_commercial: "سكني-تجاري",
    commercial: "تجاري",
    residential: "سكني",

    moveTo: "نقل الى...",
    copyTo: "نسخ الى...",
    delete: "حذف",
    addAttachment: "اضافة مرفق",
    projectStage: "مرحلة المشروع",

    close: "اغلاق",
    ok: "موافق",
    login: "تسجيل الدخول",
    fileType: "نوع الملف",
    fileInput: "اختر ملفاً",
    comment: "تعليق",

    requiredFiles: "الملفات المطلوبة",
    uploadedFiles: "الملفات المرفوعة",
    administrative_attachments: "المرفقات الإدارية",
    engineering_attachments: "المرفقات الهندسية",
    chooseFile: "يرجى اختيار الملف",
    chooseStage: "يرجى اختيار المرحلة",
    chooseName: "يرجى اختيار الاسم",
    chooseType: "يرجى اختيار النوع",

    attachments: "📁",
  },
};

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: "ar", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

export function registerPlugins(app: App) {
  app
  .use(vuetify)
  .use(router)
  .use(pinia)
  .use(i18n);
}
