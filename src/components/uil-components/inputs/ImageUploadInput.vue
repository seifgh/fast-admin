<template>
  <div class="input-container">
    <label class="font-semibold">{{ label }}</label>
    <div class="flex items-center mt-2">
      <drag-drop-files-area class="w-full" @input="updateDroppedFileValue">
        <h3 class="font-semibold text-sm text-gray-400 mb-4">
          {{ $t("imageUploader.dropDesc") }}
        </h3>

        <button @click="inputClick" class="">
          {{ $t("imageUploader.btn") }}
        </button>
        <input
          ref="fileInput"
          class="hidden"
          @input="updateValue"
          type="file"
          accept="image/*"
        />
      </drag-drop-files-area>
      <div @click="inputClick" class="image">
        <img v-if="imageSrc" :src="imageSrc" />
        <svg
          v-else
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.3333 4H6.66667C5.19391 4 4 5.19391 4 6.66667V25.3333C4 26.8061 5.19391 28 6.66667 28H25.3333C26.8061 28 28 26.8061 28 25.3333V6.66667C28 5.19391 26.8061 4 25.3333 4Z"
            stroke="#343A40"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.3333 13.3333C12.4378 13.3333 13.3333 12.4379 13.3333 11.3333C13.3333 10.2288 12.4378 9.33334 11.3333 9.33334C10.2287 9.33334 9.33325 10.2288 9.33325 11.3333C9.33325 12.4379 10.2287 13.3333 11.3333 13.3333Z"
            stroke="#343A40"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M28.0001 20L21.3334 13.3333L6.66675 28"
            stroke="#343A40"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div v-if="currentImageSrc && !imageSrc" class="image">
        <img :src="currentImageSrc" />
      </div>
    </div>
  </div>
</template>

<script>
import DragDropFilesArea from "./DragDropFilesArea.vue";
import { joinProtocoleToPath } from "../../utils/electronUtils";
export default {
  components: { DragDropFilesArea },
  data() {
    return {};
  },
  props: {
    value: undefined,
    label: {
      type: String,
      required: true,
    },
    currentImageSrc: {
      type: String,
    },
  },
  computed: {
    imageSrc() {
      return this.value && joinProtocoleToPath(this.value.path);
    },
  },
  methods: {
    updateDroppedFileValue(files) {
      const file = files.length && files[0];
      if (file && this.validateImageInput(file)) {
        this.$emit("input", file);
      }
    },
    updateValue({ target: { files } }) {
      this.updateDroppedFileValue(files);
    },
    validateImageInput(file) {
      const fileIsImage = file.type.startsWith("image/");
      if (!fileIsImage) {
        alert("The file is not an image!");
      }
      return fileIsImage;
    },
    inputClick() {
      this.$refs.fileInput.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  @apply relative block;
}

button {
  @apply bg-gray-50  py-2 border text-sm font-semibold rounded-md px-8;
}

.image {
  width: auto;
  min-width: 140px;
  max-width: 30%;
  height: 140px;
  @apply cursor-pointer relative flex items-center justify-center bg-gray-200 shadow-md ml-4 rounded-lg overflow-hidden;
  img {
    @apply block w-full h-full object-cover;
  }
}
</style>