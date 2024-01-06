const Category = require("./../models/categoriesModel");

//ROUTES
//1. Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "success",
      results: categories.length,
      data: {
        categories,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error getting categories",
    });
  }
};

//2. Get category by Id
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
      status: "success",
      results: category.length,
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

//3. Create a new category
exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        categories: newCategory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error creating category",
    });
  }
};

//4. Update existing category
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: { category },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error updating category",
    });
  }
};

//5. Delete existing category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: { category },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error deleting category",
    });
  }
};
