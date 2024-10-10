# How to Run the Frontend Locally
## The Setup 
1. Ensure you have nodeJS installed
2. Clone/download the repository
3. Navigate into the `my-pregnancy` folder/directory:
```bash
# From an elevated privelege Command Prompt:
C:\Windows\System32> cd "C:\Users\TestUser\Downloads\GitHub\my-pregnancy-react\my-pregnancy"
```
4. Create a `.env` file in this directory and paste the following in: `REACT_APP_API_URL=http://localhost:8000/`
    - **Please Note**: Change the URL when needed. This is the default for a locally hosted backend
5. _If you have not done so already_ - Open a terminal window in this directory
6. Run `npm install` and `npm install --global serve` to install all the necessary packages. When complete, we are ready to Build the project!

## The Build and Runtime
1. Again within the `my-pregnancy` directory, run `npm run build` and wait until completed
3. Type `serve -s build`, to serve the generated static files
4. It will give you a local URL, enter this into your browser and the site will load

# How to Develop Upon
In Step 1 of [The Build and Runtime](#the-build-and-runtime), instead of entering `npm run build`, try, `npm run start`, and the site will automatically open and any code changes will automatically display. 

**Please Note**: You may need to refresh the site at times for changes to be seen.

# Note
If there are any errors indicating that packages or other necessary components are **Not Found**, attempt to run `npm install` again.