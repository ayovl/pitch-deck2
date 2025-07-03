import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Column,
  Section,
  Text,
  Container,
  Hr,
  Link,
  Img,
  Button,
} from '@react-email/components';

interface PitchEmailTemplateProps {
  emailBody: string;
  gifSrc: string; // Changed from gif1Src, gif2Src to single gifSrc
  ctaLink: string;
}

// Basic styles - keeping it minimal to avoid promotion filters
// Email client support for CSS is tricky; inline styles are generally safest.
const styles = {
  body: {
    backgroundColor: '#ffffff', // Plain white background
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '100%',
    maxWidth: '600px', // Common width for emails
  },
  container: {
    backgroundColor: '#ffffff',
    padding: '0px', // No extra padding for the main container around content
  },
  gif: {
    maxWidth: '100%',
    height: 'auto', // Maintain aspect ratio
    margin: '0 auto 20px auto', // Centered, with space below
    display: 'block',
    border: '1px solid #eaeaea', // Subtle border
    borderRadius: '4px',
  },
  text: {
    fontSize: '16px',
    lineHeight: '1.6', // 26px line height for 16px font
    color: '#333333', // Dark grey for text, not pure black
    padding: '0 20px', // Padding for text sections
  },
  paragraphGroup: {
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#007bff', // A standard blue
    borderRadius: '5px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    padding: '12px 25px',
    display: 'inline-block', // Or 'block' if you want it full width
  },
  buttonContainer: {
    textAlign: 'center' as const,
    padding: '20px 0',
  },
  hr: {
    borderColor: '#cccccc',
    margin: '28px 0',
    borderTopWidth: '1px',
  },
  footerText: {
    color: '#888888',
    fontSize: '12px',
    lineHeight: '1.4',
    textAlign: 'center' as const,
    padding: '0 20px',
  },
  signatureName: {
    fontWeight: 'bold' as 'bold',
  }
};

export const PitchEmailTemplate: React.FC<PitchEmailTemplateProps> = ({
  emailBody,
  gifSrc,
  ctaLink,
}) => (
  <Html>
    <Head>
      {/* Standard meta tags for email */}
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Font
        fontFamily="Roboto" // Using a more common web font
        fallbackFontFamily="Arial"
        webFont={{
          url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    {/* Preview text for email clients */}
    <Preview>A quick look at your new website design...</Preview>

    <Section style={styles.body}>
      <Container style={styles.container}>
        {/* Single GIF - First Element */}
        <Img
          src={gifSrc}
          alt="Website Comparison GIF"
          style={styles.gif}
        />

        {/* Main Email Content */}
        <Section style={styles.paragraphGroup}>
          {emailBody.split('\n').map((line, index) => (
            <Text key={index} style={styles.text}>
              {line || <br />} {/* Render a <br /> for empty lines to maintain spacing */}
            </Text>
          ))}
        </Section>

        {/* CTA Button */}
        <Section style={styles.buttonContainer}>
          <Button style={styles.button} href={ctaLink}>
            Get Your New Website Now
          </Button>
        </Section>

        <Text style={{...styles.text, marginBottom: '20px'}}>
          Got questions? Just reply to this email. I&apos;m here to help!
        </Text>

        <Hr style={styles.hr} />

        <Text style={{...styles.text, ...styles.signatureName}}>
          Arslan
        </Text>
        <Text style={{...styles.text, fontSize: '14px', color: '#555555'}}>
          Digital Creator
        </Text>

        {/* Optional: Minimal footer if needed */}
        {/*
        <Text style={styles.footerText}>
          Vorve | Your Partner in Digital Excellence
        </Text>
        */}
      </Container>
    </Section>
  </Html>
);

export default PitchEmailTemplate;
