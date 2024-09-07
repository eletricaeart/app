"use strict";
// write a code that save a user token from firebase auth in the newest version of firebase
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
// Initialize Firebase app
var app = (0, app_1.initializeApp)(firebaseConfig);
// Get Firebase Auth instance
var auth = (0, auth_1.getAuth)(app);
// Sign in with email and password
var signInWithEmailAndPassword = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var userCredential, user, _a, _b, _c, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                return [4 /*yield*/, signInWithEmailAndPassword(auth, email, password)];
            case 1:
                userCredential = _d.sent();
                user = userCredential.user;
                // Save user token to local storage
                _b = (_a = localStorage).setItem;
                _c = ['userToken'];
                return [4 /*yield*/, user.getIdToken()];
            case 2:
                // Save user token to local storage
                _b.apply(_a, _c.concat([_d.sent()]));
                console.log('User token saved successfully');
                return [3 /*break*/, 4];
            case 3:
                error_1 = _d.sent();
                console.error(error_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Call the signInWithEmailAndPassword function with user email and password
signInWithEmailAndPassword('user@example.com', 'password123');
/* Here is an example code snippet in TypeScript that demonstrates how to handle login with Firebase and protect the home screen from being accessed without authentication using the latest version of Firebase:

```typescript
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Function to check if user is authenticated
const checkAuth = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User is not authenticated'));
      }
    });
  });
};

// Function to handle user login
const login = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};

// Function to handle user logout
const logout = () => {
  return auth.signOut();
};

// Home screen component
const HomeScreen = () => {
  checkAuth()
    .then(() => {
      // User is authenticated, render home screen
    })
    .catch(error => {
      // User is not authenticated, redirect to login screen
      window.location.replace('/login');
    });
};

// Login screen component
const LoginScreen = () => {
  // Handle user login
};

// Example usage
checkAuth()
  .then(() => {
    // User is authenticated, render home screen
    HomeScreen();
  })
  .catch(error => {
    // User is not authenticated, redirect to login screen
    window.location.replace('/login');
  });

// Export functions for use in other components
export { login, logout };
```

In this code snippet, we first initialize Firebase with the configuration object `firebaseConfig`. We then define functions to handle user login, logout, and check if the user is authenticated. The `HomeScreen` component checks if the user is authenticated and redirects to the login screen if not. The `LoginScreen` component handles user login.

You can use these functions and components in your application to handle authentication with Firebase and protect the home screen from being accessed without authentication.
*/ 
