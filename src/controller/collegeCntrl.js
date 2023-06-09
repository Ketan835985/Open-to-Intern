const collegeModel = require('../Models/collegeModel');
const validator = require('validator');
const axios = require('axios');



const createClg = async (req, res) => {
    try {
        const { name, fullName, logoLink } = req.body;
        if (!name || name.trim() == '') return res.status(400).json({ status: false, message: 'Name is required' });
        if (!fullName || fullName.trim() == '') return res.status(400).json({ status: false, message: 'Full Name is required' });
        if (!logoLink || logoLink.trim() == '' || !validator.isURL(logoLink)) return res.status(400).json({ status: false, message: 'Logo Link is required' });
        else {
            await axios.get(logoLink)
                .then(async () => {
                    const findCollege = await collegeModel.findOne({ name: name });
                    if (findCollege) return res.status(400).json({ status: false, message: 'College already exists' });
                    const college = (await collegeModel.create(req.body));
                    const selectedData = { name: college.name, fullName: college.fullName, logoLink: college.logoLink, isDeleted: college.isDeleted };
                    res.status(201).json({ status: true, data: selectedData });
                })
                .catch( error => {
                    res.status(404).json({ status: false, message: error.message });
                })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}


module.exports = { createClg }