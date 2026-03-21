const LegacyCourse = require("../models/legacyCourse");
const Blog = require("../models/blog");
const University = require("../models/university");

const normalizePrimitive = (value) => {
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (value === "null") {
    return null;
  }
  return value;
};

const normalizePayload = (value) => {
  if (Array.isArray(value)) {
    return value.map(normalizePayload);
  }

  if (value && typeof value === "object") {
    return Object.entries(value).reduce((acc, [key, val]) => {
      // Legacy form occasionally sends an empty-string key that should be ignored.
      if (key === "") {
        return acc;
      }
      acc[key] = normalizePayload(val);
      return acc;
    }, {});
  }

  return normalizePrimitive(value);
};

const normalizeLegacyCourseInput = (data) => {
  const payload = normalizePayload(data);

  // Legacy client can send discipline as an object instead of an array.
  if (payload.discipline && !Array.isArray(payload.discipline)) {
    payload.discipline = [payload.discipline];
  }

  return payload;
};

const mapUniversityToLegacyShape = (university) => ({
  ...university,
  name: university.fullName || "",
  uniPic: university.logo || "",
  level: university.status || "",
  uniType: university.universityType || "",
});

const mapLegacyUniversityInput = (data) => ({
  fullName: data.name,
  logo: data.uniPic,
  state: data.state,
  city: data.city,
  status: data.level,
  description: data.remarks,
  universityType: data.uniType,
});

const legacyController = {
  createCourse: async (req, res) => {
    try {
      const coursePayload = normalizeLegacyCourseInput(req.body);
      const course = await LegacyCourse.create(coursePayload);
      return res.status(201).json({ message: "Course created", course });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getAllCourseByUniversityId: async (req, res) => {
    try {
      const courses = await LegacyCourse.find({ university: req.params.id }).sort({
        createdAt: -1,
      });
      return res.status(200).json({ courses });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getCourseById: async (req, res) => {
    try {
      const course = await LegacyCourse.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      return res.status(200).json({ course });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateCourse: async (req, res) => {
    try {
      const coursePayload = normalizeLegacyCourseInput(req.body);
      const course = await LegacyCourse.findByIdAndUpdate(
        req.params.id,
        coursePayload,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      return res.status(200).json({ message: "Course updated", course });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteUnivesity: async (req, res) => {
    try {
      const course = await LegacyCourse.findByIdAndDelete(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      return res.status(200).json({ message: "Course deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  blogById: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      return res.status(200).json({ blog });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateBlog: async (req, res) => {
    try {
      const blogPayload = {
        ...req.body,
      };

      if (req.body.writerName && !req.body.author) {
        blogPayload.author = req.body.writerName;
      }
      if (req.body.profilePic && !req.body.blogPic) {
        blogPayload.blogPic = req.body.profilePic;
      }

      const blog = await Blog.findByIdAndUpdate(req.params.id, blogPayload, {
        new: true,
      });
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      return res.status(200).json({ message: "Blog updated", blog });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  uniById: async (req, res) => {
    try {
      const uniDoc = await University.findById(req.params.id).lean();
      if (!uniDoc) {
        return res.status(404).json({ message: "University not found" });
      }
      return res.status(200).json({ uni: mapUniversityToLegacyShape(uniDoc) });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateUniversity: async (req, res) => {
    try {
      const uni = await University.findByIdAndUpdate(
        req.params.id,
        mapLegacyUniversityInput(req.body),
        { new: true }
      ).lean();
      if (!uni) {
        return res.status(404).json({ message: "University not found" });
      }
      return res.status(200).json({ message: "University updated", uni });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = legacyController;
