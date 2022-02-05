<template>
  <aside :class="{ reduced: reduce }">
    <section class="header">
      <logo :reduce="reduce" />
    </section>
    <section class="content">
      <router-link
        class="link"
        :class="{ active: $route.name == 'Dashboard' }"
        :to="{ name: 'Dashboard' }"
      >
        <icon icon-name="bxs-dashboard" />
        <span class="link-title"> Dashboard</span>
      </router-link>
      <div
        v-for="{ group, resources } in resourcesByGroups"
        :key="group.id"
        :class="{ active: activeGroup == group.id }"
        class="group"
      >
        <button
          @click="activeGroup = activeGroup == group.id ? null : group.id"
        >
          <div class="link">
            <icon :iconName="group.icon" />
            <span class="link-title"> {{ group.name }}</span>
          </div>
          <i class="bx bx-chevron-down toggler"></i>
        </button>
        <transition name="fade-up">
          <div class="links" v-if="activeGroup == group.id">
            <router-link
              class="link"
              :class="{
                active: $route.params.resourceId == resource.resourceId,
              }"
              v-for="resource in resources"
              :key="resource.resourceId"
              :to="{
                name: 'List',
                params: { resourceId: resource.resourceId },
              }"
            >
              <icon :iconName="resource.icon" />
              <span class="link-title"> {{ resource.name }}</span>
            </router-link>
          </div>
        </transition>
      </div>
      <router-link
        class="link"
        :class="{ active: $route.params.resourceId == resource.resourceId }"
        v-for="resource in resourcesWithoutGroups"
        :key="resource.resourceId"
        :to="{ name: 'List', params: { resourceId: resource.resourceId } }"
      >
        <icon :iconName="resource.icon" />
        <span class="link-title"> {{ resource.name }}</span>
      </router-link>
    </section>
    <section class="bottom">
      <uil-button
        class="toggle-btn"
        @click="reduce = !reduce"
        size="sq-sm"
        type="lt"
      >
        <i class="bx" :class="reduce ? 'bx-menu' : 'bx-menu-alt-left'"></i>
      </uil-button>
    </section>
  </aside>
</template>


<script>
import Logo from "./Logo.vue";
// import SideBarUser from "./SideBar/SideBarUser.vue";
import Icon from "./utilities/Icon.vue";
import resources from "./../resources";
import { resourcesGroupsAsArray } from "../resources/groups";
import UilButton from "./uil-components/UilButton.vue";
export default {
  components: { Logo, Icon, UilButton },
  data: () => ({
    activeGroup: null,
    reduce: true,
  }),
  computed: {
    resources() {
      return resources;
    },
    resourcesByGroups() {
      return resourcesGroupsAsArray.map((group) => ({
        group,
        resources: resources.filter((resource) => resource.group == group),
      }));
    },
    resourcesWithoutGroups() {
      return resources.filter((resource) => resource.group == null);
    },
    isMd() {
      return this.$screen.size.isMd;
    },
  },
  methods: {
    getActiveGroup() {
      const resourceId = this.$route.params.resourceId;
      const resource = this.resources.find(
        (resource) => resource.resourceId == resourceId
      );
      return resource?.group?.id;
    },
  },
  beforeMount() {
    this.reduce = this.isMd;
    this.activeGroup = this.getActiveGroup();
  },
  watch: {
    isMd() {
      this.reduce = this.isMd;
    },
    active() {
      if (this.isMd) {
        this.reduce = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
aside {
  width: 350px;
  z-index: 999;
  @apply absolute bg-white p-4 pl-0 h-screen 
  overflow-hidden overflow-y-auto border-r transition-all;
  @screen md {
    @apply relative;
  }
  &.reduced {
    @apply relative pt-14;
    width: 55px;
    .header {
      width: 55px;
    }
    .group {
      .links {
        @apply ml-0;
      }
    }
    .link {
      &:hover {
        @apply pl-4;
      }
    }
  }
}
.header {
  width: 200px;
  @apply px-2;
}
.content {
  @apply mt-8;
}
.link {
  @apply relative flex items-center w-full py-2 pl-4
  text-gray-500 font-semibold transition-all;
  i {
    @apply mr-4 text-xl;
  }
  &:hover {
    @apply pl-5;
  }
  &.active {
    @apply text-primary;
    &::before {
      content: "";
      width: 4px;
      @apply absolute left-0 rounded-r-lg h-full bg-primary;
    }
  }
}
.group {
  .toggler {
    @apply transform transition-transform text-lg text-gray-500;
  }
  .links {
    @apply block border-l-2 border-primary-light ml-4;
  }

  &.active {
    button .link {
      @apply text-gray-700 mb-0;
    }
    .toggler {
      @apply rotate-180 text-gray-700;
    }
  }

  button {
    @apply flex items-center w-full justify-between;
  }
}
.toggle-btn {
  @apply absolute top-0 right-0 m-2;
}
</style>
