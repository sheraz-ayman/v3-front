import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'
import Toast from 'react-native-toast-message';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';


const SingleProduct = (props) => {
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('');
    const [availabilityText,setAvailabilityText]= useState('');


    useEffect(()=>{
        if (props.route.params.item.countInStock == 0){
            setAvailability(<TrafficLight unavailable></TrafficLight>)
            setAvailabilityText("Unavailable")
        }else if(props.route.params.item.countInStock <= 5){
            setAvailability(<TrafficLight limited></TrafficLight>)
            setAvailabilityText("Limited Stock")
        }
        else{
            setAvailability(<TrafficLight available></TrafficLight>)
            setAvailabilityText("Available")

        }
        return()=>{
            setAvailability(null)
            setAvailabilityText('')
        }
    },[])

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image
                        source={{ uri: item.image ? item.image : 'https://i.pinimg.com/474x/47/32/eb/4732eb1592b116443340917e51eed478.jpg' }}
                        resizeMode='contain'
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentHeader}>{item.name}</Text>
                    <Text style={styles.contentText}>{item.brand}</Text>
                    {/* Add the description, richDescription, and availability here */}
                </View>
                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}>
                        <Text style={{marginRight:10}}>
                            Availability:{availabilityText}
                        </Text>
                        {availability}
                    </View>
                </View>
                <Text>{item.description}</Text>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <View style={styles.left}>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <View style={styles.right}>
                    <EasyButton
                    primary 
                    medium
                        onPress={() => {props.addItemToCart(item)
                            Toast.show({
                                topOffset:60,
                                type:'success',
                                text1:`${item.name} added to Cart`,
                                text2:"Go to your cart to complete the order"
                            })
                    }}
                    >
                        <Text style={{color:"white"}}>Add</Text>
                    </EasyButton>
                </View>
            </View>
        </View>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Add a background color if needed
    },
    image: {
        width: '100%',
        height: 250,
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentHeader: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red',
    },
    availabilityContainer:{
        marginBottom:20,
        alignItems:"center"
    },
    availability:{
        flexDirection:"row",
        marginBottom:10
    }
});

export default connect(null, mapDispatchToProps)(SingleProduct);
