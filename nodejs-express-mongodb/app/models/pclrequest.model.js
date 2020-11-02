module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      requestType: String,
      targetEntityType: String,
      targetEntityId: String,
      changeAttribute: String,
      changeValue: String,
      status: String,
      message: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Pclrequest = mongoose.model("pclrequest", schema);
  return Pclrequest;
};
