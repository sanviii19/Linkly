import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const ShortUrlSchema = new Schema(
    {
        full_url: {
            type: String,
            required: true,
        },
        short_url: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        clicks: {
            type: Number,
            required: true,
            default: 0,
        },
        qrCode: {
            type: String // base64 image
        },
        qrGenerated: {
            type: Boolean,
            default: false
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const ShortUrlModel = model('ShortUrl', ShortUrlSchema);

export default ShortUrlModel;