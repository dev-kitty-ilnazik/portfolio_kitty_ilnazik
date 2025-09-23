import { LINKS } from '@/config/links'
import { useTranslations } from '@/hooks/useTranslations'

export const useMenuItems = (): [string, string][] => {
	const t = useTranslations('app.navigate.item')

	return [
		[t('home'), LINKS.routes.home],
		[t('about'), LINKS.routes.about],
		[t('stack'), LINKS.routes.stack],
		[t('roadmap'), LINKS.routes.roadmap],
		[t('price'), LINKS.routes.prices],
		[t('works'), LINKS.routes.works],
		[t('projects'), LINKS.routes.projects],
		[t('orders'), LINKS.routes.orders],
		[t('reviews'), LINKS.routes.reviews],
		[t('contacts'), LINKS.routes.contacts],
	]
}
