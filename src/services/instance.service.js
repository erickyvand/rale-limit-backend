class InstanceService {
	static createData(model, data) {
		return model.create(data);
	}

	static findOneByModel(model, property) {
		return model.findOne(property);
	}

	static updateOneByModel(model, property, attribute) {
		return model.updateOne(property, attribute);
	}
}

export default InstanceService;
