"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Network_1 = require("../model/Network");
class NetworkRepo {
    static async create(network) {
        network.createdAt = new Date();
        network.updatedAt = new Date();
        const net = await Network_1.NetworkModel.create(network);
        return net.toObject();
    }
    static remove(id) {
        return Network_1.NetworkModel.findByIdAndRemove(id).lean().exec();
    }
    static find(id) {
        return Network_1.NetworkModel.findById(id).lean().exec();
    }
}
exports.default = NetworkRepo;
//# sourceMappingURL=NetworkRepo.js.map