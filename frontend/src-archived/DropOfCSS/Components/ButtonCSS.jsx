//still needs lots of cleanup

const ButtonWrapperCSS = `
const ButtonWrapper = styled.div\`
display: flex;
justify-content: space-around;
\`;`;

const BasicColorCSS = `
  const styled = styled.a\`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15vw;
  max-width: 100px;
  height: 10vh;
  max-height: 50px;
  color: #fff;
  font-size: calc(8px + 0.5vw);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 2px;
  transition: background-color 0.3s ease;
  background-color: [BG HEX];

  &:hover {
    background-color: #888;
    color: #333;
  }
  \`;`;

const MixedBagCSS = `
  const styled = styled.a\`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15vw;
  max-width: 100px;
  height: 10vh;
  max-height: 50px;
  background-color: transparent;
  color: ${(props) => props.$color};
  font-size: calc(8px + 0.5vw);
  padding: 10px 20px;
  border: none;
  border-radius: 0;
  cursor: pointer;
  margin: 2px;
  \`;

const BasicOutlinedButton = styled(BasicTextButton)
  border: 2px solid ${(props) => props.$color};
  border-radius: 5px;
  \`;

const BasicContainedButton = styled(BasicTextButton)
  background-color: ${(props) => props.$color};
  color: #fff;
  border-radius: 5px;
  \`;`;

const BoldButtonCSS = `
  const styled = styled.h1\`
  height: 70px;
  width: 100%;
  margin: 0;
  font-size: calc(32px + 1vw);
  color: [PRIMARY HEX];
  font-weight: bold;
  text-align: left;
  text-shadow: 2px 2px 2px [TERTIARY HEX];
  text-transform: uppercase;
  @media (max-width: 768px) {
    margin: 4px auto;
    font-size: calc(20px + 3vw);
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  \`;`;

const SocialMediaIconCSS = `
  const styled = styled.h1\`
  height: 70px;
  width: 100%;
  margin: 0;
  font-size: calc(32px + 1vw);
  color: [PRIMARY HEX];
  border-bottom: 4px solid [SECONDARY HEX];
  font-weight: bold;
  text-align: left;
  text-shadow: 2px 2px 2px [BG HEX];
  @media (max-width: 768px) {
    margin: 4px auto;
    font-size: calc(20px + 3vw);
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  \`;`;

const IconButtonCSS = `
  const styled = styled.h1\`
  border-bottom: 8px solid;
  border-image: linear-gradient(
      to right,
      [BG HEX],
      [SECONDARY HEX]
    )
    1;
  border-image-slice: 3;
  height: 70px;
  width: 100%;
  margin: 0;
  font-size: calc(32px + 2vw);
  color: [PRIMARY HEX];
  text-align: right;
  font-variant-caps: all-small-caps;
  @media (max-width: 768px) {
    margin: 4px auto;
    font-size: calc(20px + 3vw);
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  \`;`;

const DisabledIconButtonCSS = `
  const styled = styled.h1\`
  height: calc(70px-4rem);
  width: 100%;
  margin: 0;
  font-size: calc(32px + 1vw);
  background-color: [PRIMARY HEX];
  color: [PRIMARY CONTRAST HEX];
  border-bottom: 4px solid [SECONDARY HEX];
  font-weight: bold;
  text-align: left;
  align-items: center;

  text-shadow: 2px 2px 2px [SECONDARY HEX];
  @media (max-width: 768px) {
    margin: 4px auto;
    font-size: calc(20px + 3vw);
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  \`;`;

const TopBorderTitleCSS = `
  const styled = styled.h1\`
  height: 70px;
  width: calc(100% - 4rem);
  margin: 0;
  padding: 0 2rem;
  font-size: calc(22px + 1vw);
  color: [PRIMARY HEX];
  border-top: 6px solid [SECONDARY HEX];
  border-radius: 0.5rem;
  font-weight: bold;
  text-align: left;
  text-shadow: 2px 2px 1px 1rem [BG HEX];
  font-variant-caps: all-small-caps;
  @media (max-width: 768px) {
    margin: 4px auto;
    font-size: calc(20px + 3vw);
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  \`;`;

export const buttonCSSFunc = (button) => {
  if (button.name === "Basic Color Buttons") {
    return ButtonWrapperCSS + BasicColorCSS;
  } else if (button.name === "Mixed Bag") {
    return ButtonWrapperCSS + MixedBagCSS;
  } else if (button.name === "Bold Buttons") {
    return ButtonWrapperCSS + BoldButtonCSS;
  } else if (button.name === "Social Media Icons") {
    return ButtonWrapperCSS + SocialMediaIconCSS;
  } else if (button.name === "Icon Buttons") {
    return ButtonWrapperCSS + IconButtonCSS;
  } else if (button.name === "Disabled Icon Buttons") {
    return ButtonWrapperCSS + DisabledIconButtonCSS;
  }
};
