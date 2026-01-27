export const download = (jsxString, css, component) => {
  return `import React from "react";
import styled from "styled-components";

//remember, you have to replace your colors!


${css}
  
const My${component.type[0].toUpperCase() + component.type.slice(1)} = () =>{
  return(
    ${jsxString}
  )
}

export default My${component.type[0].toUpperCase() + component.type.slice(1)}
`;
};
