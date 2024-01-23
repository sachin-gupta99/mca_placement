const Company = require('../models/Company');
const logger = require('../utils/logger');

// Add Company
exports.postAddCompany = async (req, res) => {
	try {
		const newCompany = new Company(req.body);
		const savedCompany = await newCompany.save();
		logger.info(`New company added: ${savedCompany.name}`);
		res.status(200).json(savedCompany);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// Update Company
exports.putUpdateCompany = async (req, res) => {
	try {
		const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!updatedCompany) {
			return res.status(404).json({ message: 'Company not found' });
		}
		logger.info(`Company updated: ${updatedCompany.name}`);
		res.status(200).json(updatedCompany);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// Delete Company
exports.deleteCompany = async (req, res) => {
	try {
		const deletedCompany = await Company.findByIdAndDelete(req.params.id);
		if (!deletedCompany) {
			return res.status(404).json({ message: 'Company not found' });
		}
		logger.info(`Company deleted: ${deletedCompany.name}`);
		res.json(deletedCompany);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// View Company by ID
exports.getViewCompanyById = async (req, res) => {
	try {
		const company = await Company.findById(req.params.id);
		if (!company) {
			return res.status(404).json({ message: 'Company not found' });
		}
		logger.info(`Company viewed: ${company.name}`);
		res.json(company);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// View All Companies
exports.getViewCompany = async (req, res) => {
	try {
		const companies = await Company.find();
		logger.info('All companies viewed');
		res.json(companies);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
