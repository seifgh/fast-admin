<template>
  <section class="login">
    <div class="left" anim="fade-left">
      <h2>Fast Admin</h2>
      <p>
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document or a typeface
        without relying on meaningful content. Lorem ipsum may be used as a
        placeholder before the final copy is available.
      </p>
      <div class="image"></div>
    </div>
    <div class="right">
      <div class="content" anim="fade-up">
        <h1>Sign In</h1>

        <!-- <vs-alert
          relief
          color="danger"
          :closable="true"
          v-model="showLoginError"
        >
          <template #title> Error </template>
          <p>Email and password doesn't match, pelase try again!</p>
        </vs-alert>

        <form method="post" @submit.prevent="handleSubmit">
          <vs-input v-model="email" placeholder="Email">
            <template #icon> @ </template>
          </vs-input>
          <vs-input type="password" v-model="password" placeholder="Password">
            <template #icon>
              <i class="bx bxs-lock"></i>
            </template>
          </vs-input>
          <vs-button block> Sign In </vs-button>
        </form> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  metaInfo: {
    title: "Login",
  },
  data: () => ({
    email: "",
    password: "",
    showLoginError: false,
  }),

  methods: {
    async handleSubmit() {
      this.showLoginError = false;
      const loading = this.$vs.loading();
      await this.logIn(this.$data);
      setTimeout(() => {
        loading.close();
        this.$store.commit("setUser", {
          fullName: "Seif Gharres",
        });
        this.$router.push("/");
        this.showLoginError = true;
      }, 2000);
    },
    async logIn({ email, password }) {
      console.log(email, password);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  @apply relative flex text-center items-center h-screen w-full flex-wrap;
}
.left,
.right {
  @apply w-full h-full flex flex-col;
  @screen md {
    @apply w-1/2;
  }
}
.left {
  @apply overflow-hidden bg-primary items-start 
  justify-start text-left p-8 text-white;
  h2 {
    @apply mb-8;
  }
  p {
    @apply text-lg;
  }
  .image {
    height: 400px;
    right: 2.5rem;
    @apply relative bg-gray-100 block w-full rounded-lg shadow-md
    mt-12;
  }
}
.right {
  @apply items-center justify-center p-4;
  .content {
    max-width: 100%;
    @screen sm {
      width: 300px;
    }
    @apply relative text-left;
  }
}
form {
  @apply w-full;
  & > * {
    @apply my-4 w-full;
  }
}
h1 {
  @apply text-primary;
}
.vs-alert {
  animation: shake 0.3s;
  @apply my-8;
}
</style>