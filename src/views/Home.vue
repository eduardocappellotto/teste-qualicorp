<template>
<div class="u-flex justify-center">
  <div class="search-container">
    <div class="u-flex u-flexWrap justify-center">
     <img :src="medicineLogo" alt="Desenho de um médico e uma médica">
    <SearchFilters @search="onSearch"/>
    </div>
    <SearchResults v-if="planosList && planosList.total" :planosList="planosList"/>
  </div>
</div>
</template>

<script>
import SearchFilters from '@/components/SearchFilters.vue';
import SearchResults from '@/components/SearchResults.vue';
import medicine from '../assets/medicine.svg';

export default {
  name: 'Home',
  components: {
    SearchFilters,
    SearchResults,
  },

  data() {
    return {
      planosList: null,
    };
  },

  computed: {
    medicineLogo() {
      return medicine;
    },
  },

  methods: {
    onSearch(value) {
      this.planosList = value;
    },
  },
};
</script>
<style lang="scss" scoped>
.search-container{
  margin: 5rem 2rem;
}

img{
  width: 400px;
  background-color: whitesmoke;
  padding: 1.5rem;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

@media only screen and (max-width: 600px) {
  img {
    display: none;
  }
}
</style>
