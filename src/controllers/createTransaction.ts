import knex from '../../database/db'

export async function createTransaction(req, res, next) {
  try {
    if (!req.body) {
      await knex('tbl_dti_transaction')
        .insert({
          cd_transaction: req.body.cd_transaction,
          ds_transactionTitle: req.body.title,
          ds_transactionDescription: req.body.descripton,
          tp_transactionType: req.body.type,
          cd_user: req.body.cd_user,
        })
        .then(() => {
          console.log(`Inserting the transaction: ${req.body.cd_transaction}`)
        })
        .catch((e) => {
          console.log('ERROR IN THE TRANSACTION => ')
          console.log(e)
        })
      return res
        .status(200)
        .json({ message: 'transação concluida com sucesso' })
    } else {
      return res.status(406).json({ message: 'falha na transação' })
    }
  } catch {
    return res.status(404).json({ message: 'erro na transação' })
  }
}
