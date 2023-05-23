import Classroom from "../model/classSchema.js"

//POST
export const saveClass = async (req, res) => {
    try{
        const { classroom } = req.body;
        const details= new Classroom({
            classroom
        })

        await details.save();
        const table= await Classroom.find();
        res.status(201).json(table)
    }catch (err) {
        res.status(409).json({ message: err.message });
      }
}

//GET
export const getClass = async (req, res) => {
    try {
      const table = await Classroom.find();
      res.status(200).json(table);
    } catch (err) {
      res.status(404).json({ message: err.message });
  }
};

//DELETE
export const delClass= async (req, res) => {
    try{
      const data= await Classroom.findByIdAndDelete(req.params.id)
      if (!data) response.status(404).send("No Data found");
      const table = await Classroom.find();
      res.status(200).json(table);
    } catch (error) {
      res.status(500).send(error);
    }
  }

//UPDATE
//DELETE
export const updateClass= async (req, res) => {
    const { id } = req.params;
    const { classroom } = req.body;
    try{
        // Find the table by its ID
        const table = await Classroom.findById(id);

        if (!table) {
        return res.status(404).json({ error: 'Table not found' });
        }

        // Update the table fields if provided
        if (classroom) {
        table.classroom = classroom;
        }

        // Save the updated table
        await table.save();
        const details= await Classroom.find();
        res.status(201).json(details)
    } catch (error) {
      res.status(500).send(error);
    }
  }