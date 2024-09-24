# How to run locally

1. Make sure you have node js installed
2. Clone/download the repository
3. Navigate into the `my-pregnancy` folder (there should be a public and src folder in it)
4. Create a `.env` file in this directory and paste the following in: `REACT_APP_API_URL=http://localhost:8000/` (change the url when needed, this is the default for a locally hosted backend)
5. Open a terminal window in this directory
6. Run `npm install` and wait until its done
7. Run `npm run build` and wait until its done
8. Now navigate into the build folder using `cd build`
9. Type `serve -s` to serve the generated static files (if you do not have serve run `npm install --global serve`)
10. It will give you a local url, put it into  your browser and the site will load

# How to develop upon
In step 7 instead of doing `npm run build` do `npm run start` and the site will automatically open and any code changes will automatically display, you will probably need to refresh the site at times.
