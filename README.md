# ECSD Tech Test - Thom Bowden Jest/Puppeteer version
This is the basic Jest version of the tests - it; 
- solves the balancing array problem
- provides simple tests for app load, a negative flow and the submit positive flow
- the tests currently run in non-headless mode, so that you can see what is going on.

### To Do
Some tasks have not been done yet - I thought it best to ship something useful quickly and iterate in true agile spirit. You may see updates to this repository as I increase scope. This will generally be via a feature branch.

This version does not include automatic start up or tear down of the app as part of the single command or build. 
This may be able to be achieved via npm or Jest.

I did not fix all the ESLint warnings and errors in the app, nor have I added the definitions for Jest as the peer dependencies for the ESLint modules get themselves out of whack. 

##### Tests
- Docker - this may be important as the environment the tests are running in may have a different version of node that may prevent libraries from loading correctly
- Automatic start up or tear down of the app as part of the test run
- CI - i.e. Jenkinsfile
- object management (this was not done as the objects have limited reuse)
- convert to typscript -this may make code easier to manage (not done as test aims limited)
- ESLint - Add Jest plugin without causing peer dependency issues
 
##### App

- The dialog modal is tricky to read, would be good to be ably to test tag the div with the text (equally, this may be a test thing... JQuery may provide a more robust locator strategy)  
- Correct ESLint Warnings

## Running the tests

Run either `yarn test` or `npm test`... after starting the app


----------------------------------------------------------------------------

### To run the Local Version of the App
You will need to have [node] and [yarn] both installed on your machine to run the app.

- Clone this repository and make sure you are in this directory (the one containing `README.md`!)
- Run `yarn && yarn start` to start the app
- Visit `localhost:3000` in a browser

### To run the Docker Version of the App 

You will need to have [docker] installed and running to build the image.
If you are new to docker please read the docker docs in order to understand how to build and run a container.

- `docker build -t ecsd-tech-test .`
- `docker run -it -p 3000:3000 ecsd-tech-test:latest`
- Visit `localhost:3000` in a browser

## Challenge 
Once the app is started follow the instructions on the screen and complete the solution in the folder `/src/test/e2e/`
Your submission should be able to work in CI without any set up or configuration from our side.

Each part of the challenge gets increasingly harder. The futher you progress the more we will be impressed.
Complete as much as you can!
Once you see that green tick you are done.

## Limitations
There are no limitations set on this. If you are struggling to select elements you are free to edit the app source code where needed.
What we are looking for is a good understanding of what makes a robust test and a good understanding of engineering principles.

Note: you will not find the challenge answers in the application. Although you could hack the challenge or spam the API that verifies your answer, you still need to submit your test for us to review. 


## Bonus
Have your tests start and tear down the app.

BDD frameworks are great, but are they always appropriate? You decide.

## Submit your test
Once completed push the solution up to your own repository and link ECS the url along with run instructions.

## Note
Please stick to contributing from one account, it makes you look better.

Good Luck!

[docker]: https://docs.docker.com/get-started/
[node]: https://nodejs.org/en/
[yarn]: https://yarnpkg.com/en/
