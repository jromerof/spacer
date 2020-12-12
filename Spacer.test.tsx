import { render } from "@testing-library/react";
import React from "react";
import { Spacer } from "../Spacer";

test("renders a div with margin:10px", () => {
  const { getByTestId } = render(
    <Spacer spacerOptions={5}>
      <div data-testid="5margin">
        <p>I have margins</p>
      </div>
    </Spacer>
  );
  const div = getByTestId(/5margin/);
  expect(div).toHaveStyle({ margin: "5px" });
});

test("renders a div with margin bottom and top 10px and left right auto", () => {
  const { getByTestId } = render(
    <Spacer spacerOptions={{ t: 10, b: 10, l: "auto", r: "auto" }}>
      <div data-testid="margin-div">
        <p>I have margins</p>
      </div>
    </Spacer>
  );
  const div = getByTestId(/margin-div/);
  expect(div).toHaveStyle({
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "auto",
    marginRight: "auto",
  });
});

test("renders a div with tailwind classes for margin:1rem (m-4)", () => {
  const { getByTestId } = render(
    <Spacer spacerOptions={4} tailwind={true}>
      <div data-testid="margin-div">
        <p>I have margins</p>
      </div>
    </Spacer>
  );
  const div = getByTestId(/margin-div/);
  expect(div).toHaveClass("m-4");
});

test("renders a div with tailwind classes m-1 to m-5 for different breakpoints", () => {
  const { getByTestId } = render(
    <Spacer
      spacerOptions={{ base: 1, sm: 2, md: 3, xl: 4, "2xl": 5 }}
      tailwind={true}
    >
      <div data-testid="margin-div">
        <p>I have margins</p>
      </div>
    </Spacer>
  );
  const div = getByTestId(/margin-div/);
  expect(div).toHaveClass("m-1");
  expect(div).toHaveClass("sm:m-2");
  expect(div).toHaveClass("md:m-3");
  expect(div).toHaveClass("xl:m-4");
  expect(div).toHaveClass("2xl:m-5");
});

test("renders a div with tailwind classes mt-1 mb-2 ml-auto -mr-2 for every direction adn for different breakpoints", () => {
  const { getByTestId } = render(
    <Spacer
      spacerOptions={{
        base: { t: 1, b: 2, l: "auto", r: -2 },
        sm: { t: 1, b: 2, l: "auto", r: -2 },
        md: { t: 1, b: 2, l: "auto", r: -2 },
        xl: { t: 1, b: 2, l: "auto", r: -2 },
        "2xl": { t: 1, b: 2, l: "auto", r: -2 },
      }}
      tailwind={true}
    >
      <div data-testid="margin-div">
        <p>I have margins</p>
      </div>
    </Spacer>
  );
  const div = getByTestId(/margin-div/);
  expect(div).toHaveClass("mt-1 mb-2 ml-auto -mr-2 ");
  expect(div).toHaveClass("sm:mt-1 sm:mb-2 sm:ml-auto sm:-mr-2 ");
  expect(div).toHaveClass("md:mt-1 md:mb-2 md:ml-auto md:-mr-2 ");
  expect(div).toHaveClass("xl:mt-1 xl:mb-2 xl:ml-auto xl:-mr-2 ");
  expect(div).toHaveClass("2xl:mt-1 2xl:mb-2 2xl:ml-auto 2xl:-mr-2 ");
});
