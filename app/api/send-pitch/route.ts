import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PitchEmailTemplate } from '@/components/PitchEmailTemplate';
import { render } from '@react-email/render';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const resend = new Resend(process.env.RESEND_API_KEY);
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
const ensureUploadDirExists = async () => {
  try {
    await fs.access(UPLOAD_DIR);
  } catch (error) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    console.log(`Upload directory created: ${UPLOAD_DIR}`);
  }
};

// Helper to save file and get public URL
const saveFileAndGetUrl = async (file: File, filenamePrefix: string): Promise<string> => {
  await ensureUploadDirExists();
  const uniqueFilename = `${filenamePrefix}-${uuidv4()}${path.extname(file.name)}`;
  const filePath = path.join(UPLOAD_DIR, uniqueFilename);
  const bytes = await file.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(bytes));
  // IMPORTANT: Adjust this URL based on your actual domain when deployed
  const publicUrl = `/uploads/${uniqueFilename}`;
  return publicUrl;
};


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const receiverEmail = formData.get('receiverEmail') as string;
    const subject = formData.get('subject') as string;
    const emailBody = formData.get('emailBody') as string;
    const ctaLink = formData.get('ctaLink') as string;
    const gif1File = formData.get('gif1') as File | null;
    const gif2File = formData.get('gif2') as File | null;
    // const videoFile = formData.get('video') as File | null; // Video file removed

    if (!receiverEmail || !subject || !emailBody || !ctaLink || !gif1File || !gif2File ) { // videoFile removed from check
      return NextResponse.json({ error: 'Missing required fields or files' }, { status: 400 });
    }

    // Save GIFs and get their public URLs
    // For a real app, consider a proper CDN or blob storage for these files.
    // For this internal tool, serving from `public/uploads` is simpler.
    // Ensure your Next.js app serves the `public` directory correctly.
    const gif1Src = await saveFileAndGetUrl(gif1File, 'gif1');
    const gif2Src = await saveFileAndGetUrl(gif2File, 'gif2');

    // // Prepare video attachment - REMOVED
    // const videoBuffer = Buffer.from(await videoFile.arrayBuffer());

    // Render the React email template to HTML
    const emailHtml = await render(
      PitchEmailTemplate({
        emailBody,
        gif1Src: `${process.env.NEXT_PUBLIC_APP_URL || ''}${gif1Src}`, // Prepend base URL
        gif2Src: `${process.env.NEXT_PUBLIC_APP_URL || ''}${gif2Src}`, // Prepend base URL
        ctaLink,
        // receiverName: can be extracted if you add a field for it
      })
    );

    console.log('Attempting to send email with Resend...');
    console.log('From Email:', `Arslan from Vorve <${process.env.SENDER_EMAIL || 'noreply@vorve.tech'}>`);
    console.log('To Email:', receiverEmail);
    console.log('Subject:', subject);
    console.log('GIF1 URL:', `${process.env.NEXT_PUBLIC_APP_URL || ''}${gif1Src}`);
    console.log('GIF2 URL:', `${process.env.NEXT_PUBLIC_APP_URL || ''}${gif2Src}`);


    const { data, error } = await resend.emails.send({
      from: `Arslan from Vorve <${process.env.SENDER_EMAIL || 'noreply@vorve.tech'}>`, // Update with your verified Resend domain/email
      to: [receiverEmail],
      subject: subject,
      html: emailHtml,
      // attachments: [ // Attachments array removed
      //   {
      //     filename: videoFile.name,
      //     content: videoBuffer,
      //   },
      // ],
      replyTo: process.env.REPLY_TO_EMAIL || 'arsalmaab@gmail.com',
    });

    if (error) {
      console.error('Resend error:', error);
      // Clean up uploaded files if email sending fails
      try {
        await fs.unlink(path.join(process.cwd(), 'public', gif1Src));
        await fs.unlink(path.join(process.cwd(), 'public', gif2Src));
      } catch (cleanupError) {
        console.error('Error cleaning up files:', cleanupError);
      }
      return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
    }

    console.log('Email sent successfully:', data);

    // Optionally, you might want to clean up the uploaded GIFs after successful sending
    // if they are only for one-time use. For now, they remain in public/uploads.
    // Example cleanup:
    // try {
    //   await fs.unlink(path.join(process.cwd(), 'public', gif1Src));
    //   await fs.unlink(path.join(process.cwd(), 'public', gif2Src));
    //   console.log('Cleaned up uploaded GIFs');
    // } catch (cleanupError) {
    //   console.error('Error cleaning up GIFs after send:', cleanupError);
    // }


    return NextResponse.json({ success: true, message: 'Pitch email sent successfully!', id: data?.id });

  } catch (error: any) {
    console.error('Send pitch API error:', error);
    // Also try to clean up if an error occurs during file processing
    // This part needs more robust handling of which files were saved before erroring
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
