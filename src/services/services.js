import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apisimulador.qualicorp.com.br',
});

const getStates = async () => {
  const response = await fetch('json/brazil.json');
  const data = await response.json();
  return data.estados.map((estado) => estado.sigla);
};

const getCitys = async (state) => {
  const response = await fetch('json/brazil.json');
  const data = await response.json();
  const citys = data.estados.filter((estado) => state === estado.sigla);

  return citys[0].cidades || [];
};

const getJobs = async (data) => {
  const apiKey = await process.env.VUE_APP_API_KEY_LISTA_PROFISSAO;
  let profissoes;
  await api.get(`/profissao/${data.estado}/${data.cidade}?api-key=${apiKey}`,
    {
      crossorigin: true,
    })
    .then((response) => {
      profissoes = response.data;
    })
    .catch((error) => {
    // handle error
      console.log(error);
    });

  return profissoes || [];
};

const getEntities = async (data) => {
  const apiKey = await process.env.VUE_APP_API_KEY_LISTA_ENTIDADE;
  let profissoes;
  await api.get(`/entidade/${data.profissao}/${data.estado}/${data.cidade}?api-key=${apiKey}`,
    {
      crossorigin: true,
    })
    .then((response) => {
      profissoes = response.data;
    })
    .catch((error) => { profissoes = error; });
  return profissoes;
};

const getPlanos = async (data) => {
  const apiKey = await process.env.VUE_APP_API_KEY_LISTA_PLANOS;
  let profissoes;
  await api.post(`/plano?api-key=${apiKey}`,
    {
      headers: { 'Content-Type': 'text/plain' },
      crossorigin: true,
      entidade: data.entidade,
      uf: data.uf,
      cidade: data.cidade,
      datanascimento: data.datanascimento,
    })
    .then((response) => {
      profissoes = response.data;
    })
    .catch((error) => error.message);
  return profissoes;
};

export default {
  getStates,
  getCitys,
  getJobs,
  getEntities,
  getPlanos,

  api,
};
