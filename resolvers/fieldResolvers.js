const Field  = require('../models/Field');

const fieldResolvers = {
    Query: {
        getFields: async () => {
            return Field.find();
        },
        getField: async (_, { id }) => {
            return Field.findById(id);
        },
        getFieldsByUserId: async (_, { userId }) => {
            return Field.find({userId});
        }
    },

    Mutation: {
        addField: async (_, args) => {
            const newField = new Field({
                ...args,
                updateTime: new Date()
            });
            try {
                const savedField = await newField.save();
                return savedField;
            } catch (error) {
                console.error("Error saving field:", error);
                throw new Error("Error saving the field to the database");
            }
        }
    }
};

module.exports = fieldResolvers;
