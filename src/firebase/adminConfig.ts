import admin from 'firebase-admin';

const adminApp = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATEKEY,
  }),
});

const adminAppAuth = adminApp.auth();

export { adminAppAuth };
