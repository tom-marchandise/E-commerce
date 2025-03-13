<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import DeleteSVG from "../../../../assets/pictures/Categories/trash.svg";
import AddSVG from "../../../../assets/pictures/Categories/plus.svg";
import SubField from "~/components/Admin/components/SubField/SubField.vue";

const props = defineProps<{
  subField: { id: number; value: string; subField: any[] };
  level: number; // Niveau de profondeur
}>();

const emit = defineEmits<{
  (e: 'update', id: number, subField: any): void;
  (e: 'remove', id: number): void; // Pass the ID of the subfield to be removed
}>();

const addSubField = () => {
  const newId = Date.now();
  props.subField.subField.push({ id: newId, value: '', subField: [] });
  emit('update', props.subField.id, props.subField);
};

const removeSubField = () => {
  emit('remove', props.subField.id); // Emit the ID of the subfield to be removed
};

const updateSubField = (subFieldId: number, updatedSubField: any) => {
  const subField = props.subField.subField.find(sf => sf.id === subFieldId);
  if (subField) {
    Object.assign(subField, updatedSubField);
    emit('update', props.subField.id, props.subField);
  }
};

const removeNestedSubField = (subFieldId: number) => {
  props.subField.subField = props.subField.subField.filter(sf => sf.id !== subFieldId);
  emit('update', props.subField.id, props.subField);
};

const borderColors = [
  'border-gray-600',    // Niveau 0
  'border-yellow-400',  // Niveau 1
  'border-green-600',  // Niveau 2
  'border-red-400',     // Niveau 3
  'border-teal-500',    // Niveau 4
  'border-purple-500',  // Niveau 5
  'border-indigo-500',  // Niveau 6
  'border-blue-400',    // Niveau 7
];

const getBorderColor = () => {
  return borderColors[props.level] || 'border-gray-200';
};


</script>

<template>
  <div :class="['flex flex-col gap-3 ml-4']">
    <div class="flex items-center gap-3 px-2">
      <input
          v-model="subField.value"
          placeholder="sous-champ"
          size="lg"
          class="w-full bg-gray-200 outline-0 p-3 text-xl border-l-8"
          :class="[getBorderColor()]"
      />

      <img
          :src="AddSVG"
          alt="ajouter un sous-champ"
          class="bg-green-500 rounded lg:hover:bg-green-600 w-10 h-10 p-2 cursor-pointer"
          @click="addSubField"
      />

      <img
          :src="DeleteSVG"
          alt="supprimer le sous-champ"
          @click="removeSubField"
          class="bg-red-500 rounded-md lg:hover:bg-red-600 w-10 h-10 p-2 cursor-pointer"
      />
    </div>

    <template v-for="nestedSubField in subField.subField" :key="nestedSubField.id">
      <SubField
          :subField="nestedSubField"
          :level="level + 1"
          @update="updateSubField"
          @remove="removeNestedSubField"
      />
    </template>
  </div>
</template>
