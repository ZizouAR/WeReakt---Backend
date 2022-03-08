"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = require("../model/Job");
const DepartementRepo_1 = __importDefault(require("./DepartementRepo"));
class JobRepo {
    static async create(job) {
        const job_ = await Job_1.JobModel.create(job);
        return job_.toObject();
    }
    static remove(id) {
        return Job_1.JobModel.findByIdAndRemove(id).lean().exec();
    }
    static findByDepartement(departement) {
        return Job_1.JobModel.find(departement).lean().exec();
    }
    static findById(job) {
        return Job_1.JobModel.findById(job).lean().exec();
    }
    static async findByNetwork(network) {
        const departements = await DepartementRepo_1.default.findByNetwork(network);
        /* '_id': { $in: [
              mongoose.Types.ObjectId('4ed3ede8844f0f351100000c'),
              mongoose.Types.ObjectId('4ed3f117a844e0471100000d'),
              mongoose.Types.ObjectId('4ed3f18132f50c491100000e')
        ] */
        return Job_1.JobModel.find({
            'departement': { $in: departements }
        }).lean().exec();
    }
}
exports.default = JobRepo;
//# sourceMappingURL=JobRepo.js.map