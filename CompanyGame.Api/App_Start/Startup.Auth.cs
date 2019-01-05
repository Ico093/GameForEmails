using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.OAuth;
using Owin;
using CompanyGame.Api.Providers;
using CompanyGame.Api.Models;
using System.Configuration;
using Owin.Security.Providers.LinkedIn;
using Microsoft.Owin.Security.Facebook;
using System.Threading.Tasks;

namespace CompanyGame.Api
{
    public partial class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static string PublicClientId { get; private set; }

        // For more information on configuring authentication, please visit https://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Configure the db context and user manager to use a single instance per request
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Configure the application for OAuth based flow
            PublicClientId = "self";
            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/api/Token"),
                Provider = new ApplicationOAuthProvider(PublicClientId),
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                // In production mode set AllowInsecureHttp = false
                AllowInsecureHttp = true
            };

            // Enable the application to use bearer tokens to authenticate users
            app.UseOAuthBearerTokens(OAuthOptions);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //    consumerKey: "",
            //    consumerSecret: "");

            var linkedinOptions = new LinkedInAuthenticationOptions() {
                 BackchannelHttpHandler = new FacebookBackChannelHandler(),
                 ClientId = ConfigurationManager.AppSettings["LinkedInAPIKey"].ToString(),
                 ClientSecret = ConfigurationManager.AppSettings["LinkedInAPISecret"].ToString(),
                 Scope = { "r_basicprofile", "r_emailaddress" },
                 Provider = new LinkedInAuthenticationProvider()
                 {
                    OnAuthenticated = context =>
                    {
                        context.Identity.AddClaim(new System.Security.Claims.Claim("LinkedIn_AccessToken", context.AccessToken));
                        return Task.FromResult(true);
                    }
                 },
                 SignInAsAuthenticationType = DefaultAuthenticationTypes.ExternalCookie

            };

            app.UseLinkedInAuthentication(linkedinOptions);

            var facebookOptions = new FacebookAuthenticationOptions()
            {

                AppId = ConfigurationManager.AppSettings["FacebookAPIKey"].ToString(),
                AppSecret = ConfigurationManager.AppSettings["FacebookAPISecret"].ToString(),
                BackchannelHttpHandler = new FacebookBackChannelHandler(),
                UserInformationEndpoint = "https://graph.facebook.com/v2.4/me?fields=id,name,email",
                Scope = { "email" },
                Provider = new FacebookAuthenticationProvider
                {
                    OnAuthenticated = context =>
                    {
                        context.Identity.AddClaim(new System.Security.Claims.Claim("FacebookAccessToken", context.AccessToken));
                        return Task.FromResult(true);
                    }
                }
            };

            app.UseFacebookAuthentication(facebookOptions);

            app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions()
            {
                ClientId = ConfigurationManager.AppSettings["GoogleAPIKey"].ToString(),
                ClientSecret = ConfigurationManager.AppSettings["GoogleAPISecret"].ToString()
            });
        }
    }
}
