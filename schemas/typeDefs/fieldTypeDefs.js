const fieldTypeDefs = `
    type Field {
        id: ID!
        field: String!
        userId: String!
        updateTime: String!
        soilType: String!
        geoLocation: GeoLocation!
        cityOrTown: String!
        crops: [String]
    }

    type GeoLocation {
        topLeftX: Float!
        topLeftY: Float!
        BottomRightX: Float!
        BottomRightY: Float!
    }

    extend type Query {
        getFields: [Field]
        getField(id: ID!): Field
        getFieldsByUserId(userId: String!): [Field]
    }

    extend type Mutation {
        addField(
            field: String!,
            userId: String!,
            updateTime: String!,
            soilType: String!,
            geoLocation: GeoLocationInput!,
            cityOrTown: String!,
            crops: [String]
        ): Field
    }

    input GeoLocationInput {
        topLeftX: Float!
        topLeftY: Float!
        BottomRightX: Float!
        BottomRightY: Float!
    }
`;

module.exports = fieldTypeDefs;
