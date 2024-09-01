


/** 
 * https://www.youtube.com/watch?v=MGBfr3WwIyw
 * 
 * "npm install firebase @react-native-firebase/app @react-native-firebase/auth"
 * 
 * firebase config on app.js
 * 
 * import { initializeApp } from "@firebase/app";
 * import { 
 *    getAuth, 
 *    createUserWithEmailAndPassword, 
 *    signInWhitEmailAndPassword, 
 *    onAuthStateChanged, 
 *    signOut 
 * } from "@firebase/auth";
 * 
 * const app = initializeApp(firebaseConfig);
 * 
 * 
 */
const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
   return (
     <View style={styles.authContainer}>
        <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
 
        <TextInput
         style={styles.input}
         value={email}
         onChangeText={setEmail}
         placeholder="Email"
         autoCapitalize="none"
       />
       <TextInput
         style={styles.input}
         value={password}
         onChangeText={setPassword}
         placeholder="Password"
         secureTextEntry
       />
       <View style={styles.buttonContainer}>
         <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
       </View>
 
       <View style={styles.bottomContainer}>
         <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
           {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
         </Text>
       </View>
     </View>
   );
 }
 
 
 const AuthenticatedScreen = ({ user, handleAuthentication }) => {
   return (
     <View style={styles.authContainer}>
       <Text style={styles.title}>Welcome</Text>
       <Text style={styles.emailText}>{user.email}</Text>
       <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
     </View>
   );
 };
 export default App = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [user, setUser] = useState(null); // Track user authentication state
   const [isLogin, setIsLogin] = useState(true);
 
   const auth = getAuth(app);
   useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (user) => {
       setUser(user);
     });
 
     return () => unsubscribe();
   }, [auth]);
 
   
   const handleAuthentication = async () => {
     try {
       if (user) {
         // If user is already authenticated, log out
         console.log('User logged out successfully!');
         await signOut(auth);
       } else {
         // Sign in or sign up
         if (isLogin) {
           // Sign in
           await signInWithEmailAndPassword(auth, email, password);
           console.log('User signed in successfully!');
         } else {
           // Sign up
           await createUserWithEmailAndPassword(auth, email, password);
           console.log('User created successfully!');
         }
       }
     } catch (error) {
       console.error('Authentication error:', error.message);
     }
   };
 
   return (
     <ScrollView contentContainerStyle={styles.container}>
       {user ? (
         // Show user's email if user is authenticated
         <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
       ) : (
         // Show sign-in or sign-up form if user is not authenticated
         <AuthScreen
           email={email}
           setEmail={setEmail}
           password={password}
           setPassword={setPassword}
           isLogin={isLogin}
           setIsLogin={setIsLogin}
           handleAuthentication={handleAuthentication}
         />
       )}
     </ScrollView>
   );
 }