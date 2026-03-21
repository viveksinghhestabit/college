const mongoose = require("mongoose");

const scoreDetailsSchema = new mongoose.Schema(
  {
    total: String,
    minReading: String,
    minWriting: String,
    minSpeaking: String,
    minListening: String,
    minLiteracy: String,
    minComprehension: String,
    minConversation: String,
    minProduction: String,
    toeflAccepted: Boolean,
    ieltsAccepted: Boolean,
    duoLingoAccepted: Boolean,
  },
  { _id: false }
);

const deadlineSchema = new mongoose.Schema(
  {
    priority: String,
    final: String,
  },
  { _id: false }
);

const contactSchema = new mongoose.Schema(
  {
    address: String,
    number: String,
    email: String,
  },
  { _id: false }
);

const disciplineSchema = new mongoose.Schema(
  {
    name: String,
  },
  { _id: false }
);

const legacyCourseSchema = new mongoose.Schema(
  {
    university: {
      type: String,
      required: true,
    },
    name: String,
    discipline: [disciplineSchema],
    applicationFees: String,
    programFees: String,
    programLength: String,
    transcriptRequired: {
      type: Boolean,
      default: false,
    },
    financialDocuRequired: {
      type: Boolean,
      default: false,
    },
    thirdPartyRequired: {
      type: Boolean,
      default: false,
    },
    minGpaRequired: String,
    gre: {
      greRequired: String,
      greWaiver: String,
      minVerbal: String,
      minQuant: String,
      minAWA: String,
      minTotal: String,
    },
    toefl: scoreDetailsSchema,
    ielts: scoreDetailsSchema,
    duolingo: scoreDetailsSchema,
    pte: {
      pteAccepted: {
        type: Boolean,
        default: false,
      },
      minScore: String,
    },
    fallDeadline: deadlineSchema,
    springDeadline: deadlineSchema,
    summerDeadline: deadlineSchema,
    nonITAccepted: {
      type: Boolean,
      default: false,
    },
    preWaiverForNonIT: {
      type: Boolean,
      default: false,
    },
    last60UnitsConsidered: {
      type: Boolean,
      default: false,
    },
    programDetails: String,
    departmentDetails: contactSchema,
    activeStatus: {
      type: Boolean,
      default: false,
    },
    admissionOffice: contactSchema,
    courseUrl: String,
    remarks: String,
    loanAssist: {
      type: Boolean,
      default: false,
    },
    jobAssist: {
      type: Boolean,
      default: false,
    },
    private: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    public: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const LegacyCourse = mongoose.model("LegacyCourse", legacyCourseSchema);

module.exports = LegacyCourse;
