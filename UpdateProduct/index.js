const createMongoClient = require('../shared/mongoClient');
const { ObjectID } = require('mongodb');

module.exports = async function (context, req) {
  const product = req.body;
  const { id } = req.params;

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const Products = MongoClient.collection('products');
  const res = await Products.findOneAndUpdate(
    { _id: ObjectID(id) },
    { $set: product }
  );

  closeConnectionFn();
  context.res = {
    status: 200,
    body: res,
  };
};
