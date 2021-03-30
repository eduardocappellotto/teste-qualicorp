<template>
  <div class="container-results u-flex u-flexCol">
    <div class="results-header u-flex justify-between">
    <h1>Sua busca retornou {{planos.length}} planos
       <br> Compare as cotações abaixo </h1>
    <button class="voltar" @click="redirectHome" >
      <i class="fas fa-arrow-left"></i> Voltar</button>
    </div>
    <div class="justify-center u-flex plan-results">
      <div
        v-for="(value, index) in planos"
        class="result-card u-flex u-flexCol"
        :key="index"
      >
        <div class="u-flex plano-header">
          <img :src="planos[index].operadoraLogo" alt="Logo da Operadora" />
          <p class="align-self-center u-maxWidth">
            {{ planos[index].operadora }}
          </p>
        </div>

        <div class="u-flex u-flexCol plano-details">
          <div class="plano-details-lista">
            <p class="align-self-center u-maxWidth">
              Plano {{ planos[index].nome_plano_ans }}
            </p>
            <ul style="list-style-type: none">
              <li>
                <i class="fas fa-check-square"> </i>
                {{
                  planos[index].copartipacao === true
                    ? "Copartipação"
                    : "Sem copartipação"
                }}
              </li>
              <li>
                <i class="fas fa-check-square"> </i
                >{{ planos[index].nome_plano_ans }}
              </li>
              <li>
                <i class="fas fa-check-square"> </i>{{ planos[index].plano }}
              </li>
              <li>
                <i class="fas fa-check-square"> </i>Acomodação
                {{ planos[index].tipo_acomodacao }}
              </li>
              <li>
                <i class="fas fa-check-square"> </i>Rede de prestadores com
                {{ planos[index].rede_referencia.length }}
                unidades de cobertura!
              </li>
            </ul>
            <a>
              <p class="plano-ver-detalhes">Ver todas as coberturas ></p>
            </a>
          </div>

          <span class="plano-price">
            R${{ planos[index].precos.total.replace(".", ",") }}
            <small> à vista</small></span
          >
          <span>em até 10x de <strong>R$ 206,02</strong> s/ juros</span>

          <button type="submit">COMPRAR</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Results',
  props: {
    planosList: {
      type: Object,
    },
  },

  beforeMount() {
    if (!this.planosList) {
      this.$router.push({ name: 'Home' });
    }
  },

  computed: {
    planos() {
      if (this.planosList) {
        return this.planosList.planos;
      } return [];
    },
  },
  methods: {
    redirectHome() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>
<style lang="scss" scoped>
.container-results{
  max-width: 900px;
  margin: auto;
  padding: 0rem 1.5rem;

  .results-header{
    & h1{
      color: whitesmoke;
      padding: 1rem 0rem;
      font-size: 26px;
    }

    & button{
      color: black;
      font-size: 28px;
      align-self: center;
      background: none;
      border: none;
      &:hover{
        opacity: 0.6;
        transition: 0.3s;
        cursor: pointer;
      }
    }

  }
}
.plan-results {
  padding: 1.5rem;
  background-color: whitesmoke;
  border-radius: 5px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 1rem;

  & .result-card {
    padding: 1.5rem;
    border: 1px solid grey;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      transition: 0.3s;
    }

    &:hover {
      border: 3px solid grey;
      transition: 0.3s;
    }

    & .plano-header {
      & span {
        padding: 1.5rem !important;
      }
    }
  }

  & .plano-details {
    padding-top: 20px;
    border-top: 1px solid grey;

    & button {
      margin: 10px;
      padding: 10px;
      background-color: #ffcc4f;
      border-radius: 5px;
      color: #005883;
      font-weight: bold;

      &:hover {
        cursor: pointer;
        opacity: 0.8;
        transition: 0.3s;
      }
    }
    & .plano-price {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;

      & small {
        font-size: 12px;
      }
    }
  }

  & .plano-details-lista {
    ul {
        padding-inline-start: 10px;
    }
    li {
      text-align: start;
      color: rgb(167, 167, 167);
      padding: 5px 0px 5px 0px;
      & i {
        padding-right: 10px;
      }
    }
  }

  & .plano-ver-detalhes {
    font-size: 14px;
    color: #ff712c;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

img {
  width: 100px;
  background-color: whitesmoke;
  padding: 1rem;
}
</style>
