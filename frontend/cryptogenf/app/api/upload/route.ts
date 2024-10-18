import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Desabilitar o processamento automático de body
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), '/public/assets/profilePics');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = formidable({
      uploadDir: uploadDir,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao fazer upload da imagem' });
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      if (file) {
        const fileName = path.basename(file.filepath);

        // Retorna a URL do arquivo salvo
        res.status(200).json({ imageUrl: `/assets/profilePics/${fileName}` });
      } else {
        res.status(400).json({ message: 'Arquivo não encontrado' });
      }
    });
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
};

export default handler;
