class InstanceService {
	static createData(model, data) {
		return model.create(data);
	}

	static findOneByModel(model, property) {
		return model.findOne(property);
	}
}

export default InstanceService;
