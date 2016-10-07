'use strict'

import React, { Component, PropTypes } from 'react';
import {
 Text,
 View,
 ScrollView,
 Dimensions,
 TouchableOpacity,
 PixelRatio
} from 'react-native';

import {debounce} from 'lodash';

const { height,width } = Dimensions.get('window');

// the 'onPress' will be called with the corresponding 'options' String as the argument
// the first 'option' will be highlighted as the default selection

const propTypes = {
 options: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
 onPress: React.PropTypes.func.isRequired,
 containerStyle: React.PropTypes.object.isRequired,
 buttonStyle: React.PropTypes.object.isRequired,
 showsHorizontalScrollIndicator: React.PropTypes.bool,
};

export default class SearchOptionBar extends Component {

 constructor(props){
   super(props);
   this.selectNewTab = this.selectNewTab.bind(this);
   this.state = {
     selectedTab: props.options[0],
   };
 };

 selectNewTab(option){
   this.setState({ selectedTab: option });
 };

 render(){

   let _this = this;

   let options = this.props.options.map( function(option,i){
     return(
       <TabOption key={i}
         index={i}
         scrollView={ _this.scrollView}
         option={option}
         selectedTab={ _this.state.selectedTab }
         onPress={ _this.props.onPress }
         selectNewTab={ _this.selectNewTab }
         buttonStyle={_this.props.buttonStyle}
         textColor={
           (_this.props.containerStyle.backgroundColor) ? _this.props.containerStyle.backgroundColor:'black'
         }
       />
     )
   });

   return(
     <View style ={[{alignItems:'center'},this.props.containerStyle]}>
       <ScrollView
         horizontal={true}
         showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator}
         contentContainerStyle={{
           alignItems:'center',
         }}>
         {options}
       </ScrollView>
     </View>
   )
 };
};

SearchOptionBar.propTypes = propTypes;

class TabOption extends Component {

 constructor(props){
   super(props);
   this.handlePress = debounce(this.handlePress.bind(this),200,{leading:true} );
   this.state ={
   }
 };

 setBackgroundColor(){
   if (this.props.selectedTab === this.props.option) {
     return {backgroundColor: this.props.buttonStyle.backgroundColor }
   } else {
     return { backgroundColor: 'transparent' }
   }
 };

 setTextColor(){
   if (this.props.selectedTab === this.props.option) {
     return {color: this.props.textColor }
   } else {
     return { color: this.props.buttonStyle.backgroundColor }
   }
 };

 handlePress(){
   let option = this.props.option;
   this.props.onPress(option);
   this.props.selectNewTab(option);
 };

 render(){
   return(
     <View style={{paddingHorizontal: 4}}>
       <TouchableOpacity
         onPress={this.handlePress}
         style={[{
           alignItems: 'center',
           justifyContent: 'center',
         },this.props.buttonStyle,this.setBackgroundColor()]}>
         <Text style={this.setTextColor()} numberOfLines={1}>
          {this.props.option}
         </Text>
       </TouchableOpacity>
     </View>
   )
 };
};
