export const facebook = {
  clientID: "INSERT-CLIENT-ID-HERE",
  clientSecret: "INSERT-CLIENT-SECRET-HERE",
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ["id", "name", "displayName", "picture", "email"]
};

export const google = {
  clientID: "525492615182-o53ars9of7jneepfi85fs8huf9bb492h.apps.googleusercontent.com",
  clientSecret: "Ku4cn-9VoZYebnV-BHhmjRz1",
  callbackURL: "https://elecbill-767e5.firebaseapp.com/__/auth/handler"
};
