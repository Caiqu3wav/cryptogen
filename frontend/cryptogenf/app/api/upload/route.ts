import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Configurando o diretório para salvar as imagens
const uploadDir = path.join(process.cwd(), '/public/assets/profilePics');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ message: 'Nenhum arquivo enviado' }, { status: 400 });
  }

  // Lê o conteúdo do arquivo
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Define o nome do arquivo e o caminho
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  // Salva o arquivo no diretório
  fs.writeFileSync(filePath, buffer);

  // Retorna a URL do arquivo salvo
  const imageUrl = `/assets/profilePics/${fileName}`;
  return NextResponse.json({ imageUrl }, { status: 200 });
}