import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		font-family: 'Roboto', sans-serif;
		background-color: #231565;
	}

	* {
		box-sizing: border-box;
	}

	p, div, h2, h5 {
		margin: 0;
	}

	ul, ol {
		padding: 0;
		margin: 0;
	}

	button {
		appearance: none;
		border: none;
	}
`
