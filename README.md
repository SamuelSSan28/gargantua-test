## Breve descrição do projeto
Este projeto simula um sistema de microcrédito, onde usuários podem solicitar empréstimos, visualizar a lista de solicitações e acessar detalhes de cada solicitação. Ao enviar uma solicitação, os dados são enviados para um serviço que integra APIs externas e um consumer que processa a fila do RabbitMQ, determinando se o empréstimo é aprovado ou rejeitado e persistindo as informações no banco de dados.

## Tecnologias utilizadas
- **Frontend:** Next.js 15 (App Router), React, Material UI, Axios
- **Backend:** NestJS, TypeORM, PostgreSQL, RabbitMQ
- **Consumer:** NestJS (para processamento assíncrono via RabbitMQ)
- **Ferramentas e Gerenciamento de Dependências:** Docker, Docker Compose, pnpm (nos projetos NestJS)

## Instruções para instalação e execução do projeto

### Pré-requisitos
- Docker e Docker Compose instalados.
- Git.

### Passos para executar
1. **Clonar o repositório:**
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd microcredito-project
   ```

2. **Configurar variáveis de ambiente (se necessário):**
   Verifique se as variáveis de ambiente estão configuradas no `docker-compose.yml` ou, se preferir, crie arquivos `.env` conforme a necessidade para cada serviço.

3. **Iniciar os serviços:**
   ```bash
   docker-compose up --build
   ```
   - **Backend (Service):** Será exposto na porta **3000**.
   - **Frontend:** Mapeado para a porta **3001** no host.
   - **Banco de Dados (PostgreSQL):** Porta **5432**.
   - **RabbitMQ:** Porta **5672** (e interface de gerenciamento na **15672**).

4. **Acessar a aplicação:**
   Abra o navegador e acesse [http://localhost:3001](http://localhost:3001).

 
## Abordagem adotada no desenvolvimento

Durante o desenvolvimento deste projeto, adotei uma abordagem modular e desacoplada, que me permitiu manter a flexibilidade e a escalabilidade do sistema. Abaixo, destaco os pontos principais da minha estratégia:

- **Arquitetura Modular e Uso de Adapters:**  
  Utilizei adapters para criar uma camada de abstração entre a lógica de negócio e as integrações externas (como APIs e RabbitMQ). Essa estratégia me permitiu isolar o núcleo da aplicação, facilitando a substituição ou atualização dos componentes externos sem afetar o domínio principal.

- **Escolha do Material UI para o Front-end:**  
  Optei por utilizar o Material UI (MUI) como biblioteca de componentes, pois a sua robustez e a manutenção contínua feita pela equipe da MUI oferecem um ecossistema testado e com suporte profissional. Construir componentes do zero exigiria um esforço significativo, especialmente considerando que não há um time de front-end dedicado, e isso atrasaria o desenvolvimento.

- **Processamento de Mensagens com RabbitMQ:**  
  Inicialmente, a ideia era enviar a mensagem diretamente para a fila, registrando-a apenas como aprovado ou rejeitado. No entanto, implementei uma etapa intermediária de "pending". Dessa forma, as mensagens são enfileiradas e enriquecidas posteriormente pelo consumer com dados adicionais, como a localização. Essa abordagem não só melhora a rastreabilidade em caso de falhas, mas também gera um histórico valioso que pode ser utilizado para análises futuras.


## Desafios enfrentados

- **Integração de Serviços:**  
  Configurar a comunicação entre o backend, o consumer e o frontend utilizando variáveis de ambiente e Docker foi desafiador.  
  - **Experiência com RabbitMQ:**  
    - Não tinha utilizado RabbitMQ anteriormente, o que me deixou um pouco perdido em relação à configuração dos canais.
    - Tive dúvidas se o consumer e o publisher poderiam ser implementados no mesmo aplicativo ou se deveriam ser separados.
  - **Arquitetura e Escalabilidade:**  
    - Em projetos anteriores, os componentes de publisher e consumer eram separados para facilitar a escalabilidade.
    - Inicialmente, criei um projeto para o publisher e outro para o consumer.
    - Percebi que, na forma como implementei no service, o RabbitMQ cria dois canais, o que sugere que poderia ser consolidado em um único projeto.
  - **Limitações de Tempo:**  
    - Devido ao prazo limitado, não consegui aprofundar na melhor abordagem para a integração dos canais do RabbitMQ, mas a experiência serviu para entender melhor os desafios de integração e escalabilidade em sistemas distribuídos.

## Melhorias ou funcionalidades adicionais
Caso houvesse mais tempo para o desenvolvimento, as seguintes melhorias e funcionalidades poderiam ser implementadas:

- **Testes Automatizados:**  
  Incluir testes unitários e de integração para aumentar a robustez do sistema e facilitar a identificação precoce de bugs, garantindo que novas funcionalidades não quebrem as existentes.

- **Documentação Técnica Detalhada:**  
  Criar diagramas e fluxos detalhados para uma melhor compreensão da arquitetura e dos processos. Gosto de utilizar o Mermaid para projetar os fluxos antes de iniciar o desenvolvimento, o que ajuda a identificar gargalos e planejar melhorias de forma estruturada.

- **Gerenciamento de Dependências com Lerna:**  
  Implementar o Lerna para gerenciar as dependências entre os projetos (service, consumer e frontend) e compartilhar código comum. Essa abordagem facilitaria a manutenção dos módulos reutilizáveis, garantindo compatibilidade e integridade dos códigos entre os diferentes pacotes, além de simplificar o processo de atualização e integração contínua.