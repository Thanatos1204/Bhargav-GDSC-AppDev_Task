import { StatusBar } from 'expo-status-bar';
import {
    InnerContainer,    
    PageTitle,
    SubTitle,
    StyledFormArea,   
    StyledButton,
    ButtonText,    
    Avatar,
    Line,
    WelcomeImage,
    WelcomeContainer
    
} from './../components/style.js';





const Welcome= ({navigation})=> {
    return(
        <>
            <StatusBar style="light"/>
                <InnerContainer>
                    <WelcomeImage resizeMode='cover' source = {require('./../assets/pexels-small.jpg')}/>
                    
                        <WelcomeContainer>                  
                            <PageTitle welcome = {true}>Welcome to GDSC APP </PageTitle>
                            <SubTitle welcome = {true}>Ben Dover</SubTitle>
                            <SubTitle welcome = {true}>ibendover@gmail.com</SubTitle>
                            <StyledFormArea>
                            <Avatar resizeMode = 'cover' source ={require('./../assets/gdsc-social-share.png')}></Avatar>
                            <Line/>
                                <StyledButton onPress = {() => {navigation.navigate('Login')}}>
                                    <ButtonText> Logout </ButtonText>
                                </StyledButton>
                                                                
                            </StyledFormArea>
                        

                    </WelcomeContainer>
                </InnerContainer>
        </>
    );
};
export default Welcome;