import {
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
} from 'react-router-dom'

import { AnimatePresence, motion } from 'framer-motion'

import BubblesCanvas from '@/components/Bubbles'
import ScrollToTopButton from './components/ScrollToTopButton'

import Home from '@/pages/Home'
import NotFound from '@/pages/errors/NotFound'

import { LINKS } from '@/config/links'

const AppContent = () => {
	const location = useLocation()

	return (
		<div className='min-h-screen transition-colors duration-700 bg-background'>
			<AnimatePresence mode='wait'>
				<motion.div
					key={location.pathname}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					<BubblesCanvas />
					<Routes location={location} key={location.pathname}>
						<Route path={LINKS.routes.home} element={<Home />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
					<ScrollToTopButton />
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

const App = () => {
	return (
		<Router>
			<AppContent />
		</Router>
	)
}

export default App
