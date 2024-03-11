import admin from 'firebase-admin';

const credentials = {
  type: 'service_account',
  project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
  private_key_id: process.env.PROJECT_KEY_ID,
  private_key: process.env.PROJECT_KEY,
  client_email: process.env.ClIENT_EMAIL,
  client_id: process.env.ClIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: 'googleapis.com',
};

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(JSON.stringify(credentials)),
});

const adminAppAuth = adminApp.auth();

export { adminAppAuth };
