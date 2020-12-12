import React, { ReactNode } from "react";

type MarginsBreakPoints = {
  base: string | number | MarginOptions;
  sm?: string | number | MarginOptions;
  md?: string | number | MarginOptions;
  lg?: string | number | MarginOptions;
  xl?: string | number | MarginOptions;
  "2xl"?: string | number | MarginOptions;
};

type MarginOptions = {
  t?: number | string;
  b?: number | string;
  r?: number | string;
  l?: number | string;
};

type marginStyles = {
  margin: null | string;
  marginTop: null | string;
  marginBottom: null | string;
  marginLeft: null | string;
  marginRight: null | string;
};

type SpacerOptions = MarginsBreakPoints | MarginOptions | number | string;

function buildMargins(spacerOptions: SpacerOptions) {
  let style: marginStyles = {
    margin: null,
    marginTop: null,
    marginBottom: null,
    marginLeft: null,
    marginRight: null,
  };
  if (typeof spacerOptions === "number") {
    style["margin"] = `${spacerOptions}px`;
  } else if (typeof spacerOptions === "string") {
    if (spacerOptions === "auto") {
      style["margin"] = `${spacerOptions}`;
    } else {
      throw new Error(
        `There is a problem with your Spacer Options [${spacerOptions}]`
      );
    }
  } else {
    for (const [direction, margin] of Object.entries(
      spacerOptions as MarginOptions
    )) {
      if (direction === "t") {
        style[`marginTop`] = getStyleMargin(direction, margin);
      } else if (direction === "b") {
        style[`marginBottom`] = getStyleMargin(direction, margin);
      } else if (direction === "r") {
        style[`marginRight`] = getStyleMargin(direction, margin);
      } else if (direction === "l") {
        style[`marginLeft`] = getStyleMargin(direction, margin);
      } else {
        throw new Error(
          `There is a problem with your Spacer Options [direction:${direction}, margin: ${margin}]`
        );
      }
    }
  }
  return style;
}

function getStyleMargin(
  direction: string,
  margin: string | number | undefined
) {
  if (typeof margin === "number") {
    return `${margin}px`;
  } else if (typeof margin === "string") {
    if (margin === "auto") {
      return `${margin}`;
    } else {
      throw new Error(
        `There is a problem with your Spacer Options [direction:${direction}, margin: ${margin}]`
      );
    }
  } else {
    throw new Error(
      `There is a problem with your Spacer Options [direction:${direction}, margin: ${margin}]`
    );
  }
}

function buildTailwindMargins(spacerOptions: SpacerOptions) {
  if (typeof spacerOptions === "number") {
    if (spacerOptions > 0) {
      return `m-${spacerOptions}`;
    } else {
      return `-m-${spacerOptions}`;
    }
  } else if (typeof spacerOptions === "string") {
    if (spacerOptions === "auto") {
      return `margin:${spacerOptions}; `;
    } else if (spacerOptions === "px") {
      return `margin:${spacerOptions}; `;
    } else {
      throw new Error(
        `There is a problem with your Spacer Options [${spacerOptions}]`
      );
    }
  } else {
    let keys = Object.keys(spacerOptions);
    if (
      keys.includes("base") ||
      keys.includes("sm") ||
      keys.includes("md") ||
      keys.includes("xl") ||
      keys.includes("lg") ||
      keys.includes("2xl")
    ) {
      return Object.entries(spacerOptions as MarginsBreakPoints)
        .map(([breakPoint, marginValues]) => {
          if (
            breakPoint === "base" ||
            breakPoint === "sm" ||
            breakPoint === "md" ||
            breakPoint === "xl" ||
            breakPoint === "lg" ||
            breakPoint === "2xl"
          ) {
            let marginClassNames = "";

            breakPoint = breakPoint === "base" ? "" : `${breakPoint}:`;

            if (typeof marginValues === "number") {
              if (marginValues < 0) {
                marginClassNames += `${breakPoint}-m${marginValues} `;
              } else {
                marginClassNames += `${breakPoint}m-${marginValues} `;
              }
            } else if (typeof marginValues === "string") {
              if (marginValues === "auto") {
                marginClassNames += `${breakPoint}m-${marginValues} `;
              } else if (marginValues === "px") {
                marginClassNames += `${breakPoint}m-${marginValues} `;
              } else {
                throw new Error(
                  `There is a problem with your Spacer Options [breakPoint:${breakPoint}, margin: ${marginValues}]`
                );
              }
            } else {
              return getTailwindMargins(marginValues as MarginOptions)
                .map((marginString) => `${breakPoint}${marginString}`)
                .join(" ");
            }

            return marginClassNames;
          } else {
            throw new Error(
              `There is a problem with your Spacer Options [${spacerOptions}]`
            );
          }
        })
        .join(" ");
    } else if (
      keys.includes("t") ||
      keys.includes("r") ||
      keys.includes("b") ||
      keys.includes("l")
    ) {
      return getTailwindMargins(spacerOptions as MarginOptions).join(" ");
    } else {
      throw new Error(
        `There is a problem with your Spacer Options [${spacerOptions}]`
      );
    }
  }
}

function getTailwindMargins(directions: MarginOptions) {
  return Object.entries(directions).map(([direction, margin]) => {
    let marginClassNames = "";

    if (typeof margin === "number" && margin < 0) {
      marginClassNames += `-`;
    }
    if (direction === "t") {
      marginClassNames += `mt-`;
    } else if (direction === "b") {
      marginClassNames += `mb-`;
    } else if (direction === "r") {
      marginClassNames += `mr-`;
    } else if (direction === "l") {
      marginClassNames += `ml-`;
    } else {
      throw new Error(
        `There is a problem with your Spacer Options [direction:${direction}, margin: ${margin}]`
      );
    }
    if (typeof margin === "number") {
      marginClassNames += `${Math.abs(margin)} `;
    } else if (typeof margin === "string") {
      if (margin === "auto") {
        return `${marginClassNames}${margin} `;
      } else if (margin === "px") {
        return `${marginClassNames}${margin} `;
      } else {
        throw new Error(
          `There is a problem with your Spacer Options [direction:${direction}, margin: ${margin}]`
        );
      }
    } else {
      throw new Error(
        `There is a problem with your Spacer Options [direction:${direction}, margin: ${margin}]`
      );
    }
    return marginClassNames;
  });
}

function Spacer({
  spacerOptions,
  children,
  tailwind = false,
}: {
  spacerOptions: SpacerOptions;
  children: ReactNode;
  tailwind?: boolean;
}) {
  const newChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child?.props,
        className: `${child?.props?.className || ""} ${
          tailwind ? buildTailwindMargins(spacerOptions) : ""
        }`.trim(),
        style: {
          ...(child?.props.style ? child?.props.style : {}),
          ...(!tailwind ? buildMargins(spacerOptions) : {}),
        },
      });
    }
    return child;
  });
  return <>{newChildren}</>;
}

export { Spacer };
