const GenericCSS = `
  const styled = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 3px solid [PRIMARY HEX];
  background-color: [BG HEX]0D;
  color: [BG CONTRAST HEX];
  border-radius: 6px;
  padding: 4px;
  box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  
  &:hover{
    transform: scale(1.01);
  }
  
  img {
    width: 95%;
    height: auto;
    box-shadow: 0 3px 3px 0px [SECONDARY HEX];
    margin: 1rem 0.5rem;
  }
  .cardcontent{
      flex-direction: column;
      flex-grow: 1;
      text-align: center;
      justify-content: center;
      font-size: calc(10px + 0.5vw);
      padding: 8px;
      @media screen and (max-width: 550px) {
        font-size: calc(12px + 2.5vw);
      }
  }
  .action-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: .5rem;
      padding: .25rem;
      @media screen and (max-width: 550px) {
        font-size: calc(12px + 2.5vw);
      }
  }
  .button {
      display: flex;
      justify-content: space-between;
      align-self: stretch;
      align-items: center;
      font-size: calc(6px + 0.5vw);
      background-color: 0;
      border: none;
      color: black;
      margin: 4px;
      padding: .3rem;
      border-radius: 5px;
      @media screen and (max-width: 550px) {
        font-size: calc(10px + 2.5vw);
      }
  
      &:hover{
        background-color: [BG HEX]40;
        color: [BG CONTRAST HEX];
        cursor: pointer;
      }
    }
  }
  \`;`;

const GradientCSS = `
const styled = styled.div\`

display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
border: 3px solid [PRIMARY HEX];
background: linear-gradient(
  to right,
  [BG HEX],
  [SECONDARY HEX]
);
color: [SECONDARY CONTRAST HEX];
border-radius: 6px;
padding: 4px;
box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.1);
box-sizing: border-box;

&:hover{
  transform: scale(1.01);
}

img {
  width: 95%;
  height: auto;
  box-shadow: 0 3px 3px 0px [SECONDARY HEX];
  margin: 1rem 0.5rem;
}
.cardcontent{
    flex-direction: column;
    flex-grow: 1;
    text-align: center;
    justify-content: center;
    font-size: calc(10px + 0.5vw);
    padding: 8px;
    @media screen and (max-width: 550px) {
      font-size: calc(12px + 2.5vw);
    }
}
.action-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .5rem;
    padding: .25rem;
    @media screen and (max-width: 550px) {
      font-size: calc(12px + 2.5vw);
    }
}
.button {
    display: flex;
    justify-content: space-between;
    align-self: stretch;
    align-items: center;
    font-size: calc(6px + 0.5vw);
    border: 1px solid [PRIMARY HEX];
    color: [SECONDARY CONTRAST HEX];
    margin: 4px;
    padding: .3rem;
    border-radius: 5px;
    @media screen and (max-width: 550px) {
      font-size: calc(10px + 2.5vw);
    }

    &:hover{
      background-color: [BG HEX]40;
      color: [BG CONTRAST HEX];
      cursor: pointer;
    }
  }
}
  \`;`;

const SubtleCSS = `
const styled = styled.div\`

display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
border: 1px solid [PRIMARY HEX];
background-color: [BG HEX]0D;
color: [BG CONTRAST HEX];
border-radius: 3px;
padding: 4px;
box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.1);
box-sizing: border-box;

&:hover{
  transform: scale(1.01);
}

img {
  width: 95%;
  height: auto;
  box-shadow: 0 2px 2px 0px [SECONDARY HEX];
  margin: 1rem 0.5rem;
}
.cardcontent{
    flex-direction: column;
    flex-grow: 1;
    text-align: center;
    justify-content: center;
    font-size: calc(10px + 0.5vw);
    padding: 8px;
    @media screen and (max-width: 550px) {
      font-size: calc(12px + 2.5vw);
    }
}
.action-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .5rem;
    padding: .25rem;
    @media screen and (max-width: 550px) {
      font-size: calc(12px + 2.5vw);
    }
}
.button {
    display: flex;
    justify-content: space-between;
    align-self: stretch;
    align-items: center;
    font-size: calc(6px + 0.5vw);
    background-color: 0;
    border: none;
    color: black;
    margin: 4px;
    padding: .3rem;
    border-radius: 5px;
    @media screen and (max-width: 550px) {
      font-size: calc(10px + 2.5vw);
    }

    &:hover{
      background-color: [BG HEX]40;
      color: [BG CONTRAST HEX];
      cursor: pointer;
    }
  }
}
  \`;`;

const PhotoCSS = `
const styled = styled.div\`

display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
border: 1px solid [PRIMARY HEX];
background-color: [BG HEX]0D;
color: [BG CONTRAST HEX];
border-radius: 3px;
padding: 2px;
box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.1);
box-sizing: border-box;

.image-wrapper {
  width: 95%;
  margin: 0;

  img {
    width: 100%;
    height: auto;
    box-shadow: 0 2px 2px 0px [SECONDARY HEX];
  }
}

.cardcontent {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: center;
  justify-content: center;
  font-size: calc(10px + 0.5vw);
  padding: 8px;

  @media screen and (max-width: 550px) {
    font-size: calc(12px + 2.5vw);
  }
}

.action-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding: 0.25rem;

  @media screen and (max-width: 550px) {
    font-size: calc(12px + 2.5vw);
  }
}

.button {
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
  font-size: calc(6px + 0.5vw);
  background-color: 0;
  border: none;
  color: black;
  margin: 4px;
  padding: 0.3rem;
  border-radius: 5px;

  @media screen and (max-width: 550px) {
    font-size: calc(10px + 2.5vw);
  }

  &:hover {
    background-color: [BG HEX]40;
    outline: 1px solid green;
    cursor: pointer;
  }
}
  \`;`;

const SocialMediaPhotoCSS = `
const styled = styled.div\`

border: 1px solid #dbdbdb;
border-radius: 3px;
background-color: white;
box-sizing: border-box;
margin-bottom: 30px;
font-family: Arial, sans-serif;

.card-header {
  display: flex;
  align-items: center;
  padding: 16px;

  img {
    border-radius: 50%;
    height: 32px;
    width: 32px;
    margin-right: 16px;
  }

  .username {
    font-weight: 400;
    font-size: calc(6px + 1vw);
  }
}

.card-image img {
  width: 100%;
  height: auto;
}

.card-content {
  padding: 16px;

  .icons {
    display: flex;
    gap: 16px;
    margin-bottom: 8px;
  }

  .icon {
    height: 20px;
    cursor: pointer;
  }

  .caption {
    margin-bottom: 8px;
    font-size: calc(6px + 1vw);
  }

  #likesandcomments {
    font-size: 14px;

    .likes {
      font-weight: 600;
      margin-bottom: 4px;
    }
  }
}
  \`;`;

export const cardCSSFunc = (card) => {
  if (card.name === "Product - Generic") {
    return GenericCSS;
  } else if (card.name === "Product - Gradient") {
    return GradientCSS;
  } else if (card.name === "Product Card Subtle") {
    return SubtleCSS;
  } else if (card.name === "Photo Card") {
    return PhotoCSS;
  } else if (card.name === "Social Media Photo") {
    return SocialMediaPhotoCSS;
  }
};
