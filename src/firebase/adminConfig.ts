import admin from 'firebase-admin';

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(
    process.env.GOOGLE_APPLICATION_CREDENTIALS || '',
  ),
});

const adminAppAuth = adminApp.auth();

export { adminAppAuth };
