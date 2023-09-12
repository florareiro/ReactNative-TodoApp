import {
  View,
  TextInput,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthErrorCodes,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { Text } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signup = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Check your emails!");
    } catch (error: any) {
      console.log(error);
      if (error.code === AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE) {
        alert("Email already registered");
      } else {
        alert("Sign up failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const signin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Sign in successful!");
    } catch (error: any) {
      console.log(error);
      if (
        error.code === AuthErrorCodes.USER_MISMATCH ||
        error.code === AuthErrorCodes.INVALID_PASSWORD
      ) {
        alert("Incorrect email or password");
      } else {
        alert("Sign in failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          autoCapitalize="none"
          value={email}
        />
        <TextInput
          style={styles.input}
          textContentType="password"
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />

        {loading ? (
          <ActivityIndicator size={"large"} color={"#0000ff"} />
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={signup}>
                <Text style={styles.text}>Create account</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={signin}>
                <Text style={styles.text}>Sign in</Text>
              </Pressable>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginRight: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 3,
    borderRadius: 4,
    elevation: 3,
    marginHorizontal: 2,
    marginVertical: 4,
    backgroundColor: "black",
    flex: 1,
    marginRight: 10,
    width: "auto",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    flex: 1,
    height: 40,
    marginVertical: 6,
    borderRadius: 4,
    padding: 10,
    marginRight: 20,
    backgroundColor: "#fff",
  },
});
