const db = require('./db.json'); // Assuming db.json is in the same directory

module.exports = (req, res, next) => {
	if (req.method === 'POST') {
		// For new entries (POST requests), set createdBy, createdTimestamp, and updatedTimestamp
		req.body.createdBy = req.body.userId;
		req.body.createdTimestamp = new Date().toISOString();
		req.body.updatedTimestamp = req.body.createdTimestamp;
		delete req.body.userId;
	} else if (req.method === 'PUT') {
		// For updates (PUT requests), maintain the existing createdBy and createdTimestamp values
		const objectType = req.path.split('/')[1];
		console.log(objectType); // Extract object type from request path
		const objectId = req.path.split('/')[2];
		const existingEntry = db[objectType].find(
			entry => entry.id === objectId
		);

		req.body.createdBy = existingEntry.createdBy;
		req.body.createdTimestamp = existingEntry.createdTimestamp;
		req.body.updatedBy = req.body.userId;
		req.body.updatedTimestamp = new Date().toISOString();
		delete req.body.userId;
	}
	next();
};
