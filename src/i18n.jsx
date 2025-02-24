import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome": "Welcome to JobbTerminalen",
      "Login": "Login",
      "Register": "Register",
      "Registering":"Registering...",
      "Find Jobs": "Find Jobs",
      "Login-Text" : "Welcome back! Sign in to access JobbTerminalen",
      "Username-Email": "Username / Email",
      "User-placeholder": "Enter username or email",
      "Password": "Password",
      "Confirm_Password": "Confirm Password",
      "Pass_placeholder": "Enter password",
      "ConfirmPass_placeholder": "Confirm password",
      "Forget-Password?": "Forget Password?",
      "Copyright": "Copyright ©2024 by JobbTerminalen All Rights Reserved.",
      "Already-account": "Already have an account?",
      "Terms": "Terms of use",
      "Privacy": "Privacy Policy",
       /*--- Forgot Password ---*/
      "Forget_Password": "Forget Password",
      "Forget_head" : "Enter your registered email for verification.",
      "Email": "Email Address",
      "Email_placeholder": "Enter your Email",
      "Submit": "Submit",
      "Submitting": "Submitting...",
      "Verifying": "Verifying...",
      "New_platform": "New to our platform?",
      "Create_account": "Create an account",
      /*-Register-*/
      "Register_Text": "Join JobbTerminalen Today – Unlock Opportunities, Build Your Future!",
      "JobSeeker": "Job Seeker",
      "Recruiter": "Recruiter",
      "Full_Name": "Full Name",
      "Name_placeholder": "Enter your name",
      "Phone": "Phone Number",
      "Phone_placeholder": "Enter phone number",
      "Select": "Select",
      "BySigning":"By signing up, you agree to our",

      /* --Otp Page --- */
      "Otp_title" : "OTP Verification",
      "Otp_text": "Please enter the OTP sent to your email.",

      /* --Reset Password Page --- */
      "Reset_title": "Reset Password",
      "Reset_text":  "Enter your new password to reset.",
      "NewPassword" : "New Password",
      "NewPassPlaceholder" : "Enter your password",
      "NewConfPassPlaceholder" : "Confirm your password",
      "Reset": "Reset",
      "Resetting": "Resetting...",
      
      /* -- Home Hero Section ------*/

      "HeroTitle" : "Find your dream job now",
      "HeroText": "Over 7,00,000+ jobs to explore",
      "EnterSkill" : "Enter Skills / Designation",
      "EnterLocation" : "Location",
      "JobType" : "Job Type",
      "Remote" : "Remote",
      "Hybrid" : "Hybrid",
      "WorkFromOffice": "Work From office",
      "Search" : "Search",
      "StudentJobs" : "Student Jobs",
      "InternshipJobs" : "Internship Jobs",
      "PartTimeJobs" : "Part Time Jobs",
      "FullTimeJobs" : "Full Time Jobs",


    }
  },
  sv: {
    translation: {
      "Welcome": "Välkommen till JobbTerminalen",
      "Login": "Logga in",
      "Register": "Registrera",
      "Registering" :"Registrera dig...",
      "Find Jobs": "Hitta Jobb",
      "Login-Text" : "Välkommen tillbaka! Logga in för att få tillgång till JobbTerminalen",
      "Username-Email": "Användarnamn / E-post",
      "User-placeholder": "Ange användarnamn eller e-post",
      "Password": "Lösenord",
      "Pass_placeholder": "Ange lösenord",
      "Confirm_Password": "Bekräfta lösenord",
      "ConfirmPass_placeholder": "Bekräfta lösenord",
      "Forget-Password?": "Glömt lösenord?",
      "Copyright": "Upphovsrätt ©2024 av JobbTerminalen Alla rättigheter förbehållna.",
      "Already-account": "Har du redan ett konto?",
      "Terms": "Villkor för användning",
      "Privacy": "Integritetspolicy",
      /*--- Forgot Password ---*/
      "Forget_Password": "Glömt lösenord",
      "Forget_head" : "Ange din registrerade e-post för verifiering.",
      "Email": "E-postadress",
      "Email_placeholder": "Ange din e-post",
      "Submit": "Skicka",
      "Submitting": "Skickar...",
      "Verifying": "Verifiering...",
      "New_platform": "Ny på vår plattform?",
      "Create_account": "Skapa ett konto",
      /*-Register-*/
      "Register_Text": "Gå med i JobbTerminalen idag - öppna möjligheter, bygg din framtid!",
      "JobSeeker": "Jobbsökande",
      "Recruiter": "Rekryterare",
      "Full_Name": "Fullständigt namn",
      "Name_placeholder": "Ange ditt namn",
      "Phone": "Telefonnummer",
      "Phone_placeholder": "Ange telefonnummer",
      "Select": "Välj",
      "BySigning" : "Genom att registrera dig samtycker du till vår",

       /* --Otp Page --- */
       "Otp_title" : "OTP-verifiering",
       "Otp_text": "Ange den OTP som skickats till din e-post.",

        /* --Reset Password Page --- */
      "Reset_title": "Återställ lösenord",
      "Reset_text": "Ange ditt nya lösenord för att återställa.",
      "NewPassword" : "Nytt lösenord",
      "NewPassPlaceholder" : "Ange ditt lösenord",
      "NewConfPassPlaceholder" : "Bekräfta ditt lösenord",
      "Reset": "Återställning",
      "Resetting": "Återställer...",

      /* -- Home Hero Section ------*/

      "HeroTitle" : "Hitta ditt drömjobb nu",
      "HeroText": "Över 7 00 000+ jobb att utforska",
      "EnterSkill" : "Ange färdigheter/beteckning",
      "EnterLocation" : "Plats",
      "JobType" : "Jobbtyp",
      "Remote" : "Fjärrkontroll",
      "Hybrid" : "Hybrid",
      "WorkFromOffice": "Arbete från kontoret",
      "Search" : "Sök",
     "StudentJobs" : "Studentjobb",
     "InternshipJobs" : "Praktikjobb",
     "PartTimeJobs" : "Deltidsjobb",
      "FullTimeJobs" : "Heltidsjobb",

    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "sv", // Default language
    fallbackLng: "en", // Fallback if language is missing
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
