import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PitchEmailTemplate } from '@/components/PitchEmailTemplate';
import { render } from '@react-email/render';
// import fs from 'fs/promises'; // No longer needed for saving files locally for URLs
// import path from 'path'; // No longer needed for saving files locally for URLs
// import { v4 as uuidv4 } from 'uuid'; // No longer needed for unique filenames

const resend = new Resend(process.env.RESEND_API_KEY);
// const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads'); // Not saving to public anymore

// // Ensure upload directory exists - Not needed as we are not writing to filesystem for URLs
// const ensureUploadDirExists = async () => {
//   try {
//     await fs.access(UPLOAD_DIR);
//   } catch (error) {
//     await fs.mkdir(UPLOAD_DIR, { recursive: true });
//     console.log(`Upload directory created: ${UPLOAD_DIR}`);
//   }
// };

// // Helper to save file and get public URL - Not needed for CID
// const saveFileAndGetUrl = async (file: File, filenamePrefix: string): Promise<string> => {
//   await ensureUploadDirExists();
//   const uniqueFilename = `${filenamePrefix}-${uuidv4()}${path.extname(file.name)}`;
//   const filePath = path.join(UPLOAD_DIR, uniqueFilename);
//   const bytes = await file.arrayBuffer();
//   await fs.writeFile(filePath, Buffer.from(bytes));
//   // IMPORTANT: Adjust this URL based on your actual domain when deployed
//   const publicUrl = `/uploads/${uniqueFilename}`;
//   return publicUrl;
// };


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const receiverEmail = formData.get('receiverEmail') as string;
    const subject = formData.get('subject') as string;
    const emailBody = formData.get('emailBody') as string;
    const ctaLink = formData.get('ctaLink') as string;
    const gifFile = formData.get('gifFile') as File | null; // Changed from gif1File, gif2File

    if (!receiverEmail || !subject || !emailBody || !ctaLink || !gifFile ) { // Check for single gifFile
      return NextResponse.json({ error: 'Missing required fields or files' }, { status: 400 });
    }

    // Prepare attachments for Resend
    const attachments = [];
    const gifCid = 'comparison_gif.gif'; // Single CID

    if (gifFile) {
      const gifBuffer = Buffer.from(await gifFile.arrayBuffer());
      attachments.push({
        filename: gifFile.name || 'comparison.gif',
        content: gifBuffer,
        cid: gifCid,
      });
    }
    // Removed logic for gif2File

    // Render the React email template to HTML
    const emailHtml = await render(
      PitchEmailTemplate({
        emailBody,
        gifSrc: `cid:${gifCid}`, // Pass single gifSrc with its CID
        ctaLink,
        // receiverName: can be extracted if you add a field for it
      })
    );

    console.log('Attempting to send email with Resend...');
    console.log('From Email:', `Arslan from Vorve <${process.env.SENDER_EMAIL || 'noreply@vorve.tech'}>`);
    console.log('To Email:', receiverEmail);
    console.log('Subject:', subject);
    console.log('GIF CID:', gifCid); // Log single GIF CID


    const { data, error } = await resend.emails.send({
      from: `Arslan from Vorve <${process.env.SENDER_EMAIL || 'noreply@vorve.tech'}>`,
      to: [receiverEmail],
      subject: subject,
      html: emailHtml,
      attachments: attachments, // Add prepared attachments here
      replyTo: process.env.REPLY_TO_EMAIL || 'arsalmaab@gmail.com',
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
    }

    console.log('Email sent successfully:', data);

    return NextResponse.json({ success: true, message: 'Pitch email sent successfully!', id: data?.id });

  } catch (error: any) {
    console.error('Send pitch API error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
