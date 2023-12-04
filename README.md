# AtletiGo

URLs úteis [Frontend](https://portfolio-matheustambosi.vercel.app) e [Backend](https://atletigo.azurewebsites.net/swagger/index.html)

# Objetivo

O projeto tem como objetivo facilitar e centralizar a comunicação entre as seguintes entidades: Universitários e Atléticas. O sistema é um PWA (Progressive Web App) que após o universitário fazer um cadastro, poderá ler um QRCode gerado pelos representantes da atlética (gerado no mesmo sistema) para entrar na atlética vinculada ao QRCode, após isso o usuário irá ter acesso as postagens e eventos daquela atlética, assim como a possíbilidade de inscrever-se para ver as datas de jogos e treinos das modalidades disponíveis, que somente irão ficar disponíveis com a configuração dos representantes, após isso disponibilizará a vizualização das datas dos treinos daquela modalidade para aquele usuário.

Sistema também irá disponibilizar exclusivamente para representantes das atléticas as interfaces de gerenciamento dos usuários da atlética, gerenciamento dos atletas que se inscreveram nas modalidades, gerenciamento da agenda que será apresentada aos usuários, assim como a interface que irá controlar os QRCodes para a entrada.

# Contexto

Atualmente as divulgações são feitas nas redes sociais, que acabam "concorrendo" com outros perfis, diminuindo assim a visibilidade das postagens. A solução feita pelo AtletGo é um sistema onde irá centralizar as postagens da atlética e também facilitar a visualização de datas de eventos e disponibilizando a funcionalidade para encontrar atletas para jogar pela atlética, futuramente também podendo evoluir para a venda de itens da atletica integrada ao aplicativo.

# Restrições

- Sistema não irá oferecer venda de produtos das atléticas (Canecas, uniformes, ingressos e etc) em sua primeira versão.
- Sistema não se responsabiliza pelas postagens dos representantes das atléticas, sendo assim o controle feito exclusivamente pela atlética, assim como o gerenciamento dos seus usuários e atletas.

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
1. Agenda
   - Representantes poderão incluir eventos.
   - Integrantes da atlética poderão ler.
   - Atletas poderão ver datas de treinos das modalidades que segue.
2. Gerenciar usuários
   - Representantes poderão remover usuários de suas atléticas.
   - Representantes poderão alterar perfil dos universitários.
3. Gerenciar atletas
   - Representantes poderão vizualizar seus atletas e as modalidades que segue.
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

- Frontend - Nextjs (React) e Tailwind CSS
- Backend - C# e .Net Core 3.1
- Banco de Dados - PostgreSQL

# Qualidade de Software
- [Datadog](https://sonarcloud.io/summary/overall?id=matheustambosi_portfolio-backend)
- [CodeCov](https://app.codecov.io/gh/matheustambosi/portfolio-backend/tree/main)

# Observabilidade
- Utilizando application insights no portal azure onde a API está disponibilizada temos acesso a informações sobre a saúde da aplicação.
- ![image](https://github.com/matheustambosi/portfolio/assets/61556272/c641e8b7-a13a-47b0-92d5-271bc135327b)

# Modelagem

Projeto utiliza o board na aba de "Projetos" no Github para o gerenciamento das tarefas, assim como as histórias de usuário.

# Como Rodar Local
- Ferramentas necessárias: VisualStudio Community, Runtime do .Net Core 3.1 e PostgreSQL (PgAdmin 4)
- Node v16.20

Para executar o AtletiGo de forma local é necessário clonar o repositório do [Backend](https://github.com/matheustambosi/portfolio-backend)

Abrir o AtletiGo.sln no repositório do backend.

No arquivo `appsettings.Development.json` utilizar a seguinte connection string
- `Username=postgres;Password=admin;Host=localhost;Port=5432;Database=AtletiGo;Pooling=true;`

Criar no PgAdmin (localhost) uma Database chamada **AtletiGo** e execute os comandos SQL para criar as tablas. Arquivo se encontra no repositório do backend no diretório `AtletiGo/Core/Utils/Atletigo.sql`

Executar a aplicação do backend pela interface do VisualStudio Community.

Clonar o repositório do frontend e no terminal executar os seguinte:
- `npm i`

Criar um arquivo `.env` no repositório do frontend com as seguintes informações:
- NEXTAUTH_URL="http://localhost:3000"
- NEXTAUTH_SECRET="<QUALQUER_INFORMACAO>"
- NEXT_PUBLIC_API_URL="http://localhost:43606 (Certificar que a URL é a mesma que o Backend está rodando)"

Executar o seguinte comando:
- `npm run dev`
