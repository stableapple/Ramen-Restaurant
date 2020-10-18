import React, { Component } from 'react';

const ItemList = (props) => {
    return(
      <div>
         <h1>{props.newItem.brand}</h1>
         <h1>{props.newItem.variety}</h1>
         <h1>{props.newItem.country}</h1>
         <h1>{props.newItem.stars}</h1>
    </div>
    )
}
export default ItemList;