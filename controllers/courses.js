const asyncHandler = require("../middleware/async");

// @desc   Get all courses
// @route  GET /api/v1/courses
// @route GET /api/v1/bootcamps/:bootcampId/courses
// @access   Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!bootcamp) return next(new ErrorResponse(`Bootcamp does not exist with the ID ${req.params.bootcampId}`, 404));
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } else {
    res.status(200).json(res.advancedQuery);
  }
});

// @desc Get a Course
// @route GET /api/v1/courses/:id
// @access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description"
  });
  if (!course) return next(new ErrorResponse(`Course not found with the ID $(req.params.id)`, 404));

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc Add a Course
// @route POST /api/v1/courses
// @route POST /api/v1/bootcamps/:bootcampId/courses
// @access Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) return next(new ErrorResponse(`Bootcamp does not exist with the ID ${req.params.bootcampId}`, 404));

  //check if user is the owner of the bootcamp
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`User cannot perform this task`, 401));
  }

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    data: course
  });
});

// @desc Update a Course
// @route PUT /api/v1/courses/:id
// @access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!course) return next(new ErrorResponse(`Course not found with the ID ${req.params.id}`, 404));

  //check if user is the owner of the bootcamp
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`User cannot perform this task`, 401));
  }

  //Update course
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc Delete a Course
// @route DELETE /api/v1/courses/:id
// @access Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) return next(new ErrorResponse(`Course not found with the ID ${req.params.id}`, 404));

  //check if user is the owner of the bootcamp
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`User cannot perform this task`, 401));
  }

  //Remove course
  await course.remove();

  res.status(200).json({
    success: true
  });
});
