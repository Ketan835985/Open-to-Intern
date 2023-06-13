const internModel = require('../Models/internModel');
const collegeModel = require('../Models/collegeModel');
const validator = require('validator');
const createIntern = async (req, res) => {
    try {
        const { name, email, mobile, collegeName } = req.body;
        if (!name) res.status(400).json({ status: false, message: 'Name is required' });
        if (!email) res.status(400).json({ status: false, message: 'Email is required' });
        if (!mobile) res.status(400).json({ status: false, message: 'Mobile is required' });
        if (!collegeName) res.status(400).json({ status: false, message: 'College is required' });
        if (!validator.isEmail(email)) res.status(400).json({ status: false, message: 'Email is invalid' });
        if (!validator.isMobilePhone(mobile)) res.status(400).json({ status: false, message: 'Mobile is invalid' });
        else {
            const findCollege = await collegeModel.findOne({ name: collegeName });
            if (!findCollege) res.status(404).json({ status: false, message: 'College not found' });
            else {
                const findIntern = await internModel.findOne({ email: email });
                if (findIntern) {
                    return res.status(400).json({ status: false, message: 'Intern already exists' });
                }
                else {
                    const findInternMobile = await internModel.findOne({ mobile: mobile });
                    if (findInternMobile) return res.status(400).json({ status: false, message: 'Intern already exists' });
                    else {
                        const internData = {
                            name: name,
                            email: email,
                            mobile: mobile,
                            collegeId: findCollege._id
                        }
                        const intern = await internModel.create(internData)
                        const selectedData = { name: intern.name, email: intern.email, mobile: intern.mobile, collegeId: intern.collegeId, isDeleted: intern.isDeleted };
                        res.status(201).json({ status: true, data: selectedData });
                    }
                }
            }
        }
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
}


const getIntern = async (req, res) => {
    try {
        const collegeName = req.query.collegeName
        if (!collegeName) return res.status(404).json({ status: false, message: 'College Name is required' });
        else {
            const college = await collegeModel.findOne({ name: collegeName });
            if (!college) return res.status(404).json({ status: false, message: 'College not found' });
            else {
                const intern = await internModel.find({ collegeId: college._id, isDeleted: false });
                const details = {
                    name: college.name,
                    fullName: college.fullName,
                    logoLink: college.logoLink,
                    interns: intern
                }
                res.status(200).json({ status: true, data: details });
            }
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}


module.exports = { createIntern, getIntern }    