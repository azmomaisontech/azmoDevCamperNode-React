const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
const geocoder = require("../utils/geocoder");
const path = require("path");

//@desc      Get all bootcamps
//@route     GET /api/v1/bootcamps
//@access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedQuery);
});

//@desc      Get bootcamp
//@route     GET /api/v1/bootcamps/:id
//@access    Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id).populate("courses");
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with the ID ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: bootcamp });
});

//@desc      Add bootcamp
//@route     POST /api/v1/bootcamps
//@access    Private
exports.addBootcamp = asyncHandler(async (req, res, next) => {
  //Add user to req.body
  req.body.user = req.user.id;

  //check for published bootcamp
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });
  if (publishedBootcamp && req.user.role !== "admin") {
    return next(new ErrorResponse(`Maximum Bootcamp created by User`, 400));
  }

  // Create a bootcamp
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({ success: true, data: bootcamp });
});

//@desc      Update a bootcamp
//@route     PUT /api/v1/bootcamps/:ID
//@access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) return next(new ErrorResponse(`Bootcamp not found with the ID ${req.params.id}`, 404));

  //check if user is the owner of the bootcamp
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`User cannot perform this task`, 401));
  }

  //Update bootcamp
  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  //Send a response.
  res.status(200).json({ success: true, data: bootcamp });
});

//@desc      delete bootcamp
//@route     DELETE /api/v1/bootcamps/:id
//@access    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) return next(new ErrorResponse(`Bootcamp not found with the ID ${req.params.id}`, 404));

  //check if user is the owner of the bootcamp
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`User cannot perform this task`, 401));
  }

  bootcamp.remove();
  res.status(200).json({ success: true });
});

//desc To get Bootcamp by distance
//route  GET /api/v1/bootcamps/radius/:zipcode/:distance
//access Public
exports.getBootcampsByDistance = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const loc = await geocoder.geocode(zipcode);
  const lng = loc[0].longitude;
  const lat = loc[0].latitude;

  //calculate radius
  //divide distance provided by earths radius
  //earth radius =  6,378 km / 3,963 mi
  const radius = distance / 3963;

  //Search the database with the calculated params
  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] }
    }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});

// @Desc Upload file to Database
//Route Put /api/v1/bootcamps/:id/photo
//Access Private
exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) return next(new ErrorResponse(`Bootcamp does not exist with the ID ${req.params.id}`, 404));

  //check if user is the owner of the bootcamp
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`User cannot perform this task`, 401));
  }

  //Check if there is a file
  if (!req.files) return next(new ErrorResponse(`Please upload a file`, 400));

  const file = req.files.file;

  //Check if the file is an image
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  //Check if the file is greater than pre-set file size
  if (file.size > process.env.MAX_FILE_SIZE) {
    return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_SIZE}`, 400));
  }

  // console.log(file);
  //Create custom file name
  file.name = `photo_${bootcamp.id}${path.parse(file.name).ext}`;

  //Save file to Database
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});
