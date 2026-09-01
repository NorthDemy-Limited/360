import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB max for video/image/audio

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({
        error: `File exceeds maximum allowed size of 100MB. (Your file: ${(file.size / (1024 * 1024)).toFixed(1)}MB)`
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create sanitized unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filename = `${uniqueSuffix}-${cleanFileName}`;
    
    // Ensure public/uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch {
      // Directory already exists
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: file.type
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Failed to upload media asset.' }, { status: 500 });
  }
}
