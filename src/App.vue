<template lang="pug">
v-app
  v-navigation-drawer(
    persistent
    :mini-variant="miniVariant"
    :clipped="clipped"
    v-model="drawer"
    enable-resize-watcher
    fixed
    app
  )
    v-list
      v-list-tile(
        value="true"
        v-for="(item, i) in items"
        :key="i")

        v-list-tile-action
          v-icon(v-html="item.icon")
        v-list-tile-content
          v-list-tile-title(v-text="item.title")
  v-toolbar(
    app
    :clipped-left="clipped"
  )
    v-btn(icon @click.stop="miniVariant = !miniVariant")
      v-icon(v-html="miniVariant ? 'chevron_right' : 'chevron_left'")
    v-toolbar-title(v-text="title")
  v-content
    <router-view/>
  v-navigation-drawer(
    temporary
    :right="right"
    v-model="rightDrawer"
    fixed
    app
  )
    v-list
    v-list-tile(@click="right = !right")
        v-list-tile-action
          v-icon compare_arrows
  v-footer(:fixed="fixed" app)
    span &copy; {{ year }}
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire',
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    };
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
  name: 'App',
};
</script>
