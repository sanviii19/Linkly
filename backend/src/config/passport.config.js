import dotenv from 'dotenv';
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../models/user.model.js";

console.log("----------")
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID? '✓ Loaded' : '✗ Missing');
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? '✓ Loaded' : '✗ Missing');
console.log("----------")


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists by Google ID or email
        let user = await UserModel.findOne({
          $or: [
            { googleId: profile.id },
            { email: profile.emails[0].value }
          ]
        });

        if (!user) {
          // Create new user with Google provider
          user = await UserModel.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            avatar: profile.photos[0]?.value,
            provider: 'google'
          });
        } else if (!user.googleId) {
          // Update existing local user with Google ID
          user.googleId = profile.id;
          user.avatar = profile.photos[0]?.value;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// Required by passport (even if using JWT)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
