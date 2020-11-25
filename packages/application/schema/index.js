const { gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		listings(city: String): [Listing]
		listing(mlsId: Int!): Listing
	}

	type Listing @key(fields: "mlsId") {
		mlsId: Int
		property: Property
		address: Address
		agent: Agent
		contact: Contact
		school: School
		geo: Geo
		tax: Tax
		photos: [String]
	}
  
    type Property { 
      	roof: String
      	cooling: String
      	style: String
      	area: Int
      	bathsFull: Int
      	bathsHalf: Int
      	stories: Int
      	fireplaces: Int
      	flooring: String
      	heating: String
      	foundation: String
      	poolFeatures: String
      	laundryFeatures: String
      	occupantName: String
      	ownerName: String
      	lotDescription: String
      	lotSizeAcres: Int
      	bedrooms: Int
      	interiorFeatures: String
      	lotSize: String
      	areaSource: String
      	maintenanceExpense: Int
      	additionalRooms: String
      	exteriorFeatures: String
      	water: String
      	view: String
      	lotSizeArea: Int
      	subdivision: String
      	construction: String
      	subTypeRaw: String
        lotSizeAreaUnits: String
        garageSpaces: Int
        bathsThreeQuarter: Int
        accessibility: String
        occupantType: String
        yearBuilt: Int
		rooms: Rooms
		parking: Parking
    }

 	type Rooms {
        rooms: [Room]
    }

    type Parking {
        leased: String
        spaces: Int
        description: String
    }

    type Room {
        length: Int
        features: String
        area: Int
        width: Int
        typeText: String
        type: String
        dimensions: String
        description: String 
    }

	type Address {
		crossStreet: String
		state: String
		country: String
		postalCode: String
		streetName: String
		streetNumberText: String
		city: String
		streetNumber: Int
		full: String
		unit: String
	}

	type Agent {
		lastName: String
		firstName: String
		id: String
		contact: Contact
	}

	type Contact {
        email: String
        office: String
        cell: String
	}

	type School {
		middleSchool: String
		highSchool: String
		elementarySchool: String
		district: String
	}

	type Geo {
		county: String
		lat: Int
		lng: Int
		marketArea: String
		directions: String
	}

	type Tax {
		taxYear: Int
      	taxAnnualAmount: Int
      	id: String
	}
`;

module.exports = typeDefs;