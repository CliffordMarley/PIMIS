//const BusariesModel = require("../Models/Busary.Model");

const validatePage = async (req, res, next) => {
	try {
		console.log(!req.session);
		if (
			!req.session.userdata ||
			req.session.userdata.Username == null ||
			req.session.Username == "" ||
			req.session.Username == typeof undefined
		) {
			res.redirect("/login");
		} else {
			next();
		}
	} catch (e) {
		res.redirect("/login");
	}
};

const validateJSON = (req, res, next) => {
	try {
		if (
			!req.session.userdata ||
			req.session.userdata.Username == null ||
			req.session.Username == "" ||
			req.session.Username == typeof undefined
		) {
			res.status(401).json({
				status: "error",
				code: 401,
				message: "Session is expired or was not initiated!",
			});
		} else {
			next();
		}
	} catch (e) {
		res.status(401).json({
			status: "error",
			code: 401,
			message: "Session is expired or was not initiated!",
		});
	}
};

async function CountBadges() {
	let badges = {
		rejectedBursaries: 0,
		rejectedInvestments: 0,
	};
	try {
		badges.rejectedBursaries = await BusariesModel.GetBusariesList(null, 2);
	} catch (err) {
		console.log(err);
	} finally {
		return badges;
	}
}
module.exports = { validatePage, validateJSON };
