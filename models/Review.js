const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, "Please enter some text"]
  },
  ratings: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 and 10"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  }
});

//Prevent users from sending more than one review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

//Static method to calc avg rating
ReviewSchema.statics.getAverageRating = async function(bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId }
    },
    {
      $group: {
        _id: "$bootcamp",
        averageRating: { $avg: "$ratings" }
      }
    }
  ]);

  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageRating: Math.ceil(obj[0].averageRating / 10) * 10
    });
  } catch (err) {
    console.error(err);
  }
};

//Calculating the average rating on save
ReviewSchema.post("save", function() {
  this.constructor.getAverageRating(this.bootcamp);
});

//Calculating the average rating on delete/remove
ReviewSchema.pre("remove", function() {
  this.constructor.getAverageRating(this.bootcamp);
});

module.exports = mongoose.model("Review", ReviewSchema);
