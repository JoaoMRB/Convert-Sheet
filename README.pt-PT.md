# Convert/Sheet

[English](./README.md) | [Português](./README.pt-PT.md)

O Convert/Sheet é uma pequena ferramenta de browser para converter ficheiros Excel e CSV para JSON, YAML, XML ou Markdown. Também permite editar os dados importados antes da exportação e converter JSON novamente para um ficheiro `.xlsx`.

Tudo corre no browser. Sem backend, sem conta e sem upload dos ficheiros.

Criado por [Malog](https://github.com/JoaoMRB).

## Demo

Versão online:

[https://joaomrb.github.io/Convert-Sheet/](https://joaomrb.github.io/Convert-Sheet/)

![Convert/Sheet em execução no browser](./docs/preview.png)

## O Que Faz

- Converte ficheiros `.xlsx`, `.xls` e `.csv`.
- Exporta para JSON, YAML, XML e Markdown.
- Converte JSON válido novamente para Excel.
- Permite pré-visualizar e editar as linhas importadas antes da exportação.
- Suporta múltiplas sheets.
- Suporta JSON plano e JSON nested usando dot notation.
- Exporta como array de objetos ou como objeto indexado.
- Permite escolher uma coluna como chave customizada.
- Valida tipos por coluna: texto, número, booleano e data.
- Inclui ferramentas simples para limpar espaços, linhas vazias e nomes de colunas.
- Filtra linhas na tabela de pré-visualização.
- Gera snippets de integração para Fetch, Axios, Python e cURL.
- Inclui tema claro e escuro.

## Privacidade

Os ficheiros são processados localmente no browser. O Convert/Sheet não envia folhas de cálculo nem dados JSON para um servidor da aplicação.

A opção de importação por URL depende de o servidor externo permitir acesso pelo browser através de CORS.

## Como Usar

1. Abre a aplicação no browser.
2. Arrasta um ficheiro `.xlsx`, `.xls` ou `.csv` para a área de upload.
3. Escolhe a sheet e as opções de output.
4. Edita ou limpa os dados da pré-visualização se for necessário.
5. Clica em **Converter para JSON**.
6. Copia ou baixa o resultado.

## GitHub Pages

O URL do GitHub Pages é:

```text
https://joaomrb.github.io/Convert-Sheet/
```

Para publicar no teu repositório:

1. Abre o repositório no GitHub.
2. Vai a **Settings** -> **Pages**.
3. Escolhe **Deploy from a branch**.
4. Seleciona a branch principal e a pasta `/root`.
5. Guarda as alterações.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Bootstrap Icons
- SheetJS / XLSX
- Highlight.js

## Estrutura do Projeto

```text
Convert-Sheet/
|-- docs/
|   `-- preview.png
|-- Index.html
|-- app.js
|-- styles.css
|-- favicon.svg
|-- README.md
`-- README.pt-PT.md
```

## Notas

- O limite recomendado por ficheiro é de 10 MB.
- A importação por URL pode falhar quando o servidor de origem bloqueia CORS.
- Ficheiros muito grandes dependem da memória disponível no browser.
- Algumas bibliotecas são carregadas por CDN, por isso a app precisa de acesso à internet.

## Possíveis Melhorias

- Adicionar exemplos de ficheiros de entrada e output.
- Adicionar um GIF curto com o fluxo principal.
- Melhorar navegação por teclado e detalhes de acessibilidade.
- Adicionar testes automatizados para funções de conversão.
- Criar uma versão totalmente offline com dependências locais.

## Autor

Criado por [Malog](https://github.com/JoaoMRB).
