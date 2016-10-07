# RN-Search-Option-Bar
<br>

* `npm install rn-search-option-bar --save`

<br>

* prop `options` is required and is an array of strings for the search options

* prop `onPress` is required and will be called with the corresponding Text

* prop `buttonStyle` is required styles for the option buttons

* prop `containerStyle` is required styles for the container

#### How it works

* The first option shows as selected by default
* The `buttonStyle` `backgroundColor` will be applied to the selected option
* The `containerStyle` `backgroundColor` will be applied to the text of the selected option.

So at minimum, I suggest `containerStyle={{backgroundColor:'white'}}` and `buttonStyle={{borderWidth:1}}`

```js
import React, { Component } from 'react';

import SearchOptionBar from 'rn-search-option-bar';

class SearchOptionBarExample extends Component {
  render(){
    return(
      <SearchOptionBar
      options={
        ['This','That','Super Long Option Cut Off Because Of Fixed Button Width']
      }
      onPress={
        (option) => console.log('You Pressed ' + option)
      }
      containerStyle={{
        backgroundColor:'white',
        paddingVertical:5,
      }}
      buttonStyle={{
        borderWidth:1,
        borderRadius:10,
        height: 30,
        width: 80,
      }}
      showsHorizontalScrollIndicator={true}
      />
    )
  };

}
```
