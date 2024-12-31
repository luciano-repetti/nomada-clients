import mongoose, { Schema } from 'mongoose';

const CompanySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
    },
    emails: {
        type: [String],
        required: [true, 'Please provide at least one email'],
        validate: {
            validator: (v: string[]) => Array.isArray(v) && v.length > 0,
            message: 'Please provide at least one email'
        }
    },
    phones: {
        type: [String],
        required: [true, 'Please provide at least one phone'],
        validate: {
            validator: (v: string[]) => Array.isArray(v) && v.length > 0,
            message: 'Please provide at least one phone'
        }
    },
    address: {
        type: String,
        required: [true, 'Please provide an address'],
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);