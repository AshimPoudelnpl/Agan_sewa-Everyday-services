import db from "../config/db.js";
import { removeImages } from "../utils/removeImg.js";

export const addInquiry = async (req, res, next) => {
  try {
    const { name, phone, email, address, description, branch_id } = req.body;
    if (!name || !phone || !address || !branch_id) {
      return res.status(401).json({ message: "please fill all credentials" });
    }

    const [branchExists] = await db.query(
      "SELECT branch_id FROM branch WHERE branch_id = ?",
      [branch_id]
    );
    if (branchExists.length === 0) {
      return res.status(404).json({ message: "Branch does not exist" });
    }

    await db.query(
      "insert into inquiry( name,phone,email,address ,description ,branch_id) values (?,?,?,?,?,?) ",
      [name, phone, email, address, description, branch_id]
    );
    res.status(201).json({ message: "Inquiry Added Successfully" });
  } catch (error) {
    next(error);
  }
};
export const getInquiry = async (req, res, next) => {
  const { role, branch_id } = req.user;
  try {
    let query = `SELECT 
  i.inquiry_id,
  i.name,
  i.phone,
  i.email,
  i.address,
  i.description,
  b.branch_id,
  b.branch_name
FROM inquiry i
LEFT JOIN branch b
  ON i.branch_id = b.branch_id`;

    const queryParams = [];
    if (role === "manager") {
      query += ` WHERE i.branch_id = ?`;
      queryParams.push(branch_id);
    }

    const [row] = await db.execute(query, queryParams);

    res.status(201).json({ message: "Inquiry retrive Sucessfully", data: row });
  } catch (error) {
    next(error);
  }
};
export const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "DELETE FROM inquiry WHERE inquiry_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "inquiry  not found" });
    }
    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    next(error);
  }
};
//Review
export const addReview = async (req, res, next) => {
  try {
    const { name, star, description, branch_id } = req.body;
    if (!name || !star || !description || !branch_id) {
      return res.status(401).json({ message: "please fill all credentials" });
    }

    const [branchExists] = await db.query(
      "SELECT branch_id FROM branch WHERE branch_id = ?",
      [branch_id]
    );
    if (branchExists.length === 0) {
      return res.status(404).json({ message: "Branch does not exist" });
    }

    await db.query(
      "insert into review( name,star ,description ,branch_id) values (?,?,?,?) ",
      [name, star, description, branch_id]
    );
    res.status(201).json({ message: "Review Added Successfully" });
  } catch (error) {
    next(error);
  }
};
export const getReview = async (req, res, next) => {
  const { role, branch_id } = req.user;
  try {
    let query = `select
      r.name,
      r.star,
      r.description,
      b.branch_id,
      b.branch_name
      from review r
      left join branch b
      on r.branch_id=b.branch_id`;

    const queryParams = [];
    if (role === "manager") {
      query += ` WHERE r.branch_id = ?`;
      queryParams.push(branch_id);
    }

    const [row] = await db.execute(query, queryParams);
    res
      .status(201)
      .json({ message: "Review retrived successfully", data: row });
  } catch (error) {
    next(error);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM review WHERE review_id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: " Review is empty" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//trustedcustomers
export const addTrustedCustomers = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(req.file);
    if (!name) {
      if (req.file) {
        removeImage(req.file.imagePath);
      }
      return res.status(400).json({ message: "Name, Description required" });
    }

    const imagePath = req.file
      ? `uploads/customers/${req.file.filename}`
      : null;

    if (req.file) {
      const [customers] = await db.query(
        "insert into TrustedCustomers (name,img) values (?,?)",
        [name, imagePath]
      );
    }
    res
      .status(200)
      .json({ message: "Customers Added Successfully", image: imagePath });
  } catch (error) {
    next(error);
  }
};
export const getTrustedCustomers = async (req, res, next) => {
  try {
    const [row] = await db.query("select * from TrustedCustomers ");
    res
      .status(201)
      .json({ message: "customer retrived sucessfully", data: row });
  } catch (error) {
    next(error);
  }
};
//gallery
export const addGallery = async (req, res, next) => {
  try {
    const { title, location, date, branch_id, staff_id } = req.body;

    if (!title || !location || !req.files || req.files.length === 0) {
      removeImages(req.files);
      return res.status(400).json({
        message: "title, location and image required",
      });
    }

    if (branch_id) {
      const [branchExists] = await db.query(
        "SELECT branch_id FROM branch WHERE branch_id = ?",
        [branch_id]
      );
      if (branchExists.length === 0) {
        removeImages(req.files);
        return res.status(404).json({ message: "Branch does not exist" });
      }
    }

    if (staff_id) {
      const [staffExists] = await db.query(
        "SELECT staff_id FROM staff WHERE staff_id = ?",
        [staff_id]
      );
      if (staffExists.length === 0) {
        removeImages(req.files);
        return res.status(404).json({ message: "Staff does not exist" });
      }
    }

    const imagePaths = req.files.map(
      (file) => `uploads/gallery/${file.filename}`
    );

    await db.query(
      "INSERT INTO gallery (title,location,branch_id,date,staff_id,gallery_img) VALUES (?,?,?,?,?,?)",
      [title, location, branch_id, date, staff_id, JSON.stringify(imagePaths)]
    );

    res.status(200).json({
      message: "gallery added successfully",
      images: imagePaths,
    });
  } catch (error) {
    removeImages(req.files);
    next(error);
  }
};

export const getGallery = async (req, res, next) => {
  const { role, branch_id } = req.user;
  try {
    let query = `SELECT
  g.gallery_id,
  g.title,
  g.location,
  g.date,
  g.gallery_img,
  g.staff_id,
  b.branch_id,
  b.branch_name
FROM gallery g
LEFT JOIN branch b
  ON g.branch_id = b.branch_id`;

    const queryParams = [];
    if (role === "manager") {
      query += ` WHERE g.branch_id = ?`;
      queryParams.push(branch_id);
    }

    const [row] = await db.execute(query, queryParams);
    res
      .status(200)
      .json({ message: "Gallery retrieved successfully", data: row });
  } catch (error) {
    next(error);
  }
};
export const getAllGallery = async (req, res, next) => {
  try {
    const { province_id, district_id, branch_id } = req.query;
    
    let query = `SELECT
      g.gallery_id,
      g.title,
      g.location,
      g.date,
      g.gallery_img,
      g.staff_id,
      b.branch_id,
      b.branch_name,
      d.district_name,
      p.province_name
    FROM gallery g
    LEFT JOIN branch b ON g.branch_id = b.branch_id
    LEFT JOIN district d ON b.district_id = d.district_id
    LEFT JOIN province p ON d.province_id = p.province_id`;
    
    const params = [];
    
    if (branch_id) {
      query += ` WHERE g.branch_id = ?`;
      params.push(branch_id);
    } else if (district_id) {
      query += ` WHERE b.district_id = ?`;
      params.push(district_id);
    } else if (province_id) {
      query += ` WHERE d.province_id = ?`;
      params.push(province_id);
    }
    
    const [results] = await db.execute(query, params);
    
    res.status(200).json({
      message: "Gallery retrieved successfully",
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "DELETE FROM gallery WHERE gallery_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: " Gallery is empty" });
    }
    res.status(200).json({ message: "gallery deleted successfully" });
  } catch (error) {
    next(error);
  }
};
