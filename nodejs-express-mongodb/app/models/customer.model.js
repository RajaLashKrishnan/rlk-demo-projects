module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      customerName: String,
      accountType: String,
      occupation: String,
      balance: String,
      status: String,
      relations: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "relation"
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

  const Customer = mongoose.model("customer", schema);
  return Customer;
};
