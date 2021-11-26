import React from 'react'
import { createContext, FunctionComponent, useState } from 'react'
import en from '../languages/en.json'
import de from '../languages/de.json'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DictionairyEntry {}

export type DictionairyEntryType =
	| 'donateText'
	| 'totalDonationsProgress'
	| 'totalDonationsSum'
	| 'totalDonatorsCount'
	| 'totalDonationGoal'
	| 'questionsAndAnswersCTA'
	| 'applyAsStreamerCTA'
	| 'donateNowText'
	| 'organizersTitle'
	| 'imprintTitle'
	| 'privacyPolicyTitle'
	| 'viennaText'
	| 'cookieDescription'
	| 'cookieAcceptCTA'
	| 'cookieDeclineCTA'
	| 'donateForStreamerNowText'
	| 'wishByHeartTitle'
	| 'wishTitle'
	| 'donationWidgetGoalReachedTitle'
	| 'donationWidgetGoalReachedTextPart1'
	| 'donationWidgetGoalReachedTextPart2'
	| 'donationWidgetGoalReachedTextPart3'
	| 'scheduledStreamsTitle'
	| 'downloadScheduleTitle'
	| 'downloadCTA'
	| 'pastStreamsTitle'
	| 'topDonatorText'
	| 'hereCouldYourNameTextPart1'
	| 'hereCouldYourNameTextPart2'
	| 'donationOverViewText'
	| 'donationPrependText'
	| 'donationGoal'
	| 'donatorNameText'
	| 'donationformTitle'
	| 'donatioNFormLoadErrorText'
	| 'latestDonatorsTitle'
	| 'faqPageTitle'

type LanguageTypes = 'en' | 'de'
type LanguageDictionairyType = { [key in LanguageTypes]: DictionairyEntry }

export const dictionaryList: LanguageDictionairyType = { en, de }
export const languageOptions = {
	en: 'English',
	de: 'Deutsch',
}

export interface LanguageContextProps {
	language: string
	dictionary: DictionairyEntry
	updateLanguage: React.Dispatch<React.SetStateAction<string>> | null
}

const detaultLanguage: LanguageContextProps = {
	language: 'de',
	dictionary: dictionaryList.en,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	updateLanguage: () => {},
}

export const LanguageContext = createContext<LanguageContextProps>(detaultLanguage)
export const LanguageProvider: FunctionComponent = ({ children }) => {
	const [language, setLanguage] = useState('de')

	const provider = {
		language,
		dictionary: dictionaryList[language],
		updateLanguage: (selected: 'en' | 'de') => {
			setLanguage(languageOptions[selected] ? selected : 'en')
		},
	}

	return <LanguageContext.Provider value={provider}>{children}</LanguageContext.Provider>
}