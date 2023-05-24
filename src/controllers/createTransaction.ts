import knex from '../../database/db'

export async function createTransaction(req, res, next) {
  try {
    if (
      req.body.title &&
      req.body.description &&
      req.body.type &&
      (req.body.type === 'C' || req.body.type === 'D')
    ) {
      await knex('tbl_dti_transaction')
        .insert({
          ds_transactiontitle: req.body.title,
          ds_transactiondescription: req.body.description,
          tp_transactiontype: req.body.type,
          ds_valuetransaction: req.body.ds_valuetransaction,
          cd_user: req.user.id,
        })
        .then(() => {
          console.log(`Inserting the transaction: ${req.body.title}`)
          return res
            .status(201)
            .json({ message: 'transação concluída com sucesso' })
        })
        .catch((e) => {
          console.log('ERROR IN THE TRANSACTION => ')
          console.log(e)
          return res.status(406).json({ message: 'falha na transação' })
        })
    } else {
      return res
        .status(406)
        .json({ message: 'falha na transação: insira os dados necessários' })
    }
  } catch {
    return res.status(404).json({ message: 'erro na transação' })
  }
}
