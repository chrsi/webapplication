import useSWR from 'swr'
import { statsApi } from '../../config'
import { upcomingStreamers } from '../cms/cms'

const fetcher = (url: string) =>
	fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	}).then((res) => res.json())

const channelsParam = () => {
	const channels = upcomingStreamers.map((streamer) => streamer.streamerChannel)
	return channels.join(',')
}

export const useLiveChannels = () => {
	const { data, error } = useSWR<LiveChannelsResponse>(
		`${statsApi.liveStreamsUrl}?channels=${channelsParam()}`,
		fetcher,
		{
			refreshInterval: statsApi.refreshInterval,
		}
	)

	return {
		liveChannelsData: data?.data ?? [],
		liveChannelsDataIsLoading: !error && !data,
		liveChannelsDataIsError: !!error,
	}
}

interface LiveChannelsResponse {
	data: LiveChannels[]
	pagination: unknown // YAGNI, max 100 channels per page
}

interface LiveChannels {
	id: string
	user_id: string
	user_login: string
	user_name: string
	game_id: string
	game_name: string
	type: string
	title: string
	viewer_count: number
	started_at: string // date, '2023-09-22T10:05:20Z'
	language: string
	thumbnail_url: string
	tag_ids: unknown // YAGNI
	tags: string[]
	is_mature: boolean
}
