import React, { useState } from "react";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper.js";
import { StatusBar } from 'expo-status-bar';
import { Formik } from "formik";
import { Octicons,Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, TouchableOpacity, Text } from "react-native";
import {
    StyledContainer,
    InnerContainer,    
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig.js";

const {brand,darkLight} = Colors;


const Signup= ({navigation})=> {

    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState( new Date(2023, 8,8 ));
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signUp = async (email,password) =>{
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }


    const [dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        setShow(false);
        setDate(currentDate);
        setDob(currentDate);

    }

    const showDatePicker = () =>{
        setShow(true);
    }

    return(
        <KeyboardAvoidingWrapper><StyledContainer>
            <StatusBar style="dark"/>
                <InnerContainer>
                    
                    <PageTitle>Welcome to App Dev</PageTitle>
                    <SubTitle>Register Account</SubTitle>

                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        is24Hour={true}
                        onChange={onChange}
                        />
                    )}

                    <Formik
                        initialValues={{fullName: '',email: '',dateOfBirth: '', password: '', confirmPassword:'',}}
                        onSubmit={(values) => {
                            console.log(values);
                            signUp(values.email, values.password);
                            
                        }}

                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                                <MyTextInput
                                    label="Full Name"
                                    icon = "person"
                                    placeholder="Jane Doe"
                                    placeholderTextColor = {darkLight}
                                    onChangeText = {handleChange('fullName')}
                                    onBlur = {handleBlur('fullName')}
                                    value = {values.fullName}
                                    keyboardType = "default" 
                                ></MyTextInput>

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
                                    label="Date of Birth"
                                    icon = "calendar"
                                    placeholder="DD - MM - YYYY"
                                    placeholderTextColor = {darkLight}
                                    onChangeText = {handleChange('dateOfBirth')}
                                    onBlur = {handleBlur('dateOfBirth')}
                                    value = {dob ? dob.toDateString() : ''}
                                    isDate = {true}
                                    editable = {false}
                                    showDatePicker = {showDatePicker}
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

                                <MyTextInput
                                    label=" Confirm Password"
                                    icon = "lock"
                                    placeholder="* * * * * * * * * *"
                                    placeholderTextColor = {darkLight}
                                    onChangeText = {handleChange('confirmPassword')}
                                    onBlur = {handleBlur('confirmPassword')}
                                    value = {values.confirmPassword}
                                    secureTextEntry = {hidePassword}
                                    isPassword = {true}
                                    hidePassword = {hidePassword}
                                    setHidePassword = {setHidePassword} 
                                ></MyTextInput>

                                <MsgBox>...</MsgBox>
                                {loading ? <Text  color="#0000ff" > USER REGISTERED PLEASE LOG IN </Text>
                                    :  (
                                            <StyledButton onPress = {handleSubmit}>
                                                <ButtonText> SignUp </ButtonText>
                                            </StyledButton>
                                    ) 
                                }
                                <Line/>

                                
                                <ExtraView>
                                    <ExtraText> Already have an account ? </ExtraText>
                                    <TextLink onPress={()=>navigation.navigate('Login')}>
                                        <TextLinkContent> Login Here </TextLinkContent>
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

const MyTextInput = ({label, icon, hidePassword, setHidePassword, isPassword,isDate,showDatePicker,...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props}/>}
            {isDate && <TouchableOpacity onPress={showDatePicker}>
                <StyledTextInput {...props}/>
                </TouchableOpacity>}
            {isPassword && (
                <RightIcon onPress = {() => setHidePassword(!hidePassword)}> 
                    <Ionicons size={30} name={hidePassword ? 'md-eye-off' : 'md-eye'} color={darkLight}/>
                </RightIcon>
            )}
        </View>
    );
}

export default Signup; 