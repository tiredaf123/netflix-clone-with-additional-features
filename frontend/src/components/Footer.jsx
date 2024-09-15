import { Facebook, Twitter, Instagram} from 'lucide-react';

const Footer = () => {
	return (
		<footer className='bg-black text-white py-6'>
			<div className='max-w-screen-xl mx-auto px-4'>
				<div className='flex flex-col items-center'>
					<div className='flex gap-6 mb-4'>
						<a
							href='https://www.facebook.com'
							target='_blank'
							rel='noopener noreferrer'
							className='text-white hover:text-gray-400'
						>
							<Facebook className='w-6 h-6' />
						</a>
						<a
							href='https://www.twitter.com'
							target='_blank'
							rel='noopener noreferrer'
							className='text-white hover:text-gray-400'
						>
							<Twitter className='w-6 h-6' />
						</a>
						<a
							href='https://www.instagram.com'
							target='_blank'
							rel='noopener noreferrer'
							className='text-white hover:text-gray-400'
						>
							<Instagram className='w-6 h-6' />
						</a>
						
					</div>
					<p className='text-sm text-gray-500'>
						© {new Date().getFullYear()} MyApp. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
