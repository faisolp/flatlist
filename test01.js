import React, { Component } from 'react'
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
    renderItem= (item)=>{
        
        return (
        <TouchableOpacity 
            style={{flex:1,flexDirection:'row',marginBottom:3}}
            onPress={()=>ToastAndroid.show(item.email,ToastAndroid.SHORT)}
        >
            <Image style={{width:80,height:80,margin:5}}
                source={{uri:item.picture.medium}} />
            <View style={{flex:1,justifyContent:'center', marginLeft:2}}>
                <Text style={{fontSize:18,color:'green',marginBottom:15}}>
                    {item.name.first} {item.name.last}
                </Text>
                <Text style={{fontSize:16,color:'red',marginBottom:15}}>
                    {item.email}
                </Text>
            </View>
        </TouchableOpacity>
        )
    }
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
                    renderItem={({item})=>this.renderItem(item)}
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