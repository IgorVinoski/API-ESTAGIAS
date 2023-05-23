
# API ESTAGIAS
API para por em prática os os conhecimentos adquiridos sobre a criação de APIs REST utilizando o ecosistema NODE.







## Aprendizados

- CRUD básico, middlewares, autênticações, tokens, rotas, 
## Funcionalidades

- criar um usuário
- fazer login com o usuário 
- criar uma transação
- deletar uma transação
- modificar uma transação
- listar uma transação
- listar todas as transações de um usuário


## Stack utilizada

Algumas tecnologias utilizadas:
    - Banco de dados: Postgers
    - Typescript
        - Axios
        - Express
        - Knex
## Instalação

Para rodar o projeto utilize: 
```bash
 npm install
```
   
    npm run dev

Atente-se as conexões com o banco de dados, no arquivo .env-exemple
## Melhorias
Para o futuro:
[ ] testes unitários

## banco de dados
tabelas do banco
create table tbl_dti_user(
	cd_user SERIAL PRIMARY KEY,
	nm_user varchar(200),
	ds_email varchar(100),
	ds_password varchar(100),
	dt_birth date
)
create table tbl_dti_transaction(
	cd_transaction serial PRIMARY KEY,
	ds_transactionTitle varchar(200),
	ds_transactionDescription text,
	tp_transactionType varchar(1),
	ds_valuetransaction real,
	cd_user INT,
		FOREIGN KEY(cd_user)
				  REFERENCES tbl_dti_user(cd_user)
	
)