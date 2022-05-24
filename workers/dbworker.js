const { Worker, parentPort, workerData } = require("worker_threads");
const Agent = require("../models/Agent");
const Users = require("../models/Users");
const UsersAccount = require("../models/UsersAccount");
const PolicyCategory = require("../models/PolicyCategory");
const PolicyCarrier = require("../models/PolicyCarrier");
const PolicyInfo = require("../models/PolicyInfo");
const ObjectId = require("mongoose").Types.ObjectId;
const database = require("../utils/database/connectMongo");
const callParentPort = function (insertedDoc) {
  parentPort.postMessage({
    result: true,
    message: insertedDoc + " Inserted",
  });
};
parentPort.on("message", async (data) => {
  database
    .then(async (res) => {
      try {
        var numberOfDocInserted = 0;
        for (let i = 0; i < data.length; i++) {
          var uniquePolicyId = data[i].policy_number;
          let findPolicyNumber = await PolicyInfo.findOne({
            policy_number: uniquePolicyId,
          });

          if (findPolicyNumber == null) {
            var policy_categoryid;
            var policy_catObj = {
              category_name: data[i].category_name,
            };

            let findPolicyCategory = await PolicyCategory.findOne(
              policy_catObj
            );
            if (findPolicyCategory == null) {
              const policy_category_Doc = new PolicyCategory(policy_catObj);
              const policy_category_doc = await policy_category_Doc.save();
              policy_categoryid = policy_category_doc._id.toString();
            } else {
              policy_categoryid = findPolicyCategory._id.toString();
            }
            //entering policy category
            //entering to policy company
            var policy_companyid;
            var policy_companyObj = {
              company_name: data[i].company_name,
              category_id: ObjectId(policy_categoryid).toString(),
            };
            let findPolicyCarrier = await PolicyCarrier.findOne(
              policy_companyObj
            );

            if (findPolicyCarrier == null) {
              const policy_company_Doc = new PolicyCarrier(policy_companyObj);
              const policy_company_doc = await policy_company_Doc.save();
              policy_companyid = policy_company_doc._id.toString();
            } else {
              policy_companyid = findPolicyCarrier._id.toString();
            }
            //   //entering to agent collection
            var agent_id;
            var agentObj = {
              name: data[i].agent,
            };
            let findAgent = await Agent.findOne(agentObj);

            if (findAgent == null) {
              const agent_Doc = new Agent(agentObj);
              const agent_doc = await agent_Doc.save();
              agent_id = agent_doc._id.toString();
            } else {
              agent_id = findAgent._id.toString();
            }
            //console.log(doc.);
            //   //entering to agent collection
            //entering to user collection
            var userObj = {
              name: data[i].firstname,
              gender: data[i].gender,
              phone: data[i].phone,
              address: data[i].address,
              state: data[i].state,
              city: data[i].city,
              email: data[i].email,
              zip: data[i].zip,
              dob: data[i].dob,
              userType: data[i].userType,
              agentId: agent_id,
            };
            const users_Doc = new Users(userObj);
            const users_doc = await users_Doc.save();

            //entering to user collection
            //entering into users account
            var userAccId;
            var userAccObj = {
              account_name: data[i].account_name,
            };

            let findUserAccount = await UsersAccount.findOne(userAccObj);
            if (findUserAccount == null) {
              userAccObj.userids = [users_doc._id];
              const userAcc_Doc = new UsersAccount(userAccObj);
              const userAcc_doc = await userAcc_Doc.save();
              userAccId = userAcc_doc._id.toString();
            } else {
              var userAccArr = findUserAccount.userids;
              userAccArr = [...userAccArr, users_doc._id];

              let updated = await UsersAccount.findOneAndUpdate(
                {
                  $and: [
                    { account_name: data[i].account_name },
                    { $nin: [users_doc._id] },
                  ],
                },
                { $set: { userids: userAccArr } },
                {
                  new: true,
                }
              );

              userAccId = findAgent._id.toString();
            }
            //entering into users account
            // entering into policy info

            var policyInfoObj = {
              policy_number: data[i].policy_number,
              premium_amount: data[i].premium_amount,
              policy_type: data[i].policy_type,
              policy_startdate: data[i].policy_start_date,
              policy_enddate: data[i].policy_end_date,
              policy_categry: policy_categoryid,
              userid: users_doc._id.toString(),
              policy_company: policy_companyid,
              username: users_Doc.name,
            };
            const policyInfo_Doc = new PolicyInfo(policyInfoObj);
            const policyInfo_doc = await policyInfo_Doc.save();

            i == data.length - 1
              ? callParentPort(numberOfDocInserted)
              : numberOfDocInserted++;
          } else {
            i == data.length - 1 ? callParentPort(numberOfDocInserted) : null;
          }
        }
      } catch (error) {
        console.log(error);
        parentPort.postMessage({
          result: false,
          message: "error in database",
        });
      }
    })
    .catch((err) => err);
});
