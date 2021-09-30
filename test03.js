import React, { Component ,PureComponent} from 'react'
import { Text, 
        View,
        StyleSheet,
        FlatList,
        Image,
        ActivityIndicator,
        TouchableOpacity,
        ToastAndroid, 
        TextInput,
        } from 'react-native'
import {Center,Input,Box,Pressable,Heading,IconButton,Icon, HStack, Avatar, VStack } from 'native-base';
import {MaterialIcons, FontAwesome5 } from './library/icons';
import {IconsTheme} from "./template/bule"        
import theme from './template/bule';
import { NativeBaseProvider  } from 'native-base';

import Swipeout from 'react-native-swipeout';

class ItemList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            sectionID:"",
            rowID:""
        }
    
        this.swipeoutBtns =  [
            {
               // text:"Button"
              component: <Image style={{flex: 1}} source={{uri: 'https://icons.iconarchive.com/icons/uiconstock/socialmedia/64/Facebook-icon.png'}} />
            }
          ]
    }

    swipeoutOnOpen =(sectionID, rowID) =>{
       
        this.setState({
            sectionID,
            rowID,
        })
    }
    
    render() { 
        return (
            <Swipeout 
                        rowID={this.props.index}
                        sectionID={this.props.item.email}
                        autoClose

                        right={this.swipeoutBtns}
                        onOpen={(sectionID, rowID) => this.swipeoutOnOpen(sectionID, rowID)}
                        onClose={() => {;} }
                        
                        close={!(this.state.sectionID === this.props.item.email && this.state.rowID === this.props.index)}
                        scroll={event => {;}}
                        
                    >
                    <TouchableOpacity 
                        style={{flex:1,flexDirection:'row',marginBottom:3}}
                        onPress={()=>ToastAndroid.show(this.props.item.email,ToastAndroid.SHORT)}
                    >
                        <Image style={{width:80,height:80,margin:5}}
                            source={{uri:this.props.item.picture.medium}} />
                        <View style={{flex:1,justifyContent:'center', marginLeft:2}}>
                            <Text style={{fontSize:18,color:'green',marginBottom:15}}>
                                {this.props.item.name.first} {this.props.item.name.last}
                            </Text>
                            <Text style={{fontSize:16,color:'red',marginBottom:15}}>
                                {this.props.item.email}
                            </Text>
                        </View>
                    </TouchableOpacity>
            </Swipeout>
        )
     }
}

export default class test01 extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:[],
             page:1,
             seed:1,
             error: null,
             loading: true,
             refreshing: false,
        }
        
    }
    
    renderItem= (item,index)=>
        
         (
            
                <ItemList 
                    item={item}
                    index={index}
                />
            
        )
    
    componentDidMount=()=>{
       this.makeRemoteRequest();
    }
    makeRemoteRequest =()=>{
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true });
        fetch(url)
        .then(res=>res.json())
        .then(resJson=>{

            this.setState({
                data:page === 1 ? resJson.results: [...this.state.data, ...resJson.results],
                error: resJson.error || null,
                loading:false,
                refreshing: false
            })
            
        })
        .catch(e=>{
            console.log(e)
            this.setState({ error, loading: false });
        })
    }
    ItemSeparatorComponent=()=>{
        return(
            <View 
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            >

            </View>
        )
    }
    renderHeader = () => {
        return (
        <TextInput
            onChangeText={(search) => this.setState({search})}
         />);
      };
      renderFooter = () => {
        //if (!this.state.loading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
    }
    handleRefresh = () => {
        this.setState(
          {
            page: 1,
            seed: this.state.seed + 1,
            refreshing: true
          },
          () => {
            this.makeRemoteRequest();
          }
        );
    };
    handleLoadMore = () => {
        this.setState(
          {
            page: this.state.page + 1
          },
          () => {
            this.makeRemoteRequest();
          }
        );
    };


    render() {
        if(this.state.data.length ==0)
            return null;
        return (
            <View style={styles.container}>
                <FlatList 

                    ListHeaderComponent={this.renderHeader}
                    
                    data={this.state.data}
                    renderItem={({item,index})=>this.renderItem(item,index)}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.ItemSeparatorComponent}

                    ListFooterComponent={this.renderFooter}

                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}

                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={50}
                    
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