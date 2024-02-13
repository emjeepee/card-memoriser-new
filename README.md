# How this app works

The user clicks the New deck button, which creates a new shuffled deck
of cards. the app displays these cards face down on the green felt.
The app makes visible each card in turn (starting from the top left) 
as the user clicks the Next card button <br>
The first click of the Next card button starts the timer. <br>
The user memorises each card and, once all the cards have been overturned 
and committed to memory, clicks the Stop timer button.<br>
The user then clicks the Recall button, which places all of the cards
face down again, but this time each card has two dropdown menus above it.<br>
It's from these dropdowns that the user selects the card he thinks 
belongs in that position. One dropdown is for suit, one for card face value
(eg 6, queen, ace, 9) <br>
The user can ignore cards if he does not remember them. <br>
Once the user is satisfied he has recalled as many as he is able to he 
clicks the Check button. <br>
The Check button shows each card face up again but this time with a green 
tick, a red cross or the text "Don't know" superimposed on its face to
indicated, respectively, whether the user got the card right, got it 
wrong or could not recall it.<br>
The Check button also populates the table in the LH column with data
about the memorisation attempt. The table displays date and time of attempt, 
the numbers of ticks, crosses or don't knows, and the time taken to recall the deck 
of cards.<br>


# App component structure:<br>
<br>
App<br>
  ---TimesDisplay<br>
  ---CardArea<br>
          ---Card(s)<br>
  ---BottomBar<br>
          ---Timer<br>
          ---ButtonOne ("Next card")<br>
          ---ButtonOne ("New deck")<br><br><br><br>






  <br>
    <br>
      <br>
        <br>
          <br>
            <br>
              <br>
                <br>
                  <br>
                  

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



