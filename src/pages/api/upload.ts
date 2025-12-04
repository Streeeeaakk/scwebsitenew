
import type { NextApiRequest, NextApiResponse } from 'next';
import { bucket } from '@/lib/firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';
import multiparty from 'multiparty';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('🔴 UPLOAD API PARSE ERROR:', err);
      return res.status(500).json({ success: false, error: `Error parsing form data: ${err.message}` });
    }

    try {
      const file = files.file?.[0];

      if (!file) {
        return res.status(400).json({ success: false, error: 'No file provided.' });
      }
      
      const folder = fields.folder?.[0] || 'images';

      const contentType = file.headers['content-type'];
      if (!contentType || (!contentType.startsWith('image/') && !contentType.startsWith('video/'))) {
        fs.unlinkSync(file.path); // Clean up temp file
        return res.status(400).json({ success: false, error: 'Invalid file type. Only images and videos are allowed.' });
      }

      const uniqueFilename = `${uuidv4()}-${file.originalFilename}`;
      const filePath = `${folder}/${uniqueFilename}`;
      const fileUpload = bucket.file(filePath);

      const readStream = fs.createReadStream(file.path);
      
      await new Promise((resolve, reject) => {
          const writeStream = fileUpload.createWriteStream({
            metadata: { contentType: contentType },
          });

          writeStream.on('error', (error: Error) => {
              fs.unlinkSync(file.path);
              reject(error);
          });
          writeStream.on('finish', () => {
              fs.unlinkSync(file.path);
              resolve(true);
          });
          
          readStream.pipe(writeStream);
      });

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
      return res.status(200).json({ success: true, url: publicUrl, path: filePath });

    } catch (error: any) {
      console.error('🔴 UPLOAD API ERROR:', error);
      let errorMessage = 'An unknown error occurred during upload.';
       if (error.code === 403 || (error.errors && error.errors[0]?.reason === 'forbidden')) {
            errorMessage = 'Server permission error. The service account may be missing required Firebase Storage roles. Ensure "Storage Object Creator" or "Storage Object Admin" role is granted.';
        } else if (error.code === 'storage/object-not-found' || error.message.includes('No such object')) {
            errorMessage = 'Bucket not found. Please ensure the bucket name in `src/lib/firebaseAdmin.ts` is correct.'
        }
      return res.status(500).json({ success: false, error: errorMessage });
    }
  });
};

export default handler;
