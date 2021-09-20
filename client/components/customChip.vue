<template>
  <v-col cols="12" class="py-0 py-lg-2 py-md-2" v-if="data.length">
    <span class="text-lg-h5 text-md-h5">{{type}}: </span>
    <v-chip-group v-if="$vuetify.breakpoint.name === 'xs'">
      <v-chip
        v-for="(item, index) in data"
        :key="index"
        label
        outlined
        :color="propColor"
      >
        <span class="text-caption text-lg-body-1 text-md-body-1">{{ title(item) }}</span>
      </v-chip>
    </v-chip-group>
    <v-chip
      v-else
      v-for="(item, index) in data"
      :key="index"
      label
      class="mx-2 my-1"
      outlined
      :color="propColor"
    >
      <span class="text-caption text-lg-body-1 text-md-body-1">{{ title(item) }}</span>
    </v-chip>
  </v-col>
</template>

<script>
export default {
  props: {
    data: {
      type: [Array, Object],
      default: []
    },
    type: String
  },
  computed: {
    propColor() {
      if(this.type === 'Languages') return 'primary'
      else if(this.type === 'Currencies') return 'teal'
      else if(this.type === 'Timezones') return 'green'
      else if(this.type === 'Calling Codes') return 'grey'
      else if(this.type === 'Regional Blocs') return 'red'
    }
  },
  methods: {
    title(item) {
      if(this.type === 'Languages') return `${item.name} (${item.iso639_1.toUpperCase()})`
      else if(this.type === 'Currencies') return `${item.symbol} (${item.code})`
      else if(this.type === 'Timezones') return `${item}`
      else if(this.type === 'Calling Codes') return `+${item}`
      else if(this.type === 'Regional Blocs') return `${item.acronym}`
    }
  }
}
</script>

<style>

</style>