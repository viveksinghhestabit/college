const { College, Table, Course } = require("../models/college");
const University = require("../models/university");
const { isValidObjectId, Types } = require("mongoose");
const { slugify } = require("../utils/helper");

const collegeController = {
  getAllColleges: async (req, res) => {
    try {
      const colleges = await College.find();
      res.status(200).json({ data: colleges, message: "All colleges" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getCollegesWithFilter: async (req, res, next) => {
    const collegePerPage = 15;
    const { page, state, city, collegeType, fullName } = req.body;
    const skip = (page - 1) * collegePerPage;

    try {
      const query = {};
      if (!!state) {
        query.state = state;
      }
      if (!!city) {
        query.city = city;
      }
      if (fullName) {
        query.fullName = { $regex: new RegExp(fullName, "i") };
      }
      if (collegeType) {
        query.collegeType = collegeType;
      }

      const colleges = await College.find(query)
        .skip(skip)
        .limit(collegePerPage)
        .exec();

      const allCollegeWithFilter = await College.find(query);

      const totalItems = allCollegeWithFilter.length;

      return res.status(200).json({
        data: colleges,
        currentPage: page,
        totalPages: Math.ceil(totalItems / collegePerPage),
        totalCount: totalItems,
        message: "All colleges with filtered",
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getCollegeById: async (req, res) => {
    // Implement logic to get a user by ID
    const slug = req.params.id || undefined;
    try {
      const collegeData = await College.findOne({
        $or: [{ _id: isValidObjectId(slug) ? slug : undefined }, { slug }],
      });
      return res
        .status(200)
        .json({ data: collegeData, message: "College by id" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  createCollege: async (req, res) => {
    // Implement logic to create a new user
    try {
      const {
        fullName,
        logo,
        coverpic,
        description,
        gallery,
        reviews,
        state,
        city,
        pincode,
        website,
        phone,
        address,
        status,
        yearOfEstabilish,
        university,
        collegeType,
      } = req.body;
      const slug = slugify(fullName);
      const collegeObj = new College({
        fullName,
        logo,
        coverpic,
        description,
        gallery,
        reviews,
        state,
        city,
        pincode,
        website,
        phone,
        address,
        status,
        yearOfEstabilish,
        collegeType,
        slug,
      });

      if (!!university) {
        const universityObj = await University.findOne({ _id: university });
        universityObj.colleges.push(collegeObj._id);
        await universityObj.save();
      }
      await collegeObj.save();
      return res.status(200).json({ message: "College added successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateCollege: async (req, res) => {
    // Implement logic to update a user
    try {
      const collegeData = await College.findByIdAndUpdate(req.params.id, {
        ...req.body,
        slug: slugify(req.body.fullName),
      });
      return res.status(200).json({ message: "College updated" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteCollege: async (req, res) => {
    // Implement logic to delete a user
    try {
      await College.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "College deleted" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  addDynamicTable: async (req, res, next) => {
    try {
      const {
        tableName,
        description,
        noOfColumns,
        noOfRows,
        columns,
        rows,
        collegeid,
      } = req.body;

      const tableObj = new Table({
        tableName,
        description,
        noOfColumns,
        noOfRows,
        columns,
        rows,
        collegeid,
      });
      const collegeObj = await College.findOne({ _id: collegeid });
      collegeObj.tables.push(tableObj);
      await collegeObj.save();
      await tableObj.save();
      return res.status(200).json({ message: "table Added " });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },
  getDyanmicTables: async (req, res, next) => {
    try {
      const data = await Table.find();
      return res.status(200).json({ message: "tables found ", data });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },
  getDynamicTableById: async (req, res, next) => {
    try {
      const tablearr = await Table.findById(req.params.id);
      return res.status(200).json({ message: "Dynamic Table", data: tablearr });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },
  deleteDynamicTable: async (req, res, next) => {
    try {
      const { collegeId, tableId, index } = req.body;
      const collegeObj = await College.findOne({ _id: collegeId });
      const newTableData = collegeObj.tables.filter((item, i) => i !== index);
      collegeObj.tables = newTableData;
      await collegeObj.save();
      await Table.findByIdAndRemove({ _id: tableId });
      return res.status(200).json({ message: "Table Deleted" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },
  updateDynamicTable: async (req, res, next) => {
    try {
      const collegeId = req.params.collegeId;
      const tableId = req.params.tableId;

      const CollegeObj = await College.findById({ _id: collegeId });
      if (!CollegeObj) {
        return res.status(404).json({ message: "College not found" });
      }

      const tableIndex = CollegeObj.tables.findIndex(
        (table) => table._id == tableId
      );

      if (tableIndex === -1) {
        return res.status(404).json({ message: "Table not found" });
      }

      CollegeObj.tables[tableIndex] = req.body;
      // console.log(CollegeObj)
      await CollegeObj.save();
      await Table.findByIdAndUpdate({ _id: tableId }, req.body);
      return res.status(200).json({ message: "Table Updated" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },
  getTableByCollegeId: async (req, res, next) => {
    try {
      const { collegeId } = req.body;
      const tablearr = await Table.find({ college: collegeId });
      return res.status(200).json({ message: "Dynamic Table", data: tablearr });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },

  //courses
  addCourse: async (req, res, next) => {
    try {
      const { collegeid, name, fee, specialization } = req.body;
      const courseObj = new Course({
        fee,
        name,
        specialization,
      });
      const collegeObj = await College.findOne({ _id: collegeid });
      collegeObj.courses.push(courseObj);
      await collegeObj.save();
      await courseObj.save();
      return res.status(200).json({ message: "Courses added" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },
  getCoursesByCollege: async (req, res, next) => {
    try {
      const courseObj = await College.findById(req.params.id).populate(
        "courses"
      );
      return res.status(200).json({ message: "Courses", data: courseObj });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },
  deleteCourse: async (req, res, next) => {
    try {
      const { collegeid, courseid, index } = req.body;
      const collegeObj = await College.findOne({ _id: collegeid });
      const newCourses = collegeObj.courses.filter((item, i) => i !== index);
      collegeObj.courses = newCourses;
      await collegeObj.save();
      await Course.findByIdAndRemove({ _id: courseid });
      return res.status(200).json({ message: "Course Deleted" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },
};

module.exports = collegeController;
