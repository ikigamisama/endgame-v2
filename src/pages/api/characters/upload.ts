import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }


  const file = req.body.file;

  res.status(200).json({ data: req.body, name: req.body.file });
  // try {
  //   const file = req.body.file;
  //   const filename = `${file.name}`;

  //   res.status(200).json({ file });

  //   const writeStream = fs.createWriteStream(`public/audio/characters/${filename}`);

  //   file.pipe(writeStream);

  //   // Handle the completion of the file upload
  //   writeStream.on('finish', () => {
  //     const filePath = `/audio/characters/${filename}`;
  //     res.status(200).json({ filePath });
  //   });

  //   // Handle any errors that occur during the file upload
  //   writeStream.on('error', (error) => {
  //     console.error('Error uploading file:', error);
  //     res.status(500).json({ error: error });
  //   });
  // } catch (error) {
  //   console.error('Error uploading file:', error);
  //   res.status(500).json({ error: error });
  // }
}