import React, { Component } from 'react'
import { Text, View ,FlatList , Button , Image ,TouchableHighlight, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class Sittings extends Component{
    render(){
        return(
            <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                <Image style={{width:180,height:180}} source={{uri:this.props.route.params.img}}/>
                <Text>歌曲名称:{this.props.route.params.name}</Text>
                <Text>歌手:{this.props.route.params.singer}</Text>
            </View>
        )
    }
}
class Home extends Component {
    constructor(){
        super()
        this.state = {albums:[]}
    }
    _del=(id)=>{
        let data=this.state.albums.splice(0)
        let index=data.findIndex(album=>album.id===id)
        data.splice(index,1)
        this.setState({albums:data})
    }
    _go_del(item){
        let params = item
        this.props.navigation.navigate('Sittings',params)
    }
    componentDidMount(){
        fetch("http://www.cjlly.com:3042/record",{method:'GET'})
        .then(resp=>resp.json())
        .then(albums=>{
            this.setState({albums:albums})
        })
    }
    _renderItem=({item,index})=>{
        return(
            <TouchableHighlight onPress={()=>this._go_del(item)} underlayColor='white'>
                <View style={{height:100,flexDirection:"row",marginTop:0}}>
                <Text>{index+1}</Text>
                    <View style={{justifyContent:"flex-start", flexDirection: "row",alignItems:"center"}}>
                        <Image style={{width:80,height:80,marginRight:30,marginTop:0}} source={{uri:item.img}}/>
                    </View>
                    <View style={{flexDirection: "row",alignItems:"center",justifyContent:'space-between',flexGrow:1}}>
                        <Text>{item.name}</Text>
                        <TouchableHighlight style={{width:50,borderRadius:5}} underlayColor='#blue' activeOpacity={0.5} 
                            onPress={()=>this._del(item.id)}>
                            <Text style={[styles.button,{color:"#BBB"}]}>删除</Text>
                        </TouchableHighlight>
                    </View> 
                </View>
            </TouchableHighlight>   
        )
    }
    render() {
        return (
                <FlatList 
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    data={this.state.albums} 
                    renderItem={this._renderItem}
                />
        )
    }
}
class demo extends React.Component{
    render(){
        return (
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{title:'流行音乐排行榜'}}/>
                <Stack.Screen name="Sittings" component={Sittings} />
              </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
export default demo
const styles = StyleSheet.create({
    button:{backgroundColor:'blue',width:50,height:30,borderRadius:5,textAlign:"center",textAlignVertical:'center'},
})