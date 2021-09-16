const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where("id", id).first();
};

async function create(account) {
  const [id] = await db("accounts").insert(account);
  const newPost = await getById(id);
  return newPost;
}

const updateById = (id, account) => {
  db("accounts")
    .where(id, "id")
    .update(account)
    .then(() => {
      return getById(id);
    });
};

async function deleteById(id) {
  deletedPost = db("account").where(id, "id");
  deletedPost.delete();
  return deletedPost;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
