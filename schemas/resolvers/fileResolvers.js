// /src/resolvers/fileResolvers.js
const { GraphQLUpload } = require('graphql-upload');
const { gridFSBucket, gfs, conn } = require('../../models/gridFS');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');
const stream = require('stream');

// 定义文件相关的 resolver
const fileResolvers = {
    Upload: GraphQLUpload,

    Query: {
        // 获取单个文件信息
        getFile: async (_, { id }) => {
            try {
                const file = await gfs.findOne({ _id: ObjectId(id) });
                if (!file) {
                    throw new Error('File not found');
                }
                return {
                    id: file._id,
                    filename: file.filename,
                    mimetype: file.contentType,
                    encoding: '7bit',
                    url: `/files/${file._id}`, // 文件下载的 URL 地址
                    createdAt: file.uploadDate,
                    updatedAt: file.uploadDate,
                };
            } catch (error) {
                throw new Error('Error retrieving file: ' + error.message);
            }
        },

        // 获取所有文件信息
        getFiles: async () => {
            try {
                const files = await gfs.find().toArray();
                return files.map(file => ({
                    id: file._id,
                    filename: file.filename,
                    mimetype: file.contentType,

                    encoding: '7bit',
                    url: `/files/${file._id}`, // 文件下载的 URL 地址
                    createdAt: file.uploadDate,
                    updatedAt: file.uploadDate,
                }));
            } catch (error) {
                throw new Error('Error retrieving files: ' + error.message);
            }
        },
    },

    Mutation: {
        // 上传文件到 GridFS
        uploadFile: async (_, { file }) => {
            const { createReadStream, filename, mimetype, encoding } = await file;

            return new Promise((resolve, reject) => {
                // 创建 GridFS 文件上传流
                const uploadStream = gridFSBucket.openUploadStream(filename, {
                    contentType: mimetype,
                });

                // 将文件流写入 GridFS
                createReadStream()
                    .pipe(uploadStream)
                    .on('error', (error) => reject('Error uploading file: ' + error.message))
                    .on('finish', () => {
                        resolve({
                            id: uploadStream.id,
                            filename,
                            mimetype,
                            encoding,
                            url: `/files/${uploadStream.id}`,
                            createdAt: uploadStream.uploadDate,
                            updatedAt: uploadStream.uploadDate,
                        });
                    });
            });
        },

        // 更新文件信息（不支持更新文件内容，仅更新元数据）
        updateFile: async (_, { file }) => {
            const { id, filename, mimetype, encoding } = file;
            const fileId = ObjectId(id);

            // 更新文件的元数据信息
            try {
                const result = await gfs.updateOne(
                    { _id: fileId },
                    {
                        $set: {
                            filename: filename || undefined,
                            contentType: mimetype || undefined,
                        },
                    }
                );

                if (result.modifiedCount === 0) {
                    throw new Error('File not found or no changes made');
                }

                // 返回更新后的文件信息
                const updatedFile = await gfs.findOne({ _id: fileId });
                return {
                    id: updatedFile._id,
                    filename: updatedFile.filename,
                    mimetype: updatedFile.contentType,
                    encoding: encoding || '7bit',
                    url: `/files/${updatedFile._id}`,
                    createdAt: updatedFile.uploadDate,
                    updatedAt: new Date().toISOString(),
                };
            } catch (error) {
                throw new Error('Error updating file: ' + error.message);
            }
        },

        // 删除文件
        deleteFile: async (_, { id }) => {
            const fileId = ObjectId(id);

            try {
                // 从 GridFS 中删除文件
                await gridFSBucket.delete(fileId);
                return `File with id ${id} deleted successfully.`;
            } catch (error) {
                throw new Error('Error deleting file: ' + error.message);
            }
        },
    },
};

module.exports = fileResolvers;
