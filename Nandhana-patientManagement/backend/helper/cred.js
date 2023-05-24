exports.findOneData = async (model, filter) => {
  let data = await model.findOne({ where: filter });
  return data;
};

exports.getAllData = async (model, pages, offsets) => {
  let page = parseInt(pages) || 1;
  let offset = parseInt(offsets) || 10;
  let skip = (page - 1) * offset;

  const data = await model.findAll({
    // limit: offset,
    // offset: skip,
  });
  return data;
};

exports.readAllPopulate = async (model, filters, references) => {
  const data = await model.find(filters).populate(references);
  return data;
};

exports.postData = async (model, data) => {
  await model.create(data);
  return true;
};
exports.postDatas = async (model, data) => {
  const value = await model.create(data);
  return value;
};

exports.updateData = async (model, id, data) => {
  console.log(model, id, data);
  // console.log(data);
  await model.update(data, { where: { id } });
  return true;
};

exports.removeData = async (model, id) => {
  await model.destroy({ where: { id }, returning: true });
  return true;
};
