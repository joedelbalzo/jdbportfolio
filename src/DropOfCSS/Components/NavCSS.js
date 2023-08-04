const TitleSubtitleCSS = `
  const styled = styled.div\`
  display: flex;
  height: 90px;
  color: [PRIMARY HEX];
  font-weight: bold;
  text-align: left;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    font-size: calc(20px + 1vw);
    text-align: center;
  }

  h1 {
    color: [PRIMARY HEX];
    margin: 0 2px;
    padding: 0;
    font-size: calc(20px + 2vw);
    display: block;
  }

  h2 {
    margin: 0 1rem;
    padding: 0;
    font-size: calc(10px + 1vw);
    display: block;
    text-align: left;

    color: [TERTIARY HEX];
  }
  \`;`;

const TextShadowCSS = `
  const styled = styled.h1\`
  height: 70px;
  width: 100%;
  margin: 0;

  font-size: calc(32px + 1vw);
  color: [PRIMARY HEX];
  font-weight: bold;
  text-align: left;
  margin: 10px 0;
  text-shadow: 2px 2px 4px [SECONDARY HEX];
  \`;`;

const UppercaseTitleCSS = `
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

const UnderlineTitleCSS = `
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

const BorderGradientTitleCSS = `
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

const DarkModeTitleCSS = `
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

export const navCSSFunc = (nav) => {
  if (nav.name === "Title & Subtitle") {
    return TitleSubtitleCSS;
  } else if (nav.name === "Text Shadow") {
    return TextShadowCSS;
  } else if (nav.name === "Uppercase") {
    return UppercaseTitleCSS;
  } else if (nav.name === "Underline") {
    return UnderlineTitleCSS;
  } else if (nav.name === "Border Gradiant") {
    return BorderGradientTitleCSS;
  } else if (nav.name === "Dark Mode") {
    return DarkModeTitleCSS;
  } else if (nav.name === "Top Border") {
    return TopBorderTitleCSS;
  }
};
