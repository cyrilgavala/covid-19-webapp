import { createGlobalStyle } from "styled-components";

export const darkTheme = {
    darker: "#141d30",
    dark: "#1c2842",
    light: "#f3eae5",
};

export const lightTheme = {
    darker: "#fefcfa",
    dark: "#d0e3f6",
    light: "#1c2842",
};

export const GlobalStyles = createGlobalStyle`
	body {
      --darker: ${(props) => props.theme.darker};
      --dark: ${(props) => props.theme.dark};
      --light: ${(props) => props.theme.light};
	}
`;