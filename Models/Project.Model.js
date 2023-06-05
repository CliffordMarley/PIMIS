const Client = require("../Config/Database");
const ValidationHelper = require("../Helpers/Validation.Helper");
module.exports = class {
	constructor() {
		this.client = new Client();
		this.validation = new ValidationHelper();
	}

	CreateProject = async data => {
		return new Promise(async (resolve, reject) => {
			try {
				let conn = await this.client.GetConnetion();
				console.log(data.FileRefNo)
				data.ApplicationDate = this.formatDate(data.ApplicationDate);
				data.DateReviewed = this.formatDate(data.DateReviewed);
				data.DateApproval = this.formatDate(data.DateApproval);
				data.StartDate = this.formatDate(data.StartDate);
				data.ExpectedCompletionDate = this.formatDate(
					data.ExpectedCompletionDate,
				);
				data.CompletionDate = this.formatDate(data.CompletionDate);
				data.LastVisitDate = this.formatDate(data.LastVisitDate);
				data.SubsequentReviewDate = this.formatDate(data.SubsequentReviewDate);
				data.DateClosed = this.formatDate(data.DateClosed);
				data.HandoverDate = this.formatDate(data.HandoverDate);

				const Query = `INSERT INTO Projects(FileRefNo,ApplicantName, ProjectDescription, ProjectType, Beneficiary,ApplicationDate,DateReviewed,ApplicationStatus,FundingSector,District,AmountRequested,ProjectPromoter,ContactAddress,ContactPhone,CoFinancier,ProjectStakeholders, DateApproval, ProjectScope, ActivitiesApproved, FundsApproved, FundsDisbursed, Balance, ProjectDuration, StartDate, ExpectedCompletionDate, CompletionDate, ConsultantName, GovtContactName, GovtContactAddress, GovtContactPhone, CommunityParticipation, LastVisitDate, LastVisitStatus, LastVisitPicture, FurtherInvestigationReason, InvestigationStatus, SubsequentReviewDate, RejectionReason, Notified, DateClosed, SignOffStatus, HandoverDate, TimeRating, CostRating, ScopeRating, Attachment1, Attachment2, Attachment3, Attachment4, Approved, ContractorId, ContractorName) VALUES('${data.FileRefNo}','${data.ApplicantName}','${data.ProjectDescription}','${data.ProjectType}','${data.Beneficiary}','${data.ApplicationDate}','${data.DateReviewed}','1','${data.FundingSector}','${data.District}','${data.AmountRequested}','${data.ProjectPromoter}','${data.ContactAddress}','${data.ContactPhone}','${data.CoFinancier}','${data.ProjectStakeholders}','${data.DateApproved}','${data.ProjectScope}','${data.ActivitiesApproved}','${data.FundsApproved}','${data.FundsDisbursed}','${data.Balance}','${data.ProjectDuration}','${data.StartDate}','${data.ExpectedCompletionDate}','${data.CompletionDate}','${data.ConsultantName}','${data.GovtContactName}','${data.GovtContactAddress}','${data.GovtContactPhone}','${data.CommunityParticipation}','${data.LastVisitDate}','${data.LastVisitStatus}','${data.LastVisitPicture}','${data.FurtherInvestigationReason}','${data.InvestigationStatus}','${data.SubsequentReviewDate}','${data.RejectionReason}','${data.Notified}','${data.DateClosed}','${data.SignOffStatus}','${data.HandoverDate}','${data.TimeRating}','${data.CostRating}','${data.ScopeRating}','${data.Attachment1}','${data.Attachment2}','${data.Attachment3}','${data.Attachment4}','${data.Approved}','${data.ContractorId}','${data.ContractorName}')`;
					console.log(Query)
				await conn.request().query(Query);
				resolve("New Application Registered Successfully!");
			} catch (err) {
				console.log(err);
				reject("DB Exception: Failed to query Projects!");
			}
		});
	};

	GetSocialProjects = async (data = null) => {
		return new Promise(async (resolve, reject) => {
			try {
				let conn = await this.client.GetConnetion();
				//let Query = `SELECT p.*, d.DistrictName FROM ProjectsView p LEFT JOIN Districts d ON p.District = d.ID `;
				let Query = "SELECT * FROM ProjectsView "
				if(data && data != null && data.status != null && data.status != ''){
					Query += "WHERE ApplicationStatusId = "+data.status
				}
				let results = await conn.request().query(Query);
				resolve(results.recordset);
			} catch (err) {
				console.log(err);
				reject("DB Exception: Failed to query Projects!");
			}
		});
	};

	GetOneSocialProjectsByID = async ID => {
		return new Promise(async (resolve, reject) => {
			try {
				let conn = await this.client.GetConnetion();
				const Query = `SELECT *,P.ID AS ProjectID, FORMAT(P.ApplicationDate, 'dd-MM-yyyy') AS DateRequested FROM Projects P LEFT JOIN Districts D ON D.ID = P.District JOIN ProjectStatus PS ON PS.ID = P.Approved LEFT JOIN ProjectSectors PSC ON PSC.ID = P.FundingSector WHERE P.ID = '${ID}'`;
				let results = await conn.request().query(Query);
				//console.log(results)
				if (results.recordsets.length > 0) {
					results = results.recordset[0];
					resolve(results);
				} else {
					reject("Invalid Project ID: Project Not Found!");
				}
			} catch (err) {
				console.log(err);
				reject("DB Exception: Failed to Fetch Project!");
			}
		});
	};

	GetOneSocialProjects = async FileRefNo => {
		return new Promise(async (resolve, reject) => {
			try {
				let conn = await this.client.GetConnetion();
				const Query = `SELECT *,P.ID AS ProjectID, FORMAT(P.ApplicationDate, 'dd-MM-yyyy') AS DateRequested FROM Projects P LEFT JOIN Districts D ON D.ID = P.District JOIN ProjectStatus PS ON PS.ID = P.Approved LEFT JOIN ProjectSectors PSC ON PSC.ID = P.FundingSector WHERE P.FileRefNo = '${FileRefNo}'`;
				let results = await conn.request().query(Query);
				//console.log(results)
				if (results.recordsets.length > 0) {
					results = results.recordset[0];
					resolve(results);
				} else {
					reject("Invalid File Number: Project Not Found!");
				}
			} catch (err) {
				console.log(err);
				reject("DB Exception: Failed to Fetch Project!");
			}
		});
	};

	UpdateProject = async data => {
		console.log(data);
		return new Promise(async (resolve, reject) => {
			try {
				let conn = await this.client.GetConnetion();

				data.ApplicationDate = this.formatDate(data.ApplicationDate);
				data.DateReviewed = this.formatDate(data.DateReviewed);
				data.DateApproval = this.formatDate(data.DateApproval);
				data.StartDate = this.formatDate(data.StartDate);
				data.ExpectedCompletionDate = this.formatDate(
					data.ExpectedCompletionDate,
				);
				data.CompletionDate = this.formatDate(data.CompletionDate);
				data.LastVisitDate = this.formatDate(data.LastVisitDate);
				data.SubsequentReviewDate = this.formatDate(data.SubsequentReviewDate);
				data.DateClosed = this.formatDate(data.DateClosed);
				data.HandoverDate = this.formatDate(data.HandoverDate);

				console.log(data.DateApproval);

				//Update all fields of Projects table
				const Query = `UPDATE Projects SET ApplicantName = '${data.ApplicantName}', ApplicationDate=${data.ApplicationDate}, ProjectDescription = '${data.ProjectDescription}', ProjectType = '${data.ProjectType}', Beneficiary = '${data.Beneficiary}', FundingSector = '${data.FundingSector}', ContractorName = '${data.ContractorName}', District = '${data.District}', AmountRequested = '${data.AmountRequested}', ProjectPromoter = '${data.ProjectPromoter}', ContactAddress = '${data.ContactAddress}', ContactPhone = '${data.ContactPhone}', CoFinancier = '${data.CoFinancier}', ProjectStakeholders = '${data.ProjectStakeholders}', DateApproval = ${data.DateApproval}, ProjectScope = '${data.ProjectScope}', ActivitiesApproved = '${data.ActivitiesApproved}', FundsApproved = '${data.FundsApproved}', FundsDisbursed = '${data.FundsDisbursed}', Balance = '${data.Balance}', ProjectDuration = '${data.ProjectDuration}', StartDate = ${data.StartDate}, ExpectedCompletionDate = ${data.ExpectedCompletionDate}, CompletionDate =${data.CompletionDate}, ConsultantName = '${data.ConsultantName}', GovtContactName = '${data.GovtContactName}', GovtContactAddress = '${data.GovtContactAddress}', GovtContactPhone = '${data.GovtContactPhone}', CommunityParticipation = '${data.CommunityParticipation}', LastVisitDate = ${data.LastVisitDate}, LastVisitPicture = '${data.LastVisitPicture}', FurtherInvestigationReason = '${data.FurtherInvestigationReason}', InvestigationStatus = '${data.InvestigationStatus}', SubsequentReviewDate = ${data.SubsequentReviewDate}, RejectionReason = '${data.RejectionReason}', Notified = '${data.Notified}', DateClosed = ${data.DateClosed}, SignOffStatus = '${data.SignOffStatus}', HandoverDate=${data.HandoverDate}, FileRefNo='${data.NewFileRefNo}' WHERE FileRefNo = '${data.FileRefNo}'`;

				console.log(Query);

				await conn.request().query(Query);

				resolve("Project updated successfully!");
			} catch (err) {
				console.log(err);
				reject(err);
			}
		});
	};

	AddAttachment = async data => {
		return new Promise(async (resolve, reject) => {
			try {
				let conn = await this.client.GetConnetion();
				const Query = `UPDATE Projects SET ${data.attachement_position} = '${data.fileName}' WHERE FileRefNo = '${data.FileRefNo}'`;
				await conn.request().query(Query);
				resolve("Attachment added successfully!");
			} catch (err) {
				console.log(err);
				reject("DB Exception: Failed to update Project attachements!");
			}
		});
	};

	GetCommercialProjects = async data => {
		return new Promise(async (resolve, reject) => {
			try {
				let conn = await this.client.GetConnetion();
				const Query = `select * from Investments`;
				let results = await conn.request().query(Query);
				resolve(results.recordset);
			} catch (err) {
				console.log(err);
				reject("DB Exception: Failed to query Projects!");
			}
		});
	};

	GetSocialProjectsValue = async () => {
		return new Promise(async (resolve, reject) => {
			try {
				// let Query = "select  convert(DOUBLE PRECISION, round(Sum(AmountRequested)/1000000000,2)) AS projectvalue from projects WHERE Approved = 1";
				let Query = "SELECT convert(DOUBLE PRECISION, round(SUM(FundsApproved)/1000000000,2)) AS projectvalue FROM Projects  WHERE ApplicationStatus IN (3,4)"
				let conn = await this.client.GetConnetion();
				let results = await conn.request().query(Query);
				resolve(results.recordset[0].projectvalue);
			} catch (err) {
				console.log(err);
				reject("DB Exception: Failed to calculate projects value!");
			}
		});
	};

	GetCommercialProjectsValue = () => {
		return new Promise(async (resolve, reject) => {
			try {
				let Query =
					"SELECT convert(DOUBLE PRECISION, round(sum(CurrentValuation)/1000000000,1)) AS commercialProjectsValue from investmentsview";
				let conn = await this.client.GetConnetion();
				let results = await conn.request().query(Query);
				resolve(results.recordset[0].commercialProjectsValue);
			} catch (err) {
				console.log(err);
				reject("DB Exception: Failed to calculate projects value!");
			}
		});
	};

	QueryBuilder = data => {
		let FILTER = "";
		if (this.validation.Isset(data.ApplicationStatus)) {
			FILTER += ` AND ApplicationStatus = ${data.ApplicationStatus} `;
		}
		if (this.validation.Isset(data.Approved)) {
			FILTER += ` AND Approved = ${data.Approved} `;
		}
		return FILTER;
	};

	formatDate = date => {
		console.log("Given Date: %s", date);
		if (
			date == null ||
			date == typeof undefined ||
			date == "" ||
			!date ||
			new Date(date) == "Invalid Date"
		) {
			console.log("Returned date: %s", null);
			return null;
		} else {
			date = new Date(date);
            //Convert to ISO String
            date = date.toISOString();
			console.log("Returned date: %s", date);
			return `'${date}'`;
		}
	};
};
