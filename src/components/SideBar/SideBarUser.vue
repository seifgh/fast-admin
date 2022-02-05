<template>
  <vs-tooltip shadow not-hover v-model="open">
    <vs-avatar primary @click="open = !open">
      <template #text> Se </template>
    </vs-avatar>
    <template #tooltip>
      <div class="content-tooltip">
        <div class="header">
          <h5 :title="fullName">{{ fullName }}</h5>
          <small :title="email">{{ email }}</small>
        </div>
        <div class="actions">
          <vs-button danger block @click="logout"> Logout </vs-button>
          <vs-button transparent dark block> Settings </vs-button>
        </div>
      </div>
    </template>
  </vs-tooltip>
</template>

<script>
export default {
  data: () => ({
    open: false,
  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
    fullName() {
      return (this.user && this.user.fullName) || "Fast admin";
    },
    email() {
      return (
        (this.user && this.user.email) ||
        "fast.admin@msdfjkhdsjkfhdsjkfhjsdfail.com"
      );
    },
  },
  methods: {
    logout() {
      this.open = false;
      this.$nextTick(() => this.$store.dispatch("logout"));
    },
  },
};
</script>
<style lang="scss" scoped>
.content-tooltip {
  width: 200px;
  @apply relative p-2 text-left overflow-hidden;
}
small {
  @apply text-sm;
}
.header {
  @apply pb-2 border-b mb-2;
}
.actions {
  @apply flex items-center;
}
.vs-avatar {
  @apply cursor-pointer;
}
</style>