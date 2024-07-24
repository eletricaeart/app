

deploy on gh-pages

npm install gh-pages --save-dev

package.json{
   "scripts": {
      "predeploy": "npm run build",  <!-- is used to bundle the React application -->
      "deploy": "gh-pages -d build", <!-- deploys the bundled file -->
   },
   "homepage": "http://{github-username}.github.io/{repo-name}"
}


deploy over expo
https://docs.expo.dev/distribution/publishing-websites/#serve-locally

configure app.json {
   "web": {
      "output": "server",
      "bundler": "metro"
   },

   output: [
      single // Outputs a Single Page Application (SPA) 
             // with a single index.html in the 
             // output folder and has no statically indexable HTML.

      server // Creates client and server directories. 
             // Client files are output as separate HTML files.
             // API routes as separate JavaScript files for 
             // hosting with a custom Node.js server.

      static // Outputs separate HTML files for every 
             // route in the app directory.
   ]
}

web {
   build:
      npx expo export -p web
      
   Serve locally:
      single: 
         npx serve dist --single
         Open http://localhost:5000
      server: 


      static: 
         npx serve dist
         Open http://localhost:5000

   Hosting on third-party services: 
      Netlify: 
         install: 
            npm install -g netlify-cli
         ...

      Vercel: 
         install: 
            npm install -g vercel@latest

         Configure redirects for single-page applications: 
            vercel.json: 
               {
                  "buildCommand": "expo export -p web",
                  "outputDirectory": "dist",
                  "devCommand": "expo",
                  "cleanUrls": true,
                  "framework": null,
                  "rewrites": [
                     {
                        "source": "/:path*",
                        "destination": "/"
                     }
                  ]
               }
         Deploy: 
            vercel

      Firebase hosting: 
         Create a firebase project with the Firebase Console:
            https://console.firebase.google.com/

         install the Firebase CLI:
            https://firebase.google.com/docs/hosting

         
      GitHub Pages:
         Install the gh-pages:
            npm install --save-dev gh-pages
            or 
            yarn add -D gh-pages

         configure it to a subdomain with the baseUrl
         with /repo-name in app.json:
            {
               "expo": {
                  "experiments": {
                     "baseUrl": "/expo-gh-pages"
                  }
               }
            }

         create a .nojekyll file in the public directory: 
            mkdir public && touch public/.nojekyll

         package.json: 
            "scripts": {
               "predeploy": "expo export -p web",
               "deploy": "gh-pages -t -d dist"
            }

         deploy: 
            npm run deploy
            or 
            yarn deploy
}