import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Formik } from "formik";
import { Octicons,Ionicons,Fontisto } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper.js";
import { ActivityIndicator, Text, View } from "react-native";
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from './../components/style.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig.js";


const {brand,primary,darkLight} = Colors;


const Login= ({navigation})=> {

    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async (email,password) =>{
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    
    return(
        <KeyboardAvoidingWrapper><StyledContainer>
            <StatusBar style="dark"/>
                <InnerContainer>
                    <PageLogo resizeMode = 'cover' source ={require('./../assets/gdsc-social-share.png')}></PageLogo>
                    <PageTitle>Welcome to App Dev</PageTitle>
                    <SubTitle>Login Here</SubTitle>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values) => {
                            console.log(values);
                            signIn(values.email, values.password);
                            navigation.navigate('Welcome');                            
                        }}

                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                                <MyTextInput
                                    label="Email Address"
                                    icon = "mail"
                                    placeholder="abc@email.com"
                                    placeholderTextColor = {darkLight}
                                    onChangeText = {handleChange('email')}
                                    onBlur = {handleBlur('email')}
                                    value = {values.email}
                                    keyboardType = "email-address" 
                                ></MyTextInput>

                                <MyTextInput
                                    label="Password"
                                    icon = "lock"
                                    placeholder="* * * * * * * * * *"
                                    placeholderTextColor = {darkLight}
                                    onChangeText = {handleChange('password')}
                                    onBlur = {handleBlur('password')}
                                    value = {values.password}
                                    secureTextEntry = {hidePassword}
                                    isPassword = {true}
                                    hidePassword = {hidePassword}
                                    setHidePassword = {setHidePassword} 
                                ></MyTextInput>
                                <MsgBox>...</MsgBox>
                                {loading ? <Text>Logging In ...</Text> : (
                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText> Login </ButtonText>
                                    </StyledButton>
                                )}

                                
                                <Line/>

                                <StyledButton google={true} onPress = {handleSubmit}>
                                    <Fontisto name="google" color={primary} size={25} />
                                    <ButtonText google={true}> Sign in with Google </ButtonText>
                                </StyledButton>
                                <ExtraView>
                                    <ExtraText> Don't have an account already? </ExtraText>
                                    <TextLink onPress={()=>navigation.navigate('Signup')}>
                                        <TextLinkContent> Sign Up</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>)
                        }

                    </Formik>
                </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({label, icon, hidePassword, setHidePassword, isPassword,...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress = {() => setHidePassword(!hidePassword)}> 
                    <Ionicons size={30} name={hidePassword ? 'md-eye-off' : 'md-eye'} color={darkLight}/>
                </RightIcon>
            )}
        </View>
    );
}

export default Login;