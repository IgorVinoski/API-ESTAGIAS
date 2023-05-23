import knex from '../../database/db'

export async function listAllTransactionsByUser(req, res, next) {
  try {
    const select: any = await knex('tbl_dti_transaction')
      .select('cd_transaction')
      .where('cd_user', `${req.user.id}`)

    if (select) {
      console.log('AAAAAAAAAAA')
      await knex
        .select(
          'cd_transaction',
          'ds_transactiontitle',
          'ds_transactiondescription',
          'tp_transactiontype',
          'ds_valuetransaction',
        )
        .from('tbl_dti_transaction')
        .where('tbl_dti_transaction.cd_user', `${req.user.id}`)
        .join(
          'tbl_dti_user',
          'tbl_dti_transaction.cd_user',
          'tbl_dti_user.cd_user',
        )
        .then((e) => {
          console.log(e[0])
          const transactions = e
          return res.status(200).json({ transactions })
        })
        .catch((e) => {
          console.log(e)
        })
    } else {
      return res.status(404).json({ message: 'parâmetros não encontrados' })
    }
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: 'error' })
  }
}
