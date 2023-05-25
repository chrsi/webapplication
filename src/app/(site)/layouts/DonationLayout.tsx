import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { StyledLayout } from '../../../styles/common.styles'
import CookieBanner from '../cms/components/CookieBanner'
import Footer from '../cms/components/Footer/Footer'
import Header from '../cms/components/Header/Header'

export const MainGrid = styled.div`
	display: grid;
	grid-area: main;
	margin: auto;
	padding: 0 ${(p) => p.theme.space.xl}px;
	grid-gap: ${(p) => p.theme.gridGrap.desktop}px;
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
	grid-template-areas:
		'donation-header donation-header donation-header'
		'donation-form donation-form donation-widget-top-donation-sum'
		'donation-form donation-form donation-widget-top-donators'
		'donation-form donation-form donation-widget-top-latest-donators';

	${(p) => p.theme.media.tablet} {
		width: 100%;
		grid-template-columns: 1fr 1fr;
		padding: ${(p) => p.theme.space.l}px ${(p) => p.theme.space.m}px;
		grid-template-areas:
			'donation-header donation-header'
			'donation-form donation-form'
			'donation-widget-top-donation-sum donation-widget-top-donators'
			'donation-widget-top-latest-donators donation-widget-top-latest-donators';
	}

	${(p) => p.theme.media.phone} {
		width: 100%;
		grid-template-columns: 1fr;
		padding: 0 ${(p) => p.theme.space.xl}px;
		grid-template-areas:
			'donation-header'
			'donation-form'
			'donation-widget-top-donation-sum'
			'donation-widget-top-donators'
			'donation-widget-top-latest-donators';
	}
`

const DonationLayout: React.FunctionComponent<PropsWithChildren> = (props) => {
	return (
		<StyledLayout>
			<CookieBanner />
			<Header />
			<MainGrid>{props.children}</MainGrid>
			<Footer />
		</StyledLayout>
	)
}

export default DonationLayout