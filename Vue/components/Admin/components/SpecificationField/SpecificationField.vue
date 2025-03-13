<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import DeleteSVG from "../../../../assets/pictures/Categories/trash.svg";
import AddSVG from "../../../../assets/pictures/Categories/plus.svg";
import SubField from "~/components/Admin/components/SubField/SubField.vue";

const props = defineProps<{
  spec: { id: number; value: string; subField: any[] };
}>();

const emit = defineEmits<{
  (e: 'update', id: number, subField: any): void;
  (e: 'remove', id: number): void;
}>();

const addSubField = () => {
  const newId = Date.now();
  console.log(props.spec.subField)
  props.spec.subField.push({ id: newId, value: '', subField: [] });
  emit('update', props.spec.id, props.spec);
};

const removeSpecification = (id: number) => {
  emit('remove', id);
};

const updateSubField = (subFieldId: number, updatedSubField: any) => {
  const subField = props.spec.subField.find(sf => sf.id === subFieldId);
  if (subField) {
    Object.assign(subField, updatedSubField);
    emit('update', props.spec.id, props.spec);
  }
};

const removeSubField = (subFieldId: number) => {
  props.spec.subField = props.spec.subField.filter(sf => sf.id !== subFieldId);
  emit('update', props.spec.id, props.spec);
};
</script>

<template>
  <div class="py-3 border flex flex-col gap-3 rounded-md">
    <div class="flex items-center gap-3 px-2">
      <input
          v-model="spec.value"
          placeholder="Marque"
          size="lg"
          class="w-full bg-gray-200 border-none outline-0 p-3 text-xl border-b border-black"
      />
      <img
          :src="AddSVG"
          alt="ajouter un sous champ"
          class="bg-green-500 rounded lg:hover:bg-green-600 w-10 h-10 p-2 cursor-pointer"
          @click="addSubField"
      />
      <img
          :src="DeleteSVG"
          alt="supprimer le champ"
          @click="removeSpecification(props.spec.id)"
          class="bg-red-500 rounded-md lg:hover:bg-red-600 w-10 h-10 p-2 cursor-pointer"
      />
    </div>

    <template v-for="(subField, index) in spec.subField" :key="subField.id">
      <SubField
          :subField="subField"
          :level="0"
          @update="updateSubField"
          @remove="removeSubField"
      />
    </template>
  </div>
</template>
