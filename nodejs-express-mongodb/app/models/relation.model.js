module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      source: String,
      target: String,
      targetName: String,
      relation: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Relation = mongoose.model("relation", schema);
  return Relation;
};
