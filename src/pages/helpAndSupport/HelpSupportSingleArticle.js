import React from "react";
import BreadCrumbsMultiple from "../../helpers/breadCrumbs/BreadCrumbsMultiple";
function HelpSupportSingleArticle() {
  return (
    <div className="supportSingleArticle">
      <BreadCrumbsMultiple
        params={[
          {
            label: "help and support",
            url: "/support",
          },
          { label: "Getting Started", url: "/support/topic/:id" },
          { label: "How to Sign up With Udemy and Log in (on a Browser)" },
        ]}
        title="How to Sign up With Udemy and Log in (on a Browser)"
      />
      <div className="supportSingleArticle-body">
        <div className="container">
          <p>
            This article explains how you can sign up for Udemy, while accessing
            Udemy on a desktop or laptop browser, and begin your learning
            experience today.
          </p>
          <p>
            Using the dscoola mobile app? Review how to sign up and log in using
            the Udemy mobile app. <br />
            Are you unable to log in? Learn how to troubleshoot log in issues.{" "}
            <br /> Note: If you’re a Scoola Business learner, steps on how to
            join or sign in to your account are available in the Udemy Business
            Help Center.
          </p>
          <p>
            <u>Sign up with an email and password</u>
          </p>
          <ol>
            <li>
              Click Sign Up at the top right of your desktop or laptop browser.
              Enter your name, your email address, and a unique password.
            </li>
            <li>
              Select whether you wish to receive promotional emails and
              recommendations from Udemy.
            </li>
            <li>Click Sign up.</li>
          </ol>
          <p>
            <img
              src="/assets/images/pages/how-sign-up.jpg"
              alt="how to sign up"
            />
          </p>
          <p>
            <u>Log in with an email and password</u>
          </p>
          <ol>
            <li>On your browser, click Log in at the top right.</li>
            <li>Enter the credentials you used to sign up.</li>
            <li>Click Sign in.</li>
          </ol>
          <p>
            <u>Log in with Apple, Facebook or Google</u>
          </p>
          <ol>
            <li>
              if you have previously signed up for Udemy using Your option,
              click Log in at the top right of your browser.
            </li>
            <li>Select Continue with Apple, Facebook or Google.</li>
            <li>Select Continue with Apple, Facebook or Google.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default HelpSupportSingleArticle;
