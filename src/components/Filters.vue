<template>
  <div class="search-filter">
    <Loading v-if="isLoading" :active="isLoading"/>
    <div class="search-header">
      <h1>Comece aqui</h1>
      <p>
        É muito rápido: você faz sua simulação <br />
        e já pode comparar preços e vantagens. 🚀
      </p>
    </div>
    <form id="search-filter" @submit.prevent="handleSubmitForm">
      <fieldset form="search-filter">
        <div class="input-select">
          <div class="u-flex align-itens-center field">
            <i class="fas fa-globe-americas"></i>
            <select
              :disabled="isLoading"
              id="estado"
              name="estado"
              @change="handleSelectEstado"
              aria-placeholder="Selecione seu Estado (UF)"
            >
              <option selected disabled>UF</option>
              <option
                v-for="(value, index) in stateList"
                :key="index"
                :value="value"
              >
                {{ value }}
              </option>
            </select>
          </div>
          <div class="u-flex align-itens-center field">
            <i class="fas fa-map-marker-alt"></i>
            <select
              id="cidade"
              :disabled="isLoading"
              aria-placeholder="Selecione sua Cidade"
              name="cidade"
              @change="handleSelectCidade"
            >
              <option selected disabled>Cidade</option>
              <option
                v-for="(value, index) in cityList"
                :key="index"
                :value="value"
              >
                {{ value }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="selectedCity" class="input-select align-itens-center field">
          <i class="fas fa-suitcase"></i>
          <select
            id="profissao"
            name="profissao"
            aria-placeholder="Selecione uma profissão"
            :disabled="isLoading"
            @change="handleSelectProfissao"
          >
            <option selected disabled>Profissão</option>
            <option
              v-for="(value, index) in jobsList"
              :key="index"
              :value="value.profissao"
            >
              {{ value.profissao }}
            </option>
          </select>
        </div>
        <div v-if="selectedJob && entityList" class="input-select align-itens-center field">
          <i class="fas fa-users"></i>
          <select
            id="entidade"
            name="entidade"
            :disabled="isLoading"
            aria-placeholder="Selecione uma entidade"
            @change="handleSelectEntity"
          >
            <option selected disabled>Selecione uma entidade...</option>
            <option
              v-for="(value, index) in entityList"
              :key="index"
              :value="value.NomeFantasia"
            >
              {{ value.NomeFantasia }}
            </option>
          </select>
        </div>
        <div v-if="selectedEntity" class="input-date field u-flexWrap">
          <label for="date">Data de nascimento</label>
          <input
            :disabled="isLoading"
            type="date"
            id="date"
            name="data de nascimento"
            min="1920-01-01"
            required
            @change="handleSelectBirthDate"
          />
        </div>
        <div v-if="selectedEntity" class="u-flex fa-3x field justify-between">
          <button class="clean-filter" @click="clearAllFields">
            Limpar busca
          </button>
          <button type="submit" form="search-filter">Buscar resultados</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import services from '../services/services';
import Loading from './Loading.vue';

export default {
  name: 'Filters',
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      cityList: [],
      stateList: [],
      jobsList: [],
      entityList: [],
      planoList: [],
      selectedCity: '',
      selectedState: '',
      selectedJob: '',
      selectedEntity: '',
      birthDate: '',
    };
  },
  async mounted() {
    this.isLoading = true;
    try {
      this.stateList = await services.getStates();
    } catch (error) {
      console.log(error);
    }
    this.isLoading = false;
  },
  methods: {
    async clearAllFields() {
      this.isLoading = true;
      this.cityList = ['Selecione...'];
      this.stateList = [];
      this.jobsList = [];
      this.entityList = [];
      this.selectedCity = '';
      this.selectedState = '';
      this.selectedJob = '';
      this.selectedEntity = '';
      this.birthDate = '';
      this.stateList = await services.getStates();
      this.planoList = [];
      // eslint-disable-next-line prefer-destructuring
      this.selectedState = this.stateList[0];
      this.cityList = await services.getCities(this.selectedState);
      this.isLoading = false;
    },
    async handleSubmitForm() {
      const {
        selectedCity, selectedState, selectedEntity, birthDate,
      } = this;
      const data = {
        entidade: selectedEntity,
        uf: selectedState,
        cidade: selectedCity,
        datanascimento: [birthDate],
      };
      this.isLoading = true;

      this.planoList = await services.getPlanos(data);

      if (this.planoList instanceof Error) {
        await this.$toasted.show('Não foram encontrados planos para essa profissão!', {
          duration: 3000,
          icon: {
            name: 'exclamation-triangle',
          },
        });
        this.planoList = [];
        this.$emit('search', this.planoList);
        this.isLoading = false;
        return;
      }
      this.$emit('search', this.planoList);
      this.isLoading = false;
    },
    async handleSelectEstado(estado) {
      this.isLoading = true;
      this.selectedCity = '';
      this.selectedState = '';
      this.selectedJob = '';
      this.selectedEntity = '';
      this.planoList = [];
      this.cityList = await services.getCities(estado.target.value);
      this.selectedState = estado.target.value;
      this.isLoading = false;
    },
    async handleSelectCidade(cidade) {
      this.isLoading = true;
      this.selectedCity = cidade.target.value;
      const data = [];
      data.estado = this.selectedState;
      data.cidade = this.selectedCity;
      try {
        this.jobsList = await services.getJobs(data);
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    async handleSelectProfissao(profissao) {
      this.isLoading = true;
      this.selectedJob = profissao.target.value;
      const data = [];
      data.estado = this.selectedState;
      data.cidade = this.selectedCity;
      data.profissao = this.selectedJob;
      this.entityList = await services.getEntities(data);
      if (this.entityList instanceof Error) {
        await this.$toasted.show('Não foram encontradas entidades para essa profissão!', {
          duration: 3000,
          icon: {
            name: 'exclamation-triangle',
          },
        });
        this.selectedJob = '';
        this.isLoading = false;
      }
      this.isLoading = false;
    },
    handleSelectEntity(entity) {
      this.selectedEntity = entity.target.value;
    },
    handleSelectBirthDate(date) {
      this.birthDate = date.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-filter {
  padding: 15px 67.5px;
  background-color: whitesmoke;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  & .input-select,
  .input-date {
    transition: all 1s ease-in-out;
    display: flex;
    justify-content: flex-start;

    label {
      font-weight: bold;
      color: #2c3e50;
      margin: 6px;
    }
    select {
      width: 100%;
      border: none;
      border-radius: 2px;
      height: 36px;

      &:hover {
        cursor: pointer;
      }

      &#estado {
        width: 60px;
        height: 42px;

        font-size: 18px;
        font-weight: 500;
      }

      &#cidade {
        width: 192px;
        height: 42px;

        font-size: 18px;
        font-weight: 500;
      }

      &#profissao, &#entidade {
        font-size: 18px;
        font-weight: 500;
      }
    }

    input#date {
      border: hidden;
      border-radius: 3px;
      text-align: end;
      width: 145px;

      font-size: 16px;
      font-weight: bold;
    }

    i {
      padding-right: 10px;
    }
  }
}

.search-header {
  h1 {
    color: #ffcd4f;
    text-shadow: 0.05em 0 black, 0 0.05em black, -0.05em 0 black,
      0 -0.05em black, -0.05em -0.05em black, -0.05em 0.05em black,
      0.05em -0.05em black, 0.05em 0.05em black;
  }

  h1,
  p {
    text-align: start;
  }
}

.field {
  padding: 12px;
  padding-left: 0px;
  max-width: 310px;

  & button {
    background-color: #ffcc4f;
    padding: 0.6rem 0.4rem;
    border-radius: 4px;
    max-width: 800px;
    height: 40px;
    font-weight: bold;

    &:hover {
      transition: 0.2s;
      opacity: 0.8;
      cursor: pointer;
    }
  }

  .clean-filter {
    background-color: #005883;
    color: whitesmoke;
  }
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

@media only screen and (max-width: 600px) {
  .search-filter {
    padding: 10px 30px;
  }
}
</style>
