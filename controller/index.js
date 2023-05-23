import Table from "../model/tableSchema.js"

//POST
export const saveData = async (req, res) => {
    try{
        const { name, rollno, classname } = req.body;
        const details= new Table({
            name, rollno, classname
        })

        await details.save();
        const table= await Table.find();
        res.status(201).json(table)
    }catch (err) {
        res.status(409).json({ message: err.message });
      }
}

//GET
export const getData = async (req, res) => {
    try {
      const table = await Table.find();
      res.status(200).json(table);
    } catch (err) {
      res.status(404).json({ message: err.message });
  }
};

//DELETE
export const delData= async (req, res) => {
    try{
      const data= await Table.findByIdAndDelete(req.params.id)
      if (!data) response.status(404).send("No Data found");
      const table = await Table.find();
      res.status(200).json(table);
    } catch (error) {
      res.status(500).send(error);
    }
  }

//UPDATE
//DELETE
export const updateData= async (req, res) => {
    const { id } = req.params;
    const { name, rollno, classname } = req.body;
    try{
        // Find the table by its ID
        const table = await Table.findById(id);

        if (!table) {
        return res.status(404).json({ error: 'Table not found' });
        }

        // Update the table fields if provided
        if (name) {
        table.name = name;
        }
        if (rollno) {
        table.rollno = rollno;
        }
        if (classname) {
        table.classname = classname;
        }

        // Save the updated table
        await table.save();
        const details= await Table.find();
        res.status(201).json(details)
    } catch (error) {
      res.status(500).send(error);
    }
  }