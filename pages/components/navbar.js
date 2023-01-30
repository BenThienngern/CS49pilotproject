import React from "react";
import { Navbar, Text } from "@nextui-org/react";

export default function Navigatiionbar() {
  return (
    <Navbar isBordered variant={"sticky"}>
      <Text b color="inherit" hideIn="xs">
        CS 49 Web Page
      </Text>
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="/">Home Page</Navbar.Link>
        <Navbar.Link href="/personal">Personal Page</Navbar.Link>
      </Navbar.Content>
    </Navbar>
  );
}
