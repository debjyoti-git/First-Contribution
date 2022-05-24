const Agent = require("../models/Agent");
const Users = require("../models/Users");
const UsersAccount = require("../models/UsersAccount");
const PolicyCategory = require("../models/PolicyCategory");
const PolicyCarrier = require("../models/PolicyCarrier");
const PolicyInfo = require("../models/PolicyInfo");
const ObjectId = require("mongoose").Types.ObjectId;

exports.userData = async (req, res) => {
  const { username: name } = req.body;
  const findUser = await UsersAccount.aggregate([
    {
      $match: {
        account_name: { $regex: ".*" + name + ".*" },
      },
    },
    {
      $unwind: "$userids",
    },
    { $project: { _id: 0, account_name: 1, userids: 1 } },
    {
      $lookup: {
        from: "users",
        let: {
          userid: "$userids",
        },
        as: "user_details",
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$userid"] } } },
          {
            $lookup: {
              from: "agents",
              let: {
                agentid: "$agentId",
              },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$agentid"] } } },
                { $project: { _id: 0, name: 1 } },
              ],
              as: "agent_name",
            },
          },
          { $unwind: "$agent_name" },
        ],
      },
    },
    {
      $unwind: "$user_details",
    },
    {
      $lookup: {
        from: "policy_info",
        let: {
          user_id: "$userids",
        },
        pipeline: [
          { $match: { $expr: { $eq: ["$userid", "$$user_id"] } } },
          {
            $lookup: {
              from: "policy_carrier",
              as: "company_details",
              let: {
                carrierId: "$policy_company",
              },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$carrierId"] } } },
                { $project: { company_name: 1, category_id: 1 } },
                {
                  $lookup: {
                    from: "policy_category",
                    as: "category_details",
                    let: {
                      categoryId: "$category_id",
                    },
                    pipeline: [
                      {
                        $match: {
                          $expr: { $eq: ["$_id", "$$categoryId"] },
                        },
                      },
                    ],
                  },
                },
                {
                  $unwind: {
                    path: "$category_details",
                    preserveNullAndEmptyArrays: true,
                  },
                },
              ],
            },
          },

          {
            $unwind: {
              path: "$company_details",
            },
          },
        ],
        as: "policy_details",
      },
    },
    {
      $unwind: {
        path: "$policy_details",
      },
    },
  ]);
  res.json(findUser);
  //console.log(JSON.stringify(findUser));
  //console.log(JSON.stringify(findUser.policy_details.company_details));
};
