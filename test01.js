import React, { Component } from 'react'
import { Text, 
        View,
        StyleSheet,
        FlatList,
        Image, 
        } from 'react-native'

export default class test01 extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:[{key:'a'},{key:'b'}],
             page:1,
             seed:1,
             
        }
    }
    renderItem= (item)=>{
        if(item && item.picture) return (
        <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
            <Image style={{width:80,height:80,margin:5}}
                source={{uri:item.picture.medium}} />
            <View style={{flex:1,justifyContent:'center', marginLeft:2}}>
                <Text style={{fontSize:18,color:'green',marginBottom:15}}>{item.name.first} {item.name.last}</Text>
                <Text style={{fontSize:16,color:'red',marginBottom:15}}>{item.email}</Text>
            </View>
        </View>
        )
    }
    componentDidMount=()=>{
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        
        fetch(url)
        .then(res=>res.json())
        .then(resJson=>{
            this.setState({data: resJson.results})
           
        })
        .catch(e=>{
            console.log(e)
        })
    }
    ItemSeparatorComponent=()=>{
        
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                    data={this.state.data}
                    renderItem={({item})=>this.renderItem(item)}
                    keyExtractor={(item,index)=>index}
                    
                />

               
               
            </View>
        )
    }
}

const styles =StyleSheet.create({
    container:{
       
        flex:1,
       
        backgroundColor:'#F5FCFF'
    }
})