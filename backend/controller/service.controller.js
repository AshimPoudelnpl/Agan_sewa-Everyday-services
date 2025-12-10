import db from "../config/db.js";
export const addServices = async (req, res) => {
  try {
    const { name, description, address } = req.body;
    console.log(req.body);
    console.log(req.file);
    if (!name || !description || !address) {
      if (req.file) {
        removeImage(req.file.imagePath);
      }
      return res
        .status(400)
        .json({ message: "Name, Description and Address required" });
    }
    const imagePath = req.file ? `uploads/service/${req.file.filename}` : null;

    const [services] = await db.query(
      "insert into services (name,description,address,img) values (?,?,?,?)",
      [name, description, address, imagePath]
    );
    res
      .status(200)
      .json({ message: "Service Added Successfully", image: imagePath });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete service controller
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM services WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error during deleting service:", error);
  }
};
//update service controller
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, address } = req.body;

    const [result] = await db.query(
      "UPDATE services SET name = ?, description = ?, address = ? WHERE id = ?",
      [name, description, address, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    console.error("Error during updating service:", error);
  }
};
