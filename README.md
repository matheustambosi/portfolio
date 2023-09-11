# AtletGo

# Objetivo

O projeto tem como objetivo facilitar e centralizar a comunicação entre as seguintes entidades: Universitários e Atléticas. O sistema é um PWA (Progressive Web App) que após o universitário fazer um cadastro, poderá ler um QRCode gerado pelos representantes da atlética (gerado no mesmo sistema) para entrar na atlética vinculada ao QRCode, após isso o usuário irá ter acesso as postagens e eventos daquela atlética, assim como a possíbilidade de inscrever-se para jogar pelos times das modalidades disponíveis, que após a aprovação dos representantes, irá permitir a vizualização das datas dos treinos daquela modalidade para aquele usuário.

Sistema também irá disponibilizar exclusivamente para representantes das atléticas as interfaces de gerenciamento dos usuários da atlética, gerenciamento dos atletas que se inscreveram para jogar, gerenciamento da agenda que será apresentada aos usuários, gerenciamento das postagens listadas na tela inicial, assim como a interface que irá controlar os QRCodes para a entrada.

# Contexto

Atualmente as divulgações são feitas nas redes sociais, que acabam "concorrendo" com outros perfis, diminuindo assim a visibilidade das postagens. A solução feita pelo AtletGo é um sistema onde irá centralizar as postagens da atlética e também facilitar a visualização de datas de eventos e disponibilizando a funcionalidade para encontrar atletas para jogar pela atlética.

# Restrições

- Sistema não irá oferecer venda de produtos das atléticas (Canecas, uniformes, ingressos e etc).
- Sistema não se responsabiliza pelas postagens dos representantes das atléticas, sendo assim o controle feito exclusivamente pela atlética.

# Trade-offs

- **Portabilidade:**

Sistema irá ser um PWA, portanto a portabilidade é um fator ja incluso por ser um sistema Web que poderá ser baixado.

- **Funcionalidade:**

Sistema terá poucas funcionalidades porém indispensáveis, sendo a mais importante delas a criação e a leitura do QRCode, visando que é a funcionalidade que irá permitir que o usuário acesse outras partes do sistema.

- **Confiabilidade:**

O gerenciamento de usuários, postagens e agenda será totalmente controlado pelos representantes das atléticas, não exigindo um grau de confiabilidade muito alto por parte do sistema.

- **Usabilidade:**

Sistema irá atender na sua grande parte o público universitário e mais jovem, sendo assim a usabilidade será um problema tão grande. Sistema busca ter uma interface moderna, atual e bem objetiva.

- **Eficiência:**

Como dito anteriormente, a parte mais importante será a criação e leitura do QRCode, que irão desbloquear o restante do sistema, portanto irá ser necessário um alto grau de eficiencia nesta parte.

- **Manutenibilidade:**

Sistema poderá ter problemas envolvendo a leitura do QRCode em alguns modelos de celular, portanto também será disponibilizado junto com o QRCode um código de acesso.

# Mockup

Foi criado um projeto no [Figma](https://www.figma.com/file/7Eh2hEce9OKarSogU60EOv/AtletGo?type=design&node-id=0%3A1&mode=design&t=VUH6sks5chR7lZ3V-1) para a definição da identidade visual do produto.

# [C4 Model](/docs/c4-models.md)

# Requisitos e [Casos de uso](/docs/assets/UseCase.png)

## Funcionais
1. Postagens
   - Representantes poderão adicionar postagens.
   - Integrantes da atlética poderão ler.
2. Gerenciar usuários
   - Representantes poderão inativar usuários.
3. Gerenciar atletas
   - Representantes poderão vizualizar as solicitações.
   - Representantes poderão alterar perfil dos universitários para atleta.
5. Agenda
   - Integrantes da atlética poderão ver datas de campeonatos.
   - Atletas poderão ver datas de treinos que foram aprovados nas respectivas modalidades.
   - Representantes poderão incluir e editar eventos.
6. QRCode
   - Representantes poderão criar e excluir QRCodes para entrar nas atléticas.
   - Integrantes poderão ler os QRCodes e entrar.

## Não Funcionais
1. Vizualização da agenda de forma offline.
2. Usabilidade
   - Interface simples e objetiva.
3. Eficiencia
   - Leitura do QRCode de forma eficiente.

# Stack

- Frontend - Nuxt v2 (Vuejs) e Tailwind CSS
- Backend - C# e .Net Core
- Banco de Dados - MySql

- Teste E2E - Cypress
- Cobertura de código - SonarQube
- Observabilidade - Datadog

# Modelagem

Projeto utiliza o board na aba de "Projetos" no Github para o gerenciamento das tarefas, assim como as histórias de usuário.
