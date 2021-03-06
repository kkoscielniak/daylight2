var mongoose = require('mongoose')
    autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: { type: String, required: true, unique: true },
    goal: { type: String, required: false },
    status: { type: Number, required: true, min: 0, max: 3, default: 1 },
    percentage: { type: Number, min: 0, max: 100, default: 0 }
});

projectSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

projectSchema.set('toJSON', {
    virtuals: true
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
