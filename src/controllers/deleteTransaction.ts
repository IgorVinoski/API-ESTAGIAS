import knex from '../../database/db'
export async function deleteTransaction(req, res, next) {
  try {
    const select: any = await knex('tbl_dti_transaction')
      .select('cd_transaction')
      .where('cd_transaction', `${req.body.cd_transaction}`)
    if (select[0]) {
      await knex('tbl_dti_transaction')
        .delete('*')
        .where('cd_transaction', `${req.body.cd_transaction}`)
      return res.status(200).json({ message: 'transação deletada' })
    } else {
      return res
        .status(404)
        .json({ message: 'esse codigo de transação não existe' })
    }
  } catch (e) {
    console.log(e)
    return res.status(401).json({ message: 'error' })
  }
}
