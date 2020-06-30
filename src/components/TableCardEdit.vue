<template>
  <table-card-base :i="i" :pubTable="pubTable" :pubFloors="pubFloors">
      <ion-button size="default" fill="outline" slot="table-card-action-button" @click.prevent="editTableDetails">Edit</ion-button>
  </table-card-base>
</template>

<script>
import TableCardBase from '../components/TableCardBase.vue'

export default {
  props: ['i', 'pubTable', 'pubFloors'],
  components: {
    TableCardBase
  },
  methods: {
    editTableDetails () {
      this.$store.dispatch('setSelectedPubTable', this.pubTable)
      this.$router.push({ name: 'edit-table-details', params: { id: this.pubTable.tableNum } })
    }
  }
}
</script>
