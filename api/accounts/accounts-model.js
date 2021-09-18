const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where("id", id).first();
};

const create = async (account) => {
  const [id] = await db("accounts").insert(account);
  console.log(id)
  return getById(id);
};

const updateById = (id, account) => {
  db("accounts")
    .where(id, "id")
    .update(account)
    .then(() => {
      return getById(id);
    });
};

const deleteById = async (id) => {
  deletedPost = await db("account").where(id, "id");
  await deletedPost.delete();
  return deletedPost;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
