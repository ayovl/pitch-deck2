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
  receiverName?: string; // Optional, in case you want to personalize
  emailBody: string;
  gif1Src: string;
  gif2Src: string;
  ctaLink: string;
}

export const PitchEmailTemplate: React.FC<PitchEmailTemplateProps> = ({
  receiverName,
  emailBody,
  gif1Src,
  gif2Src,
  ctaLink,
}) => (
  <Html>
    <Head>
      <Font
        fontFamily="Inter"
        fallbackFontFamily="Helvetica"
        webFont={{
          url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>A Special Website Proposal For You!</Preview>
    <Container
      style={{
        backgroundColor: '#f8fafc',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '20px',
        width: '100%',
      }}
    >
      <Section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          maxWidth: '680px', // Adjusted for potentially wider content
          margin: '0 auto',
        }}
      >
        {receiverName && (
          <Heading
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            Hello {receiverName}, A Special Proposal For You!
          </Heading>
        )}
        {!receiverName && (
          <Heading
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            A Special Website Proposal For You!
          </Heading>
        )}

        {/* Side-by-side GIFs */}
        <Section style={{ marginBottom: '10px', textAlign: 'center' }}>
          <Row>
            <Column align="center" style={{ width: '50%', paddingRight: '5px' }}>
              <Img
                src={gif1Src}
                alt="Old Website GIF"
                style={{
                  maxWidth: '100%',
                  maxHeight: '400px', /* Adjust as needed for mobile aspect ratio */
                  height: 'auto',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
            </Column>
            <Column align="center" style={{ width: '50%', paddingLeft: '5px' }}>
              <Img
                src={gif2Src}
                alt="New Website GIF"
                style={{
                  maxWidth: '100%',
                  maxHeight: '400px', /* Adjust as needed for mobile aspect ratio */
                  height: 'auto',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
            </Column>
          </Row>
        </Section>

        {/*
        <Text
          style={{
            fontSize: '13px',
            color: '#6b7280',
            textAlign: 'center',
            fontStyle: 'italic',
            marginBottom: '24px',
          }}
        >
          A video walkthrough of your new website is also attached.
        </Text>
        */}

        <Hr style={{ margin: '24px 0', borderColor: '#e2e8f0' }} />

        {/* Main Email Content */}
        <Text
          style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '24px',
            whiteSpace: 'pre-wrap', // To respect newlines from textarea
          }}
        >
          {emailBody.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </Text>

        <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Button
            href={ctaLink}
            style={{
              backgroundColor: '#2563eb', // Blue color, adjust as needed
              color: '#ffffff',
              padding: '14px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Click here to Get Your New Website Now
          </Button>
        </Section>

        <Text
          style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.6',
            marginBottom: '16px',
          }}
        >
          Got questions? Reply to this email.
        </Text>

        <Hr style={{ margin: '32px 0', borderColor: '#e2e8f0' }} />

        <Text
          style={{
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center',
          }}
        >
          Best regards,
          <br />
          Arslan | Digital Creator
        </Text>
      </Section>

      <Text
        style={{
          fontSize: '12px',
          color: '#9ca3af',
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        Vorve | Your Partner in Digital Excellence
      </Text>
    </Container>
  </Html>
);

export default PitchEmailTemplate;
