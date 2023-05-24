
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

## banco de dados
tabelas do banco: 

```sql
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


create table tbl_log_deleteTnrsaction(
	cd_transaction serial PRIMARY KEY,
	ds_transactionTitle varchar(200),
	ds_transactionDescription text,
	tp_transactionType varchar(1),
	ds_valuetransaction real,
	cd_user INT,
	dt_delete date
);


create trigger tg_log_deleteTransaction
AFTER DELETE on tbl_dti_transaction
FOR EACH ROW
EXECUTE PROCEDURE fn_log_deleteTransaction()

create or replace function fn_log_deleteTransaction()
returns trigger as $$
BEGIN
insert into tbl_log_deleteTnrsaction
(cd_transaction, ds_transactionTitle, ds_transactionDescription, tp_transactionType, ds_valuetransaction, cd_user, dt_delete)
values
(old.cd_transaction, old.ds_transactionTitle, old.ds_transactionDescription, old.tp_transactionType, old.ds_valuetransaction, old.cd_user, current_date);
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```
## Documentação da API

#### Registrando um usuário
```
  POST /user/create

```
Recebe os parâmetros por body:
```JSON
{
	"email": "exemple@gmail.com",
	"password": "12345",
	"birth": "24/05/2023",
	"name": "Igor"
}
```
Return:
201 status code.

#### Login de um usuário
```
POST /user/login
```
Recebe os parâmetros por body:
```JSON
{
	"email": "igor@gmail.com",
	"password": "12345"
}
```
Retorno:
```JSON
{
	"message": "autenticado com sucsso",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZF91c2VyIjozLCJubV91c2VyIjoiSWdvciIsImRzX2VtYWlsIjoiaWdvckBnbWFpbC5jb20iLCJpYXQiOjE2ODQ5NTA1MTEsImV4cCI6MTY4NDk1NDExMX0.7r1Bn_mmq7KPvCERXnVbQFD5Ub4uMubxX97zI8Jd9zs",
	"id": 3
}
```
#### Criando uma transação
```
  POST /transaction/create

```
Recebe os parâmetros por body e o Bearer Token:
```JSON
{
	"title": "Titulo da transação",
	"description": "Descrição da transação ",
	"type": "D",
	"ds_valuetransaction": 1000
}
```
Os únicos tipos permitidos em "type" são C para crédio ou D para débito.

Retorno:
201 status code

#### Deletando uma transação
```
  DELETE /transaction/delete/${cdTransaction}

```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cdTransaction` | `int` | Código da transação |
| `Bearer Token` | `token` | Token do lugin do usuário |

Retorno:
200 status code
#### Modificando uma transação

```
  PUT /transaction/modify/${cdTransaction}

```
Recebe o código da transação a ser modificada na URL, o Bearer Token e os parâmetros da transação por body.

```JSON
{
	"newtitle": " título",
	"newdescription": "Alterando a descrição",
	"newtype": "D",
	"ds_valuetransaction":  500
}
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cdTransaction` | `int` | Código da transação |
| `Bearer Token` | `token` | Token do lugin do usuário |


Retorno: 
200 status code.

#### Retorna apenas uma transação

```
  GET transaction/onlyTransactionq/${cdTransaction}

```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cdTransaction` | `int` | Código da transação |
| `Bearer Token` | `token` | Token do lugin do usuário |

Exemplo:
Pegando apenas a transação de código 24:
```
  GET transaction/onlyTransaction/24

```
Retorno:
```JSON
[
	{
		"cd_transaction": 24,
		"ds_transactiontitle": "Enviando dinheiro",
		"ds_transactiondescription": "Descrição da transação ",
		"tp_transactiontype": "C",
		"ds_valuetransaction": 101100,
		"cd_user": 3
	}
]
```
#### Retorna todas as transações

```http
  GET /transaction/allTransactions
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `none`      | `none` | Lista de todas as transações |
| `Bearer Token` | `token` | Token do lugin do usuário |

Exemplo: Pegando todas as transações de um usuário
```http
  GET /transaction/allTransactions
```
Retorno:
```JSON
{
	"transactions": [
		{
			"cd_transaction": 24,
			"ds_transactiontitle": "Enviando dinheiro",
			"ds_transactiondescription": "Descrição da transação ",
			"tp_transactiontype": "C",
			"ds_valuetransaction": 101100
		},
		{
			"cd_transaction": 25,
			"ds_transactiontitle": "Enviando dinheiro",
			"ds_transactiondescription": "Descrição da transação ",
			"tp_transactiontype": "C",
			"ds_valuetransaction": 101100
		},
		{
			"cd_transaction": 26,
			"ds_transactiontitle": "Enviando dinheiro",
			"ds_transactiondescription": "Descrição da transação ",
			"tp_transactiontype": "C",
			"ds_valuetransaction": 101100
		},
		{
			"cd_transaction": 27,
			"ds_transactiontitle": "Enviando dinheiro",
			"ds_transactiondescription": "Descrição da transação ",
			"tp_transactiontype": "C",
			"ds_valuetransaction": 101100
		},
	]
}
```
### Para o futuro
[ ] testes unitários?

