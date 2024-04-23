import { colors as constColors } from '@/constants/tokens'
import { useEffect, useState } from 'react'
import { getColors } from 'react-native-image-colors'
import { AndroidImageColors, IOSImageColors } from 'react-native-image-colors/build/types'
import { Platform } from 'react-native'

export const usePlayerBackground = (imageUrl: string) => {
	// const [imageColors, setImageColors] = useState<IOSImageColors | AndroidImageColors | null>(null)
	const [imageColors, setImageColors] = useState<{
		primary: string
		secondary: string
	} | null>(null)

	useEffect(() => {
		getColors(imageUrl, {
			fallback: constColors.background,
			cache: true,
			key: imageUrl,
		}).then((colors) =>
			setImageColors(
				colors.platform == 'android'
					? {
							primary: colors.dominant,
							secondary: colors.average,
						}
					: colors.platform == 'ios'
						? {
								primary: colors.primary,
								secondary: colors.secondary,
							}
						: {
								primary: constColors.primary,
								secondary: constColors.background,
							},
			),
		)
	}, [imageUrl])

	return { imageColors }
}
