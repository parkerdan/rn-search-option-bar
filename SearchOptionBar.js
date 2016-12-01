'use strict'

import React from 'react';
import {
Text,
View,
ScrollView,
TouchableOpacity,
StyleSheet
} from 'react-native';

import {debounce} from 'lodash';


// the 'onPress' will be called with the corresponding 'options' String as the argument
// the first 'option' will be highlighted as the default selection

const propTypes = {
options: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
onPress: React.PropTypes.func.isRequired,
containerStyle: React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.number]).isRequired,
buttonStyle: React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.number]).isRequired,
showsHorizontalScrollIndicator: React.PropTypes.bool,
textStyle:React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.number]).isRequired,
};

export default class SearchOptionBar extends React.Component {

constructor(props){
  super(props);
  this.state = {
    selectedTab: props.options[0],
  };
};

selectNewTab = (option) => {
  this.setState({ selectedTab: option });
};

render(){

  let _this = this;
  let { onPress, buttonStyle, containerStyle, textStyle } = this.props

  let options = this.props.options.map( function(option,i){
    return(
      <TabOption
        key={ i }
        index={ i }
        option={ option }
        selectedTab={ _this.state.selectedTab }
        onPress={ onPress }
        selectNewTab={ _this.selectNewTab }
        buttonStyle={ buttonStyle }
        textStyle={ textStyle }
      />
    )
  });

  return(
    <View style ={ containerStyle }>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator}
        contentContainerStyle={{alignItems:'center'}}>
        {options}
      </ScrollView>
    </View>
  )
};
};

SearchOptionBar.propTypes = propTypes;

class TabOption extends React.Component {

constructor(props){
  super(props);
  this.handlePress = debounce(this.handlePress.bind(this),200,{leading:true} );
  this.state ={
    backgroundColor: StyleSheet.flatten(props.buttonStyle).backgroundColor,
    textColor: StyleSheet.flatten(props.textStyle).color
  }
};

setBackgroundColor(){
  if (this.props.selectedTab === this.props.option) {
    return {backgroundColor: this.state.backgroundColor }
  } else {
    return { backgroundColor: 'transparent' }
  }
};

setTextColor(){
  if (this.props.selectedTab === this.props.option) {
    return {color: this.state.textColor }
  } else {
    return { color: this.state.backgroundColor }
  }
};

handlePress(){
  let option = this.props.option;
  this.props.onPress(option);
  this.props.selectNewTab(option);
};

render(){
  let { buttonStyle, textStyle, option } = this.props
  return(
    <View style={{paddingHorizontal: 4}}>
      <TouchableOpacity
        onPress={this.handlePress}
        style={[{
          alignItems: 'center',
          justifyContent: 'center',
        },buttonStyle,this.setBackgroundColor()]}>
        <Text style={[textStyle,this.setTextColor()]} numberOfLines={1}>
          {option}
        </Text>
      </TouchableOpacity>
    </View>
  )
};
};
