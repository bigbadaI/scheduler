import React from 'react';
import { render, waitForElement, getByText } from "@testing-library/react";
import Application from "components/Application";

describe("Appointment", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday")).then(() => { })
  })
})
