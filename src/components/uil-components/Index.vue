<template>
  <div class="">
    <h1 class="text-4xl font-bold">Modals</h1>

    <hr class="my-4" />

    <UilModal>
      <template #toggler>
        <UilButton size="md" type="cl">Center modal</UilButton>
      </template>
      <template #content>
        <div
          class="block bg-white w-full shadow rounded-lg md:my-8 md:mx-20 mx-2"
        >
          <div
            class="
              max-w-screen-xl
              mx-auto
              py-12
              px-4
              sm:px-6
              lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between
            "
          >
            <h2
              class="
                text-3xl
                leading-9
                font-extrabold
                tracking-tight
                text-gray-900
                sm:text-4xl sm:leading-10
              "
            >
              Ready to dive in?
              <br />
              <span class="text-indigo-600">Start your free trial today.</span>
            </h2>
            <div class="mt-8 flex lg:flex-shrink-0 lg:mt-0">
              <a href="#">
                <UilButton size="md" type="cl" hover>Get started</UilButton>

                <UilButton
                  size="md"
                  type="txt"
                  @click="slotProps.showContent = false"
                  >See more</UilButton
                >
              </a>
            </div>
          </div>
        </div>
      </template>
    </UilModal>

    <hr class="my-4" />

    <UilModal transitionName="fade-left" direction="l">
      <template #toggler>
        <UilButton size="md" type="cl">Left modal</UilButton>
      </template>
      <template #content>
        <div
          style="width: 520px"
          class="flex flex-col h-full justify-center p-8 bg-white shadow"
        >
          <h2
            class="
              text-3xl
              leading-9
              font-extrabold
              tracking-tight
              text-gray-900
              sm:text-4xl sm:leading-10
            "
          >
            Ready to dive in?
            <br />
            <span class="text-indigo-600">Start your free trial today.</span>
          </h2>
          <div class="mt-8 flex">
            <UilButton size="md" type="cl" hover>Get started</UilButton>

            <UilButton
              size="md"
              type="txt"
              @click="slotProps.showContent = false"
              >See more</UilButton
            >
          </div>
        </div>
      </template>
    </UilModal>

    <hr class="my-4" />

    <UilModal transitionName="fade-right" direction="r">
      <template #toggler>
        <UilButton size="md" type="cl">Right modal</UilButton>
      </template>
      <template #content>
        <div
          style="width: 520px"
          class="flex flex-col h-full justify-center p-8 bg-white shadow"
        >
          <h2
            class="
              text-3xl
              leading-9
              font-extrabold
              tracking-tight
              text-gray-900
              sm:text-4xl sm:leading-10
            "
          >
            Ready to dive in?
            <br />
            <span class="text-indigo-600">Start your free trial today.</span>
          </h2>
          <div class="mt-8 flex">
            <UilButton size="md" type="cl" hover>Get started</UilButton>
            <UilButton role="close" size="md" type="txt">Close</UilButton>
          </div>
        </div>
      </template>
    </UilModal>
  </div>
</template>

<script>
import UilModal from "./UilModal.vue";
import UilButton from "./../button/UilButton";

export default {
  components: {
    UilModal,
    UilButton,
  },
};
</script>

<style>
</style>