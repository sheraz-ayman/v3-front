import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from "../../Shared/Form/input"; 
import Error from '../../Shared/Error';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.actions';

const Login = (props) => {
    const context = useContext(AuthGlobal);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
            props.navigation.navigate("UserProfile"); 
        }
        
    }, [context.stateUser.isAuthenticated]);

    const handleSubmit = () => {
        const user = {
            email,
            password
        }
        if (email === '' || password === '') {
            setError('Please fill in your credentials');
        } else {
            loginUser(user, context.dispatch);
        }
    }

    return (
        <FormContainer title="Login">
            <Input
                placeholder={'Enter Email'}
                name={'email'}
                id={'email'}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <Input
                placeholder={'Enter Password'}
                name={'password'}
                id={'password'}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
                <EasyButton primary large onPress ={()=>handleSubmit()}><Text style={{color:'white'}}>Login</Text></EasyButton>
            </View>

            <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
                <Text style={styles.middleText}>Don't have an account yet?</Text>
                <EasyButton secondary large onPress={() => props.navigation.navigate('Register')} color="#2685FF" ><Text style={{color:"white"}}>Register</Text></EasyButton>
            </View>
        </FormContainer>
    );
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        alignItems: 'center'
    },
    middleText: {
        marginBottom: 20,
        alignSelf: 'center'
    },
});

export default Login;
