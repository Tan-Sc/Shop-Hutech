const Category = require('../models/categories.model');
const Product = require('../models/products.model');

module.exports.getCategories = async (req, res) => {
    try {
        const feature = new APIfeature(Category.find(), req.query).filtering().sorting().paginating();
        const categories = await feature.query;
        res.json({
            status: "success",
            result: categories.length,
            categories: categories
        });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
module.exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findOne({ name: name.toLowerCase() });
        if (category) return res.status(400).json({ msg: "this category already exists" });
        const newCategory = new Category({ name: name.toLowerCase() });
        await newCategory.save();
        return res.json({ msg: "created a category", newCategory });
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
module.exports.deleteCategory = async (req, res) => {
    try {
        const nameCategory = await Category.findOne({ _id: req.params.id })
        const product = await Product.findOne({ category: nameCategory.name })
        if (product) {
            return res.status(400).json({
                msg: "Please delete all products of this category"
            })
        }
        await Category.findByIdAndDelete(req.params.id);
        return res.json({ msg: "deleted a category" });
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
module.exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
        res.json({ msg: "update a category" });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
class APIfeature {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query
        //console.log({ before: queryObj });//before delete page...use pagination
        const excludeFields = ['page', 'sort', 'limit'];
        excludeFields.forEach(el => delete (queryObj[el]));
        //console.log({ after: queryObj }) //after delete page...
        let queryStr = JSON.stringify(queryObj);
        //console.log({ queryObj, queryStr });
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);
        //gte >=
        //gt >
        //lt < || 
        //lte <=
        //regex = tim kiem
        //console.log({ queryObj, queryStr });
        this.query.find(JSON.parse(queryStr));
        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query.sort('-createdAt');
        }
        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}