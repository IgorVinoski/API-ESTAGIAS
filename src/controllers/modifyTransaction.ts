import knex from '../../database/db'
export async function modifyTransaction(req, res, next) {
  try {
    if (
      req.body.newtitle &&
      req.body.newdescription &&
      req.body.newtype &&
      req.body.ds_valuetransaction &&
      (req.body.newtype === 'D' || req.body.newtype === 'C')
    ) {
      const select: any = await knex('tbl_dti_transaction')
        .select('cd_transaction')
        .where('cd_transaction', `${req.params.cdTransaction}`)

      if (select[0]) {
        console.log('testando')
        await knex('tbl_dti_transaction')
          .update({
            ds_transactiontitle: req.body.newtitle,
            ds_transactiondescription: req.body.newdescription,
            tp_transactiontype: req.body.newtype,
            ds_valuetransaction: req.body.ds_valuetransaction,
            cd_user: req.user.id,
          })
          .where('cd_transaction', `${req.params.cdTransaction}`)
          .then(() => {
            console.log(`updating the transaction: ${req.body.newtitle}`)
            return res
              .status(200)
              .json({ message: 'uptade concluída com sucesso' })
          })
          .catch((e) => {
            console.log('ERROR IN THE UPDATE => ')
            console.log(e)
            return res.status(406).json({ message: 'falha no update' })
          })
      } else {
        return res.status(404).json({ message: 'esta transação não existe' })
      }
    } else {
      return res
        .status(400)
        .json({ message: 'informe os parâmetros necessários' })
    }
  } catch {
    return res.status(401).json({ message: 'error' })
  }
}
