module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nodes: [
        {
          id: String,
          name: String
        }
      ],
      links: [
        {
          source: String,
          target: String,
          relation: String
        }
      ]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const GraphData = mongoose.model("graphdata", schema);
  return GraphData;
};
