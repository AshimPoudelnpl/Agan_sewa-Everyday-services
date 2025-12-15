import db from "../config/db.js";

export const addProvince = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

    if (!name) {
      return res.status(400).json({ message: "Province name is required" });
    }

    const [existingProvince] = await db.query(
      "SELECT province_name from province WHERE province_name = ?",
      [name]
    );

    if (existingProvince.length > 0) {
      return res.status(409).json({ message: "Province already exists" });
    }

    const [result] = await db.query(
      "INSERT INTO province (province_name) VALUES (?)",
      [name]
    );

    return res.status(201).json({
      message: "Province added successfully",
    });
  } catch (error) {}
};
export const getProvince = async (req, res) => {
  try {
    const [result] = await db.query(
      `SELECT 
  p.province_id,
  p.province_name,
  GROUP_concat(d.district_name) as district_name
FROM province p
LEFT JOIN district d 
  ON p.province_id = d.province_id
GROUP BY 
  p.province_id,
  p.province_name;
`
    );
    res.status(201).json({
      message: "Province Added Successfully",
      data: result,
      id: result.insertId,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteProvince = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const [inputtedId] = await db.query(
      "select province_id from province where province_id =?",
      [id]
    );
    console.log();
    if (inputtedId == 0) {
      res.status(404).json({ message: "Province doesnot exists" });
    }
    const [result] = await db.query(
      "DELETE FROM province WHERE province_id = ?",
      [province_id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "provinces not found" });
    }
    res
      .status(200)
      .json({ message: `Province deleted Sucessfully with id  ${id}` });
  } catch (error) {
    console.log(error);
  }
};

//District province
export const addDistrict = async (req, res) => {
  try {
    const { province_id } = req.params;
    const { district_name } = req.body;
    if (!district_name) {
      return res.status(400).json({ message: "District  name are required" });
    }
    const [existingDistrict] = await db.query(
      "SELECT  district_name FROM district WHERE  district_name=?",
      [district_name]
    );
    if (existingDistrict.length > 0) {
      return res.status(409).json({ message: "District already exists" });
    }
    const [existingProvinceId] = await db.query(
      "select province_id from province where province_id=?",
      [province_id]
    );
    if (existingProvinceId.length === 0) {
      res.status(404).json({ message: "Province doesnot exists" });
    }
    const user = existingDistrict[0];

    const [result] = await db.query(
      "INSERT INTO district (district_name,province_id) VALUES (?,?)",
      [district_name, province_id]
    );
    res.status(200).json({
      message: "District Added sucessfully",
      district_name: user.district_name,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getDistrictByProvince = async (req, res) => {
  try {
    const [result] = await db.query("Select * from district");
    res.status(200).json({ message: "District Retrived Sucessfully" });
  } catch (error) {
    console.log(error);
  }
};
export const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const [inputtedId] = await db.query(
      "select district_id from district where district_id =?",
      [id]
    );
    console.log();
    if (inputtedId == 0) {
      res.status(404).json({ message: "District doesnot exists" });
    }
    const [result] = await db.query(
      "DELETE FROM district WHERE district_id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "District not found" });
    }
    res
      .status(200)
      .json({ message: `District deleted Sucessfully with id  ${id}` });
  } catch (error) {
    console.log(error);
  }
};
// Branch Controller
export const addBranch = async (req, res) => {
  try {
    const { branch_name, district_id, remarks } = req.body;
    if (!branch_name) {
      return res.status(400).json({ message: "Branch_name are required" });
    }
    const [existingBraanch] = await db.query(
      "SELECT  branch_name FROM branch WHERE  branch_name=?",
      [branch_name]
    );
    if (existingBraanch.length > 0) {
      return res.status(409).json({ message: "Branch already exists" });
    }
    const [existingDistrictId] = await db.query(
      "select district_id from district where district_id=?",
      [district_id]
    );
    if (existingDistrictId.length === 0) {
      return res.status(404).json({ message: " District doesnot exists" });
    }

    const [result] = await db.query(
      "INSERT INTO branch (branch_name,district_id,remarks) VALUES (?,?,?)",
      [branch_name, district_id, remarks]
    );
    res.status(200).json({
      message: " Branch Added sucessfully",
      branch_name: branch_name,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getBranch = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT 
  b.branch_id,
  b.branch_name,
  b.remarks,
  d.district_name
  from branch b
  left join district d
  on b.district_id=d.district_id

`);
    res.status(200).json({ message: "Branches Retrived Sucessfully", result });
  } catch (error) {
    console.log(error);
  }
};
export const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const [inputtedId] = await db.query(
      "select branch_id from branch where branch_id =?",
      [id]
    );

    if (inputtedId == 0) {
      res.status(404).json({ message: "branch doesnot exists" });
    }
    const [result] = await db.query("DELETE FROM branch WHERE branch_id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Branch not found" });
    }
    res
      .status(200)
      .json({ message: `Branches deleted Sucessfully with id  ${id}` });
  } catch (error) {
    console.log(error);
  }
};
export const editBranch = async (params) => {
  try {
  } catch (error) {}
};
