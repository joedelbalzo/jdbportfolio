export const homejs = () => {
  return `import React from "react";
import Title from "./Title";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
import Card from "./Card";
import Form from "./Form";
import Button from "./Button";

function Home() {
  return (
    <div className="Home">
      <Title />
      <Navbar />
      <SideNav />
      <Card />
      <Form />
      <Button />
    </div>
  );
}

export default Home;`;
};
