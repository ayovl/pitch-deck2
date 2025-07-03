"use client";

import { useState, FormEvent } from 'react';

const defaultEmailBody = `Your current website design is making your business look untrustworthy—visitors might leave immediately, wasting your Google Ads money. People click but don’t stay.

A better website will help you attract more clients by appearing trustworthy. You’ll also get a free brand refresh for a better brand image.

Hi, I'm Arslan, a digital creator.`;

const AdminSendPitchPage = () => {
  const [receiverEmail, setReceiverEmail] = useState('');
  const [subject, setSubject] = useState('A Special Website Proposal For You!');
  const [gifFile, setGifFile] = useState<File | null>(null); // Changed from gif1, gif2 to gifFile
  // const [video, setVideo] = useState<File | null>(null); // Removed video state
  const [emailBody, setEmailBody] = useState(defaultEmailBody);
  const [ctaLink, setCtaLink] = useState('https://your-portfolio-or-contact-link.com'); // TODO: Update this link
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatusMessage('');

    if (!gifFile) { // Check for single gifFile
      setStatusMessage('Please upload the comparison GIF.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('receiverEmail', receiverEmail);
    formData.append('subject', subject);
    formData.append('emailBody', emailBody);
    formData.append('ctaLink', ctaLink);
    formData.append('gifFile', gifFile); // Changed from gif1, gif2 to gifFile
    // formData.append('video', video); // Removed video from FormData

    try {
      const response = await fetch('/api/send-pitch', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage(`Success: ${result.message || 'Email sent successfully!'}`);
        // Optionally reset form
        // setReceiverEmail('');
        // setSubject('A Special Website Proposal For You!');
        // setEmailBody(defaultEmailBody);
        // setCtaLink('https://your-portfolio-or-contact-link.com');
        // setGifFile(null); // Changed from gif1, gif2
        // // setVideo(null); // Video state removed
        // (event.target as HTMLFormElement).reset(); // Resets file inputs
      } else {
        setStatusMessage(`Error: ${result.error || 'Failed to send email. Check console.'}`);
      }
    } catch (error) {
      console.error('Sending pitch email failed:', error);
      setStatusMessage('Error: An unexpected error occurred. Check console.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none";
  const labelStyle = "block text-sm font-medium text-slate-700";
  const buttonStyle = "px-6 py-2.5 mt-4 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-50";

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', color: '#1e293b' }}>
        Send Client Pitch Email
      </h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="receiverEmail" className={labelStyle}>Receiver&apos;s Email Address:</label>
          <input
            type="email"
            id="receiverEmail"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            required
            className={inputStyle}
            placeholder="client@example.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className={labelStyle}>Email Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="emailBody" className={labelStyle}>Email Body:</label>
          <textarea
            id="emailBody"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            rows={10}
            required
            className={inputStyle}
            placeholder="Enter the main content of your email here..."
          />
          <p style={{fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem'}}>
            The text "Hi, I'm Arslan, a digital creator." is part of the default body.
            The full signature and CTA button will be added by the template.
            The part "Your current website design is making your business look untrustworthy..." is also pre-filled.
          </p>
        </div>

        <div>
          <label htmlFor="gifFile" className={labelStyle}>Comparison GIF (Old vs. New):</label>
          <input
            type="file"
            id="gifFile"
            accept="image/gif"
            onChange={(e) => setGifFile(e.target.files ? e.target.files[0] : null)}
            required
            className={inputStyle}
          />
        </div>

        {/*
        <div>
          <label htmlFor="gif2" className={labelStyle}>GIF 2 (e.g., New Website):</label>
          <input
            type="file"
            id="gif2"
            accept="image/gif"
            // onChange={(e) => setGif2(e.target.files ? e.target.files[0] : null)} // Combined into one
            required
            className={inputStyle}
          />
        </div>
        */}

        {/*
        <div>
          <label htmlFor="video" className={labelStyle}>Video Walkthrough (e.g., .mp4, .mov):</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            // onChange={(e) => setVideo(e.target.files ? e.target.files[0] : null)} // Video state removed
            // required // No longer required
            className={inputStyle}
          />
        </div>
        */}

        <div>
          <label htmlFor="ctaLink" className={labelStyle}>CTA Button Link:</label>
          <input
            type="url"
            id="ctaLink"
            value={ctaLink}
            onChange={(e) => setCtaLink(e.target.value)}
            required
            className={inputStyle}
            placeholder="https://example.com/get-your-website"
          />
           <p style={{fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem'}}>
            This link will be used for the &quot;Click here to Get Your New Website Now&quot; button.
          </p>
        </div>

        <button type="submit" disabled={isLoading} className={buttonStyle} style={{alignSelf: 'center'}}>
          {isLoading ? 'Sending...' : 'Send Pitch Email'}
        </button>
      </form>
      {statusMessage && (
        <p style={{ marginTop: '1rem', textAlign: 'center', color: statusMessage.startsWith('Error:') ? 'red' : 'green' }}>
          {statusMessage}
        </p>
      )}
      <p style={{marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#64748b'}}>
        This is an internal tool. This page is not linked anywhere on the main website.
      </p>
    </div>
  );
};

export default AdminSendPitchPage;
