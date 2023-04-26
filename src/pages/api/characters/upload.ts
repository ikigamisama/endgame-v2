import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const form: any = new IncomingForm();

  // Set the directory where uploaded files will be saved
  form.uploadDir = path.join(process.cwd(), 'public', 'uploads');

  form.parse(req, async (err: any, fields: any, files: { file: any; }) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to process form data' });
    }

    const { file } = files;

    if (!file) {
      return res.status(400).json({ error: 'No file was uploaded' });
    }

    // Generate a unique filename to prevent overwriting
    const fileName = `${file.name}`;
    const filePath = path.join(form.uploadDir, fileName);

    try {
      // Move the uploaded file to the specified directory
      await fs.promises.rename(file.path, filePath);

      return res.status(200).json({ success: true, fileName });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save file' });
    }
  });
};

export default handler;
