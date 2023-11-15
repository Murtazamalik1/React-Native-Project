import React from "react";
import axios from "axios";
import { Text, View, StyleSheet, FlatList, Image, ImageBackground } from "react-native";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    };
    componentDidMount() {
        this.getApi();
    }

    getApi = async () => {
        await axios.get('https://dummyjson.com/products')
            .then((res) => {
                const ApiResponse = res.data.products
                console.log(ApiResponse)
                this.setState({
                    data: res.data.products,
                });
            })
            .catch(error => {
                console.log('fetching data error', error)
            })
    }
    render() {
        return (
            <View>
                <FlatList
                    // style={styles.Container}
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style ={styles.Container}>
                            <View style={styles.productSection}>
                                <View style = {styles.productimgSection}>
                                <Image source={require('../Components/assets/newpHONE.jpg')} style={styles.imageStyle}/>
                                </View>
                                <View style={styles.productDetailsSection}>
                                    <Text style={styles.brand}>Brand {item.brand}</Text>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.rating}>rating {item.rating}</Text>
                                    <Text style={styles.price}>${item.price} <Text style={{fontSize:15}}>(30% off)</Text></Text>
                                    <Text style={styles.description}>{item.description}</Text>
                                    <Text style= {styles.category}>{item.category}</Text>
                                </View>
                            </View>
                        </View>
                        
                    )}
                />
            </View>

        )
    }
}
const styles = StyleSheet.create({
    Container: {
     padding: 2,
    },
    imageStyle: {
        width: '100%',
        height: 200,
        resizeMode: 'contain'
    },
    productSection: {
        borderWidth:1,
        borderColor:'#dddddd',
        flexDirection:'row',
        marginVertical:15,
    },
    productimgSection:{
        width:'40%',
        backgroundColor:'#dddddd'
    },
    productDetailsSection:{
        width:'60%',
        padding:10
    },
    brand:{
        color:'black',
        fontSize:16
    },
    title:{
    fontSize:16    
    },
    rating:{
        fontSize:16,
        color:'#ffa534'
    },
    price:{
        fontSize:25,
        fontWeight:"bold"
    },
    description:{
        fontSize:16
    },
    category:{
        color:"#0096fc",
        fontSize:18
    }

})
export default HomeScreen;