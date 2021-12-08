import React, { useState } from 'react'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import MainLayout from '../app/layouts/MainLayout'
import PageWithLayoutType from '../app/types/PageWithLayout'
import FeaturedStream from '../app/components/FeatureStream/FeaturedStream'
import UpcomingFeatures from '../app/components/UpcomingStreams/UpcomingStreams'
import { fetchTwitchUsersBySchedule } from '../app/utils/commonUtils'
import ButtonsBox from '../app/components/FaqBox'
import cmsContent, { CmsUpcomingStreamer } from '../app/cms/cms'
import { TwitchUserDTO } from '../app/dto/TwitchUserDTO'

export interface InitialAppProps {
	featuredStream?: string
	featuredYoutubeStream?: string
	schedule?: CmsUpcomingStreamer[]
}

const IndexPage: NextPage<InitialAppProps> = (props: InitialAppProps) => {
	const { schedule, featuredStream, featuredYoutubeStream } = props
	const [scheduleType, setScheduleType] = useState<'main' | 'community'>('main')
	const filteredSchedule = schedule.filter((scheduledStream) => scheduledStream.type === scheduleType)

	return (
		<>
			<Head>
				<title>Charity Royale</title>
				<meta name="twitter:card" content="summary" key="twcard" />
				<meta name="twitter:site" content={'@CharityRoyale'} key="twsite" />
				<meta name="twitter:creator" content={'@CharityRoyale'} key="twcreator" />

				<meta property="og:url" content={'https://charityroyale.at/'} key="ogurl" />
				<meta
					property="og:image"
					content={'https://charityroyale.at/uploads/charity_royale_rgb_300x300.png'}
					key="ogimage"
				/>
				<meta property="og:image:width" content={'300'} key="ogimagewidth" />
				<meta property="og:image:height" content={'300'} key="ogimageheight" />
				<meta property="og:site_name" content={'Charity Royale'} key="ogsitename" />
				<meta property="og:title" content={'Charity Royale'} key="ogtitle" />
				<meta property="og:type" content={'website'} key="ogtype" />
				<meta property="og:locale" content={'de_AT'} key="oglocale" />
				<meta property="fb:app_id" content={process.env.FB_ID} key="fbappid" />
				<meta
					property="og:description"
					content={'Größtes Stream,- und Gaming Charity Projekt Österreichs von Veni und willhaben.'}
					key="ogdesc"
				/>
			</Head>
			<>
				<ButtonsBox />
				<FeaturedStream twitchChannelName={featuredStream} youtubeUrl={featuredYoutubeStream} />
				<UpcomingFeatures
					schedule={filteredSchedule}
					changeScheduleType={setScheduleType}
					scheduleType={scheduleType}
				/>
			</>
		</>
	)
}

export const getStaticProps: GetStaticProps<InitialAppProps> = async () => {
	const schedule = cmsContent.upcoming
	const twitchUsers: TwitchUserDTO[] | undefined = (await fetchTwitchUsersBySchedule(schedule)).data

	const twitchUsersDict: { [userid: string]: TwitchUserDTO } = {}
	if (twitchUsers) {
		for (const twitchUser of twitchUsers) {
			twitchUsersDict[twitchUser.login] = twitchUser
		}
	}

	for (const stream of schedule) {
		if (!twitchUsersDict[stream.streamerChannel]) {
			console.log(`Error retrieving data from channel: ${stream.streamerChannel}`)
		}
		stream.imgUrl = twitchUsersDict[stream.streamerChannel]
			? twitchUsersDict[stream.streamerChannel].profile_image_url
			: ''
	}

	return {
		props: {
			schedule,
			featuredStream: cmsContent.featuredStream,
			featuredYoutubeStream: cmsContent.featuredYoutubeStream,
		},
	}
}
;(IndexPage as PageWithLayoutType).layout = MainLayout

export default IndexPage
