
# teste-qualicorp - Eduardo Cappellotto

## [Link para o projeto no Netlify 🚀](https://qualicorp-cappellotto.netlify.app/#/)

  
Para realizar a instalação, realize os seguintes comandos em ordem:

```
git clone https://github.com/eduardocappellotto/teste-qualicorp.git
cd teste-qualicorp
npm install
npm run serve

```

  

### Os comandos acima realizarão em ordem: 

 - Download do projeto;
 - Entra no diretório do projeto;
 - Instalação de dependências;
 - Iniciará o server de desenvolvimento local em localhost:8080

### Detalhes do projeto:

 - Notei um problema com a API disponibilizada  ( protocolo HTTP enquanto a maioria dos serviços de deploy  inicia projetos em HTTPS ), procurei pelo github por usos dessa mesma API em outras resoluções de teste e achei a seguinte baseURL:
 -https://apisimulador.qualicorp.com.br 
 
 - Não optei por nenhum framework css apesar da opção. Gosto de criar e utilizar meus próprios utilitários e estilos, apesar de nesse projeto não ter utilizado muito SCSS.
 - Não vi necessidade de utilizar vuex, mas no caso de uma API com retorno de mais itens, a utilização de paginação server-side e de Vuex permite melhor performance e escalabilidade.

### Sobre os Objetivos e Requisitos:
#### Objetivos
 - ✅ Criar um formulário para capturar dados de um cliente.
 - ✅ Listar as profissões e entidades baseados nos dados do cliente.
 - ✅ Criar uma tela de listagem com os planos de saúde disponíveis.
 
#### Requisitos

 - ✅ O código deve estar hospedado e público em um perfil do github ou gitlab para o code review.
 - ✅ O resultado deve estar hospedado e o link deve estar no read.me do repositório. Pode-se utilizar o Heroku ou o Netlify para deixar online e sem custo.
 - ✅ Deve-se usar um framework frontend javascript a sua escolha. Na Qualicorp, utilizamos o ✅ Vuejs, mas não é obrigatório
 -  ⚠️**Pode-se** usar qualquer framework CSS. Inclusive um próprio..
 - ✅ O link do repositório deverá ser enviado para avaliação.
 