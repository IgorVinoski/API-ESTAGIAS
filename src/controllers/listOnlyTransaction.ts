import knex from '../../database/db'

export async function listOnlyTransaction(req, res, next) {
  try {
    const select: any = await knex('tbl_dti_transaction')
      .select('*')
      .where('cd_user', `${req.user.id}`)
      .andWhere('cd_transaction', `${req.params.cdTransaction}`)
    return res.status(200).json(select)
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: e })
  }
}
