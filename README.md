# API de Cotação de Câmbio para BRL

## Descrição:

Esta API fornece dados de cotação de câmbio em tempo real, convertendo moedas estrangeiras para o Real Brasileiro (BRL). Ela consulta uma API externa, processa os dados e retorna um objeto JSON formatado com informações relevantes. A API também oferece paginação e documentação Swagger.

## Funcionalidades:

Consulta de cotações de câmbio de diversas moedas estrangeiras em relação ao BRL.
Retorno de dados formatados, incluindo nome da moeda, valor máximo (high), valor mínimo (low) e data de criação da cotação.
Tratamento de erros com exceptions personalizadas.
Paginação dos resultados.
Documentação Swagger para facilitar o uso da API.

### Tecnologias Utilizadas:
- NestJS
- TypeScript
- Node.js
- Class-validator
- Swagger

### Pré-requisitos:

- Node.js (versão recomendada: 18 ou superior)
- npm ou yarn

### Instalação:
- Clone o repositório:
```
  git clone https://github.com/matheus-arj/currency-data-service.git
  cd currency-data-service
```
- Instale as dependências:

```
npm install
# ou
yarn install
```
- Configure as variáveis de ambiente:
  <br>Crie um arquivo .env na raíz do seu projeto e adicione a seguinte variável
```
  API_URL='https://economia.awesomeapi.com.br/all'
```
### Execute a aplicação:
```
npm run start:dev
# ou
yarn start:dev
```
A API estará disponível em http://localhost:3000/currency/exchange-rates.


### Endpoints:

- GET /currency/exchange-rates: Retorna as cotações de câmbio paginadas.
- Query Parameters:
  - page (opcional): Número da página (padrão: 1).
  - size (opcional): Número de itens por página (padrão: 5).

#### Exemplo de Resposta:
```json
[
  {
        "currency": "USD",
        "name": "Dólar Americano/Real Brasileiro",
        "high": "5.7249",
        "low": "5.6396",
        "createdDate": "2025-03-19 14:51:49"
  },
  {
        "currency": "EUR",
        "name": "Euro/Real Brasileiro",
        "high": "6.2383",
        "low": "6.13874",
        "createdDate": "2025-03-19 14:53:54"
   }, ...
]
```


#### Estrutura de Dados (DTO):

```TypeScript

import { IsString } from 'class-validator';

export class CurrencyDto {
  @IsString()
  currency: string;

  @IsString()
  name: string;

  @IsString()
  high: string;

  @IsString()
  low: string;

  @IsString()
  createdDate: string;
}
```
### Tratamento de Erros (Exceptions):

- A API utiliza exceptions personalizadas para tratamento de erros:

    - <b>ExternalApiNoDataException (HTTP 404)</b>: Retornado quando a API externa não retorna dados.
    - <b>ExternalApiException (HTTP 500)</b>: Retornado quando ocorre um erro ao acessar a API externa.
    - <b>ApiUrlException (HTTP 400)</b>: Retornado quando a URL da API externa não é fornecida corretamente.

### Documentação Swagger:

- A documentação da API está disponível em http://localhost:3000/api-docs.

### Exemplo de uso com CURL e paginação:

```
curl "http://localhost:3000/currency/exchange-rates"
curl "http://localhost:3000/currency/exchange-rates?page=1&size=3"
```

#### Observações
Quando você chamar:
```
GET /currency/exchange-rates
```
- Resultado: page = 1, size = 5 (valores padrão aplicados).

```
 GET /currency/exchange-rates?page=2
```
 - Resultado: page = 2, size = 5 (somente page foi alterado).

```
GET /currency/exchange-rates?page=3&size=10
```
- Resultado: page = 3, size = 10 (ambos os valores definidos pelo usuário).