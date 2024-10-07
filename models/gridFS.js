// /src/models/gridFS.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 连接到 MongoDB
const conn = mongoose.createConnection(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 初始化 GridFSBucket
let gfs;
let gridFSBucket;

conn.once('open', () => {
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
    gfs = conn.db.collection('uploads.files'); // 获取文件集合
});

module.exports = { conn, gfs, gridFSBucket };
